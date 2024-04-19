'use client'

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import axios from "axios";

import ComponentNote from "@/frontend/components/layouts/notes/note";
import ComponentLoading from "@/frontend/components/layouts/notes/list/loading";
import ComponentMessageWait from "@/frontend/components/layouts/messages/wait";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_note } from "@/context/types/note";
import { Props_response } from "@/context/types/response";

export default function ComponentSearch() {
    const router = useRouter();

    const [list_notes, setList_notes] = useState<Props_note[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

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
    }, [response]);

    return (
        <section className="flex flex-col gap-5 mt-[30px] py-7">
            <article className="bg-primary h-[100px] border-secondary border-opacity-50 border-[0.1px] rounded-md">

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