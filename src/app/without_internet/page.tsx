import Link from 'next/link'

import ComponentIcon from '@/frontend/components/partials/icon'

export default function WithoutInternet() {
    return (
        <section className="dark:bg-dark-primary bg-primary pt-24 pb-9">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="without_internet" size={250} view_box="0 0 192 195" />
                    <span className="mt-5 dark:text-dark-tertiary text-tertiary text-center tracking-wide text-xl">
                        Conéctate a Internet
                    </span>
                    <span className="dark:text-dark-fifth text-fifth text-center tracking-wide text-md">
                        Sin conexion a Internet. Comprueba la conexion.
                    </span>
                </div>
                <Link href={`${process.env.DEVELOPMENT_DOMAIN}/dashboard/main`} title="Reintentar" className="border-[0.1px] dark:border-dark-secondary border-secondary px-2 py-1 b rounded-md dark:hover:bg-dark-secondary hover:bg-secondary dark:hover:text-dark-primary hover:text-primary dark:bg-dark-primary bg-primary dark:text-dark-secondary text-secondary text-center text-md tracking-wide">
                    Reintentar
                </Link>
            </article>
        </section>
    )
}