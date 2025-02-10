import PageWidth from "@/components/page-width"
import Link from "next/link"

export default function Page() {
    return (
        <PageWidth className="mx-auto pt-2">
            <Banner />
        </PageWidth>
    )
}

const Banner = () => (
    <div className="w-full h-[20em] flex flex-col justify-center items-center">
        <h1 className="text-[3.2em] mb-3">Accedeix directament a</h1>
        <h1 className="text-[3.2em] text-green-600">la funcionalitat del Jutge</h1>
        <p className="max-w-[36em] text-center font-bold mt-4">
            Fes programes que interactuen amb{" "}
            <Link href="https://jutge.org" className="text-blue-800">
                Jutge.org
            </Link>
            , ja sigui per obtenir informació, per configurar automàticament cursos, o moltes altres
            coses. <br />
            Hi ha clients per Python, Typescript, Javascript, PHP i fins i tot C++.
        </p>
    </div>
)
