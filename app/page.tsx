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
import type { BundledLanguage } from "shiki"
import { codeToHtml } from "shiki"

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
        <h1 className="text-[3.2em]">Accedeix directament a</h1>
        <h1 className="text-[3.2em] text-green-600">la funcionalitat del Jutge</h1>
        <div></div>
        <p className="max-w-[36em] text-center font-bold">
            Fes programes que interactuen amb{" "}
            <Link href="https://jutge.org" className="text-blue-800">
                Jutge.org
            </Link>
            , ja sigui per obtenir informació, per configurar automàticament cursos, o moltes altres
            coses. <br />
            Hi ha clients per Python, Typescript, Javascript, PHP i fins i tot C++.
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

interface Props {
    children: string
    lang: BundledLanguage
}

async function CodeBlock(props: Props) {
    const out = await codeToHtml(props.children, {
        lang: props.lang,
        theme: "github-dark",
    })

    return <div className="code-block max-h-[25em] overflow-y-scroll" dangerouslySetInnerHTML={{ __html: out }} />
}

async function loadCode(filename: string) {
    const url = new URL(`http://localhost:3000/code/${filename}`)
    const res = await fetch(url)
    return res.text()
}
