import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"
import ErrorArea from "./error"

export default function ChartArea({ payload }: { payload: any }) {
    if (!Array.isArray(payload)) {
        return <ErrorArea payload="Invalid chart data" />
    }

    const chartData = (payload as Array<number>).map((data, index) => ({
        x: index,
        y: data,
    }))
    const chartConfig = {} satisfies ChartConfig

    return (
        <div className="border-spacing-2 rounded-lg border-gray-100 border-2 p-1.5">
            <ChartContainer config={chartConfig} className="min-h-[150px] max-w-[300px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <Bar dataKey="y" fill="hsl(var(--chart-1))" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
