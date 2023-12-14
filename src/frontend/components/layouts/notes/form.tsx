import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { validation } from '@/frontend/validations/form';
import ComponentLabel from './label';

export default function ComponentForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const ref_form = useRef<null>(null);

    const onSubmit = () => {

    }

    return (
        <div className="col-span-1 flex flex-col gap-y-2">
            <div className="flex justify-center">
                <span className="text-2xl text-secondary font-semibold text-center">Crear nota</span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} ref={ref_form} className="flex flex-col gap-y-7">
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" html_for="title" errors={errors} />
                        <input
                            {...register('name', validation('name'))}
                            type="text"
                            id="title"
                            placeholder="Escriba el titulo..."
                            className="bg-primary w-full rounded-md border-[0.1px] border-secondary border-opacity-50 py-1.5 px-2 outline-none text-secondary tracking-wide placeholder:text-secondary placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <label htmlFor="description" className="text-sm font-normal text-secondary tracking-wider">
                            Descripcion
                        </label>
                        <textarea
                            {...register('description', validation('description'))}
                            rows={3}
                            id="description"
                            placeholder="Escriba la descripcion..."
                            className="bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll border-secondary border-opacity-50 py-1.5 px-2 outline-none text-secondary tracking-wide placeholder:text-secondary placeholder:opacity-70 sm:text-md"
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