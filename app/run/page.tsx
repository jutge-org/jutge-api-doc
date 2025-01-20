'use client'

import { Button } from '@/components/ui/button'
import { JutgeApiClient } from '@/lib/jutge_api_client'
import ReactJsonView from '@microlink/react-json-view'
import { useState } from 'react'
import AceEditor from 'react-ace'
import * as ts from 'typescript'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-typescript'

const sample = `
const j = new JutgeApiClient()
pr(2 * 3)
pr(await j.misc.getTime())
pr(await j.misc.getFortune())
pr((await j.tables.getCompilers())["Python3"])
`

export default function Page() {
    const [code, setCode] = useState(sample)
    const [output, setOutput] = useState<any[]>([])
    const [layout, setLayout] = useState<'row' | 'col'>('col')

    function onChange(newValue: string) {
        setCode(newValue)
    }

    function pr(item: any) {
        setOutput((prev) => [...prev, item])
    }

    window.JutgeApiClient = JutgeApiClient
    window.pr = pr

    function run() {
        const program = `(async () => { ${code} })()`
        const js = ts.transpile(program, {
            target: ts.ScriptTarget.ES5,
            lib: ['dom'],
            module: ts.ModuleKind.CommonJS,
        })
        eval(js)
    }

    function clear() {
        setOutput([])
    }

    function flip() {
        setLayout(layout === 'row' ? 'col' : 'row')
    }

    const ace = (
        <div className="w-full h-full bg-gray-100 border rounded-md font-mono">
            <AceEditor
                mode="javascript"
                theme="github"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                showPrintMargin={false}
                value={code}
                width="100%"
                height="100%"
                className="w-full h-full rounded-md"
                fontSize={14}
                tabSize={4}
            />
        </div>
    )

    const buttons = (
        <div className="flex flex-row gap-2 justify-end">
            <Button className="w-24" onClick={run}>
                Run
            </Button>
            <Button className="w-24" onClick={clear}>
                Clear
            </Button>
            <Button className="w-24" onClick={flip}>
                Flip layout
            </Button>
        </div>
    )

    const result = (
        <div className="w-full h-full overflow-auto">
            <div className="flex flex-col gap-1">
                {output.map((data, i) => (
                    <div key={i} className="font-mono text-xs border rounded-md p-2">
                        {typeof data === 'object' ? (
                            <ReactJsonView src={data} displayDataTypes={false} />
                        ) : (
                            data
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

    if (layout === 'col') {
        return (
            <div className="w-full h-full flex flex-1 flex-col gap-2 p-4 pt-0">
                {buttons}
                {ace}
                {result}
            </div>
        )
    } else {
        return (
            <div className="w-full h-full flex flex-1 flex-col gap-2 p-4 pt-0">
                {buttons}
                <div className="w-full h-full flex flex-1 flex-row gap-2">
                    {ace}
                    {result}
                </div>
            </div>
        )
    }
}
