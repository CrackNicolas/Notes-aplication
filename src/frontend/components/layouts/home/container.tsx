import Link from "next/link";

import ComponentIcon from "@/frontend/components/partials/icon";

export default function ComponentHome() {
    return (
        <div className="relative px-6 lg:px-8">
            <div className="mt-[150px] flex flex-col items-center gap-y-9">
                <ComponentIcon testid="icon-home" name="logo" size={70} description_class="text-secondary" />
                <div className="flex flex-col gap-y-2">
                    <span className="text-center text-4xl font-bold tracking-wider text-tertiary text-2xl sm:text-6xl">
                        Aplicacion de notas
                    </span>
                    <span className="text-center text-md sm:text-lg leading-8 text-tertiary opacity-60 tracking-wider">
                        ¡Organiza tu vida, toma notas sin límites!
                    </span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-x-6">
                    <Link href="/dashboard/main" title="Empezar" className="rounded-md border-[1px] border-secondary text-secondary hover:bg-gradient-to-r from-secondary vie-secondary px-3.5 py-2.5 text-sm font-normal hover:font-semibold hover:text-primary tracking-wider transition duration-500 cursor-pointer">
                        Empezar
                    </Link>
                </div>
            </div>
        </div>
    )
}