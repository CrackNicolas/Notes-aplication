'use client'

import { useRouter } from "next/navigation";

import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
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

import { Props_params_search } from "@/frontend/types/props";

export default function ComponentSearch() {
    const router = useRouter();
    
    const { register, formState: { errors }, watch, trigger } = useForm();
    
    const title = watch('title');

    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();
    const [params, setParams] = useState<Props_params_search>();
    const [list_notes, setList_notes] = useState<Props_note[]>([]);
    const [select_category, setSelect_category] = useState<string>('Seleccionar categoria...');
    const [select_date, setSelect_date] = useState<DateValueType>({ startDate: null, endDate: null });

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
            const { data } = await axios.get(`/api/notes${(search !== '{}') ? `/${search}` : ''}`);
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

    useEffect(() => {
        const listen_to_changes = async () => {
            await trigger('title');

            const criteria: Props_params_search = {
                title: (!errors.title?.type && title !== '') ? title : undefined,
                category: (select_category !== 'Seleccionar categoria...') ? select_category : undefined,
                priority: params?.priority,
                dates: (select_date?.startDate) ? select_date : undefined,
                featured: params?.featured
            }

            setSearch(JSON.stringify(criteria));
        }
        listen_to_changes();
    }, [title, select_category, params, select_date]);

    const listen_params = (type: string, value: string | boolean) => {
        const updated_params = { ...params };

        if (updated_params[type] === value) {
            delete updated_params[type];
        } else {
            updated_params[type] = value;
        }
        setParams(updated_params);
    }

    return (
        <section className="flex flex-col gap-5 mt-[30px] pt-7 h-[calc(100vh-50px)]">
            <article className="flex flex-col gap-y-3 items-center p-3 bg-primary border-secondary border-opacity-50 border-[0.1px] rounded-md">
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-x-3 py-1">
                        <span title="Prioridad Alta" onClick={() => listen_params('priority', 'Alta')} className={`${(params?.priority === 'Alta') && 'shadow-md shadow-secondary'} grid place-items-center rounded-full p-1 bg-sixth hover:shadow-md hover:shadow-secondary cursor-pointer`}>
                            <ComponentIcon name="arrow" size={16} description_class="text-red-500 rotate-[-180deg] cursor-pointer" />
                        </span>
                        <span title="Prioridad Media" onClick={() => listen_params('priority', 'Media')} className={`${(params?.priority === 'Media') && 'shadow-md shadow-secondary'} grid place-items-center rounded-full p-1 bg-sixth hover:shadow-md hover:shadow-secondary cursor-pointer`}>
                            <ComponentIcon name="arrow" size={16} description_class="text-orange-500 rotate-[-180deg] cursor-pointer" />
                        </span>
                        <span title="Prioridad Baja" onClick={() => listen_params('priority', 'Baja')} className={`${(params?.priority === 'Baja') && 'shadow-md shadow-secondary'} grid place-items-center rounded-full p-1 bg-sixth hover:shadow-md hover:shadow-secondary cursor-pointer`}>
                            <ComponentIcon name="arrow" size={16} description_class="text-green-500 cursor-pointer" />
                        </span>
                    </div>
                    <span className="text-secondary text-center font-semibold text-lg tracking-wider">
                        Criterios de busqueda
                    </span>
                    <div className="flex gap-x-3">
                        <span title="Notas no destacadas" onClick={() => listen_params('featured', false)} className={`hover:opacity-100 ${(params?.['featured'] === false) ? '' : 'opacity-30'}`}>
                            <ComponentIcon name="star-half" size={22} description_class="text-secondary cursor-pointer" />
                        </span>
                        <span title="Notas destacadas" onClick={() => listen_params('featured', true)} className={`hover:opacity-100 ${(params?.['featured'] === true) ? '' : 'opacity-30'}`}>
                            <ComponentIcon name="star-fill" size={22} description_class="text-secondary cursor-pointer" />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full">
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
                    <div className="col-span-1 flex flex-col gap-y-0.5">
                        <ComponentLabel title="Fecha" html_for="date" />
                        <Datepicker
                            value={select_date}
                            onChange={(event) => setSelect_date(event)}
                            i18n={"es"}
                            primaryColor={'cyan'}
                            separator=" hasta "
                            placeholder="Selecciona fecha"
                            readOnly={true}
                            minDate={new Date("2024-01-01")}
                            maxDate={new Date()}
                            startFrom={new Date()}
                            configs={{
                                shortcuts: {
                                    today: "Hoy",
                                    yesterday: "Ayer",
                                    past: period => `Últimos ${period} dias`,
                                    currentMonth: "Mes actual",
                                    pastMonth: "Mes pasado"
                                }
                            }}
                            popoverDirection="down"
                            showShortcuts={true}
                            toggleClassName={"absolute bg-primary rounded-r-md border border-secondary border-opacity-70 text-secondary right-0 h-full px-3 hover:bg-secondary hover:text-primary focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"}
                            inputClassName={"w-full placeholder:text-secondary placeholder:opacity-70 bg-primary text-secondary border border-secondary border-opacity-50 border-[0.1px] rounded-md py-1 px-2 outline-none "}
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