'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import axios from 'axios';

import ComponentIcon from '@/frontend/components/partials/icon';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';
import ComponentMessageConfirmation from '@/frontend/components/layouts/messages/confirmation';

import { Props_note } from '@/context/types/note';
import { Props_response } from '@/context/types/response';
import { Props_category } from '@/context/types/category';

type Props = {
    category_selected: Props_category | undefined,
    setCategory_selected: Dispatch<SetStateAction<Props_category | undefined>>,
    note_selected: Props_note | undefined,
    redirect: (path: string) => void
}

export default function ComponentContainerForm(props: Props) {
    const { category_selected, setCategory_selected, note_selected, redirect } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

    const restart = (use_redirect: boolean): void => {
        reset();
        setFile(undefined);
        if (use_redirect) {
            redirect((note_selected) ? '/notes/search' : '/dashboard/main');
        }
    }

    const open_modal = (data: Props_response): void => {
        restart(false);
        setOpen(true);
        setResponse(data);
    }

    const capture_file = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }

    const onSubmit: SubmitHandler<FieldValues | Props_note> = async (data) => {
        let response;

        const form = new FormData();
        form.set('title', data.title);
        form.set('description', data.description);
        form.set('priority', data.priority);
        form.set('featured', data.featured);
        form.set('category', JSON.stringify(category_selected));

        if (file !== undefined) {
            form.set('file', file as File);
        }

        setLoading(true);
        if (!note_selected) {
            response = await axios.post("/api/notes", form);
        } else {
            form.set('_id', note_selected._id as string);
            response = await axios.put("/api/notes", form);
        }
        setLoading(false);
        open_modal(response.data);
    }

    const reply = () => {
        setOpen(false);
        redirect('/notes/search');
    }

    useEffect(() => {
        reset();
        setValue('title', note_selected?.title);
        setValue('description', note_selected?.description);
        setValue('priority', note_selected?.priority);
        setValue('featured', note_selected?.featured ? 'SI' : 'NO');
        setValue('category', note_selected?.category);

        if (note_selected?.category) {
            setCategory_selected(note_selected.category);
        }
    }, [note_selected])

    return (
        <div className={`flex flex-col gap-y-4 w-full sm:w-[450px] mx-auto`}>
            <div className="relative flex justify-center items-center">
                <span className="absolute left-0 bg-primary rounded-full p-1 hover:bg-room transition duration-5" title="Volver atras" onClick={() => setCategory_selected(undefined)}>
                    <ComponentIcon name="return" size={22} description_class="rotate-[-180deg] text-secondary cursor-pointer" />
                </span>
                <span title="Titulo formulario" className="text-2xl text-secondary font-semibold text-center tracking-wider">
                    {(!note_selected) ? 'Crear nota' : 'Actualizar nota'}
                </span>
                <span className="absolute right-0" title={`Categoria ${note_selected?.category.title}`}>
                    <ComponentIcon name={(note_selected) ? note_selected?.category.icon : category_selected?.icon} size={24} description_class="text-secondary" />
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" html_for="title" errors={errors} />
                        <ComponentInput
                            type="text"
                            name="title"
                            placeholder="Escriba el titulo..."
                            register={register}
                            error={errors.title?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Descripcion" html_for="description" errors={errors} />
                        <ComponentInput
                            rows={3}
                            name="description"
                            placeholder="Escriba la descripcion..."
                            register={register}
                            error={errors.description?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[65px] scroll-text py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Prioridad" html_for="priority" errors={errors} />
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
                    <div className="grid grid-cols-2 items-center my-1">
                        <ComponentLabel title="¿Destacar nota?" html_for="featured" errors={errors} />
                        <div className='flex w-full gap-x-2'>
                            <ComponentItemFeatured
                                value='SI'
                                paint={watch('featured') === 'SI'}
                                error={errors.featured?.type}
                                register={register}
                            />
                            <ComponentItemFeatured
                                value='NO'
                                paint={watch('featured') === 'NO'}
                                error={errors.featured?.type}
                                register={register}
                            />
                        </div>
                    </div>
                    <label htmlFor="file-upload" title="Seleccionar para subir un archivo" className="grid gap-y-0.5 place-items-center mt-0.5 p-1.5 cursor-pointer border-secondary border-opacity-20 bg-primary w-full rounded-md border-[0.1px] cursor-pointer hover:border-opacity-60 transition duration-500">
                        <ComponentIcon name={`upload-file${(note_selected?.file?.id) ? '-selected' : (file === undefined) ? '' : '-selected'}`} size={27} description_class="icon-home text-secondary cursor-pointer" />
                        <span className='line-clamp-1 text-secondary text-md font-normal tracking-wide'>
                            {
                                (file) ? `${file.name} seleccionado` :
                                    (note_selected?.file?.id) ? `${note_selected.file.name} cargado` : "Subir imagen..."
                            }
                        </span>
                        <input id="file-upload" accept="image/*" name="file-upload" type="file" onChange={(e) => capture_file(e)} className="sr-only" />
                    </label>
                </div>
                <div className="flex gap-x-10">
                    <button type="submit" title="Guardar" name="Guardar" className="relative flex w-full justify-center rounded-md text-secondary border-[0.1px] border-secondary border-opacity-80 px-3 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        <ComponentIcon name={!note_selected ? 'add' : 'load'} size={20} description_class="absolute left-1 top-[6px] text-secondary cursor-pointer" />
                        Guardar
                    </button>
                    <button onClick={() => restart(true)} type="button" name="Deshacer" title="Reiniciar" className="relative flex w-full justify-center rounded-md text-error border-[0.1px] border-error border-opacity-80 px-3 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        <ComponentIcon name="close" size={26} description_class="absolute right-1 top-[3px] text-error cursor-pointer" />
                        Deshacer
                    </button>
                </div>
            </form>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} reply={reply} button_close={false} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </div >
    )
}