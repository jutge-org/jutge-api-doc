'use client'

import ts from 'typescript'
import { JutgeApiClient } from './jutge_api_client'

export type Message = {
    type: string
    info: any
}

let inputResolver: null | ((value: string | null | PromiseLike<string | null>) => void) = null

self.onmessage = async (event: MessageEvent<Message>) => {
    const inputMsg = event.data
    if (inputMsg.type === 'ping') {
        self.postMessage({ type: 'pong', info: null })
    } else if (inputMsg.type === 'eval') {
        const result = await evaluate(inputMsg.info)
        self.postMessage(result)
    } else if (inputMsg.type === 'input') {
        if (inputResolver === null) return console.error('inputResolver is null')
        inputResolver(inputMsg.info)
        inputResolver = null
    } else {
        console.error('unknown action', inputMsg.type)
    }
}

async function evaluate(ts_code: string): Promise<Message> {
    try {
        const js_code = ts.transpile(ts_code, {
            target: ts.ScriptTarget.ES5,
            lib: ['dom'],
            module: ts.ModuleKind.CommonJS,
        })
        const asyncCode = (0, eval)(
            ' (async function(login, input, print, chart, j, last, JutgeApiClient) {' +
                js_code +
                '\n})',
        )
        last = await asyncCode(
            loginFunc,
            inputFunc,
            printFunc,
            chartFunc,
            jutgeInstance,
            last,
            JutgeApiClient,
        )
        return { type: 'eval', info: last }
    } catch (err) {
        if (err instanceof Error) {
            return { type: 'error', info: err.message }
        } else {
            return { type: 'error', info: JSON.stringify(err) }
        }
    }
}

async function loginFunc(): Promise<boolean> {
    const email = await inputFunc('Enter your email:')
    if (email == null) return false
    const password = await inputFunc('Enter your password:', true)
    if (password == null) return false
    try {
        await jutgeInstance.login({ email, password })
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

async function inputFunc(message: string, passwordMode: boolean = false): Promise<string | null> {
    self.postMessage({
        type: 'input',
        info: {
            message,
            passwordMode,
        },
    })
    if (inputResolver !== null) {
        console.error('oops, inputResolver should be null')
        return ''
    }
    return new Promise<string | null>((resolve) => {
        inputResolver = resolve
    })
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
