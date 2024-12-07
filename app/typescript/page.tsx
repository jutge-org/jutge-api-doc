import { TextSection } from '@/components/text-section'
import { Button } from '@/components/ui/button'
import { BookOpen, Download, SquareChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <TypescriptPage />
        </div>
    )
}

function TypescriptPage() {
    return (
        <>
            <TextSection
                icon={<SquareChevronRight />}
                title="TypeScript client"
                content={
                    <>
                        <p>
                            The TypeScript client offers a simple way to interact with the API of
                            Jutge.org using the TypeScript programming language.
                        </p>
                        <p>
                            The TypeScript client is very easy to use. It is asynchronous and non
                            blocking, making use of the modern async/await syntax. This allows you
                            to write code that can run in any dynamic environment, like an app or a
                            server.
                        </p>
                        <p>
                            Thanks to the use of types, the code you write is type safe and you get
                            code completion and help everywhere in any modern IDE. Less time
                            debugging and less time reading docs.
                        </p>
                        <p>
                            In order to use the TypeScript client in an easy and efficient way, we
                            recommend you to use <Link href="https://bun.sh/">Bun</Link>.
                        </p>
                    </>
                }
            />
            <TextSection
                icon={<Download />}
                title="Download"
                content={
                    <>
                        <p>
                            The Typescript client is currently distributed as a single TypeScript
                            file you can import:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/clients/typescript">
                                <Button>
                                    <Download /> jutge_api_client.ts
                                </Button>
                            </Link>
                        </p>
                        <p>In order to use it, you have to install some dependencies:</p>
                        <p className="pl-8 font-mono text-xs">
                            bun add yaml chalk @inquirer/prompts
                        </p>
                    </>
                }
            />
            <TextSection
                icon={<BookOpen />}
                title="Tutorial"
                content={
                    <>
                        <p>
                            In order to get started with the TypeScript client, you can follow this
                            tutorial:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/tutorials/typescript">
                                <Button>
                                    <Download /> tutorial.ts
                                </Button>
                            </Link>
                        </p>
                        <p>We strongly recommend you to read the tutorial and execute it.</p>
                    </>
                }
            />
        </>
    )
}
