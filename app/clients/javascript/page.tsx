import { TextSection } from '@/components/text-section'
import { Button } from '@/components/ui/button'
import { CircleAlert, Download, SquareChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <JavaScriptPage />
        </div>
    )
}

function JavaScriptPage() {
    return (
        <>
            <TextSection
                icon={<SquareChevronRight />}
                title="JavaScript client"
                content={
                    <>
                        <p>
                            The JavaScript client offers a simple way to interact with the API of
                            Jutge.org using the JavaScript programming language.
                        </p>
                        <p>
                            The JavaScript client is very easy to use. It is asynchronous and non
                            blocking, making use of the modern async/await syntax. The JavaScript
                            client is specially designed to be used in a browser. For apps and
                            servers, please consider using&nbsp;
                            <Link href="/typescript">the TypeScript client</Link>.
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
                            The JavaScript client is currently distributed as a single JavaScript
                            file:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/clients/javascript">
                                <Button>
                                    <Download /> jutge_api_client.js
                                </Button>
                            </Link>
                        </p>
                        <p>This client has no dependencies.</p>
                    </>
                }
            />
        </>
    )
}
