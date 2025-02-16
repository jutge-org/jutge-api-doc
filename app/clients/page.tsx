import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ClientsPage() {
    return (
        <>
            <h1>Clients</h1>
            <p>TODO: Improve this page</p>
            <p>
                This page provides a list of clients for each programming language. Click on the
                buttons below to view the details of each client.
            </p>
            <ul>
                <li>
                    <Link href="/clients/python">
                        <Button>Python Client</Button>
                    </Link>
                </li>
                <li>
                    <Link href="/clients/typescript">
                        <Button>TypeScript Client</Button>
                    </Link>
                </li>
                <li>
                    <Link href="/clients/javascript">
                        <Button>JavaScript Client</Button>
                    </Link>
                </li>
                <li>
                    <Link href="/clients/php">
                        <Button>PHP Client</Button>
                    </Link>
                </li>
                <li>
                    <Link href="/clients/cpp">
                        <Button>C++ Client</Button>
                    </Link>
                </li>
            </ul>
        </>
    )
}
