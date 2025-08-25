import { Event } from "./components/Event/Event";
import { events } from "./components/Event/data/data";

export default function App() {
    return (
        <div>
            {events.map((event) =>(
            <Event key={event.id} lokace={event} nazev={event} datum={event} />
            ))}
        </div>
    );
}