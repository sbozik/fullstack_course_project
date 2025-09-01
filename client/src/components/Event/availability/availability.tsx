import type { DateRecord } from '../user/user.tsx'

export type EventProps = {
  location?: string
  id: string
  title: string
  dates: DateRecord[]
}
