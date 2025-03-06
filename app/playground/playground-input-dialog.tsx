import { InputDialog } from "@/components/ui/input-dialog"
import { OutputMessage } from "@/lib/worker"
import { useEffect, useState } from "react"

type Props = {
    worker: Worker | undefined
}
export default function PlaygroundInputDialog({ worker }: Props) {
    // input dialog vars
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isPasswordMode, setIsPasswordMode] = useState(false)
    const [prompt, setPrompt] = useState<string>("Please enter a string value")

    const onCloseDialog = (info: string | null) => {
        setIsDialogOpen(false)
        worker?.postMessage({ type: "input", info })
    }

    const onWorkerMessage = (e: MessageEvent<OutputMessage>) => {
        const { type, info } = e.data
        switch (type) {
            case "input":
                console.log(`InputDialog received`, e.data)
                setPrompt(info.message)
                setIsPasswordMode(info.passwordMode)
                setIsDialogOpen(true)
                break
        }
    }

    useEffect(() => {
        worker?.addEventListener("message", onWorkerMessage)
        return () => worker?.removeEventListener("message", onWorkerMessage)
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
