import { useContext } from "react";
import { ThemeContext } from "./theme-context";

export function useTheme() {
    const { mode, setMode } = useContext(ThemeContext);
    return { mode, setMode };
}