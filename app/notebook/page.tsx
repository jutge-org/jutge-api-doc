'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { EvalMessage, InputMessage, OutputMessage, PongMessage } from '@/lib/worker'
import { LoaderIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Cell = {
    input: string
    output?: any
    error?: string
}

export default function NotebookPage() {
    const [cells, setCells] = useState<Cell[]>([])
    const [pingSent, setPingSent] = useState(false)
    const [ready, setReady] = useState(false)
    const [evalCellIndex, setEvalCellIndex] = useState<number>(-1)
    const [isHelpOpen, setIsHelpOpen] = useState(false)
    const workerRef = useRef(mkWorker())

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

        function receivePong(message: PongMessage) {
            reset()
            setReady(true)
        }

        function receiveEval(message: EvalMessage) {
            setReady(true)
            setCells((prev) => {
                const copy = [...prev]
                copy[evalCellIndex].output = message.out
                copy[evalCellIndex].error = message.err
                copy.push({ input: '' })
                return copy
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
                case 'eval':
                    return receiveEval(e.data)
            }
        }
    }, [workerRef, evalCellIndex])

    function mkWorker() {
        try {
            return new Worker(new URL('@/lib/worker.ts', import.meta.url))
        } catch (e) {
            return null
        }
    }

    async function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>, i: number) {
        if (!ready) return
        if (e.key === 'Enter' && i === cells.length - 1 && e.metaKey) {
            await run(i)
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
        setCells([{ input: '' }])
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
                        <div className={`ml-6 h-20`}>
                            <div
                                className={`border-spacing-2 rounded-lg ${ready && i == cells.length - 1 ? 'border-gray-600 border-4' : 'border-gray-100 border-2'}`}
                            >
                                <Textarea
                                    className="h-full w-full border-0  text-sm font-mono"
                                    id={`input_${i}`}
                                    defaultValue={cell.input}
                                    readOnly={i < cells.length - 1}
                                    onKeyDown={(e) => onKeyDown(e, i)}
                                    onChange={(e) => onChange(e.target.value, i)}
                                    autoFocus={ready && i === cells.length - 1}
                                />
                            </div>
                        </div>

                        {cell.output !== undefined && (
                            <>
                                <div className="text-xs pt-0 pb-2">Output {i + 1}</div>
                                <div className="ml-6 h-20">
                                    <div className="border-spacing-2 rounded-lg border-gray-100 border-2">
                                        <Textarea
                                            className="h-full w-full border-0  text-sm font-mono"
                                            id={`output_${i}`}
                                            defaultValue={JSON.stringify(cell.output, null, 4)}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        {cell.error !== undefined && (
                            <>
                                <div className="text-xs pt-0 pb-2">Error {i + 1}</div>
                                <pre className="ml-6 max-h-64 font-mono text-sm border bg-gray-100 rounded-md p-2 text-red-500">
                                    {cell.error}
                                </pre>
                            </>
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
                        Use <code>j</code> variable to get a <code>JutgeApiClient</code> object. Or
                        use <code>new JutgeApiClient()</code> to create a new instance.
                    </p>
                    <p>
                        Use <kbd>⌘⏎</kbd> or <kbd>^⏎</kbd> to run the code of the last cell.
                    </p>
                    <p>
                        Use <code>return</code> to provide a result.
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
            <div id="end" autoFocus={!ready} />
        </div>
    )
}
