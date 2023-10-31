// import { usePQueue } from "./usePQueue"

export function ConcurrencyDemo() {
  // const {enqueue, dequeue, clearQueue } = usePQueue({ concurrency: 2 })

  async function handleClick() {
    try {
      const res = await fetch("/concurrency-demo?duration=1500")
      const data = await res.json()
      console.log({ data })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h3>Hello</h3>
      <button
        onClick={handleClick}
        className="rounded-md border-none bg-blue-700 px-3 py-1 text-white"
      >
        Fetch
      </button>
    </div>
  )
}
