import { InputMessage, OutputMessage } from "@/app/playground/worker"
import { InputDialog } from "@/components/ui/input-dialog"
import { useEffect, useState } from "react"

type Props = {
    worker: Worker
}
export default function PlaygroundInputDialog({ worker }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isPasswordMode, setIsPasswordMode] = useState(false)
    const [prompt, setPrompt] = useState<string>("Please enter a string value")

    const onCloseDialog = (payload: string | null) => {
        setIsDialogOpen(false)
        worker.postMessage({ type: "input-result", payload } satisfies InputMessage)
    }

    const onWorkerMessage = (e: MessageEvent<OutputMessage>) => {
        const { type, payload: info } = e.data
        switch (type) {
            case "input-request":
                setPrompt(info.message)
                setIsPasswordMode(info.passwordMode)
                setIsDialogOpen(true)
                break
        }
    }

    useEffect(() => {
        worker.addEventListener("message", onWorkerMessage)
        return () => worker.removeEventListener("message", onWorkerMessage)
    }, [worker])

    return (
        <InputDialog
            isOpen={isDialogOpen}
            onClose={onCloseDialog}
            title={isPasswordMode ? "Input password" : "Input text"}
            description={prompt}
            isPassword={isPasswordMode}
        />
    )
}
