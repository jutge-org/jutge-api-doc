import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getApiDir } from '@/lib/api-dir'
import { modules } from '@/lib/tree'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from './Header'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Jutge.org API Documentation',
    description: 'Jutge.org API documentation',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const dir = await getApiDir()
    const tree = modules(dir)

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SidebarProvider>
                    <AppSidebar tree={tree} />
                    <SidebarInset>
                        <Header />
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    )
}
