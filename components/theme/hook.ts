import { useContext } from "react"
import { ThemeContext } from "./theme-context"

export function useTheme() {
    const { mode, setMode } = useContext(ThemeContext)

    const setAndSaveMode = (mode: "light" | "dark") => {
        if (mode === "light") {
            localStorage.removeItem("dark")
        } else {
            localStorage.setItem("dark", "true")
        }
        setMode(mode)
    }

    return { mode, setMode: setAndSaveMode }
}
