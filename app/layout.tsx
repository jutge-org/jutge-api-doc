import ThemedBody from "@/components/theme/themed-body"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/header/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
            <ThemedBody className={cn(inter.className, "flex flex-col")}>
                <Header />
                <div className="mt-[var(--topbar-height)]"></div>
                <div>{children}</div>
            </ThemedBody>
        </html>
    )
}
