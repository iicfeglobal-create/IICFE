import { useEffect, useState } from 'react'
import { readProgress, subscribe } from './store'

// React binding for the progress store — re-renders on any progress change.
export function useProgress() {
  const [progress, setProgress] = useState(readProgress)
  useEffect(() => subscribe(setProgress), [])
  return progress
}
