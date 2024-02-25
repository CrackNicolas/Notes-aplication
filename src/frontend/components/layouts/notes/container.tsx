'use client'

import { useEffect, useState } from "react";

import axios from 'axios';

import ComponentForm from "./form";
import ComponentList from "./list/container";
import ComponentMessageConfirmation from "../messages/confirmation";

import { Props_note } from "@/frontend/types/props";
import { Props_response } from "@/context/types/response";

export default function ComponentNotes() {
    const [list_notes, setList_notes] = useState<Props_note[] | []>([]);
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
            const { data } = await axios.get(`api/notes${(search !== "") ? `/${search}` : ''}`);
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
    }, [load, search])

    return (
        <section className="flex min-h-full flex-col justify-center mt-[30px] px-5 py-12 sm:px-10  mx-auto max-w-7xl">
            <article className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                <ComponentForm selected={selected_note} setSelected={setSelected_note} setRefresh={refresh} />
                <ComponentList notes={list_notes} setSelected={setSelected_note} selected={selected_note} setRefresh={refresh} setSearch={setSearch} />
            </article>
            {(response != undefined) &&
                <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}