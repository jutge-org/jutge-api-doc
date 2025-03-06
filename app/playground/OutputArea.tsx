import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { OutputMessage, OutputMessageType } from "@/lib/worker"
import { Bar, BarChart } from "recharts"

const outputMessageLabels: Record<OutputMessageType, string> = {
    print: "P",
    chart: "C",
    eval: "R",
    error: "E",
    input: "I",
    pong: "pong",
}

type _Props = {
    output: OutputMessage
    index: number
}
export default function OutputArea({ output, index }: _Props) {
    const label = outputMessageLabels[output.type]
    return (
        <div className="pl-6 w-full flex flex-row gap-4">
            <div className="pt-2 w-8 text-xs text-left text-gray-800 dark:text-gray-200">
                {`[${label}${index + 1}]`}
            </div>
            {output.type === "chart" ? <_Chart output={output} /> : <_Text output={output} />}
        </div>
    )
}

const _Text = ({ output }: { output: OutputMessage }) => {
    const text =
        typeof output.info === "string" ? output.info : JSON.stringify(output.info, null, 4)
    const lines = Math.min(Math.max(text.split("\n").length, 1), 15)
    return (
        <div
            className={cn(
                "grow border-spacing-2 rounded-lg",
                "border-2 p-2  dark:bg-[#1e1e1e]",
                output.type == "error" ? "border-red-500" : "border-gray-100",
            )}
        >
            <textarea value={lines} />
        </div>
    )
}

const _Chart = ({ output }: { output: OutputMessage }) => {
    const chartData = (output.info as Array<number>).map((data, index) => ({ x: index, y: data }))
    const chartConfig = {} satisfies ChartConfig

    return (
        <div className="border-spacing-2 rounded-lg border-gray-100 border-2 p-2">
            <ChartContainer config={chartConfig} className="min-h-[150px] max-w-[300px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <Bar dataKey="y" fill="var(--color-chart-1)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
