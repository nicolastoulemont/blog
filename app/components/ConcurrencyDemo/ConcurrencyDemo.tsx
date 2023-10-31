// import { usePQueue } from "./usePQueue"

export function ConcurrencyDemo() {

    // const {enqueue, dequeue, clearQueue } = usePQueue({ concurrency: 2 })

    async function handleClick() {
        try {
            const res = await fetch('/concurrency-demo?duration=abc')
            const data = await res.json()
            console.log({data})
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <h3>Hello</h3>
            <button onClick={handleClick} className="px-3 py-1 rounded-md bg-blue-700 text-white border-none">Fetch</button>
        </div>
    )
}