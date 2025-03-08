"use client"

import { JutgeApiClient } from "@/lib/jutge_api_client"
import ts from "typescript"
import { InputContinuationFunc, InputContinuationParam, InputMessage, OutputMessage } from "./types"

const jutgeInstance = new JutgeApiClient()

let last: any = undefined

let inputContinuation: InputContinuationFunc | null = null

const setContinuation = (continuation: InputContinuationFunc) => {
    if (inputContinuation !== null) {
        console.error("Oops, inputContinuation should be null!")
    }
    inputContinuation = continuation
}

const callContinuation = async (info: InputContinuationParam) => {
    if (inputContinuation === null) {
        return console.error("inputResolver is null")
    }
    inputContinuation(await dePromisify(info))
    inputContinuation = null
}

// Set the type of the first parameter to check for errors
const postMessage = (message: OutputMessage) => {
    self.postMessage(message)
}

const dePromisify = async (x: any) => {
    if (x instanceof Promise) {
        x = await x
    } else if (Array.isArray(x)) {
        for (let i = 0; i < x.length; i++) {
            x[i] = await dePromisify(x[i])
        }
    } else if (typeof x === "object") {
        for (const prop in x) {
            x[prop] = await dePromisify(x[prop])
        }
    }
    return x
}

async function evaluate(ts_code: string, cellIndex?: number): Promise<OutputMessage> {
    try {
        const js_code = ts.transpile(ts_code, {
            target: ts.ScriptTarget.ES5,
            lib: ["dom"],
            module: ts.ModuleKind.CommonJS,
        })
        const asyncFunction = (0, eval)(
            `(async function(JutgeApiClient, jutge, input, print, chart, login, last, self) { 
                ${js_code}
            })`,
        )
        // Plug the `this` variable (?) // TODO: Still gives error
        const boundAsyncFunction = asyncFunction.bind(undefined)
        last = await boundAsyncFunction(
            JutgeApiClient,
            jutgeInstance,
            inputFunc,
            printFunc(cellIndex),
            chartFunc(cellIndex),
            loginFunc,
            last,
            undefined, // self
        )
        return { type: "eval-result", payload: await dePromisify(last) }
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
        setContinuation(resolve)
    })
}

const printFunc = (cellIndex?: number) => async (x: any) =>
    postMessage({ type: "print", payload: await dePromisify(x), cellIndex })

const chartFunc = (cellIndex?: number) => async (x: any) =>
    postMessage({ type: "chart", payload: await dePromisify(x), cellIndex })

self.addEventListener("message", async (e: MessageEvent<InputMessage>) => {
    const { type, payload, cellIndex } = e.data
    switch (type) {
        case "eval-request": {
            const result = await evaluate(payload, cellIndex)
            postMessage({ ...result, cellIndex })
            break
        }
        case "input-result": {
            await callContinuation(payload)
            break
        }
        default:
            console.error(`unknown action ${type} (${payload})`)
    }
})

console.log("Worker loaded")

export {}
