'use client'

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentList from "@/frontend/components/layouts/search/list";
import ComponentMessageWait from "@/frontend/components/layouts/messages/wait";
import ComponentSelectStatic from "@/frontend/components/partials/form/select_static";
import ComponentButtonCreate from "@/frontend/components/layouts/search/button_create";
import ComponentSelectDynamic from "@/frontend/components/partials/form/select_dynamic";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";
import ComponentMessageConfirmationDelete from "@/frontend/components/layouts/messages/confirmation_delete";

import { Props_response } from "@/context/types/response";
import { Props_category } from "@/context/types/category";
import { Props_delete_note, Props_note } from "@/context/types/note";
import { Props_loading_notes, Props_params_search } from "@/frontend/types/props";

export default function ComponentSearch() {
    const router = useRouter();

    const { register, formState: { errors }, watch, trigger, setValue } = useForm();

    const title = watch('title');

    const ref_nav_toggle = useRef<HTMLDivElement>(null);
    const ref_button_close_toggle = useRef<HTMLButtonElement>(null);
    const ref_button_view_toggle = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [response, setResponse] = useState<Props_response>();
    const [list_notes, setList_notes] = useState<Props_note[]>([]);
    const [select_date, setSelect_date] = useState<string | undefined>('Fecha...');
    const [view_filter, setView_filter] = useState<boolean>(false);
    const [state_select, setState_select] = useState<boolean>(false);
    const [loading_notes, setLoading_notes] = useState<Props_loading_notes>();
    const [notes_selected, setNotes_selected] = useState<Props_delete_note[]>([]);
    const [loading_message, setLoading_message] = useState<boolean>(false);
    const [select_category, setSelect_category] = useState<Props_category>({ title: 'Categoria...' });
    const [select_priority, setSelect_priority] = useState<string | undefined>('Prioridad...');
    const [select_featured, setSelect_featured] = useState<string | undefined>('Nota destacada...');
    const [open_confirmation_delete, setOpen_confirmation_delete] = useState<boolean>(false);
    const [confirmation_delete, setConfirmation_delete] = useState<boolean>(false);

    const update_note = (note: Props_note): void => {
        const json = JSON.stringify({ note });
        router.push(`/notes?data=${encodeURIComponent(json)}`);
    }

    const handle_click_outside = (event: MouseEvent) => {
        if (ref_nav_toggle.current &&
            !ref_nav_toggle.current.contains(event.target as Node) &&
            !ref_button_close_toggle.current?.contains(event.target as Node) &&
            !ref_button_view_toggle.current?.contains(event.target as Node)
        ) {
            setView_filter(false);
        }
    };

    const onchange_search = (value: string) => {
        register('title');
        setValue('title', value);
    }

    const select_note = (value: boolean) => {
        setState_select(value);
        setNotes_selected([]);
    }

    const load_notes = async () => {
        setLoading_notes({ value: true, button: true });
        const { data } = await axios.get(`/api/notes${(search !== '{}') ? `/${search}` : ''}`);
        if (data.status === 200) {
            setLoading_notes({
                value: false,
                icon: `emoji-${search === '{}' ? 'without' : 'search'}-notes`,
                description: (search === '{}') ? '¡Ups! aun no tienes tu primer nota' : 'No se encontraron resultados',
                button: (search === '{}')
            });
            setList_notes(data.data);
        }
        if (data.status === 500) {
            setOpen(true);
            setResponse(data);
            setList_notes([]);
            setLoading_notes({ value: false });
        }
    }

    const listen_to_changes = async () => {
        await trigger('title');

        const criteria: Props_params_search = {
            title: (!errors.title?.type && title !== '') ? title : undefined,
            category: (select_category.title !== 'Categoria...') ? select_category : undefined,
            priority: (select_priority !== 'Prioridad...') ? select_priority : undefined,
            dates: (select_date !== 'Fecha...') ? select_date : undefined,
            featured: (select_featured !== 'Nota destacada...') ? (select_featured === 'SI') : undefined,
        }

        setSearch(JSON.stringify(criteria));
    }

    const delete_notes = async () => {
        setLoading_message(true);
        const { data } = await axios.delete(`/api/notes/${JSON.stringify(notes_selected)}`);
        if (data.status === 200) {
            setOpen(true);
            setResponse(data);
            load_notes();
            setState_select(false);
            setLoading_message(false);
            setNotes_selected([]);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    useEffect(() => {
        if (confirmation_delete) {
            delete_notes();
        }
    }, [confirmation_delete]);

    useEffect(() => {
        load_notes();
    }, [response, search]);

    useEffect(() => {
        listen_to_changes();
    }, [title, select_category, select_priority, select_featured, select_date]);

    return (
        <section className={`flex flex-col gap-5 mt-[30px] pt-7 h-[calc(100vh-30px)]`}>
            <article className={`flex gap-y-6 gap-x-3 justify-between items-center bg-primary transition-width ${view_filter ? 'sz:w-full md:w-[calc(100%-200px)]' : 'w-full'}`}>
                <div className="flex items-center sm:w-auto w-full">
                    <div className="bg-sixth border-[0.1px] border-secondary border-opacity-40 py-[4.2px] px-2 sm:rounded-l-xl rounded-l-md">
                        <ComponentIcon name="search" description_class="text-fifth mt-[3px]" size={20} view_box="0 0 24 24" />
                    </div>
                    <input
                        type="text"
                        id="search"
                        placeholder="Buscar..."
                        onChange={(e) => onchange_search(e.target.value)}
                        className="sm:w-auto w-full bg-sixth border-y-[0.1px] border-r-[0.1px] border-l-none border-secondary border-opacity-40 rounded-r-md outline-none px-2 py-1 text-fifth placeholder:opacity-60 placeholdel:text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 h-full">
                    <ComponentButtonCreate />
                    <button type="button" title="Eliminar todo" onClick={() => setOpen_confirmation_delete(true)} className={`${(notes_selected.length === 0) && 'hidden'} border-[0.1px] border-error rounded-md px-2`} >
                        <span className="text-error text-sm">
                            {
                                (list_notes.length === notes_selected.length) ? 'Eliminar todo' : 'Eliminar'
                            }
                        </span>
                    </button>
                    <button type="button" title={`${state_select ? 'Cancelar eliminacion' : 'Eliminar notas'}`} onClick={() => select_note(!state_select)} className={`${list_notes.length === 0 && 'hidden'}`} >
                        <ComponentIcon name={state_select ? 'close' : 'delete'} description_class={`transition-width cursor-pointer ${state_select ? 'text-error' : 'hover:text-error text-fifth'}`} size={state_select ? 32 : 20} view_box="0 0 16 16" />
                    </button>
                    <button ref={ref_button_view_toggle} onClick={() => setView_filter(!view_filter)} type="button" title="Filtros">
                        <ComponentIcon name="list" description_class="cursor-pointer hover:text-secondary text-fifth" size={24} view_box="0 0 16 16" />
                    </button>
                </div>
            </article>
            <article className="flex w-full pb-10">
                <ComponentList
                    loading={loading_notes}
                    notes={list_notes}
                    update_note={update_note}
                    notes_selected={notes_selected}
                    setNotes_selected={setNotes_selected}
                    state={state_select}
                    description_class={`transition-width ${view_filter ? 'w-full sz:w-full md:w-[calc(100%-200px)]' : 'w-full'}`}
                />
                <div ref={ref_nav_toggle} className={`absolute toggle-search ${view_filter ? 'translate-x-0' : 'translate-x-[120%]'} right-0 bg-primary z-50 top-[-30px] w-[200px] border-secondary border-l-[0.1px] p-2 h-[100vh]`}>
                    <p className="flex justify-between text-secondary py-1 border-b-[1px] border-opacity-50 border-secondary w-full">
                        Filtrar notas
                        <button ref={ref_button_close_toggle} type="button" title="Cerrar menu" onClick={() => setView_filter(!view_filter)}>
                            <ComponentIcon name="close" description_class="cursor-pointer hover:text-secondary text-fifth" size={24} view_box="0 0 16 16" />
                        </button>
                    </p>
                    <div className="flex flex-col gap-y-3 py-3 w-full">
                        <ComponentSelectDynamic
                            select_category={select_category}
                            setSelect_category={setSelect_category}
                            register={register}
                        />
                        <ComponentSelectStatic
                            title="Prioridad"
                            select={select_priority}
                            setSelect={setSelect_priority}
                            items={[
                                { value: 'Alta', icon: { name: 'arrow', class: 'text-red-500 rotate-[-180deg]' } },
                                { value: 'Media', icon: { name: 'arrow', class: 'text-orange-500 rotate-[-180deg]' } },
                                { value: 'Baja', icon: { name: 'arrow', class: 'text-green-500' } }
                            ]}
                        />
                        <ComponentSelectStatic
                            title="Nota destacada"
                            select={select_featured}
                            setSelect={setSelect_featured}
                            items={[
                                { value: 'SI', icon: { name: 'star-fill', class: 'text-secondary' } },
                                { value: 'NO', icon: { name: 'star-half', class: 'text-secondary' } }
                            ]}
                        />
                        <ComponentSelectStatic
                            title="Fecha"
                            select={select_date}
                            setSelect={setSelect_date}
                            items={[
                                { value: "Hoy", icon: { name: 'date', class: 'text-secondary' } },
                                { value: "Ayer", icon: { name: 'date', class: 'text-secondary' } },
                                { value: "Hace 7 dias", icon: { name: 'date', class: 'text-secondary' } },
                                { value: "Hace 1 mes", icon: { name: 'date', class: 'text-secondary' } }
                            ]}
                        />
                    </div>
                </div>
            </article>
            {
                (loading_message) && <ComponentMessageWait open={loading_message} setOpen={setLoading_message} />
            }
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                <ComponentMessageConfirmationDelete open={open_confirmation_delete} setOpen={setOpen_confirmation_delete} setConfirmation={setConfirmation_delete} />
            }
        </section>
    )
}