import { CodeBlock } from "@/components/code-block"
import PageWidth from "@/components/page-width"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Page() {
    return (
        <PageWidth className="mx-auto pt-2">
            <Banner />
            <Demo />
        </PageWidth>
    )
}

const Banner = () => (
    <div className="w-full h-[20em] flex flex-col justify-center items-center gap-6">
        <h1 className="text-[3.2em]">Script Jutge.org's services</h1>
        <h1 className="text-[3.2em] text-green-600">with your language of choice</h1>
        <div></div>
        <p className="max-w-[36em] text-center font-bold">
            Write programs to interact with{" "}
            <Link href="https://jutge.org" className="text-blue-800">
                Jutge.org
            </Link>
            , to obtain information, configure things automatially, and much more. <br />
            Clients for Python, Typescript, Javascript, PHP and even C++.
        </p>
    </div>
)

const Demo = async () => {
    const pythonCode = await loadCode("python.py")
    const typescriptCode = await loadCode("typescript.ts")
    return (
        <>
            <Tabs defaultValue="python" className="max-w-[50em] mx-auto">
                <div className="flex flex-row justify-between">
                    <Select>
                        <SelectTrigger className="w-[20em]">
                            <SelectValue placeholder="Choose an example" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Getting the list of compilers</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    <TabsList>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="typescript">Typescript</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="python">
                    <CodeBlock lang="python">{pythonCode}</CodeBlock>
                </TabsContent>
                <TabsContent value="typescript">
                    <CodeBlock lang="python">{typescriptCode}</CodeBlock>
                </TabsContent>
            </Tabs>
        </>
    )
}

async function loadCode(filename: string) {
    const url = new URL(`http://localhost:3000/code/${filename}`)
    const res = await fetch(url)
    return res.text()
}
