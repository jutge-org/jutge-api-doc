"use client"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { InputDialog } from "@/components/ui/input-dialog"
import type { Message } from "@/lib/worker"
import { Editor } from "@monaco-editor/react"
import { LoaderIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Bar, BarChart } from "recharts"

type Cell = {
    input: string
    outputs: any[]
    error?: string
}

export default function PlaygroundPage() {
    const [cells, setCells] = useState<Cell[]>([])
    const [pingSent, setPingSent] = useState(false)
    const [ready, setReady] = useState(false)
    const [evalCellIndex, setEvalCellIndex] = useState<number>(-1)
    const [scroll, setScroll] = useState(false)

    // input dialog vars
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isPasswordMode, setIsPasswordMode] = useState(false)
    const [prompt, setPrompt] = useState<string>("Please enter a string value")

    const workerRef = useRef(newWorker())
    const editorRef = useRef(null)

    // send a ping to startup the worker, because it is damm slow
    useEffect(() => {
        if (!window.Worker) return
        if (pingSent) return
        setPingSent(true)
        sendToWorker({ type: "ping", info: "" })
    }, [pingSent])

    // when cells change, scroll to bottom of page
    useEffect(() => {
        setScroll(false)
        setTimeout(
            // did not work without timeout. I guess some rendering is still waiting?
            () => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                })
            },
            100,
        )
    }, [scroll])

    // receive messages from worker
    useEffect(() => {
        //

        function receivePong(message: Message) {
            reset()
            setReady(true)
        }

        function receiveData(message: Message) {
            setScroll(true)
            setCells((oldCells) => {
                const newCells = [...oldCells]
                newCells[evalCellIndex].outputs.push(message)
                return newCells
            })
        }

        function receiveEval(message: Message) {
            setScroll(true)
            setReady(true)
            setCells((oldCells) => {
                const newCells = [...oldCells]
                if (message.type !== "eval" || message.info !== undefined) {
                    newCells[evalCellIndex].outputs.push(message)
                }
                newCells.push({ input: "", outputs: [] })
                return newCells
            })
        }

        function receiveInput(message: Message) {
            setPrompt(message.info.message)
            setIsPasswordMode(message.info.passwordMode)
            setIsDialogOpen(true)
        }

        if (!window.Worker) return
        const worker = workerRef.current
        if (!worker) return
        worker.onmessage = (e: MessageEvent<Message>) => {
            console.log("received", e.data)
            switch (e.data.type) {
                case "pong":
                    return receivePong(e.data)

                case "print":
                case "chart":
                    return receiveData(e.data)

                case "eval":
                case "error":
                    return receiveEval(e.data)

                case "input":
                    return receiveInput(e.data)
            }
        }
    }, [workerRef, evalCellIndex])

    const handleCloseDialog = (info: string | null) => {
        setIsDialogOpen(false)
        sendToWorker({ type: "input", info })
    }

    function handleEditorDidMount(editor: any, monaco: any, i: number) {
        editorRef.current = editor
        editor.focus()
        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, // Ctrl+Enter or Cmd+Enter
            function () {
                run(i)
            },
        )
        // https://stackoverflow.com/questions/78646558/is-it-possible-to-wrap-the-code-that-is-sent-for-validation-in-the-monaco-editor
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            diagnosticCodesToIgnore: [1108, 2304, 1375, 1378, 2554],
        })
        if (i != cells.length - 1) {
            // editor.setPosition({ lineNumber: 1, column: 1 })
        }
    }

    function newWorker() {
        try {
            return new Worker(new URL("@/lib/worker.ts", import.meta.url))
        } catch (e) {
            return null
        }
    }

    function onChange(value: string, i: number) {
        setCells((prev) => {
            const copy = [...prev]
            copy[i].input = value
            return copy
        })
    }

    function reset() {
        setCells([{ input: "", outputs: [] }])
    }

    async function run(cellIndex: number) {
        setEvalCellIndex(cellIndex)
        setReady(false)
        sendToWorker({ type: "eval", info: cells[cellIndex].input })
    }

    function sendToWorker(message: Message) {
        const worker = workerRef.current
        if (!worker) return
        worker.postMessage(message)
    }

    function height(code: string) {
        const lines = Math.max(Math.min(code.split("\n").length, 15), 1)
        return `${lines * 18}px`
    }

    const playground = (
        <>
            <div className="flex flex-col gap-0">
                {cells.map((cell, i) => (
                    <div key={i} className="">
                        <div key={i} className="flex flex-col gap-0">
                            <div className="text-xs pt-2 pb-2">Input {i + 1}</div>
                            <div className={`ml-6`}>
                                <div
                                    className={`border-spacing-2 rounded-lg ${ready && i == cells.length - 1 ? "border-gray-600 border-4" : "border-gray-100 border-2"} p-2`}
                                >
                                    <Editor
                                        theme="vs-light"
                                        defaultLanguage="typescript"
                                        defaultValue=""
                                        height={
                                            i == cells.length - 1 ? "100px" : height(cells[i].input)
                                        }
                                        options={{
                                            minimap: { enabled: false },
                                            lineNumbers: "off",
                                            glyphMargin: false,
                                            folding: false,
                                            // https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
                                            // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
                                            lineDecorationsWidth: 0,
                                            lineNumbersMinChars: 0,
                                            renderLineHighlight: "none",
                                            readOnly: i != cells.length - 1,
                                        }}
                                        onChange={(value, event) => onChange(value || "", i)}
                                        onMount={(editor, monaco) =>
                                            handleEditorDidMount(editor, monaco, i)
                                        }
                                    />
                                </div>
                            </div>

                            {cell.outputs.length != 0 && (
                                <div className="flex flex-col gap-2">
                                    <div className="text-xs pt-2 pb-2">Output {i + 1}</div>

                                    {cell.outputs.map((output, j) => (
                                        <OutputArea key={`${i}:${j}`} output={output} index={j} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

    const top = (
        <>
            <h1 className="pb-4">Playground</h1>

            <p className="text-xs pb-2">Help</p>
            <div className="pl-6 pb-0">
                <div className="border-spacing-2 rounded-lg border-gray-100 border-2 p-2 ">
                    <Help />
                </div>
            </div>
        </>
    )

    const dialog = (
        <InputDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            title={isPasswordMode ? "Input password" : "Input text"}
            description={prompt}
            isPassword={isPasswordMode}
        />
    )

    return (
        <div className="px-4 flex flex-col">
            {top}
            {playground}
            {!ready && (
                <div className="pl-8 pt-4 pb-32">
                    <LoaderIcon className="animate-spin text-red-500" />
                </div>
            )}
            <div className="mb-16" />
            {dialog}
        </div>
    )
}

function OutputArea({ output, index }: { output: Message; index: number }) {
    const label: Record<string, string> = {
        print: "P",
        chart: "C",
        eval: "R",
        error: "E",
    }

    const text =
        typeof output.info === "string" ? output.info : JSON.stringify(output.info, null, 4)

    const lines = Math.min(Math.max(text.split("\n").length, 1), 15)

    let content = (
        <div className="grow">
            <div
                className={`border-spacing-2 rounded-lg ${output.type == "error" ? "border-red-500" : "border-gray-100"} border-2 p-2`}
            >
                <Editor
                    theme="vs-light"
                    defaultLanguage="json"
                    defaultValue={text}
                    height={`${lines * 18}px`}
                    options={{
                        minimap: { enabled: false },
                        lineNumbers: "off",
                        glyphMargin: false,
                        folding: false,
                        // https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
                        // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 0,
                        renderLineHighlight: "none",
                        readOnly: true,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>
    )

    if (output.type === "chart") {
        const chartData: { x: number; y: number }[] = []
        for (let i = 0; i < output.info.length; i++) {
            chartData.push({ x: i, y: output.info[i] })
        }

        const chartConfig = {} satisfies ChartConfig

        content = (
            <div className="border-spacing-2 rounded-lg border-gray-100 border-2 p-2">
                <ChartContainer config={chartConfig} className="min-h-[150px] max-w-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <Bar dataKey="y" fill="var(--color-chart-1)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
        )
    }

    return (
        <div className="pl-6 w-full flex flex-row gap-4">
            <div className="pt-2 w-8 text-xs text-left text-gray-800">
                {`[${label[output.type]}${index + 1}]`}
            </div>
            {content}
        </div>
    )
}

function Help() {
    return (
        <div className="text-sm prose prose-code:before:hidden prose-code:after:hidden max-w-none">
            <ul>
                <li>
                    Use <kbd>⌘⏎</kbd> or <kbd>^⏎</kbd> to run the code of the last cell.
                </li>
                <li>
                    Use <code>return</code> to return a result and use <code>last</code> to use the
                    last returned value.
                </li>
                <li>
                    Available objects:
                    <ul>
                        <li>
                            <code>j</code>: variable with a <code>new JutgeApiClient()</code>{" "}
                            object.
                        </li>
                        <li>
                            <code>input</code>: async function that reads a string and returns it.
                        </li>
                        <li>
                            <code>print</code>: async function that prints an object (do not use
                            console.log!).
                        </li>
                        <li>
                            <code>chart</code>: async function that charts a list of numbers.
                        </li>
                        <li>
                            <code>login</code>: async function that asks email and password and logs
                            the <code>j</code> Jutge client in.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
