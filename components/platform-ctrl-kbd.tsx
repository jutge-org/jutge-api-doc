"use client"

import { usePlatform } from "@/lib/hooks"
import { cn } from "@/lib/utils"

type Props = {
    keyName: string
    className?: string
}
export default function PlatformCtrlKbd({ keyName, className }: Props) {
    const [platform] = usePlatform()
    let ctrlOrCmd =
        platform === "mac" ? <span className="text-[1rem] relative -bottom-[0.15rem]">⌘</span> : "Ctrl"
    return (
        <kbd className={cn("text-[0.66rem] font-bold tracking-tighter mx-0.5", className)}>
            {ctrlOrCmd}
            <span className="opacity-90 mx-1">+</span>
            {keyName}
        </kbd>
    )
}
