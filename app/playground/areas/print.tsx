import { cn } from "@/lib/utils"

export default function PrintArea({ payload }: { payload: string }) {
    return (
        <div className={cn("grow border-spacing-2 rounded-sm border-2 p-1.5 dark:bg-[#1e1e1e]")}>
            <pre className="text-xs max-h-[30rem] overflow-y-auto w-full">{payload}</pre>
        </div>
    )
}
