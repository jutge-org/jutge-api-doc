import { TextSection } from '@/components/text-section'
import { Button } from '@/components/ui/button'
import {
    CircleAlertIcon,
    DownloadIcon,
    GraduationCapIcon,
    ShieldIcon,
    UserIcon,
} from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <HomePage />
        </div>
    )
}

function HomePage() {
    return (
        <>
            <TextSection
                icon={<></>}
                title="Jutge.org API documentation"
                content={
                    <>
                        <p>
                            Jutge.org provides a simple and powerful way to interact
                            programmatically with the platform through this API.
                        </p>
                        <p>
                            Users of Jutge.org can easily access the API through ready-to-use
                            clients for the most popular programming languages.
                        </p>
                        <p className="font-bold">Get started with Python:</p>
                        <p className="pl-8">
                            <Link href="/api/clients/python" className="mr-4">
                                <Button className="w-40">
                                    <DownloadIcon /> jutge_api_client.py
                                </Button>
                            </Link>
                            <Link href="/api/tutorials/python">
                                <Button className="w-40">
                                    <DownloadIcon /> tutorial.py
                                </Button>
                            </Link>
                        </p>
                        <p className="font-bold">Get started with TypeScript:</p>
                        <p className="pl-8">
                            <Link href="/api/clients/typescript" className="mr-4">
                                <Button className="w-40">
                                    <DownloadIcon /> jutge_api_client.ts
                                </Button>
                            </Link>
                            <Link href="/api/tutorials/typescript">
                                <Button className="w-40">
                                    <DownloadIcon /> tutorial.ts
                                </Button>
                            </Link>
                        </p>
                        <p>
                            All available operations are documented in the API Directory. Most
                            operations require authentication. Moreover, some operations can only be
                            used by registered users (aka students) (
                            <UserIcon
                                size={15}
                                className="text-gray-400 inline-flex items-baseline"
                            />
                            ), by instructors (
                            <GraduationCapIcon
                                size={15}
                                className="text-gray-400 inline-flex items-baseline"
                            />
                            ) or by administrators (
                            <ShieldIcon
                                size={15}
                                className="text-gray-400 inline-flex items-baseline"
                            />
                            ).
                        </p>
                        <p>
                            Ha de ser tan difícil posar un paràgraf amb icones i parèntesis que no
                            ballin?
                        </p>
                        <p className="flex items-center gap-2">
                            <CircleAlertIcon />
                            <b>Warning:</b> This API is under development and changes can be
                            excepted.
                        </p>
                    </>
                }
            />
        </>
    )
}
