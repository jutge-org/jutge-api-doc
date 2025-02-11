import { cn } from "@/lib/utils"
import { CircleAlert } from "lucide-react"

export default function Warning({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 p-4 border-2 rounded mb-4",
                "bg-yellow-100 border-stone-300",
                "dark:bg-yellow-900 dark:border-stone-700"
            )}
        >
            <CircleAlert />
            <b>Warning:</b> {children}
        </div>
    )
}
