import createClient from 'openapi-fetch'
import type { paths as Path, components } from './apischema'

export type EventApi = components['schemas']['Event']
export type EventsListApi = components['schemas']['EventsList']
export type CreateEventBody = {
  title: string
  location: string | null
  dates: number[]
}

export const api = createClient<Path>({
  baseUrl: 'http://localhost:4000',
})

export async function getEvents(limit?: number): Promise<EventsListApi> {
  const { data, error } = await api.GET('/api/events', {
    params: limit ? { query: { limit } } : undefined,
  })
  if (error) throw error
  if (!data) throw new Error ('Empty response')
  return data
}

export async function getEventById(id: string | number): Promise<EventApi> {
  const { data, error } = await api.GET('/api/events/{id}', {
    params: { path: { id } },
  })
  if (error) throw error
  if (!data) throw new Error ('Empty response')
  return data
}

export async function createEvent(body: CreateEventBody): Promise<EventApi> {
  const { data, error } = await api.POST('/api/events', {
    body: body as unknown as EventApi,
  })
  if (error) throw error
  if (!data) throw new Error('Empty response')
  return data
}
