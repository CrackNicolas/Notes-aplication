import Link from "next/link";

import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    response?: boolean
}

export default function ComponentButtonCreate(props: Props) {
    const { response = true } = props;

    return (
        <Link href="/notes" title="Crear nota" className={`group relative flex items-center justify-between gap-x-1 rounded-md text-primary ${response ? 'sm:border-[0.1px] sm:border-secondary sm:border-opacity-80 sm:px-1 bg-primary sm:bg-secondary' : 'border-[0.1px] border-secondary border-opacity-80 px-1 bg-secondary'} py-0.5 text-md font-normal hover:font-semibold tracking-wider hover:bg-primary hover:text-secondary outline-none`}>
            <ComponentIcon name='add' size={20} description_class={`group-hover:text-secondary ${response ? 'text-fifth sm:text-primary' : 'text-primary'} cursor-pointer`} />
            <span className={`${response && 'sm:flex hidden'} w-full text-sm mt-[1px] transition duration-500`}>
                Crear nota
            </span>
        </Link>
    )
}