'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { JutgeApiClient } from '@/lib/jutge_api_client'
import Editor from '@monaco-editor/react'
import { useRef, useState } from 'react'
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
    const editorRef = useRef(null)

    function openHelp() {
        setIsHelpOpen(true)
    }

    function closeHelp() {
        setIsHelpOpen(false)
    }

    function reset() {
        setCells([{ input: '', output: undefined, error: null }])
    }

    async function run(i: number) {
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

    function onChange(value: string, i: number) {
        setCells((prev) => {
            const copy = [...prev]
            copy[i].input = value
            return copy
        })
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
            diagnosticCodesToIgnore: [1108, 2304],
        })
    }

    function heightOf(cell: Cell) {
        const lines = cell.input.split('\n').length
        const height = Math.min(64, Math.max(12, (lines + 1) * 6))
        console.log('height', height, lines)
        return height
    }

    if (typeof window !== 'undefined') {
        window.JutgeApiClient = JutgeApiClient
        window.j = new JutgeApiClient()
    }

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

    const notebook = (
        <div className="flex flex-col gap-0">
            {cells.map((cell, i) => (
                <div key={i} className="">
                    <div key={i} className="flex flex-col gap-0">
                        <div className="text-xs pt-6 pb-2">Input {i + 1}</div>
                        <div
                            className={`ml-6 h-24 text-sm border-spacing-2 rounded-lg ${i == cells.length - 1 ? 'border-gray-600 border-4' : 'border-gray-100 border-2'} p-2`}
                        >
                            <Editor
                                theme="vs-light"
                                defaultLanguage="typescript"
                                defaultValue=""
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

                        {cell.output !== undefined && (
                            <>
                                <div className="text-xs pt-4 pb-2">Output {i + 1}</div>
                                <div className="ml-6 h-36 border-spacing-2 rounded-lg border-gray-100 border-2 p-2">
                                    <Editor
                                        theme="vs-light"
                                        defaultLanguage="json"
                                        defaultValue={JSON.stringify(cell.output, null, 4)}
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
                            </>
                        )}

                        {cell.error !== null && (
                            <>
                                <div className="text-xs pt-4 pb-2">Error {i + 1}</div>
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

    return (
        <div className="px-4 flex flex-col">
            {top}
            {notebook}
        </div>
    )
}
