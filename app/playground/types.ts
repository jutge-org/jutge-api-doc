
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

export type InputContinuationParam = string | null | PromiseLike<string | null>
export type InputContinuationFunc = (value: InputContinuationParam) => void