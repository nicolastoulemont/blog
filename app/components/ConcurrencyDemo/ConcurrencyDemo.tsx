import { useCallback, useState } from 'react'
import { usePQueue } from './usePQueue'
import clsx from 'clsx'
import { FiPlusCircle, FiXCircle } from 'react-icons/fi'
import { sleep } from '~/utils/sleep'

type BlockStatus = 'Initial' | 'Queued' | 'Loading' | 'Done'

const generateBlocks = (status: BlockStatus = 'Initial') =>
  Array.from({ length: 20 }).reduce<Record<string, { id: string; status: BlockStatus }>>(
    (acc, _, index) => {
      const id = `square-${index}`
      acc[id] = { id, status }
      return acc
    },
    {}
  )

export function ConcurrencyDemo() {
  const [concurrency, setConcurrency] = useState(2)
  const [numberOfFetchExecuted, setNumberOfFetchExecuted] = useState(0)
  const [blocks, setBlocks] = useState(generateBlocks())
  const { enqueue, dequeue, clearQueue } = usePQueue({ concurrency })

  const updateBlockStatus = useCallback(
    (blockId: string, status: BlockStatus) => {
      setBlocks((prev) => {
        const newBlocks = { ...prev }
        newBlocks[blockId] = { id: blockId, status }
        return newBlocks
      })
    },
    [setBlocks]
  )

  const demoPromise = useCallback(
    async (block: string) => {
      updateBlockStatus(block, 'Loading')
      await sleep(250)
      await fetch('/concurrency-demo')
      setNumberOfFetchExecuted((prev) => prev + 1)
      updateBlockStatus(block, 'Done')
    },
    [updateBlockStatus, setNumberOfFetchExecuted]
  )

  async function handleQueueAll() {
    setNumberOfFetchExecuted(0)
    setBlocks(generateBlocks('Queued'))
    for (const block in blocks) {
      enqueue({
        id: block,
        fn: async () => await demoPromise(block),
      })
    }
  }

  function handleQueueOne(block: string) {
    enqueue({
      id: block,
      fn: async () => demoPromise(block),
    })
  }

  function handleCancel(blockId: string) {
    dequeue(blockId)
    updateBlockStatus(blockId, 'Initial')
  }

  function handleReset() {
    clearQueue()
    setBlocks(generateBlocks())
    setNumberOfFetchExecuted(0)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <select
            name="concurrency-number"
            className="block rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={concurrency}
            onChange={(e) => {
              setConcurrency(parseInt(e.target.value, 10))
            }}
          >
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
            <option>10</option>
          </select>
          <button
            onClick={handleQueueAll}
            className="rounded-lg border-none bg-blue-700 px-3 py-1 text-white"
          >
            Start
          </button>
          <button
            onClick={handleReset}
            className="rounded-lg border-none bg-slate-200 px-3 py-1"
          >
            Reset
          </button>
        </div>
        <p>Number of fetch executed: {numberOfFetchExecuted}</p>
      </div>

      <div className="grid grid-cols-10 gap-3">
        {Object.values(blocks).map((block) => (
          <div
            key={block.id}
            className={clsx(
              'relative flex h-14 w-20 items-center justify-center rounded-lg bg-slate-200',
              block.status === 'Queued' && 'opacity-50',
              block.status === 'Loading' && 'bg-yellow-400 text-white',
              block.status === 'Done' && 'bg-green-600 text-white'
            )}
          >
            {block.status}
            {block.status === 'Queued' && (
              <button
                className="absolute right-[-7.5px] top-[-7.5px]"
                onClick={() => handleCancel(block.id)}
              >
                <FiXCircle className="h-5 w-5 text-black" />
              </button>
            )}
            {block.status === 'Initial' && (
              <button
                className="absolute right-[-7.5px] top-[-7.5px]"
                onClick={() => handleQueueOne(block.id)}
              >
                <FiPlusCircle className="h-5 w-5 text-black" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
