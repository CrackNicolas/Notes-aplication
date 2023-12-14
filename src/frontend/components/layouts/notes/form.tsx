'use client'

import { useForm } from 'react-hook-form';
import { useRef } from 'react';

import ComponentLabel from './label';

import { validation } from '@/frontend/validations/form';

export default function ComponentForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const ref_form = useRef<any>(null);

    const onSubmit = () => {
        console.log(ref_form.current.title.value)
    }

    return (
        <div className="col-span-1 flex flex-col gap-y-2">
            <div className="flex justify-center">
                <span className="text-2xl text-secondary font-semibold text-center">Crear nota</span>
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
                            className={`${(errors.title?.type===undefined)?'border-secondary text-secondary placeholder:text-secondary':'border-error text-error placeholder:text-error'} border-opacity-50 bg-primary w-full rounded-md border-[0.1px]  py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Descripcion" html_for="description" error={errors.description?.type} />
                        <textarea
                            {...register('description', validation('description'))}
                            rows={3}
                            id="description"
                            placeholder="Escriba la descripcion..."
                            className={`${(errors.description?.type===undefined)?'border-secondary text-secondary placeholder:text-secondary':'border-error text-error placeholder:text-error'} border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none text-secondary tracking-wide placeholder:text-secondary placeholder:opacity-70 sm:text-md`}
                        />
                    </div>
                </div>
                <button type="submit" title="Crear nota" className="flex w-full justify-center rounded-md text-secondary border-[0.1px] border-secondary border-opacity-80 px-3 py-1.5 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                    Crear nota
                </button>
            </form>
        </div>
    )
}