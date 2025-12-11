import { cn } from "@/lib/utils"

export default function ErrorArea({ payload }: { payload: any }) {
    return (
        <div className={cn("grow rounded-sm dark:bg-[#5b2020] bg-red-600")}>
            <pre className="text-xs max-h-120 overflow-y-auto w-full p-1.5">{payload}</pre>
        </div>
    )
}
