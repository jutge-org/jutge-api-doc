import { Card, CardHeader } from "@/components/ui/card"
import Cpp from "./langs/cpp.mdx"
import Java from "./langs/java.mdx"
import Javascript from "./langs/javascript.mdx"
import PHP from "./langs/php.mdx"
import Python from "./langs/python.mdx"
import Typescript from "./langs/typescript.mdx"

import { cn } from "@/lib/utils"
import { ChevronUp } from "lucide-react"
import Link from "next/link"

export default async function Page() {
    const clients = {
        python: { Component: Python, name: "Python" },
        typescript: { Component: Typescript, name: "Typescript" },
        javascript: { Component: Javascript, name: "Javascript" },
        java: { Component: Java, name: "Java" },
        cpp: { Component: Cpp, name: "C++" },
        php: { Component: PHP, name: "PHP" },
    }
    return (
        <div id="top">
            <h1>Jutge API Clients</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-12">
                {Object.entries(clients).map(([id, { name }]) => (
                    <Link key={id} href={`/clients#${id}`} className="no-underline">
                        <Card className="bg-secondary rounded-sm">
                            <CardHeader>
                                <h3 className="text-center text-secondary-foreground opacity-80">{name}</h3>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>

            {Object.entries(clients).map(([id, { Component }]) => (
                <div key={id} className="relative border-t border-muted-foreground pb-12">
                    <div id={id} className="relative -top-[calc(var(--topbar-height)_+_2em)]" />
                    <Link
                        href="/clients#top"
                        className={cn(
                            "no-underline p-1 absolute text-xs right-0 top-2",
                            "flex flex-row gap-0.5",
                        )}
                    >
                        <ChevronUp size={16} />
                    </Link>
                    <Component />
                </div>
            ))}
        </div>
    )
}
