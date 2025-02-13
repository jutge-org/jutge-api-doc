"use client"

import { CodeBlock } from "@/components/code-block"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const samples = [
    { name: "Get the server time", file: "get-server-time" },
    { name: "List the available compilers", file: "compilers" },
    { name: 'Read the "Hello, World!" problem', file: "hello-world-problem" },
    { name: "Submit a problem", file: "submit" },
    { name: "Show the user profile", file: "user-profile" },
    { name: "Print the status of your problems", file: "statuses" },
]

export function CodeSamples({ allCodeSamples }: { allCodeSamples: Record<string, string> }) {
    const [filename, setFilename] = useState(samples[0].file)

    return (
        <>
            <Tabs defaultValue="python" className="max-w-[50em] mx-auto">
                <div className="flex flex-row justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm opacity-50">Choose a sample:</span>
                        <Select value={filename} onValueChange={setFilename}>
                            <SelectTrigger className="w-[24em]">
                                <SelectValue placeholder="Choose a sample..." />
                            </SelectTrigger>
                            <SelectContent>
                                {samples.map(({ name, file }) => (
                                    <SelectItem key={name} value={file}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <TabsList>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="typescript">Typescript</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="python">
                    <CodeBlock lang="python">{allCodeSamples[`${filename}.py`]}</CodeBlock>
                </TabsContent>
                <TabsContent value="typescript">
                    <CodeBlock lang="typescript">{allCodeSamples[`${filename}.ts`]}</CodeBlock>
                </TabsContent>
            </Tabs>
        </>
    )
}
