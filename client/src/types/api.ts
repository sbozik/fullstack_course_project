import type { components } from '../apischema'

export type ApiEvent = components['schemas']['Event']
export type DateRecord = ApiEvent['dates'][number]
