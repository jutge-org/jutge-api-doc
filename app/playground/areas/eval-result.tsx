import { cn } from "@/lib/utils"

export default function EvalResultArea({ payload }: { payload: any }) {
    const text = typeof payload === "string" ? payload : JSON.stringify(payload, null, 2)
    return (
        <pre
            className={cn(
                "grow rounded-sm bg-[#f2fff3] dark:bg-[#0c2116]",
                "text-xs max-h-[30rem] overflow-y-auto w-full p-1.5",
            )}
        >
            {text}
        </pre>
    )
}
