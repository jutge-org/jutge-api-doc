"use client"

import { InputMessage, OutputMessage } from "@/app/playground/worker"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FormEventHandler, useEffect, useState } from "react"

type Props = {
    worker: Worker
}
export default function PlaygroundInputDialog({ worker }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [passwordMode, setPasswordMode] = useState(false)
    const [prompt, setPrompt] = useState<string>("Please enter a string value")
    const [inputValue, setInputValue] = useState("")

    const onWorkerMessage = (e: MessageEvent<OutputMessage>) => {
        const { type, payload: info } = e.data
        switch (type) {
            case "input-request":
                setPrompt(info.message)
                setPasswordMode(info.passwordMode)
                setIsOpen(true)
                break
        }
    }

    useEffect(() => {
        worker.addEventListener("message", onWorkerMessage)
        return () => worker.removeEventListener("message", onWorkerMessage)
    }, [worker])

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (inputValue.length > 0) {
            finish(inputValue)
        }
    }

    const finish = (payload: string | null) => {
        setInputValue("")
        setIsOpen(false)
        worker.postMessage({ type: "input-result", payload } satisfies InputMessage)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => open || finish(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{passwordMode ? "Input password" : "Input text"}</DialogTitle>
                    <DialogDescription>{prompt}</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit}>
                    <Input
                        id="input"
                        type={passwordMode ? "password" : "text"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </form>
                <DialogFooter className="pt-4">
                    <div className="w-full flex flex-row gap-4">
                        <div className="grow" />
                        <Button variant="outline" onClick={() => finish(null)} className="w-24">
                            Cancel
                        </Button>
                        <Button
                            className="w-24"
                            onClick={() => finish(inputValue)}
                            disabled={inputValue.length === 0}
                        >
                            Ok
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
