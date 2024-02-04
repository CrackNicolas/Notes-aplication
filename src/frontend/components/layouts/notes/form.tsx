'use client'

import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import axios from 'axios';

import ComponentLabel from './label';

import { validation } from '@/frontend/validations/form';
import { Props_note } from '@/frontend/types/props';

type Props = {
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void
}

export default function ComponentForm({ setSelected, selected, setRefresh }: Props) {
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

    const ref_form = useRef<any>(null);

    const restart = () => {
        setRefresh();
        reset();
        setSelected(undefined);
    }

    const onSubmit = async () => {
        if (selected === undefined) {
            const { data } = await axios.post("api/notes", {
                title: ref_form.current.title.value,
                description: ref_form.current.description.value,
                priority: ref_form.current.priority.value
            })
            console.log(data);
            if (data.status === 201) {
                restart();
                //Crear modal para confirmar creacion de una nota
            }
            if (data.status === 400) {

            }
        }
        if (selected !== undefined) {
            const { data } = await axios.put("api/notes", {
                _id: selected._id,
                title: ref_form.current.title.value,
                description: ref_form.current.description.value,
                priority: ref_form.current.priority.value
            })
            if (data.status === 200) {
                restart();
                //Crear modal para confirmar modificacion de la nota
            }
        }
    }

    useEffect(() => {
        reset();
        setValue('title', selected?.title);
        setValue('description', selected?.description);
        setValue('priority', selected?.priority);
    }, [selected])

    return (
        <div className="col-span-full lg:col-span-1 flex flex-col gap-y-2">
            <div className="flex justify-center">
                <span className="text-2xl text-secondary font-semibold text-center">
                    {
                        (selected === undefined) ? 'Crear nota' : 'Editar nota'
                    }
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} ref={ref_form} className="flex flex-col gap-y-7">
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" html_for="title" error={errors.title?.type} />
                        <input
                            {...register('title', validation('title'))}
                            type="text"
                            id="title"
                            placeholder="Escriba el titulo..."
                            className={`${(errors.title?.type === undefined) ? 'border-secondary text-secondary placeholder:text-secondary' : 'border-error text-error placeholder:text-error'} border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Descripcion" html_for="description" error={errors.description?.type} />
                        <textarea
                            {...register('description', validation('description'))}
                            rows={3}
                            id="description"
                            placeholder="Escriba la descripcion..."
                            className={`${(errors.description?.type === undefined) ? 'border-secondary text-secondary placeholder:text-secondary' : 'border-error text-error placeholder:text-error'} border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Prioridad" html_for="priority" error={errors.priority?.type} />
                        <div className="grid grid-cols-3 gap-x-1">
                            <input {...register('priority', validation('priority'))} type="radio" id="option_1" value="Alta" className='hidden' />
                            <input {...register('priority', validation('priority'))} type="radio" id="option_2" value="Media" className='hidden' />
                            <input {...register('priority', validation('priority'))} type="radio" id="option_3" value="Baja" className='hidden' />
                            <div className={`${(watch('priority') === "Alta") ? 'bg-secondary text-primary' : 'bg-primary text-secondary'}  ${(errors.priority?.type === undefined) ? 'border-secondary' : 'border-error'} col-span-1 border-[0.1px] rounded-sm grid place-items-center`}>
                                <label htmlFor="option_1" className={`w-full text-center text-sm tracking-wider font-semibold  ${(errors.priority?.type === undefined) ? 'hover:bg-secondary' : 'hover:bg-error text-error'} hover:text-primary cursor-pointer py-0.5`}>Alta</label>
                            </div>
                            <div className={`${(watch('priority') === "Media") ? 'bg-secondary text-primary' : 'bg-primary text-secondary'} ${(errors.priority?.type === undefined) ? 'border-secondary' : 'border-error'} col-span-1 border-[0.1px] rounded-sm grid place-items-center`}>
                                <label htmlFor="option_2" className={`w-full text-center text-sm tracking-wider font-semibold  ${(errors.priority?.type === undefined) ? 'hover:bg-secondary' : 'hover:bg-error text-error'} hover:text-primary cursor-pointer py-0.5`}>Media</label>
                            </div>
                            <div className={`${(watch('priority') === "Baja") ? 'bg-secondary text-primary' : 'bg-primary text-secondary'}  ${(errors.priority?.type === undefined) ? 'border-secondary' : 'border-error'} col-span-1 border-[0.1px] rounded-sm grid place-items-center`}>
                                <label htmlFor="option_3" className={`w-full text-center text-sm tracking-wider font-semibold  ${(errors.priority?.type === undefined) ? 'hover:bg-secondary' : 'hover:bg-error text-error'} hover:text-primary cursor-pointer py-0.5`}>Baja</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-10">
                    <button type="submit" title={(selected === undefined) ? 'Crear nota' : 'Editar nota'} className="flex w-full justify-center rounded-md text-secondary border-[0.1px] border-secondary border-opacity-80 px-3 py-1.5 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        {
                            (selected === undefined) ? 'Crear nota' : 'Editar nota'
                        }
                    </button>
                    <button onClick={() => setSelected(undefined)} type="button" title="Reiniciar" className="flex w-full justify-center rounded-md text-error border-[0.1px] border-error border-opacity-80 px-3 py-1.5 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        Deshacer
                    </button>
                </div>
            </form>
        </div>
    )
}