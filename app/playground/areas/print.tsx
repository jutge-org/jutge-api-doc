import { cn } from "@/lib/utils"

export default function PrintArea({ payload }: { payload: string }) {
    return (
        <div className={cn("grow p-1.5")}>
            <pre className="text-xs max-h-[30rem] overflow-y-auto w-full">{payload}</pre>
        </div>
    )
}
