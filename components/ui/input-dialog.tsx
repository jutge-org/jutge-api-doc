'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface InputDialogProps {
    isOpen: boolean
    onClose: (value: string | null) => void
    title: string
    description: string
    isPassword?: boolean
}

export function InputDialog({
    isOpen,
    onClose,
    title,
    description,
    isPassword = false,
}: InputDialogProps) {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = () => {
        onClose(inputValue)
        setInputValue('')
    }

    const handleCancel = () => {
        onClose(null)
        setInputValue('')
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Input
                    id="input"
                    type={isPassword ? 'password' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <DialogFooter className="pt-4">
                    <div className="w-full flex flex-row gap-4">
                        <div className="grow" />
                        <Button className="w-24" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button className="w-24" onClick={handleSubmit}>
                            Ok
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
