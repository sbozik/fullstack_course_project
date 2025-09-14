import { useEffect, useState } from 'react'
import type { EventApi } from '../apiClient'
import { getEvents } from '../apiClient'

export function useData() {
  const [items, setItems] = useState<EventApi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await getEvents() // ← api client
        if (!cancelled) {
          setItems(data.items)
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
  }, [])

  return { items, loading, error }
}
