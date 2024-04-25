import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormClearErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import axios from "axios";

import ComponentIcon from '@/frontend/components/partials/icon';

import { validation } from "@/frontend/validations/form";
import { Props_category } from "@/context/types/category";

type Props = {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required", string> | undefined,
    select_category: string,
    setSelect_category: Dispatch<SetStateAction<string>>
    register: UseFormRegister<FieldValues>,
    setValue?: UseFormSetValue<FieldValues>,
    clearErrors?: UseFormClearErrors<FieldValues>,
    required?: boolean
}

export default function ComponentSelect(props: Props) {
    const { error, select_category, setSelect_category, register, required, setValue = () => { }, clearErrors = () => { } } = props;

    const [open_category, setOpen_category] = useState<boolean>(false);
    const [categorys, setCategorys] = useState<Props_category[] | []>([]);

    const selected = (category: string) => {
        setValue('category', category);
        setSelect_category(category);
        setOpen_category(false);
        clearErrors('category');
    }

    useEffect(() => {
        const load_categorys = async () => {
            const { data } = await axios.get("/api/categorys/true");

            if (data.status === 200) {
                setCategorys(data.data);
            }
        }
        load_categorys();
    }, []);

    useEffect(() => {
        if (select_category === 'Seleccionar categoria...') {
            setValue('category', undefined);
        }
    }, [select_category]);

    return (
        <div className='relative flex w-full'>
            {
                (categorys.length === 0) ?
                    <div title="Cargando categorias" className="flex justify-between items-center w-full py-1 px-2 border-secondary border-[0.1px] border-opacity-50 rounded-md">
                        <span className="text-secondary">
                            Cargando categorias...
                        </span>
                        <div className='spinner-load w-[15px] h-[15px] rounded-full'></div>
                    </div>
                    :
                    <Fragment>
                        <div title="Categoria" onClick={() => setOpen_category(!open_category)} {...register('category', validation('category', required))} className={`flex justify-between items-center bg-primary w-full rounded-md border-[0.1px] ${open_category && 'rounded-b-none'} ${!error ? 'border-secondary' : 'border-error'} border-opacity-50 py-1 px-2 cursor-pointer`}>
                            <span title="Seleccionar categoria" className={`${!error ? 'text-secondary' : 'text-error'} text-md`}>
                                {select_category}
                            </span>
                            <ComponentIcon name={open_category ? 'caret-up' : 'caret-down'} size={20} description_class={`${!error ? 'text-secondary' : 'text-error'}`} />
                        </div>
                        <ul title="Lista de categorias" className={`${(!open_category) && 'hidden'} absolute z-10 mt-[32px] w-full ${(categorys.length >= 4) && 'overflow-hidden overflow-y-scroll scroll-select h-[130px]'} bg-primary border-[0.1px] ${!error ? 'border-secondary' : 'border-error'} rounded-b-md border-opacity-50`}>
                            {
                                categorys.filter(category => category.title != select_category).map(category => {
                                    return (
                                        <li key={category.title} title={category.title} onClick={() => selected(category.title)} className={`flex justify-between items-center group ${!error ? 'text-secondary hover:bg-secondary' : 'text-error hover:bg-error'} hover:text-primary px-2 py-1 cursor-pointer hover:font-semibold`}>
                                            <span className="text-md font-normal group-hover:font-semibold">
                                                {category.title}
                                            </span>
                                            <ComponentIcon name={category.icon} size={17} view_box="0 0 16 16" description_class={`group-hover:text-primary ${!error ? 'text-secondary' : 'text-error'} duration-300 `} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Fragment>
            }
        </div>
    )
}