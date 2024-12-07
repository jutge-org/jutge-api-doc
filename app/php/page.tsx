import { TextSection } from '@/components/text-section'
import { Button } from '@/components/ui/button'
import { CircleAlert, Download, SquareChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <PhpPage />
        </div>
    )
}

function PhpPage() {
    return (
        <>
            <TextSection
                icon={<SquareChevronRight />}
                title="PHP client"
                content={
                    <>
                        <p>
                            The PHP client offers a crude way to interact with the API of Jutge.org
                            using the PHP programming language. We only develop it to support the
                            transition of the old PHP code to the new API.
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
                            The PHP client is currently distributed as a single PHP file you can
                            import:
                        </p>
                        <p className="pl-8">
                            <Link href="/api/clients/php">
                                <Button>
                                    <Download /> jutge_api_client.php
                                </Button>
                            </Link>
                        </p>
                        <p>This client has no dependencies, except for a deep tolerance of PHP.</p>
                    </>
                }
            />
        </>
    )
}
