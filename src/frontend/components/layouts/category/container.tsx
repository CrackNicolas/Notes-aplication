'use client'

import { useEffect, useState } from "react"

import axios from "axios";

import ComponentList from "./list"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_category } from "@/context/types/category"
import { Props_response } from "@/context/types/response";

export default function ComponentCategory() {
    const [list_categorys, setList_categorys] = useState<Props_category[]>([]);

    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    useEffect(() => {
        const load_categorys = async () => {
            const { data } = await axios.get("/api/categorys");
           
            if (data.status === 200) {
                setList_categorys(data.data);
            }
            if (data.status === 500) {
                setOpen(true);
                setResponse(data);
                setList_categorys([]);
            }
        }
        load_categorys();
    }, [])

    return (
        <section className="flex flex-col gap-10 mt-[65px] p-7">
            <ComponentHeader title="Categorias de notas" subtitle="Selecciona las categorias que deseas agregar o quitar de tus notas" />
            <ComponentList categorys={list_categorys} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}