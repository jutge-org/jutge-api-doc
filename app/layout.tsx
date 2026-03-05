import { FilterProvider } from "@/components/filter-provider"
import Footer from "@/components/footer"
import ThemedBody from "@/components/theme/themed-body"
import { getApiDir } from "@/lib/api/dir"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/header/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Jutge.org API",
    description: "Jutge.org API",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const directory = await getApiDir()
    return (
        <html lang="en">
            <ThemedBody className={cn(inter.className, "min-h-screen flex flex-col items-stretch")}>
                <FilterProvider>
                    <Header directory={directory} />
                    <div className="mt-(--topbar-height)"></div>
                    <div className="min-h-screen">{children}</div>
                    <Footer />
                </FilterProvider>
            </ThemedBody>
        </html>
    )
}
