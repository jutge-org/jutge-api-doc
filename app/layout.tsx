import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter, Outfit, PT_Sans, Lexend, Red_Hat_Text, Quicksand } from "next/font/google"
import Header from "../components/header/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const outfit = Outfit({ subsets: ["latin"] })
const lexend = Lexend({ subsets: ["latin"] })
const quicksand = Quicksand({ subsets: ["latin"] })
const redhat = Red_Hat_Text({ subsets: ["latin"] })
const ptSans = PT_Sans({ weight: ["400", "700"], subsets: ["latin"]  })

export const metadata: Metadata = {
    title: "Jutge.org API Documentation",
    description: "Jutge.org API documentation",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "bg-zinc-50")}>
                <Header />
                <div className="mt-[var(--topbar-height)] bg-transparent">{children}</div>
            </body>
        </html>
    )
}
