import { useEffect, useState } from 'react'
import type { PollingEvent } from '../components/Event/availability/availability'

type UseDataResult
  = | { loading: true, error: null, items: [] }
    | { loading: false, error: string | null, items: PollingEvent[] }

export function useData(): UseDataResult {
  const [items, setItems] = useState<PollingEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('http://localhost:4000/api/events')
        if (!res.ok) throw new Error('Nepodařilo se načíst události')
        const json = await res.json() as { items: PollingEvent[] }
        if (!cancelled) {
          setItems(json.items)
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

  if (loading) return { loading: true, error: null, items: [] }
  return { loading: false, error, items }
}
