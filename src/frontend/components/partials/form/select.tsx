import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormRegister } from "react-hook-form";

import ComponentIcon from '@/frontend/components/partials/icon';

import { validation } from "@/frontend/validations/form";

type Props = {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required", string> | undefined,
    select_category: string,
    setSelect_category: Dispatch<SetStateAction<string>>
    register: UseFormRegister<FieldValues>
}

export default function ComponentSelect(props: Props) {
    const { error, select_category, setSelect_category, register } = props;

    const [open_category, setOpen_category] = useState<boolean>(false);
    const categorys = ["Viajes", "Personal", "Trabajo"]

    const selected = (category: string) => {
        setSelect_category(category);
        setOpen_category(false);
    }

    useEffect(() => {
        setOpen_category(false);
    }, [select_category]);

    return (
        <div title="Categoria" className='relative flex w-full'>
            <div onClick={() => setOpen_category(!open_category)} {...register('category', validation('category'))} className={`flex justify-between items-center bg-primary w-full rounded-md border-[0.1px] ${open_category && 'rounded-b-none'} ${!error ? 'border-secondary' : 'border-error'} border-opacity-50 py-1 px-2 cursor-pointer`}>
                <span className={`${!error ? 'text-secondary' : 'text-error'} text-md`}>
                    {select_category}
                </span>
                <ComponentIcon name={open_category ? 'caret-up' : 'caret-down'} size={20} description_class={`${!error ? 'text-secondary' : 'text-error'}`} />
            </div>
            <ul className={`${(!open_category) && 'hidden'} absolute z-10 mt-[32px] w-full bg-primary border-[0.1px] ${!error ? 'border-secondary' : 'border-error'} rounded-b-md border-opacity-50`}>
                {
                    categorys.filter(category => category != select_category).map(category => {
                        return <li key={category} onClick={() => selected(category)} className={`${!error ? 'text-secondary hover:bg-secondary' : 'text-error hover:bg-error'} hover:text-primary px-2 py-0.5 select-none cursor-pointer hover:font-semibold`}>
                            {category}
                        </li>
                    })
                }
            </ul>
        </div>
    )
}