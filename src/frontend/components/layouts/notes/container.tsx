'use client'

import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

import { Fragment, useEffect, useState } from "react";

import axios from "axios";

import ComponentItems from "@/frontend/components/layouts/category/list/items";
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header";
import ComponentContainerForm from "@/frontend/components/layouts/notes/container_form";

import { Props_note } from "@/context/types/note";
import { Props_category } from "@/context/types/category";

export default function ComponentNotes() {
    const [list_categorys, setList_categorys] = useState<Props_category[]>([]);
    const [category_selected, setCategory_selected] = useState<Props_category | undefined>(undefined);
    const [selected_note, setSelected_note] = useState<Props_note | undefined>(undefined);

    const search_params = useSearchParams();
    const router = useRouter();

    const select = (category: Props_category): void => {
        setCategory_selected(category);
    }

    const redirect = (path:string) => {
        router.push(path);
    }

    useEffect(() => {
        if (search_params.get('data') !== null) {
            const { note } = JSON.parse(search_params.get('data') as string);
            setSelected_note(note);
            setCategory_selected(note.category);
        }
    }, []);

    useEffect(() => {
        const load_categorys = async () => {
            const { data } = await axios.get(`/api/categorys/true`);

            if (data.status === 200) {
                setList_categorys(data.data);
            }
            if (data.status === 500) {
                setList_categorys([]);
            }
        }
        load_categorys();
    }, [])

    return (
        <section className="flex flex-col gap-y-6 justify-center mt-4 pt-12 pb-5">
            {
                !category_selected ?
                    <Fragment>
                        <ComponentHeader title="Elige una categoría" subtitle="Selecciona una categoría para tu nota" />
                        <ComponentItems categorys={list_categorys} select={select} use_paint={true} />
                    </Fragment>
                    :
                    <ComponentContainerForm category_selected={category_selected} setCategory_selected={setCategory_selected} note_selected={selected_note} redirect={redirect} />
            }
        </section>
    )
}