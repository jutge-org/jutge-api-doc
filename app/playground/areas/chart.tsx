import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
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
        <div className="border-spacing-2 rounded-lg border-gray-100 border-2 p-1.5 w-full">
            <ChartContainer config={chartConfig} className="max-h-96 mx-auto">
                <BarChart accessibilityLayer data={chartData}>
                    <XAxis />
                    <YAxis />
                    <Bar dataKey="y" fill="hsl(var(--accent))" radius={2} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
