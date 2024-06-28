import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import ComponentIcon from '@/frontend/components/partials/icon';

import { Props_items_select } from "@/frontend/types/props";

type Props = {
    title: string,
    select: string | undefined,
    setSelect: Dispatch<SetStateAction<string | undefined>>
    items: Props_items_select[]
}

export default function ComponentSelect(props: Props) {
    const { title, select, setSelect, items } = props;

    const list = useRef<HTMLUListElement>(null);
    const ref_select = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<boolean>(false);

    const handle_click_outside = (event: MouseEvent) => {
        if (ref_select.current && !ref_select.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    const selected = (value: string) => {
        setOpen(false);
        setSelect((value === title) ? undefined : value);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    return (
        <div ref={ref_select} className='relative flex w-full'>
            <div title={title} onClick={() => setOpen(!open)} className={`flex justify-between items-center bg-primary w-full rounded-md border-[0.1px] ${open && 'rounded-b-none'} border-secondary border-opacity-50 py-1 px-2 cursor-pointer`}>
                <span title={`Seleccionar ${title}`} className="text-secondary text-md">
                    {select}
                </span>
                <ComponentIcon name={open ? 'caret-up' : 'caret-down'} size={20} description_class="text-secondary cursor-pointer" />
            </div>
            <ul ref={list} title="Lista de opciones" className={`${(!open) && 'hidden'} absolute z-10 mt-[32px] w-full bg-primary border-[0.1px] border-secondary rounded-b-md border-opacity-50`}>
                {
                    select != `${title}...` && (
                        <li onClick={() => selected(`${title}...`)} title={`${title}...`} className="group flex justify-between hover:bg-secondary items-center px-2 py-1 cursor-pointer hover:font-semibold">
                            <span className="text-md font-normal group-hover:font-semibold group-hover:text-primary text-secondary">
                                {title}...
                            </span>
                        </li>
                    )
                }
                {
                    items.map((item: Props_items_select, index: number) => {
                        return (
                            <li key={index} onClick={() => selected(item.value)} title={item.value} className="group flex justify-between items-center hover:bg-secondary px-2 py-1 cursor-pointer">
                                <span className="text-md font-normal group-hover:font-semibold group-hover:text-primary text-secondary">
                                    {item.value}
                                </span>
                                <ComponentIcon name={item.icon.name} size={16} description_class={`group-hover:text-primary ${item.icon.class} cursor-pointer`} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}