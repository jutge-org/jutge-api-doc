import { cn } from "@/lib/utils"
import { CircleAlert } from "lucide-react"

export default function Warning({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={cn(
                "flex items-center gap-2 p-2 rounded mt-4 mb-4",
                "bg-muted",
            )}
        >
            <CircleAlert />
            <b>Warning:</b> {children}
        </div>
    )
}
