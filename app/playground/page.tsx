"use client"

import PageWidth from "@/components/page-width"
import { range } from "@/lib/utils"
import { OutputMessage } from "@/lib/worker"
import { LoaderIcon } from "lucide-react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import PlaygroundCell from "./playground-cell"
import Help from "./playground-help"
import PlaygroundInputDialog from "./playground-input-dialog"
import { newWorker } from "./worker"

export default function PlaygroundPage() {
    const [workerReady, setWorkerReady] = useState(false)
    const [fatalError, setFatalError] = useState<string | null>(null)
    const [numCells, setNumCells] = useState<number>(1)

    const workerRef = useRef<Worker>()

    useLayoutEffect(() => {
        if (!window.Worker) {
            setFatalError("Your browser does not support Web Workers!")
        }
    })

    useEffect(() => {
        const worker = newWorker()
        worker?.postMessage({ type: "ping", info: null })
        workerRef.current = worker
    }, [])

    useEffect(() => {
        workerRef.current?.addEventListener("message", ({ data }: MessageEvent<OutputMessage>) => {
            console.log("Page received", data)
            switch (data.type) {
                case "pong":
                    setWorkerReady(true)
                    break
            }
        })
    }, [workerRef.current])

    return (
        <PageWidth className="px-4 md:px-0 pt-4">
            <h1 className="mb-4">Playground</h1>

            <Help />

            {workerReady || (
                <div className="flex justify-center items-center h-96">
                    <LoaderIcon size={48} />
                </div>
            )}

            {workerReady && (
                <div className="flex flex-col gap-0">
                    {range(1, numCells).map((index) => (
                        <PlaygroundCell
                            key={index}
                            worker={workerRef.current}
                            index={index}
                            isLast={index == numCells}
                        />
                    ))}
                </div>
            )}

            <PlaygroundInputDialog worker={workerRef.current} />
        </PageWidth>
    )
}
