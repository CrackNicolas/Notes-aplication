'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';

import axios from 'axios';

import ComponentForm from './form';
import ComponentInput from './input';
import ComponentLabel from './label';
import ComponentItemPriority from './item_priority';
import ComponentMessageConfirmation from '@/frontend/components/layouts/messages/confirmation';

import { validation } from '@/frontend/validations/form';

import { Props_note } from '@/frontend/types/props';
import { Props_response } from '@/context/types/response';

type Props = {
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void
}

export default function ComponentContainerForm({ setSelected, selected, setRefresh }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

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

    const onSubmit: SubmitHandler<FieldValues | Props_note> = async (data) => {
        let response;

        if (!selected) {
            response = await axios.post("api/notes", data);
        } else {
            data._id = selected._id
            response = await axios.put("api/notes", data);
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
                <span title="Titulo formulario" className="text-2xl text-secondary font-semibold text-center">
                    {(!selected) ? 'Crear nota' : 'Actualizar nota'}
                </span>
            </div>
            <ComponentForm
                handleSubmit={handleSubmit(onSubmit)}
                inputs={[
                    <Fragment>
                        <ComponentLabel title="Titulo" html_for="title" validation={validation('title')} error={errors.title?.type} />
                        <ComponentInput
                            type="text"
                            name="title"
                            placeholder="Escriba el titulo..."
                            register={register}
                            error={errors.title?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </Fragment>,
                    <Fragment>
                        <ComponentLabel title="Descripcion" html_for="description" validation={validation('description')} error={errors.description?.type} />
                        <ComponentInput
                            rows={3}
                            name="description"
                            placeholder="Escriba la descripcion..."
                            register={register}
                            error={errors.description?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </Fragment>,
                    <Fragment>
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
                    </Fragment>
                ]}
                buttons={
                    <Fragment>
                        <button type="submit" title={(!selected) ? 'Crear' : 'Actualizar'} name={(!selected) ? 'Crear' : 'Actualizar'}  className="flex w-full justify-center rounded-md text-secondary border-[0.1px] border-secondary border-opacity-80 px-3 sm:py-1.5 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                            {(!selected) ? 'Crear' : 'Actualizar'}
                        </button>
                        <button onClick={() => restart()} type="button" name="Deshacer" title="Reiniciar" className="flex w-full justify-center rounded-md text-error border-[0.1px] border-error border-opacity-80 px-3 sm:py-1.5 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                            Deshacer
                        </button>
                    </Fragment>
                }
            >
            </ComponentForm>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </div >
    )
}