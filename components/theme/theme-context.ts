import { createContext } from "react"

export type ThemeMode = "light" | "dark"

export type ThemeState = {
    mode: ThemeMode
    setMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeState>({
    mode: "light",
    setMode: () => {
        throw new Error(`Trying to change initial mode!`)
    },
})
