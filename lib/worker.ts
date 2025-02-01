'use client'

import ts from 'typescript'

export type InputMessage = {
    type: string
    info: string
}

export type PongMessage = {
    type: 'pong'
}

export type EvalMessage = {
    type: 'eval'
    out?: any
    err?: any
}

export type OutputMessage = EvalMessage | PongMessage

self.onmessage = async (event: MessageEvent<InputMessage>) => {
    const message = event.data
    console.log('worker received message', message)
    if (message.type === 'eval') {
        self.postMessage(await evaluate(message.info))
    } else if (message.type === 'ping') {
        self.postMessage({ type: 'pong' })
    } else {
        console.error('unknown action', message.type)
    }
}

async function evaluate(ts_code: string): Promise<OutputMessage> {
    const js_code = ts.transpile(ts_code, {
        target: ts.ScriptTarget.ES5,
        lib: ['dom'],
        module: ts.ModuleKind.CommonJS,
    })
    try {
        const out = await (0, eval)(js_code)
        return { type: 'eval', out }
    } catch (err) {
        if (err instanceof Error && /await is only valid in async/.test(err.message)) {
            console.log('async detected')
            const asyncCode = (0, eval)(' (async function() {' + ts_code + '\n})')
            try {
                const out = await asyncCode()
                return { type: 'eval', out }
            } catch (err) {
                if (err instanceof Error) {
                    return { type: 'eval', err: err.message }
                } else {
                    return { type: 'eval', err: JSON.stringify(err) }
                }
            }
        }
        if (err instanceof Error) {
            return { type: 'eval', err: err.message }
        } else {
            return { type: 'eval', err: JSON.stringify(err) }
        }
    }
}

export {}
