import PQueue, { AbortError } from 'p-queue'
import type { Options, QueueAddOptions } from 'p-queue'
import type PriorityQueue from 'p-queue/dist/priority-queue'
import { useEffect, useCallback, useMemo } from 'react'

interface Task {
  id: string
  fn: () => Promise<unknown> | unknown
}

export function usePQueue({
  concurrency = 1,
  autoStart = true,
  ...rest
}: Options<PriorityQueue, QueueAddOptions>) {
  const PQ = useMemo(() => new PQueue({ concurrency, ...rest }), [concurrency, rest])
  const AbortControllerMap = useMemo(() => new Map<string, AbortController>(), [])

  useEffect(() => {
    if (autoStart && AbortControllerMap.size > 0) {
      PQ.start()
    }
  }, [AbortControllerMap, PQ, autoStart])

  PQ.on('idle', () => {
    AbortControllerMap.clear()
  })

  const enqueue = useCallback(
    async (task: Task) => {
      const controller = new AbortController()
      AbortControllerMap.set(task.id, controller)

      try {
        await PQ.add(task.fn, { signal: controller.signal })
      } catch (error) {
        if (!(error instanceof AbortError)) {
          throw error
        }
      }
    },
    [PQ, AbortControllerMap]
  )

  const dequeue = useCallback(
    (taskId: Task['id']) => {
      const controller = AbortControllerMap.get(taskId)
      if (controller) {
        controller.abort()
        AbortControllerMap.delete(taskId)
      }
    },
    [AbortControllerMap]
  )

  const clearQueue = useCallback(() => {
    PQ.clear()
    AbortControllerMap.clear()
  }, [PQ, AbortControllerMap])

  return {
    enqueue,
    dequeue,
    clearQueue,
    start: PQ.start,
    onIdle: PQ.onIdle,
  }
}
