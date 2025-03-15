import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

type Props = {
    title: string
    href: string
}
export default function DownloadClientButton({ title, href }: Props) {
    return (
        <div className="my-6">
            <Button asChild>
                <Link href={href} className="button">
                    <Download /> {title}
                </Link>
            </Button>
        </div>
    )
}
