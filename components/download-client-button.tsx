import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

type Props = {
    filename: string
    href: string
}
export default function DownloadClientButton({ filename, href }: Props) {
    return (
        <div className="ml-8 my-6">
            <Button asChild>
                <Link href={href} className="button">
                    <Download /> {filename}
                </Link>
            </Button>
        </div>
    )
}
