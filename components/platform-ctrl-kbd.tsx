"use client"

import { usePlatform } from "@/lib/hooks"
import { cn } from "@/lib/utils"

type Props = {
    keyName: string
    className?: string
}
export default function PlatformCtrlKbd({ keyName, className }: Props) {
    const platform = usePlatform()
    let ctrlOrCmd =
        platform === "mac" ? <span className="text-[1rem] relative -bottom-0.5">⌘</span> : "Ctrl"
    return (
        <kbd className={cn("text-[0.66rem] font-normal tracking-tighter mx-0.5", className)}>
            {ctrlOrCmd}
            <span className="opacity-80 mx-1">+</span>
            {keyName}
        </kbd>
    )
}
