"use client"

import { loadAllSamples } from "@/actions/load-code"
import { CodeSamples } from "@/components/landing/code-samples"
import Hero from "@/components/landing/hero"
import PageWidth from "@/components/page-width"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
    BookOpenIcon,
    FileCodeIcon,
    PyramidIcon,
    SquareTerminalIcon,
    TerminalIcon,
} from "lucide-react"

export async function OldPage() {
    const allCodeSamples = await loadAllSamples()

    return (
        <PageWidth className="mx-auto pt-2">
            <Hero />
            <CodeSamples allCodeSamples={allCodeSamples} />
        </PageWidth>
    )
}

export default function Page() {
    return <BackgroundPaths />
}

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }))

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Title</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}

export function BackgroundPaths() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                    className="max-w-4xl mx-auto flex flex-col items-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 tracking-tighter animate-none">
                        <SquareTerminalIcon size={64} />
                    </h2>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl mb-4 tracking-tighter">
                        Script Jutge.org
                    </h1>

                    <p className="max-w-[30em] md:text-xl text-center mb-4">
                        Write programs to interact with Jutge.org: obtain information, test AIs,
                        configure things automatically...
                    </p>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl mb-4 tracking-tighter">
                        Use your favorite language
                    </h2>

                    <p className="max-w-[30em] md:text-xl text-center mb-12">
                        Clients available for Python, TypeScript, JavaScript, PHP and even C++.
                    </p>

                    <div className="flex flex-row gap-8">
                        <Button
                            className="p-6 md:p-8 rounded-full"
                            variant="default"
                            size="icon"
                            title="Clients"
                        >
                            <PyramidIcon />
                        </Button>
                        <Button
                            className="p-6 md:p-8 rounded-full"
                            variant="default"
                            size="icon"
                            title="Documentation"
                        >
                            <BookOpenIcon />
                        </Button>
                        <Button
                            className="p-6 md:p-8 rounded-full"
                            variant="default"
                            size="icon"
                            title="Examples"
                        >
                            <FileCodeIcon />
                        </Button>
                        <Button
                            className="p-6 md:p-8 rounded-full"
                            variant="default"
                            size="icon"
                            title="Playground"
                        >
                            <TerminalIcon />
                        </Button>
                    </div>

                    <div className="pb-64"></div>
                </motion.div>
            </div>
        </div>
    )
}
