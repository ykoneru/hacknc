import { useCallback, useEffect, useRef, useState } from 'react'

// Loads data immediately, then refreshes on an interval (stand-in for Supabase Realtime).
// Background refreshes keep the last good data on screen instead of flashing a spinner.
export function usePolling<T>(load: () => Promise<T>, intervalMs: number, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const loadRef = useRef(load)
  loadRef.current = load

  const refresh = useCallback(async () => {
    try {
      const next = await loadRef.current()
      setData(next)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    const tick = () => { if (active) void refresh() }
    tick()
    const id = setInterval(tick, intervalMs)
    return () => { active = false; clearInterval(id) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, refresh, ...deps])

  return { data, error, loading, refresh, setData }
}

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
