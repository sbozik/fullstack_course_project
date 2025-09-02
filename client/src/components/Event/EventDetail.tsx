import * as React from 'react'
import type { PollingEvent } from './availability/availability.ts'
import { Event } from './Event'

export type EventDetailProps = {
  event: PollingEvent | null
}

export const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  if (!event) {
    return <p>Event nenalezen.</p>
  }

  return (
    <div>
      <h1>Detail eventu</h1>
      <Event lokace={event.location} nazev={event.title} datum={event.dates} />
    </div>
  )
}
