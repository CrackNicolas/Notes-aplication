import Link from "next/link";

import ComponentIcon from "@/frontend/components/partials/icon";

export default function NotFound() {
    return (
        <section className="bg-primary pt-24 pb-9">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="not-found" size={200} view_box="0 0 200 200" />
                    <span className="mt-5 text-tertiary text-center tracking-wide text-xl">
                        Parece que te has perdido
                    </span>
                    <span className="text-fifth text-center tracking-wide text-md">
                        La página que estás buscando no existe.
                    </span>
                </div>
                <Link href={`${process.env.DEVELOPMENT_DOMAIN}/dashboard/main`} title="Volver al inicio de la aplicacion" className="border-[0.1px] border-secondary px-2 py-1 b rounded-md hover:bg-secondary hover:text-primary bg-primary text-secondary text-center text-md tracking-wide">
                    Volver al inicio
                </Link>
            </article>
        </section>
    )
}