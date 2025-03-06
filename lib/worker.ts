"use client"

import ts from "typescript"
import { JutgeApiClient } from "./jutge_api_client"

export type InputMessageType = "eval" | "input"
export type OutputMessageType = InputMessageType | "print" | "chart" | "error"

export type InputMessage = {
    type: InputMessageType
    info: any
    index?: number
}

export type OutputMessage = {
    type: OutputMessageType
    info: any
    index?: number
}

let inputResolver: null | ((value: string | null | PromiseLike<string | null>) => void) = null

self.addEventListener("message", async (e: MessageEvent<InputMessage>) => {
    console.log(`Worker received`, e.data)
    const { type, info, index } = e.data
    switch (type) {
        case "eval": {
            const result = await evaluate(info)
            self.postMessage({ ...result, index })
            break
        }
        case "input": {
            if (inputResolver === null) {
                return console.error("inputResolver is null")
            }
            inputResolver(info)
            inputResolver = null
            break
        }
        default:
            console.error(`unknown action ${type} (${info})`)
    }
})

async function evaluate(ts_code: string): Promise<OutputMessage> {
    try {
        const js_code = ts.transpile(ts_code, {
            target: ts.ScriptTarget.ES5,
            lib: ["dom"],
            module: ts.ModuleKind.CommonJS,
        })
        const asyncCode = (0, eval)(
            " (async function(login, input, print, chart, j, last, JutgeApiClient) {" +
                js_code +
                "\n})",
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
        return { type: "eval", info: last }
    } catch (err) {
        if (err instanceof Error) {
            return { type: "error", info: err.message }
        } else {
            return { type: "error", info: JSON.stringify(err) }
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
    self.postMessage({
        type: "input",
        info: {
            message,
            passwordMode,
        },
    })
    if (inputResolver !== null) {
        console.error("oops, inputResolver should be null")
        return ""
    }
    return new Promise<string | null>((resolve) => {
        inputResolver = resolve
    })
}

function printFunc(x: any) {
    self.postMessage({ type: "print", info: x })
}

function chartFunc(x: any) {
    self.postMessage({ type: "chart", info: x })
}

const jutgeInstance = new JutgeApiClient()

let last: any = undefined

console.log("Worker loaded")

export {}
