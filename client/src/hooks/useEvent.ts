import { useEffect, useState } from 'react'
import type { EventApi } from '../apiClient'
import { api } from '../apiClient'

export function useEvent(id: string | number | undefined) {
  const [event, setEvent] = useState<EventApi | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id == null) return
    let cancelled = false

    async function load() {
      try {
        const { data, error: apiErr } = await api.GET('/api/events/{id}', {
          params: { path: { id: id as string | number } }, // <-- narrowed
        })

        const status = (apiErr as { status?: number } | undefined)?.status
        if (status === 404) {
          if (!cancelled) {
            setEvent(null)
            setLoading(false)
            setError('Událost nenalezena')
          }
          return
        }

        if (apiErr) throw apiErr
        if (!data) throw new Error('Nepodařilo se načíst detail')

        if (!cancelled) {
          setEvent(data)
          setLoading(false)
          setError(null)
        }
      }
      catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Chyba')
          setLoading(false)
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id])

  return { event, loading, error }
}
