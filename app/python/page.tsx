import { TextSection } from '@/components/text-section'
import { Button } from '@/components/ui/button'
import { BookOpen, Download, SquareChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <PythonPage />
        </div>
    )
}

function PythonPage() {
    return (
        <>
            <TextSection
                icon={<SquareChevronRight />}
                title="Python client"
                content={
                    <>
                        <p>
                            The Python client offers a simple way to interact with the API of
                            Jutge.org using the Python programming language.
                        </p>
                        <p>
                            The Python client is very easy to use. It is synchronous and blocking,
                            so that you can write command line applications that are easy to write,
                            understand and debug.
                        </p>
                        <p>
                            Thanks to the use of type hints and docstrings, the code you write is
                            type safe and you get code completion and help everywhere in any modern
                            IDE. Less time debugging and less time reading docs.
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
                            The Python client is currently distributed as a single Python file you
                            can import:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/clients/python">
                                <Button>
                                    <Download /> jutge_api_client.py
                                </Button>
                            </Link>
                        </p>
                        <p>In order to use it, you have to install some dependencies:</p>
                        <p className="pl-8 font-mono text-xs">
                            python3 -m pip install requests requests-toolbelt pyyaml rich pydantic
                        </p>
                        <p>
                            If <span className="font-mono text-xs">pip</span> complains, either add
                            the <span className="font-mono text-xs">--break-system-packages</span>{' '}
                            flag or use a{' '}
                            <a href="https://docs.python.org/3/library/venv.html">
                                virtual environment
                            </a>
                            .
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
                            In order to get started with the Python client, you can follow this
                            tutorial:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/tutorials/python">
                                <Button>
                                    <Download /> tutorial.py
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
