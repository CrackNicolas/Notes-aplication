'use client'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import Link from 'next/link'

import ComponentIcon from '@/frontend/components/partials/icon'

export default function WithoutInternet() {
    const router = useRouter();

    useEffect(() => {
        if (navigator?.onLine) {
            router.push("/");
        }
    }, [navigator?.onLine])

    return (
        <section className="bg-primary pt-24 pb-9">
            <article className="flex flex-col items-center gap-y-4 max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="without_internet" size={250} view_box="0 0 192 195" />
                    <span className="mt-5 text-tertiary text-center tracking-wide text-xl">
                        Conéctate a Internet
                    </span>
                    <span className="text-fifth text-center tracking-wide text-md">
                        Sin conexion a Internet. Comprueba la conexion.
                    </span>
                </div>
                <Link href="/" title="Reintentar" className="border-[0.1px] border-secondary px-2 py-1 b rounded-md hover:bg-secondary hover:text-primary bg-primary text-secondary text-center text-md tracking-wide">
                    Reintentar
                </Link>
            </article>
        </section>
    )
}