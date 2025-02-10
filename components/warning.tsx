import { CircleAlert } from "lucide-react"

export default function Warning({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 p-4 border-2 rounded bg-yellow-50 border-gray-200 my-4">
            <CircleAlert />
            <b>Warning:</b> {children}
        </div>
    )
}
