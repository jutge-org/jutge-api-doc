'use client'

import { Button } from '@/components/ui/button'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { InputMessage, OutputMessage } from '@/lib/worker'
import { Editor } from '@monaco-editor/react'
import { LoaderIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Bar, BarChart } from 'recharts'

type Cell = {
    input: string
    outputs: any[]
    error?: string
}

export default function NotebookPage() {
    const [cells, setCells] = useState<Cell[]>([
        /*
        {
            input: 'foo',
            outputs: [
                { type: 'print', info: 1 },
                { type: 'print', info: 2 },
                { type: 'eval', info: 3 },
                { type: 'error', info: 4 },
            ],
        },
        */
    ])
    const [pingSent, setPingSent] = useState(false)
    const [ready, setReady] = useState(false)
    const [evalCellIndex, setEvalCellIndex] = useState<number>(-1)
    const [isHelpOpen, setIsHelpOpen] = useState(false)
    const workerRef = useRef(mkWorker())
    const editorRef = useRef(null)

    // send a ping to startup the worker, because it is damm slow
    useEffect(() => {
        if (!window.Worker) return
        if (pingSent) return
        setPingSent(true)
        sendToWorker({ type: 'ping', info: '' })
    }, [pingSent])

    // receive messages from worker
    useEffect(() => {
        //

        function receivePong(message: InputMessage) {
            reset()
            setReady(true)
        }

        function receiveData(message: InputMessage) {
            setCells((oldCells) => {
                const newCells = [...oldCells]
                newCells[evalCellIndex].outputs.push(message)
                return newCells
            })
        }

        function receiveEval(message: InputMessage) {
            setReady(true)
            setCells((oldCells) => {
                const newCells = [...oldCells]
                if (message.type !== 'eval' || message.info !== undefined) {
                    newCells[evalCellIndex].outputs.push(message)
                }
                newCells.push({ input: '', outputs: [] })
                return newCells
            })
        }

        if (!window.Worker) return
        const worker = workerRef.current
        if (!worker) return
        worker.onmessage = (e: MessageEvent<OutputMessage>) => {
            console.log('master received message', e.data)
            switch (e.data.type) {
                case 'pong':
                    return receivePong(e.data)
                case 'print':
                case 'chart':
                    return receiveData(e.data)
                case 'eval':
                case 'error':
                    return receiveEval(e.data)
            }
        }
    }, [workerRef, evalCellIndex])

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
    }

    function mkWorker() {
        try {
            return new Worker(new URL('@/lib/worker.ts', import.meta.url))
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
        setCells([{ input: '', outputs: [] }])
    }

    function openHelp() {
        setIsHelpOpen(true)
    }

    function closeHelp() {
        setIsHelpOpen(false)
    }

    async function run(cellIndex: number) {
        setEvalCellIndex(cellIndex)
        setReady(false)
        sendToWorker({ type: 'eval', info: cells[cellIndex].input })
    }

    function sendToWorker(message: InputMessage) {
        const worker = workerRef.current
        if (!worker) return
        console.log('master sending message', message)
        worker.postMessage(message)
    }

    const notebook = (
        <div className="flex flex-col gap-0">
            {cells.map((cell, i) => (
                <div key={i} className="">
                    <div key={i} className="flex flex-col gap-0">
                        <div className="text-xs pt-2 pb-2">Input {i + 1}</div>
                        <div className={`ml-6 h-32`}>
                            <div
                                className={`border-spacing-2 rounded-lg ${ready && i == cells.length - 1 ? 'border-gray-600 border-4' : 'border-gray-100 border-2'} p-2`}
                            >
                                <Editor
                                    theme="vs-light"
                                    defaultLanguage="typescript"
                                    defaultValue=""
                                    height={'100px'}
                                    options={{
                                        minimap: { enabled: false },
                                        lineNumbers: 'off',
                                        glyphMargin: false,
                                        folding: false,
                                        // https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
                                        // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
                                        lineDecorationsWidth: 0,
                                        lineNumbersMinChars: 0,
                                        renderLineHighlight: 'none',
                                        readOnly: i != cells.length - 1,
                                    }}
                                    onChange={(value, event) => onChange(value || '', i)}
                                    onMount={(editor, monaco) =>
                                        handleEditorDidMount(editor, monaco, i)
                                    }
                                />
                            </div>
                        </div>

                        {cell.outputs.length != 0 && (
                            <div className="flex flex-col gap-2">
                                <div className="text-xs pt-0 pb-2">Output {i + 1}</div>

                                {cell.outputs.map((output, j) => (
                                    <OutputArea key={`${i}:${j}`} output={output} index={j} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )

    const top = (
        <div className="flex flex-row gap-4 pb-4">
            <Button onClick={reset}>Reset</Button>

            <Button onClick={openHelp}>Help</Button>

            <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                <DialogContent aria-describedby={undefined}>
                    <DialogTitle>Help</DialogTitle>
                    <p>
                        Use <kbd>⌘⏎</kbd> or <kbd>^⏎</kbd> to run the code of the last cell.
                    </p>
                    <p>
                        Use <code>j</code> variable to get a <code>JutgeApiClient</code> object. Or
                        use <code>new JutgeApiClient()</code> to create a new instance.
                    </p>
                    <p>
                        Use <code>print()</code> to print a value. Use <code>return</code> to return
                        a result and use `last` to use the last returned value.
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    )

    return (
        <div className="px-4 flex flex-col">
            {top}
            {notebook}
            {!ready && (
                <div className="pl-8 pt-4 pb-32">
                    <LoaderIcon className="animate-spin text-red-500" />
                </div>
            )}
            <div className="mb-16" />
        </div>
    )
}

function OutputArea({ output, index }: { output: OutputMessage; index: number }) {
    const label: Record<string, string> = {
        print: 'P',
        chart: 'C',
        eval: 'R',
        error: 'E',
    }

    let content = (
        <div className="grow h-18">
            <div
                className={`border-spacing-2 rounded-lg ${output.type == 'error' ? 'border-red-500' : 'border-gray-100'} border-2 p-2`}
            >
                <Editor
                    theme="vs-light"
                    defaultLanguage="json"
                    defaultValue={JSON.stringify(output.info, null, 4)}
                    height={'80px'}
                    options={{
                        minimap: { enabled: false },
                        lineNumbers: 'off',
                        glyphMargin: false,
                        folding: false,
                        // https://stackoverflow.com/questions/53448735/is-there-a-way-to-completely-hide-the-gutter-of-monaco-editor
                        // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
                        lineDecorationsWidth: 0,
                        lineNumbersMinChars: 0,
                        renderLineHighlight: 'none',
                        readOnly: true,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>
    )

    if (output.type === 'chart') {
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
