import { useTheme } from "@/components/theme/hook"
import { cn } from "@/lib/utils"
import JsonView from "react-json-view"

export default function EvalResultArea({ payload }: { payload: any }) {
    const { mode } = useTheme()

    if (typeof payload === "string") {
        return (
            <pre
                className={cn(
                    "grow rounded-sm bg-[#f2fff3] dark:bg-[#0c2116]",
                    "text-xs max-h-[30rem] overflow-y-auto w-full p-1.5",
                )}
            >
                {payload}
            </pre>
        )
    } else {
        return (
            <JsonView
                src={payload}
                theme={mode === "dark" ? "bright" : "rjv-default"}
                style={{ width: "100%" }}
            />
        )
    }
}
