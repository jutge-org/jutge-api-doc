import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

type Props = {
    className?: string
}
export default function Hero({ className }: Props) {
    return (
        <div
            className={cn(
                "w-full flex flex-col justify-center items-center gap-12 mt-16 mb-24 text-center",
                className,
            )}
        >
            <div className="text-3xl sm:text-4xl md:text-6xl animate-none">
                <Image
                    src="/jutge-terminal.svg"
                    width={100}
                    height={100}
                    alt="Green Terminal with Jutge.org's logo drawn in ASCII Art"
                />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-4xl sm:text-6xl md:text-7xl tracking-tight">
                    Script Jutge.org
                </h1>
                <p className="px-4 md:px-0 lg:max-w-[30em] md:text-lg/6 text-center">
                    Write programs to interact with <Link href="https://jutge.org">Jutge.org</Link>:
                    obtain information, test AIs, configure things automatically...
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="text-2xl sm:text-4xl md:text-5xl tracking-tight">
                    Use your favorite language
                </h2>
                <p className="px-4 md:px-0 lg:max-w-[35em] md:text-lg text-center">
                    Clients available for <Link href="/clients#python">Python</Link>,{" "}
                    <Link href="/clients#typescript">TypeScript</Link>,{" "}
                    <Link href="/clients#javascript">JavaScript</Link>,{" "}
                    <Link href="/clients#php">PHP</Link> and even{" "}
                    <Link href="/clients#cpp">C++</Link>.
                </p>
            </div>
        </div>
    )
}
