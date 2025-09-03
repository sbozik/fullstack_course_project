import { EventsList as EventsListComp } from '../components/Event/EventsList'
import { data } from '../components/Event/data/pollData'

export default function EventsList() {
  return <EventsListComp data={data} />
}
