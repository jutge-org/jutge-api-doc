'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Button } from '@/components/ui/button'
import { JutgeApiClient } from '@/lib/jutge_api_client'
import ts from 'typescript'

declare global {
    interface Window {
        JutgeApiClient: any
        j: JutgeApiClient
    }
}

type Cell = {
    input: string
    output: any
    error: string | null
}

export default function NotebookPage() {
    const [cells, setCells] = useState<Cell[]>([{ input: '', output: undefined, error: null }])
    const [isHelpOpen, setIsHelpOpen] = useState(false)

    function openHelp() {
        setIsHelpOpen(true)
    }

    function closeHelp() {
        setIsHelpOpen(false)
    }

    function reset() {
        setCells([{ input: '', output: undefined, error: null }])
    }

    async function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>, i: number) {
        if (e.key === 'Enter' && i === cells.length - 1 && e.metaKey) {
            e.preventDefault()
            const cell = cells[i]
            let error = null
            let output = null
            const user_code = cell.input
            // const ts_code = `(async () => { ${user_code} })()`
            const ts_code = user_code
            try {
                const js_code = ts.transpile(ts_code, {
                    target: ts.ScriptTarget.ES5,
                    lib: ['dom'],
                    module: ts.ModuleKind.CommonJS,
                })
                // output = await eval?.(js_code)
                output = await Object.getPrototypeOf(async function () {}).constructor(user_code)()
                console.log('output', output)
            } catch (e) {
                error = e instanceof Error ? e.message : 'Error'
                output = undefined
            }
            setCells((prev) => {
                const copy = [...prev]
                copy[i].output = output
                copy[i].error = error
                return copy
            })
            setCells((prev) => [...prev, { input: '', output: undefined, error: null }])
        }
    }

    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>, i: number) {
        const value = e.target.value
        setCells((prev) => {
            const copy = [...prev]
            copy[i].input = value
            return copy
        })
    }

    if (typeof window !== 'undefined') {
        window.JutgeApiClient = JutgeApiClient
        window.j = new JutgeApiClient()
    }

    return (
        <div className="p-4 pt-0 flex flex-col h-full">
            <>
                <div className="flex flex-row gap-4 pb-4">
                    <Button onClick={reset}>Reset</Button>

                    <Button onClick={openHelp}>Help</Button>

                    <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                        <DialogContent aria-describedby={undefined}>
                            <DialogTitle>Help</DialogTitle>
                            <p>
                                Use <code>j</code> variable to get a <code>JutgeApiClient</code>{' '}
                                object. Or use <code>new JutgeApiClient()</code> to create a new
                                instance.
                            </p>
                            <p>
                                Use <kbd>⌘⏎</kbd> to run the code of the last cell.
                            </p>
                            <p>
                                Use <code>return</code> to provide a result.
                            </p>
                        </DialogContent>
                    </Dialog>
                </div>
                {cells.map((cell, i) => (
                    <div key={i} className="pb-4">
                        <span className="text-xs">Input {i + 1}</span>
                        <AutosizeTextarea
                            className="w-full h-8 font-mono bg-gray-100"
                            defaultValue={cell.input}
                            readOnly={i < cells.length - 1}
                            onKeyDown={(e) => onKeyDown(e, i)}
                            onChange={(e) => onChange(e, i)}
                            autoFocus={i === cells.length - 1}
                            maxHeight={200}
                        />
                        {cell.output !== undefined && (
                            <>
                                <span className="text-xs">Output {i + 1}</span>
                                <pre className="w-full max-h-96 font-mono text-sm border bg-gray-100 rounded-md p-2 ">
                                    {JSON.stringify(cell.output, null, 4)}
                                </pre>
                            </>
                        )}
                        {cell.error !== null && (
                            <>
                                <span className="text-xs">Error {i + 1}</span>
                                <pre className="w-full max-h-96 font-mono text-sm border bg-gray-100 rounded-md p-2 text-red-500">
                                    {cell.error}
                                </pre>
                            </>
                        )}
                    </div>
                ))}
            </>
        </div>
    )
}
