import * as React from 'react'
import { Link } from 'react-router-dom'
import type { EventsListProps } from './availability/availability'

export const EventsList: React.FC<EventsListProps> = ({ data }) => (
  <div>
    <h1>Eventy</h1>
    <ul>
      {data.map(event => (
        <li key={event.id}>
          <Link to={`/events/${event.id}`}>
            {event.title}
            {event.location ? ` - ${event.location}` : ''}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
