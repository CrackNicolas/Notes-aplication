import Link from "next/link";

export default function NotFound() {
    return (
        <main className="grid place-items-center bg-primary px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-[100px] font-semibold text-red-500">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-wider text-red-500 sm:text-5xl">
                    Página no encontrada
                </h1>
                <p className="mt-6 text-sm leading-7 text-tertiary">
                    Lo sentimos, no pudimos encontrar la página que estás buscando.
                </p>
                <Link href="/" className="rounded-md px-3.5 py-2.5 text-sm font-normal text-blue-500 hover:text-secondary outline-none">
                    Volver a la página de inicio
                </Link>
            </div>
        </main>
    )
}