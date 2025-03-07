"use client"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"
import { KeyboardEventHandler, useEffect, useRef, useState } from "react"
import ChartArea from "./areas/chart"
import ErrorArea from "./areas/error"
import EvalResultArea from "./areas/eval-result"
import PrintArea from "./areas/print"
import { InputMessage, MessageHandler, OutputMessage, OutputMessageType } from "./types"

const noConversion = (x: any) => x

const defaultConversionFunc = (payload: any) =>
    typeof payload === "string" ? payload : JSON.stringify(payload, null, 2)

const getConversionFunc = (type: OutputMessageType) =>
    type2AreaInfo[type].conversionFunc || defaultConversionFunc

type AreaInfo = {
    label: string
    component: React.FunctionComponent<{ payload: any }>
    conversionFunc?: (payload: any) => any
}
const type2AreaInfo: Record<string, AreaInfo> = {
    error: { label: "E", component: ErrorArea },
    print: { label: "P", component: PrintArea },
    chart: { label: "C", component: ChartArea, conversionFunc: noConversion },
    "eval-result": { label: "R", component: EvalResultArea, conversionFunc: noConversion },
}

type CellProps = {
    worker: Worker
    index: number
    focus: boolean
}
export default function PlaygroundCell({ worker, index, focus }: CellProps) {
    const editorRef = useRef<HTMLTextAreaElement | null>(null)
    const [outputs, setOutputs] = useState<OutputMessage[]>([])
    const [waitingForResult, setWaitingForResult] = useState(false)

    useEffect(() => {
        const onWorkerMessage: MessageHandler = ({ data }: MessageEvent<OutputMessage>) => {
            if (index !== data.cellIndex) {
                return // Ignore messages sent to other cells
            }
            setOutputs((prev) => [...prev, data])
            setWaitingForResult(false)
        }
        worker.addEventListener("message", onWorkerMessage)
        return () => worker.removeEventListener("message", onWorkerMessage)
    }, [worker, index])

    const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && e.ctrlKey) {
            // run!
            worker.postMessage({
                type: "eval-request",
                payload: editorRef.current?.value || "",
                cellIndex: index,
            } satisfies InputMessage)
            setWaitingForResult(true)
        }
    }

    const numbers = new Map<OutputMessageType, number>()
    const labels = outputs.map(({ type }) => {
        const number = numbers.get(type) || 1
        const label = type2AreaInfo[type].label
        numbers.set(type, number + 1)
        return `${label}${number}`
    })

    return (
        <div className="flex flex-row gap-0 w-full">
            <div className="border border-r-0 w-2.5 border-muted" />
            <div className="py-2 grow flex flex-col gap-0">
                <div className="text-xs pt-0 pb-1.5 text-muted-foreground">INPUT {index}</div>
                <Textarea
                    autoFocus={focus}
                    ref={editorRef}
                    className={cn(
                        "h-[8rem] rounded-md font-mono dark:bg-[#1e1e1e]",
                        "py-1 px-1.5 border-muted border-[3px] focus:border-accent",
                        "ring-none focus-visible:ring-transparent",
                    )}
                    onKeyDown={onKeyDown}
                />

                {outputs.length > 0 && (
                    <div className="flex flex-col gap-1">
                        <div className="text-xs pt-2 pb-2 text-muted-foreground">
                            OUTPUT {index}
                        </div>
                        {outputs.map(({ type, payload }, j) => {
                            const { component: AreaComponent } = type2AreaInfo[type]
                            const convFn = getConversionFunc(type)
                            const pload = convFn(payload)
                            return (
                                <div
                                    key={`${index}:${j}`}
                                    className="pl-4 w-full flex flex-row items-baseline gap-2"
                                >
                                    <div className="flex flex-row w-6 text-[0.6rem] text-left text-muted-foreground">
                                        <div className="border border-r-0 w-1 h-3.5 border-muted-foreground" />
                                        {`${labels[j]}`}
                                        <div className="border border-l-0 w-1 border-muted-foreground" />
                                    </div>
                                    <AreaComponent payload={pload} />
                                </div>
                            )
                        })}
                    </div>
                )}

                {waitingForResult && (
                    <div className="mt-4">
                        <LoaderIcon className="animate-spin text-accent" />
                    </div>
                )}
            </div>
        </div>
    )
}
