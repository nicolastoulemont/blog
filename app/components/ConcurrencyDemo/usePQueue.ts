import PQueue, { AbortError } from "p-queue"
import type {Options, QueueAddOptions} from 'p-queue'
import type PriorityQueue from "p-queue/dist/priority-queue"
import { useState, useEffect, useCallback } from "react"

interface Task {
  id: string
  fn: () => Promise<unknown> | unknown
}

export function usePQueue({
  concurrency = 1,
  autoStart = true,
  ...rest
}: Options<PriorityQueue, QueueAddOptions>) {
  const [PQ] = useState(() => new PQueue({ concurrency, ...rest }))
  const [abortControllersMap, setAbortControllersMap] = useState<
    Record<string, AbortController>
  >({})

  useEffect(() => {
    if (autoStart && Object.keys(abortControllersMap).length > 0) {
      PQ.start()
    }
  }, [abortControllersMap, PQ, autoStart])

  const enqueue = useCallback(
    async (task: Task) => {
      const controller = new AbortController()
      setAbortControllersMap((prev) => ({
        ...prev,
        [task.id]: controller,
      }))

      try {
        await PQ.add(task.fn, { signal: controller.signal })
      } catch (error) {
        if (!(error instanceof AbortError)) {
          throw error
        }
      }
    },
    [PQ]
  )

  const dequeue = useCallback(
    (taskId: Task["id"]) => {
      const controller = abortControllersMap[taskId]
      if (controller) {
        controller.abort()
        const { [taskId]: toBeDeleted, ...rest } = abortControllersMap
        setAbortControllersMap(rest)
      }
    },
    [abortControllersMap]
  )

  const clearQueue = useCallback(() => {
    PQ.clear()
    setAbortControllersMap({})
  }, [PQ])

  return {
    enqueue,
    dequeue,
    clearQueue,
    start: PQ.start,
    onIdle: PQ.onIdle
  }
}
