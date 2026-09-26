import { useSyncExternalStore } from 'react'

function subscribe() {
  return () => {}
}

// False in the server render and during hydration, true once the client has taken over.
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
