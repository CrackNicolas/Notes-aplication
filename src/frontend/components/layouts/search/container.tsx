'use client'

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import axios from "axios";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentNote from "@/frontend/components/layouts/notes/note";
import ComponentLabel from "../../partials/form/label";
import ComponentInput from "../../partials/form/input";
import ComponentSelect from '@/frontend/components/partials/form/select';
import ComponentLoading from "@/frontend/components/layouts/notes/list/loading";
import ComponentMessageWait from "@/frontend/components/layouts/messages/wait";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_note } from "@/context/types/note";
import { Props_response } from "@/context/types/response";

import { Url } from "@/frontend/logic/url";

export default function ComponentSearch() {
    const router = useRouter();

    const { register, formState: { errors }, watch, trigger } = useForm();

    const [list_notes, setList_notes] = useState<Props_note[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();
    const [search, setSearch] = useState<string>('');
    const [select_category, setSelect_category] = useState<string>('Seleccionar categoria...');
    const [notes_featured, setNotes_featured] = useState<boolean | undefined>(undefined);

    const action_note = async (action: string, note: Props_note) => {
        switch (action) {
            case 'delete':
                setLoading(true);
                const { data } = await axios.delete(`/api/notes/${note._id}`);
                setOpen(true);
                setResponse(data);
                setLoading(false);
                break;
            case 'update':
                const json = JSON.stringify({ note });
                router.push(`/notes?data=${encodeURIComponent(json)}`);
                break;
        }
    }

    useEffect(() => {
        const load_notes = async () => {
            const { data } = await axios.get(`/api/notes${search}`);
            if (data.status === 200) {
                setList_notes(data.data);
            }
            if (data.status === 500) {
                setOpen(true);
                setResponse(data);
                setList_notes([]);
            }
        }
        load_notes();
    }, [response, search]);

    const title = watch('title');

    useEffect(() => {
        const listen_to_changes = async () => {
            await trigger('title');

            let criteria = `/${(!errors.title?.type && title !== '') ? title : undefined}`
                + `/${(select_category !== 'Seleccionar categoria...') ? select_category : undefined}`
                + `/${notes_featured}`;

            setSearch(Url(criteria));
        }
        listen_to_changes();
    }, [title, select_category, notes_featured]);

    return (
        <section className="flex flex-col gap-5 mt-[30px] pt-7 pb-12">
            <article className="flex flex-col gap-y-3 items-center p-3 bg-primary border-secondary border-opacity-50 border-[0.1px] rounded-md">
                <div className="flex justify-between w-full">
                    <span className="text-secondary text-center font-semibold text-lg tracking-wider">
                        Criterios de busqueda
                    </span>
                    <div className="flex gap-x-2">
                        <span title="Todas las notas" onClick={() => setNotes_featured(undefined)} className={`cursor-pointer ${(notes_featured === undefined) ? '' : 'opacity-30'}`}>
                            <ComponentIcon name="star" size={20} description_class={`text-secondary`} />
                        </span>
                        <span title="Notas no destacadas" onClick={() => setNotes_featured(false)} className={`cursor-pointer ${(notes_featured === false) ? '' : 'opacity-30'}`}>
                            <ComponentIcon name="star-half" size={20} description_class={`text-secondary`} />
                        </span>
                        <span title="Notas destacadas" onClick={() => setNotes_featured(true)} className={`cursor-pointer ${(notes_featured === true) ? '' : 'opacity-30'}`}>
                            <ComponentIcon name="star-fill" size={20} description_class={`text-secondary`} />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-3 w-full">
                    <div className="col-span-1 flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" html_for="title" errors={errors} />
                        <ComponentInput
                            type="text"
                            name="title"
                            placeholder="Escriba el titulo..."
                            register={register}
                            error={errors.title?.type}
                            required={false}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="col-span-1 flex flex-col gap-y-0.5">
                        <ComponentLabel title="Categoria" html_for="category" />
                        <ComponentSelect
                            select_category={select_category}
                            setSelect_category={setSelect_category}
                            register={register}
                        />
                    </div>
                </div>
            </article>
            <article className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-4">
                {
                    (list_notes.length === 0) ?
                        <ComponentLoading count={12} />
                        :
                        list_notes.map(note => {
                            return <ComponentNote key={note._id} note={note} action_note={action_note} />
                        })
                }
            </article>
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}