"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { ThemeContext, ThemeMode } from "./theme-context"

type Props = Readonly<{
    children: React.ReactNode
    className?: string
}>
export default function ThemedBody({ children, className }: Props) {
    const [mode, setMode] = useState<ThemeMode>("light")

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <body className={cn(className, mode === "light" ? "" : "dark")}>{children}</body>
        </ThemeContext.Provider>
    )
}
