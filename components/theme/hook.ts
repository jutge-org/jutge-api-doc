import { useContext } from "react"
import { ThemeContext } from "./theme-context"

export function useTheme() {
    const { mode, setMode } = useContext(ThemeContext)

    const setAndSaveMode = (mode: "light" | "dark") => {
        console.log("Setting mode", mode);
        if (mode === "light") {
            localStorage.removeItem("dark")
        } else {
            localStorage.setItem("dark", "true")
        }
        console.log(localStorage.getItem("dark"))
        setMode(mode)
    }

    return { mode, setMode: setAndSaveMode }
}
