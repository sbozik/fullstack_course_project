import * as React from 'react'
import { Event } from './Event'
import { EventWeather } from './EventWeather'
import { useEvent } from '../../hooks/useEvent'

export type EventDetailProps = { id: string }

export const EventDetail: React.FC<EventDetailProps> = ({ id }) => {
  const { event, loading, error } = useEvent(id)

  if (loading) return <p>Načítám…</p>
  if (error) return <p role="alert">Nepodařilo se načíst událost</p>
  if (!event) return <p>Událost nenalezena.</p>

  return (
    <div style={{ padding: 12 }}>
      <h1>Detail události</h1>
      <Event lokace={event.location} nazev={event.title} datum={event.dates} />
      <EventWeather city={event.location ?? ''} />
    </div>
  )
}
