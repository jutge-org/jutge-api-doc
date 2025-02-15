"use client"

import { useTheme } from "../theme/hook"

export default function HoverCardTip({ side }: { side: "up" | "down" }) {
    const { mode } = useTheme()

    const viewBox = `0 0 30 10`;
    const d = side === "up" ? `M 0 10 L 15 2 L 30 10` : `M 0 2 L 15 10 L 30 2`

    return (
        <svg viewBox={viewBox}>
            <path
                d={d}
                fill={mode === "dark" ? "black" : "white"}
                stroke={mode === "dark" ? "white" : "black"}
            />
        </svg>
    )
}
