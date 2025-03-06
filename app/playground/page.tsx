"use client"

import PageWidth from "@/components/page-width"
import { cn, range } from "@/lib/utils"
import { OutputMessage } from "@/lib/worker"
import { LoaderIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import PlaygroundCell from "./playground-cell"
import Help from "./playground-help"
import PlaygroundInputDialog from "./playground-input-dialog"
import { newWorker } from "./worker"

export default function PlaygroundPage() {
    const [fatalError, setFatalError] = useState<string | undefined>()
    const [numCells, setNumCells] = useState<number>(0)

    const workerRef = useRef<Worker | undefined>()

    useEffect(() => {
        if (!window.Worker) {
            setFatalError("Your browser does not support Web Workers!")
        }
    }, [])

    useEffect(() => {
        workerRef.current = newWorker()
        setNumCells(1)
    }, [])

    useEffect(() => {
        const onWorkerMessage = ({ data }: MessageEvent<OutputMessage>) => {
            switch (data.type) {
                case "eval":
                    console.log("Page received", data)
                    setNumCells((prev) => prev + 1)
                    break
            }
        }

        workerRef.current?.addEventListener("message", onWorkerMessage)
        return () => workerRef.current?.removeEventListener("message", onWorkerMessage)
    }, [workerRef.current])

    if (fatalError) {
        return (
            <PageWidth>
                <div
                    className={cn(
                        "text-destructive border-destructive border-2",
                        "min-h-24 flex flex-col justify-center items-center",
                    )}
                >
                    {fatalError}
                </div>
            </PageWidth>
        )
    }

    return (
        <PageWidth className="px-4 md:px-0 pt-4">
            <h1 className="mb-4">Playground</h1>

            <Help />

            {workerRef.current !== undefined || (
                <div className="mt-4">
                    <LoaderIcon className="animate-spin text-accent" />
                </div>
            )}

            {workerRef.current && (
                <div className="flex flex-col gap-0">
                    {range(1, numCells).map((index) => (
                        <PlaygroundCell
                            key={index}
                            worker={workerRef.current}
                            index={index}
                            focus={index == numCells}
                        />
                    ))}
                </div>
            )}

            <PlaygroundInputDialog worker={workerRef.current} />
        </PageWidth>
    )
}
