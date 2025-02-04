import { TextSection } from '@/components/text-section'
import { Button } from '@/components/ui/button'
import { BookOpen, CircleAlert, Download, SquareChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <CppPage />
        </div>
    )
}

function CppPage() {
    return (
        <>
            <TextSection
                icon={<SquareChevronRight />}
                title="C++ client"
                content={
                    <>
                        <p>
                            The C++ client offers a way to interact with the API of Jutge.org using
                            the C++ programming language.
                        </p>
                        <p className="flex items-center gap-2">
                            <CircleAlert />
                            <b>Warning:</b> This client is under development.
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
                            The C++ client is currently distributed as a single C++ file you must
                            include:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/clients/cpp">
                                <Button>
                                    <Download /> jutge_api_client.cpp
                                </Button>
                            </Link>
                        </p>
                        <p>
                            In order to use it you need to download some header only libraries:{' '}
                            <a href="https://github.com/yhirose/cpp-httplib">httplib</a> and{' '}
                            <a href="https://github.com/nlohmann/json">nlohmann/json</a>.
                            Compilation is something like this:{' '}
                            <code>g++ -std=c++20 program.cpp -l ssl -l crypto</code>.
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
                            In order to get started with the C++ client, you can follow this
                            tutorial:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/tutorials/cpp">
                                <Button>
                                    <Download /> tutorial.cpp
                                </Button>
                            </Link>
                        </p>
                        <p>
                            We strongly recommend you to read the tutorial, compile and execute it.
                        </p>
                    </>
                }
            />
        </>
    )
}
