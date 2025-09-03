import { useEffect, useRef, useState } from 'react'

export type Weather = { average: number, min: number, max: number, unit: string }

type State
  = | { loading: true, data: null, error: null }
    | { loading: false, data: Weather | null, error: string | null }

const cache = new Map<string, Weather>()

async function getCityCoords(cityName: string) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=cs&format=json`,
  )
  if (!res.ok) throw new Error('Nenašel jsem město')
  const data = await res.json()
  const first = data.results?.[0]
  if (!first) throw new Error('Nenašel jsem město')
  return { latitude: first.latitude, longitude: first.longitude }
}

async function getWeather(lat: number, lon: number): Promise<Weather> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`,
  )
  if (!res.ok) throw new Error('Nenašel jsem počasí')
  const data = await res.json()
  const max = data.daily?.temperature_2m_max?.[0]
  const min = data.daily?.temperature_2m_min?.[0]
  const unit = data.daily_units?.temperature_2m_max
  const average = Math.round(((max + min) / 2) * 10) / 10
  return { average, min, max, unit }
}

export const useWeather = (city?: string) => {
  const [state, setState] = useState<State>({ loading: false, data: null, error: null })
  const cityRef = useRef(city?.trim() || '')

  useEffect(() => {
    const raw = (city || '').trim()
    cityRef.current = raw

    if (!raw) {
      setState({ loading: false, data: null, error: 'Chybí lokalita' })
      return
    }

    const key = raw.toLocaleUpperCase()

    if (cache.has(key)) {
      setState({ loading: false, data: cache.get(key)!, error: null })
      return
    }

    let cancelled = false
    setState({ loading: true, data: null, error: null });

    (async () => {
      try {
        const { latitude, longitude } = await getCityCoords(raw)
        const w = await getWeather(latitude, longitude)
        if (cancelled) return
        cache.set(key, w)
        setState({ loading: false, data: w, error: null })
      }
      catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Nepodařilo se načíst data.'
        setState({ loading: false, data: null, error: message })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [city])

  return state
}
