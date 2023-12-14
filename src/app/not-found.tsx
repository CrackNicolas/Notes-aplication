import Link from "next/link";

export default function NotFound() {
    return (
        <main className="grid place-items-center bg-primary px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-[100px] font-semibold text-error">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-wider text-error sm:text-5xl">
                    Página no encontrada
                </h1>
                <p className="mt-6 text-sm leading-7 text-tertiary">
                    Lo sentimos, no pudimos encontrar la página que estás buscando.
                </p>
                <Link href="/" className="text-sm font-normal hover:font-semibold text-secondary outline-none">
                    Volver a la página de inicio
                </Link>
            </div>
        </main>
    )
}