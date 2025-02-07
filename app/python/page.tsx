import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/magicui/terminal'
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
            <TerminalDemo />

            <div className="h-12" />

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

function TerminalDemo() {
    return (
        <Terminal className="h-96">
            <TypingAnimation className="text-green-500">💲 python3</TypingAnimation>
            <AnimatedSpan delay={1000} className="text-black">
                <div className="flex flex-row gap-2">
                    <div className="text-red-500">❯❯❯</div>
                    <div className="text-black">from jutge_api_client import JutgeApiClient</div>
                </div>
            </AnimatedSpan>
            <AnimatedSpan delay={2000} className="text-black">
                <div className="flex flex-row gap-2">
                    <div className="text-red-500">❯❯❯</div>
                    <div className="text-black">jutge = JutgeApiClient()</div>
                </div>
            </AnimatedSpan>
            <AnimatedSpan delay={3000} className="text-black">
                <div className="flex flex-row gap-2">
                    <div className="text-red-500">❯❯❯</div>
                    <div className="text-black">
                        problem = jutge.problems.get_problem(&quot;P68688_en&quot;)
                    </div>
                </div>
            </AnimatedSpan>
            <AnimatedSpan delay={4000} className="text-black">
                <div className="flex flex-row gap-2">
                    <div className="text-red-500">❯❯❯</div>
                    <div className="text-black">problem.title</div>
                </div>
            </AnimatedSpan>
            <AnimatedSpan delay={4200} className="text-blue-500">
                <span>&quot;Hello World!&quot;</span>
            </AnimatedSpan>
            <AnimatedSpan delay={5000} className="text-black">
                <div className="flex flex-row gap-2">
                    <div className="text-red-500">❯❯❯</div>
                    <div className="text-black">
                        jutge.login(&quot;aturing@bletchley.park&quot;, &quot;enigma&quot;)
                    </div>
                </div>
            </AnimatedSpan>
            <AnimatedSpan delay={6000} className="text-black">
                <div className="flex flex-row gap-2">
                    <div className="text-red-500">❯❯❯</div>
                    <div className="text-black">jutge.student.profile.get().name</div>
                </div>
            </AnimatedSpan>
            <AnimatedSpan delay={6200} className="text-blue-500">
                <span>&quot;Alan Turing&quot;</span>
            </AnimatedSpan>
            <AnimatedSpan delay={7000} className="text-black">
                <div className="flex flex-row gap-2">
                    <div className="text-red-500">❯❯❯</div>
                    <div className="text-black">
                        jutge.student.statuses.get_for_problem(&quot;P68688_en&quot;)
                    </div>
                </div>
            </AnimatedSpan>
            <AnimatedSpan delay={7200} className="text-blue-500">
                <span>
                    Status(nb_submissions=3, nb_accepted_submissions=1,
                    <br />
                    nb_rejected_submissions=2, status=&quot;accepted&quot;)
                </span>
            </AnimatedSpan>
        </Terminal>
    )
}
