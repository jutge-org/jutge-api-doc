'use client'

import ts from 'typescript'
import { JutgeApiClient } from './jutge_api_client'

export type InputMessage = {
    type: string
    info: string
}

export type OutputMessage = {
    type: string
    info: any
}

self.onmessage = async (event: MessageEvent<InputMessage>) => {
    const inputMsg = event.data
    console.log('worker received message', inputMsg)
    if (inputMsg.type === 'ping') {
        self.postMessage({ type: 'pong', info: null })
    } else if (inputMsg.type === 'eval') {
        const result = await evaluate(inputMsg.info)
        self.postMessage(result)
    } else {
        console.error('unknown action', inputMsg.type)
    }
}

async function evaluate(ts_code: string): Promise<OutputMessage> {
    const js_code = ts.transpile(ts_code, {
        target: ts.ScriptTarget.ES5,
        lib: ['dom'],
        module: ts.ModuleKind.CommonJS,
    })
    try {
        const asyncCode = (0, eval)(
            ' (async function(print, chart, j, last, JutgeApiClient) {' + js_code + '\n})',
        )
        last = await asyncCode(printFunc, chartFunc, jutgeInstance, last, JutgeApiClient)
        return { type: 'eval', info: last }
    } catch (err) {
        if (err instanceof Error) {
            return { type: 'error', info: err.message }
        } else {
            return { type: 'error', info: JSON.stringify(err) }
        }
    }
}

function printFunc(x: any) {
    self.postMessage({ type: 'print', info: x })
}

function chartFunc(x: any) {
    self.postMessage({ type: 'chart', info: x })
}

const jutgeInstance = new JutgeApiClient()

let last: any = undefined

export {}
