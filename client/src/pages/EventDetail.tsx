import { useParams } from 'react-router-dom'
import { data as events } from '../components/Event/data/pollData'
import { Event } from '../components/Event/Event'
import { WeatherForEvent } from '../components/Event/EventWeather'
import type { PollingEvent } from '../components/Event/availability/availability'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const event = events.find((e: PollingEvent) => String(e.id) === String(id))

  if (!event) return <p>Událost nenalezena.</p>

  return (
    <div style={{ padding: 12 }}>
      <h1>Detail události</h1>
      <Event lokace={event.location} nazev={event.title} datum={event.dates} />
      <WeatherForEvent city={event.location} />
    </div>
  )
}
