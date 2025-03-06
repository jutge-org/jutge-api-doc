"use client"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { OutputMessage } from "@/lib/worker"
import { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from "react"
import OutputArea from "./playground-output-area"

type CellProps = {
    worker: Worker | undefined
    index: number
    focus: boolean
}

export default function PlaygroundCell({ worker, index, focus }: CellProps) {
    const editorRef = useRef<HTMLTextAreaElement | null>(null)
    const [outputs, setOutputs] = useState<any[]>([])

    const onMessage = useCallback(({ data }: MessageEvent<OutputMessage>) => {
        if (index !== data.index) {
            // Ignore messages sent to other cells
            return
        }
        switch (data.type) {
            case "chart":
            case "print":
                console.log(`PlaygroundCell ${index} received`, data)
                setOutputs((prev) => [...prev, data])
                break
            case "error":
                console.log(`PlaygroundCell ${index} received`, data)
                setOutputs((prev) => [...prev, data])
                break
        }
    }, [])

    useEffect(() => {
        worker?.addEventListener("message", onMessage)
        return () => worker?.removeEventListener("message", onMessage)
    }, [worker, onMessage])

    const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && e.ctrlKey) {
            // run!
            const input = editorRef.current?.value || ""
            worker?.postMessage({ type: "eval", info: input, index })
        }
    }

    return (
        <div className="flex flex-col gap-0">
            <div className="text-xs pt-4 pb-1.5 text-muted-foreground">INPUT {index}</div>
            <Textarea
                autoFocus={focus}
                ref={editorRef}
                className={cn(
                    "h-[8rem] rounded-md font-mono dark:bg-[#1e1e1e]",
                    "py-1 px-1.5 border-muted border-[3px] focus:border-accent",
                    "ring-none focus-visible:ring-transparent"
                )}
                onKeyDown={onKeyDown}
            />

            {outputs.length > 0 && (
                <div className="flex flex-col gap-2">
                    <div className="text-xs pt-2 pb-2 text-muted-foreground">
                        OUTPUT {index + 1}
                    </div>
                    {outputs.map((output, j) => (
                        <OutputArea key={`${index}:${j}`} output={output} index={j} />
                    ))}
                </div>
            )}
        </div>
    )
}
