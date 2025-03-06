export function newWorker() {
    try {
        return new Worker(new URL("@/lib/worker.ts", import.meta.url), {
            name: "playground-worker",
        })
    } catch (e) {
        console.error("Error creating worker", e)
        return undefined
    }
}
