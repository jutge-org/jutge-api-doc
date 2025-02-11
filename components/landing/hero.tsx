import Link from "next/link"

export default function Hero() {
    return (
        <div className="w-full h-[20em] flex flex-col justify-center items-center gap-6">
            <h1 className="text-[3.2em]">Script Jutge.org&apos;s services</h1>
            <h1 className="text-[3.2em] text-green-600">with your language of choice</h1>
            <div></div>
            <p className="max-w-[36em] text-center font-bold">
                Write programs to interact with{" "}
                <Link href="https://jutge.org" className="text-blue-800">
                    Jutge.org
                </Link>
                , to obtain information, configure things automatially, and much more. <br />
                Clients for Python, Typescript, Javascript, PHP and even C++.
            </p>
        </div>
    )
}
