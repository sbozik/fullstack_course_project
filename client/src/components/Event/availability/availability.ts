import type { DateRecord } from '../user/user'

export type PollingEvent = {
  location?: string
  title: string
  id: string
  dates: DateRecord[]
}
export type EventsListProps = {
  data: PollingEvent[]
}
