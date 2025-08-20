
const getCityCoords = async (cityName) => {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=cs&format=json`,{
                method: 'GET',
            });
        if (!response.ok) throw new Error("Nenašel jsem město");

        const jsonResponse = await response.json();
        const first = jsonResponse.results?.[0];
        if (!first) throw new Error("Nenašel jsem město");

        return {latitude: first.latitude, longitude: first.longitude};
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getWeather = async ({ latitude, longitude }) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
        );
        if (!response.ok) throw new Error("Nenašel jsem počasí");

        const jsonResponse = await response.json();
        const max = jsonResponse.daily?.temperature_2m_max?.[0];
        const min = jsonResponse.daily?.temperature_2m_min?.[0];
        const unit = jsonResponse.daily_units?.temperature_2m_max || "°C";

        const average = Math.round(((max + min) / 2) * 10) / 10;
        return {average, min, max, unit};
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const cache = new Map();

document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.getElementById("mesta_name");

    document.querySelectorAll(".city-result").forEach(div => div.remove());

    const cities = input.value.split(/[;,]/).filter(city => city !== "");

    if (cities.length < 1 || cities.length > 3) {
        const err = document.createElement("div");
        err.className = "city-result";
        err.innerText = "Zadej 1–3 města oddělená čárkou nebo středníkem.";
        document.getElementById("myForm").parentElement.appendChild(err);
        return;
    }

    const promises = cities.map(async (city) => {
        const key = city.toUpperCase();

        if (cache.has(key)) {
            const weather = cache.get(key);
            return { city, weather };
        }

        const coords = await getCityCoords(city);
        const weather = await getWeather(coords);
        cache.set(key, weather);
        return { city, weather };
    });

    Promise.allSettled(promises)
        .then((results) => {
            results.forEach((result, index) => {
                const message = document.createElement("div");
                message.className = "city-result";

                if (result.status === "fulfilled") {
                    const { average, min, max, unit } = result.value.weather;
                    const cityName = result.value.city.toUpperCase();
                    message.innerText = `Počasí v ${cityName}: Průměr: ${average}${unit}, Min: ${min}${unit}, Max: ${max}${unit}`;
                } else {
                    const cityName = cities[index]?.toUpperCase() || null;
                    message.innerText = `${cityName}: ${result.reason?.message || "Nepodařilo se načíst data."}`;
                }
                document.getElementById("myForm").parentElement.appendChild(message);
            });
        });
});