import { useTheme } from "@/components/theme/hook"
import { cn } from "@/lib/utils"
import JsonView from "react-json-view"

export default function EvalResultArea({ payload }: { payload: any }) {
    const { mode } = useTheme()

    if (typeof payload === "undefined") {
        return <div></div>
    } else if (["boolean", "number", "string", "null"].includes(typeof payload)) {
        return (
            <pre
                className={cn(
                    "grow rounded-sm bg-[#f2fff3] dark:bg-[#0c2116]",
                    "text-xs max-h-[30rem] overflow-y-auto w-full p-1.5",
                )}
            >
                {String(payload)}
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
