import { useParams } from 'react-router-dom'
import { EventDetail as EventDetailComp } from '../components/Event/EventDetail'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  if (!id) return <p>Chybí ID události.</p>
  return <EventDetailComp id={id} />
}
