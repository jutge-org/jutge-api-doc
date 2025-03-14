"use client"

import { useTheme } from "@/components/theme/hook"
import { Button } from "@/components/ui/button"
import { usePlatform } from "@/hooks/use-platform"
import { acceptCompletion, autocompletion } from "@codemirror/autocomplete"
import { javascript } from "@codemirror/lang-javascript"
import { Prec } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { githubDark, githubLight } from "@uiw/codemirror-theme-github"
import CodeMirror, { basicSetup } from "@uiw/react-codemirror"
import { LoaderIcon, Play } from "lucide-react"
import { useEffect, useState } from "react"
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
    cellIndex: number
    focus: boolean
}
export default function PlaygroundCell({ worker, cellIndex: cellIndex, focus }: CellProps) {
    const [outputs, setOutputs] = useState<OutputMessage[]>([])
    const [waitingForResult, setWaitingForResult] = useState(false)
    const [input, setInput] = useState("")
    const { mode } = useTheme()
    const [_, isMobile] = usePlatform()

    useEffect(() => {
        const onWorkerMessage: MessageHandler = ({ data }: MessageEvent<OutputMessage>) => {
            if (cellIndex !== data.cellIndex) {
                return // Ignore messages sent to other cells
            }
            setOutputs((prev) => [...prev, data])
            setWaitingForResult(false)
        }
        worker.addEventListener("message", onWorkerMessage)
        return () => worker.removeEventListener("message", onWorkerMessage)
    }, [worker, cellIndex])

    const sendCodeToWorker = () => {
        const payload = input.trim()
        if (payload) {
            worker.postMessage({ type: "eval-request", payload, cellIndex } satisfies InputMessage)
            setWaitingForResult(true)
        }
    }

    const handleCtrlEnter = () => {
        sendCodeToWorker()
        return true
    }

    const numbers = new Map<OutputMessageType, number>()
    const labels = outputs.map(({ type }) => {
        const number = numbers.get(type) || 1
        const label = type2AreaInfo[type].label
        numbers.set(type, number + 1)
        return `${label}${number}`
    })

    const customKeymap = Prec.high(
        keymap.of([
            {
                key: "Ctrl-Enter",
                mac: "Cmd-Enter",
                run: handleCtrlEnter,
            },
            {
                key: "Tab",
                run: acceptCompletion,
            },
        ]),
    )

    const customExtensions = [
        basicSetup({
            lineNumbers: false,
            tabSize: 4,
            highlightActiveLine: false,
        }),
        autocompletion(),
        javascript({
            typescript: true,
            jsx: false,
        }),
        customKeymap,
    ]

    return (
        <div className="flex flex-row gap-0 w-full">
            <div className="border border-r-0 w-3.5 border-muted" />
            <div className="py-3 grow flex flex-col gap-0">
                <div className="text-xs pt-0 pb-1.5 text-muted-foreground">INPUT {cellIndex}</div>
                <CodeMirror
                    className="border border-gray-200 dark:border-gray-700"
                    value={input}
                    onChange={setInput}
                    autoFocus={true}
                    onCreateEditor={(editor) => {
                        // This makes new editors both focus and scroll into view
                        editor.focus()
                        editor.dom.scrollIntoView()
                    }}
                    basicSetup={false}
                    theme={mode === "dark" ? githubDark : githubLight}
                    extensions={customExtensions}
                />
                {isMobile && (
                    <div className="flex flex-row justify-end mt-2">
                        <Button
                            variant="secondary"
                            onClick={sendCodeToWorker}
                            disabled={input.trim() === ""}
                        >
                            <Play /> Run
                        </Button>
                    </div>
                )}

                {outputs.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2">
                        <div className="text-xs pt-2 pb-0 text-muted-foreground">
                            OUTPUT {cellIndex}
                        </div>
                        {outputs.map(({ type, payload }, j) => {
                            const { component: AreaComponent } = type2AreaInfo[type]
                            const pload = getConversionFunc(type).call(undefined, payload)
                            return (
                                <div
                                    key={`${cellIndex}:${j}`}
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
                        <LoaderIcon className="animate-spin text-primary" />
                    </div>
                )}
            </div>
        </div>
    )
}
