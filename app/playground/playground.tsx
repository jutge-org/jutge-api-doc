"use client"

import { cn, range } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import PlaygroundCell from "./cell"
import Help from "./help"
import PlaygroundInputDialog from "./input-dialog"
import { MessageHandler } from "./types"

export default function Playground() {
    const [fatalError, setFatalError] = useState<string | undefined>()
    const [numCells, setNumCells] = useState<number>(0)
    const workerRef = useRef<Worker | undefined>(undefined)

    useEffect(() => {
        if (!window.Worker) {
            setFatalError("Your browser does not support Web Workers!")
        }
        try {
            const worker = new Worker(new URL("worker.ts", import.meta.url), {
                name: "playground-worker",
            })
            workerRef.current = worker
            setNumCells(1)
        } catch (e) {
            setFatalError("Failed to create a new Worker!")
        }
    }, [])

    useEffect(() => {
        const onWorkerMessage: MessageHandler = ({ data }) => {
            if (data.type === "eval-result") {
                if (data.cellIndex === numCells) {
                    setNumCells((n) => n + 1)
                }
            }
        }
        if (workerRef.current) {
            workerRef.current?.addEventListener("message", onWorkerMessage)
            return () => workerRef.current?.removeEventListener("message", onWorkerMessage)
        }
    }, [numCells])

    if (fatalError) {
        return (
            <div
                className={cn(
                    "text-destructive border-destructive border-2",
                    "min-h-24 flex flex-col justify-center items-center",
                )}
            >
                {fatalError}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <Help />

            {workerRef.current !== undefined || (
                <div className="mt-4">
                    <LoaderIcon className="animate-spin text-primary" />
                </div>
            )}

            {workerRef.current && (
                <>
                    {range(1, numCells).map((index) => (
                        <PlaygroundCell
                            key={index}
                            worker={workerRef.current!}
                            cellIndex={index}
                            focus={index == numCells}
                        />
                    ))}

                    <PlaygroundInputDialog worker={workerRef.current} />
                </>
            )}
        </div>
    )
}
