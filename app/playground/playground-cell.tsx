"use client"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { OutputMessage } from "@/lib/worker"
import { useEffect, useRef, useState } from "react"
import OutputArea from "./OutputArea"

type CellProps = {
    worker: Worker | undefined
    index: number
    isLast: boolean
}

export default function Cell({ worker, index, isLast }: CellProps) {
    const editorRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>("")
    const [outputs, setOutputs] = useState<any[]>([])

    const onMessage = ({ data }: MessageEvent<OutputMessage>) => {
        console.log(`Cell ${index} received`, data)
        switch (data.type) {
            case "chart":
            case "print":
                setOutputs((prev) => [...prev, data])
                break
        }
    }

    async function run() {
        worker?.postMessage({ type: "eval", info: input, index })
    }

    useEffect(() => {
        worker?.addEventListener("message", onMessage)
        return () => worker?.removeEventListener("message", onMessage)
    }, [worker])

    return (
        <div className="flex flex-col gap-0">
            <div className="text-xs pt-4 pb-1.5">Input {index}</div>
            <Textarea
                ref={editorRef}
                value={input}
                className={cn(
                    "h-[8rem] rounded-md font-mono",
                    "p-1 dark:bg-[#1e1e1e]",
                    isLast ? "border-accent border-[3px]" : "border-muted outline-2",
                )}
                onChange={(event) => setInput(event.target.value)}
            />

            {outputs.length > 0 && (
                <div className="flex flex-col gap-2">
                    <div className="text-xs pt-2 pb-2">Output {index + 1}</div>
                    {outputs.map((output, j) => (
                        <OutputArea key={`${index}:${j}`} output={output} index={j} />
                    ))}
                </div>
            )}
        </div>
    )
}

// receive messages from worker
// function receiveData(message: OutputMessage) {
//     setScroll(true)
//     setCells((oldCells) => {
//         const newCells = [...oldCells]
//         newCells[evalCellIndex].outputs.push(message)
//         return newCells
//     })
// }

// function receiveEval(message: OutputMessage) {
//     setScroll(true)
//     setCells((oldCells) => {
//         const newCells = [...oldCells]
//         // if (message.type !== "eval" || message.info !== undefined) {
//         //     newCells[evalCellIndex].outputs.push(message)
//         // }
//         newCells.push({ input: "", outputs: [] })
//         return newCells
//     })
// }

// workerRef.current?.addEventListener("message", (e: MessageEvent<OutputMessage>) => {
//     console.log("received", e.data)
//     switch (e.data.type) {
//         case "pong":
//             return receivePong(e.data)
//         case "print":
//         case "chart":
//             return receiveData(e.data)
//         case "eval":
//         case "error":
//             return receiveEval(e.data)
//         case "input":
//             return receiveInput(e.data)
//     }
// })
