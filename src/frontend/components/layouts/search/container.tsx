'use client'

import { useEffect, useState } from "react";

import axios from "axios";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_note } from "@/context/types/note";
import { Props_response } from "@/context/types/response";

import { Time_elapsed } from "@/frontend/logic/time";

export default function ComponentSearch() {
    const [list_notes, setList_notes] = useState<Props_note[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    useEffect(() => {
        const load_notes = async () => {
            const { data } = await axios.get(`/api/notes`);
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
    }, []);

    return (
        <section className="flex flex-col gap-5 mt-[30px] p-7">
            <article className="bg-primary h-[100px] border-secondary border-opacity-50 border-[0.1px] rounded-md">

            </article>
            <article className="grid grid-cols-2 place-items-center gap-4">
                {
                    list_notes.map(note => {
                        return (
                            <div title="Nota" key={note._id} className="relative col-span-1 bg-sixth w-full rounded-md border-secondary border-opacity-20 border-[0.1px] sm:px-2.5 px-2 sm:py-2 py-1.5">
                                <div className="col-span-6 sm:col-span-7 md:col-span-8 flex flex-col">
                                    <span className="flex">
                                        <span className="line-clamp-1 text-md font-normal group-hover:font-semibold tracking-wide text-secondary">
                                            {note.title}
                                        </span>
                                        <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto right-3 text-red-500 rotate-[-180deg] mt-[3px] " />
                                    </span>
                                    <p className="line-clamp-1 text-sm text-tertiary opacity-50">
                                        {note.description}
                                    </p>
                                    <span title="Tiempo transcurrido" className="sm:visible invisible absolute right-3 text-tertiary text-[11px] opacity-50">
                                        {
                                            Time_elapsed(note.createdAt)
                                        }
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </article>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}