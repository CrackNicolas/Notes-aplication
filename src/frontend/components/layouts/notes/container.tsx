'use client'

import { useEffect, useState } from "react";

import axios from 'axios';

import ComponentForm from "./form";
import ComponentList from "./list";

import { Props_note } from "@/frontend/types/props";

export default function ComponentNotes() {
    const [list_notes, setList_notes] = useState<Props_note[]>([]);
    const [selected_note, setSelected_note] = useState<Props_note | undefined>(undefined);

    useEffect(() => {
        const load_notes = async () => {
            const { data } = await axios.get('api/notes');
            setList_notes(data.notes);
        }
        load_notes()
    }, [])

    return (
        <section className="flex min-h-full flex-col justify-center mt-[30px] px-6 py-12 lg:px-10">
            <article className="grid grid-cols-3 gap-4">
                <ComponentForm selected={selected_note} setSelected={setSelected_note} />
                <ComponentList notes={list_notes} setSelected={setSelected_note} selected={selected_note} />
            </article>
        </section>
    )
}