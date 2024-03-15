'use client'

import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import axios from 'axios';

import ComponentInput from './input';
import ComponentLabel from './label';
import ComponentItemPriority from './item_priority';
import ComponentMessageConfirmation from '../messages/confirmation';

import { validation } from '@/frontend/validations/form';

import { Props_note } from '@/frontend/types/props';
import { Props_response } from '@/context/types/response';

type Props = {
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void
}

export default function ComponentForm({ setSelected, selected, setRefresh }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();
    const ref_form = useRef<any>(null);

    const restart = (): void => {
        setRefresh();
        reset();
        setSelected(undefined);
    }

    const open_modal = (data: Props_response): void => {
        restart();
        setOpen(true);
        setResponse(data);
    }

    const onSubmit = async () => {
        let response;
        const data_note: Props_note = {
            title: ref_form.current.title.value,
            description: ref_form.current.description.value,
            priority: ref_form.current.priority.value
        }

        if (!selected) {
            response = await axios.post("api/notes", data_note);
        } else {
            data_note._id = selected._id
            response = await axios.put("api/notes", data_note);
        }
        open_modal(response.data);
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
                <span data-testid="title-global" className="text-2xl text-secondary font-semibold text-center">
                    {(!selected) ? 'Crear nota' : 'Editar nota'}
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} ref={ref_form} className="flex flex-col gap-y-7">
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" html_for="title" validation={validation('title')} error={errors.title?.type} />
                        <ComponentInput
                            type="text"
                            name="title"
                            placeholder="Escriba el titulo..."
                            register={register}
                            error={errors.title?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Descripcion" html_for="description" validation={validation('description')} error={errors.description?.type} />
                        <ComponentInput
                            rows={3}
                            name="description"
                            placeholder="Escriba la descripcion..."
                            register={register}
                            error={errors.description?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Prioridad" html_for="priority" error={errors.priority?.type} />
                        <div className="grid grid-cols-3 gap-x-1">
                            <ComponentItemPriority
                                id="option_1"
                                value='Alta'
                                class_icon="text-red-500 rotate-[-180deg]"
                                paint={watch('priority') === "Alta"}
                                error={errors.priority?.type} 
                                register={register}
                            />
                            <ComponentItemPriority
                                id="option_2"
                                value='Media'
                                class_icon="text-orange-500 rotate-[-180deg]"
                                paint={watch('priority') === "Media"}
                                error={errors.priority?.type} 
                                register={register}
                            />
                            <ComponentItemPriority
                                id="option_3"
                                value='Baja'
                                class_icon="text-green-500"
                                paint={watch('priority') === "Baja"}
                                error={errors.priority?.type} 
                                register={register}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-10">
                    <button type="submit" data-testid="Enviar" title={(!selected) ? 'Crear nota' : 'Editar nota'} className="flex w-full justify-center rounded-md text-secondary border-[0.1px] border-secondary border-opacity-80 px-3 sm:py-1.5 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        {(!selected) ? 'Crear nota' : 'Editar nota'}
                    </button>
                    <button onClick={() => restart()} type="button" data-testid="Deshacer" title="Reiniciar" className="flex w-full justify-center rounded-md text-error border-[0.1px] border-error border-opacity-80 px-3 sm:py-1.5 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        Deshacer
                    </button>
                </div>
            </form>
            {(response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />}
        </div>
    )
}