'use client'

import { useContext, useEffect, useState } from "react";

import axios from 'axios';

import ComponentContainerForm from "./container_form";
import ComponentList from "@/frontend/components/layouts/notes/list/container";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Context } from "@/context/provider";
import { Props_note } from "@/context/types/note";
import { Props_response } from "@/context/types/response";

export default function ComponentNotes() {
    const { session } = useContext(Context);

    const [list_notes, setList_notes] = useState<Props_note[]>([]);
    const [selected_note, setSelected_note] = useState<Props_note | undefined>(undefined);
    const [load, setLoad] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const refresh = (): void => {
        setLoad(!load);
    }

    useEffect(() => {
        const load_notes = async () => {
            const { data } = await axios.get(`/api/notes/${session.user.id}${(search !== "{}") ? `/${search}` : ''}`);
            if (data.status === 200) {
                setList_notes(data.data);
            }
            if (data.status === 500) {
                setOpen(true);
                setResponse(data);
                setList_notes([]);
            }
        }
        
        if(session.user.id !== ''){
            load_notes();
        }

    }, [load, search, session.user])

    return (
        <section className="flex flex-col justify-center mt-4 pt-12 pb-5">
            <article className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                <ComponentContainerForm selected={selected_note} setSelected={setSelected_note} setRefresh={refresh} user={session.user} />
                <ComponentList notes={list_notes} setSelected={setSelected_note} selected={selected_note} setRefresh={refresh} setSearch={setSearch} />
            </article>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}