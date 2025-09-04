import * as React from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../hooks/useData'

export const EventsList: React.FC = () => {
  const { items, loading, error } = useData()

  if (loading) return <p>Načítám…</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <div style={{ padding: 12 }}>
      <h1>Události</h1>
      <ul>
        {items.map(event => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              {event.title}
              {event.location ? ` — ${event.location}` : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
