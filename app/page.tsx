import PageWidth from "@/components/page-width"

export default function Page() {
    return (
        <PageWidth className="mx-auto pt-2">
            <Banner />
        </PageWidth>
    )
}

const Banner = () => (
    <div className="w-full h-[20em] flex flex-col justify-center items-center">
        <h1 className="text-[3.2em] leading-10">Accedeix directament a</h1>
        <h1 className="text-[3.2em] text-green-600">la funcionalitat del Jutge</h1>
        <p className="max-w-[36em] text-center font-bold mt-4">
            Fes programes que interactuen amb el Jutge, ja sigui per extreure informació, per
            configurar automàticament cursos, o per calcular notes. <br />
            Tenim clients per Python, Typescript, i molts altres llenguatges.
        </p>
    </div>
)
