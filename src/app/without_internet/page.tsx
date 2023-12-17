'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

import ComponentIcon from '@/frontend/components/partials/icon'

export default function WithoutInternet() {
    const router = useRouter();

    useEffect(() => {
        if (navigator.onLine) {
            router.push("/")
        }
    }, [navigator.onLine])

    return (
        <section className="bg-primary pt-24 pb-9">
            <article className="mx-auto max-w-7xl px-2 lg:px-10">
                <div className="flex flex-col place-items-center">
                    <ComponentIcon name="without_internet" size={250} view_box="0 0 192 195" />
                    <span className="mt-5 text-tertiary text-center tracking-wide text-xl">
                        Conéctate a Internet
                    </span>
                    <span className="text-tertiary opacity-50 text-center tracking-wide text-md">
                        Sin conexion a Internet. Comprueba la conexion.
                    </span>
                </div>
                <div className="text-secondary text-center">
                    <Link href="/" title="Reintentar" className="text-blue-500 text-center text-md tracking-wide">
                        Reintentar
                    </Link>
                </div>
            </article>
        </section>
    )
}