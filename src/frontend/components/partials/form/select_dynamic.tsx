import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormClearErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import axios from "axios";

import ComponentIcon from '@/frontend/components/partials/icon';

import { Props_category } from "@/context/types/category";

import { validation } from "@/frontend/validations/form";

type Props = {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required", string> | undefined,
    select_category: Props_category,
    setSelect_category: Dispatch<SetStateAction<Props_category>>
    register: UseFormRegister<FieldValues>,
    setValue?: UseFormSetValue<FieldValues>,
    clearErrors?: UseFormClearErrors<FieldValues>,
    required?: boolean
}

export default function ComponentSelect(props: Props) {
    const list = useRef<HTMLUListElement>(null);
    const ref_select = useRef<HTMLDivElement>(null);

    const { error, select_category, setSelect_category, register, required, setValue = () => { }, clearErrors = () => { } } = props;

    const [open_category, setOpen_category] = useState<boolean>(false);
    const [categorys, setCategorys] = useState<Props_category[]>([]);

    const item_default: Props_category = {
        title: 'Categoria...'
    }

    const handle_click_outside = (event: MouseEvent) => {
        if (ref_select.current && !ref_select.current.contains(event.target as Node)) {
            setOpen_category(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    const selected = (category: Props_category) => {
        setValue('category', category);
        setSelect_category(category);
        setOpen_category(false);
        clearErrors('category');
        setCategorys(prev => prev.some(item => item.title === item_default.title) ? prev : [item_default, ...prev]);
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
        if (select_category.title === 'Categoria...') {
            setValue('category', undefined);
        }
    }, [select_category]);

    return (
        <div ref={ref_select} className='relative flex w-full'>
            {
                (categorys.length === 0) ?
                    <div title="Cargando categorias" className="flex justify-between items-center w-full py-1 px-2 border-secondary border-[0.1px] border-opacity-50 rounded-md">
                        <span className="text-secondary opacity-70">
                            Cargando...
                        </span>
                        <div className='spinner-load w-[15px] h-[15px] rounded-full'></div>
                    </div>
                    :
                    <Fragment>
                        <div title="Categoria" onClick={() => setOpen_category(!open_category)} {...register('category', validation('category', required))} className={`flex justify-between items-center bg-primary w-full rounded-md border-[0.1px] ${open_category && 'rounded-b-none'} ${!error ? 'border-secondary' : 'border-error'} border-opacity-50 py-1 px-2 cursor-pointer`}>
                            <span title="Seleccionar categoria" className={`${!error ? 'text-secondary' : 'text-error'} text-md`}>
                                {select_category.title}
                            </span>
                            <ComponentIcon name={open_category ? 'caret-up' : 'caret-down'} size={20} description_class={`${!error ? 'text-secondary' : 'text-error'} cursor-pointer`} />
                        </div>
                        <ul ref={list} title="Lista de categorias" className={`${(!open_category) && 'hidden'} absolute z-10 mt-[32px] w-full ${(categorys.length >= 4) && 'overflow-hidden overflow-y-scroll h-[130px]'} bg-primary border-[0.1px] ${!error ? 'border-secondary scroll-select' : 'border-error scroll-select-error'} rounded-b-md border-opacity-50`}>
                            {
                                categorys.filter(category => category.title != select_category.title).map(category => {
                                    return (
                                        <li key={category.title} title={category.title} onClick={() => selected(category)} className={`flex justify-between items-center group ${!error ? 'text-secondary hover:bg-secondary' : 'text-error hover:bg-error'} hover:text-primary px-2 py-1 cursor-pointer hover:font-semibold`}>
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