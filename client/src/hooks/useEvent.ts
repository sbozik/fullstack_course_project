import { useEffect, useState } from 'react'
import type { PollingEvent } from '../components/Event/availability/availability'

type State = {
  event: PollingEvent | null
  loading: boolean
  error: string | null
}

export function useEvent(id: string): State {
  const [event, setEvent] = useState<PollingEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`http://localhost:4000/api/events/${encodeURIComponent(id)}`)
      .then((r) => {
        if (r.status === 404) return null // “not found” is a valid outcome
        if (!r.ok) throw new Error('Nepodařilo se načíst událost')
        return r.json()
      })
      .then((json) => {
        if (cancelled) return
        setEvent(json)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Nepodařilo se načíst událost')
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { event, loading, error }
}
