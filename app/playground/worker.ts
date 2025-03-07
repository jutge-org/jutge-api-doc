"use client"

import { JutgeApiClient } from "@/lib/jutge_api_client"
import ts from "typescript"

const jutgeInstance = new JutgeApiClient()

let last: any = undefined

export type InputMessageType = "eval-request" | "input-result"
export type OutputMessageType = "eval-result" | "input-request" | "print" | "chart" | "error"

export type InputMessage = {
    type: InputMessageType
    payload: any
    cellIndex?: number
}

export type OutputMessage = {
    type: OutputMessageType
    payload: any
    cellIndex?: number
}

export type MessageHandler = ({ data }: MessageEvent<OutputMessage>) => void

type InputContinuationParam = string | null | PromiseLike<string | null>
type InputContinuationFunc = (value: InputContinuationParam) => void
let inputContinuation: InputContinuationFunc | null = null

const setInputContinuation = (continuation: InputContinuationFunc) => {
    if (inputContinuation !== null) {
        console.error("Oops, inputContinuation should be null!")
    }
    inputContinuation = continuation
}

const callInputContinuation = (info: InputContinuationParam) => {
    if (inputContinuation === null) {
        return console.error("inputResolver is null")
    }
    inputContinuation(info)
    inputContinuation = null
}

// Set the type of the first parameter to check for errors
const postMessage = (message: OutputMessage) => {
    self.postMessage(message)
}

async function evaluate(ts_code: string, cellIndex?: number): Promise<OutputMessage> {
    try {
        const js_code = ts.transpile(ts_code, {
            target: ts.ScriptTarget.ES5,
            lib: ["dom"],
            module: ts.ModuleKind.CommonJS,
        })
        const asyncCode = (0, eval)(
            `(async function(login, input, print, chart, j, last, JutgeApiClient) { ${js_code} \n })`,
        )
        last = await asyncCode(
            loginFunc,
            inputFunc,
            printFunc(cellIndex),
            chartFunc(cellIndex),
            jutgeInstance,
            last,
            JutgeApiClient,
        )
        return { type: "eval-result", payload: last }
    } catch (err) {
        if (err instanceof Error) {
            return { type: "error", payload: err.message }
        } else {
            return { type: "error", payload: JSON.stringify(err) }
        }
    }
}

async function loginFunc(): Promise<boolean> {
    const email = await inputFunc("Enter your email:")
    if (email == null) return false
    const password = await inputFunc("Enter your password:", true)
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
    postMessage({
        type: "input-request",
        payload: { message, passwordMode },
    })

    return new Promise<string | null>((resolve) => {
        setInputContinuation(resolve)
    })
}

const printFunc = (cellIndex?: number) => (x: any) => 
    postMessage({ type: "print", payload: x, cellIndex })


const chartFunc = (cellIndex?: number) => (x: any) =>
    postMessage({ type: "chart", payload: x, cellIndex })

self.addEventListener("message", async (e: MessageEvent<InputMessage>) => {
    const { type, payload, cellIndex } = e.data
    switch (type) {
        case "eval-request": {
            const result = await evaluate(payload, cellIndex)
            postMessage({ ...result, cellIndex })
            break
        }
        case "input-result": {
            callInputContinuation(payload)
            break
        }
        default:
            console.error(`unknown action ${type} (${payload})`)
    }
})

console.log("Worker loaded")

export {}
