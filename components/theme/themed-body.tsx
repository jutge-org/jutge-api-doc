"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { ThemeContext, ThemeMode } from "./theme-context"

const getSavedTheme = () => (localStorage.getItem("dark") === "true" ? "dark" : "light")

type Props = Readonly<{
    children: React.ReactNode
    className?: string
}>
export default function ThemedBody({ children, className }: Props) {
    const [mode, setMode] = useState<ThemeMode>(getSavedTheme)
    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            <body className={cn(mode === "light" ? "" : "dark", className)}>{children}</body>
        </ThemeContext.Provider>
    )
}
