"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { useTheme } from "./hook"

export default function ThemeSwitcher() {
    const { mode, setMode } = useTheme()

    return (
        <div className="flex flex-col justify-center">
            <Button
                className="w-10 hover:text-white"
                variant="ghost"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
                {mode === "light" ? <Moon /> : <Sun />}
            </Button>
        </div>
    )
}
