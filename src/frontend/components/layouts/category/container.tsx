'use client'

import { useContext, useEffect, useState } from "react"

import axios from "axios";

import ComponentList from "./list/container"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Context } from "@/context/provider";
import { Props_category } from "@/context/types/category"
import { Props_response } from "@/context/types/response";

export default function ComponentCategory() {
    const { session } = useContext(Context);

    const [list_categorys, setList_categorys] = useState<Props_category[]>([]);

    const [restart, setRestart] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    useEffect(() => {
        const load_categorys = async () => {
            const { data } = await axios.get(`/api/categorys/${session.user.id}`);

            if (data.status === 200) {
                setList_categorys(data.data);
            }
            if (data.status === 500) {
                setOpen(true);
                setResponse(data);
                setList_categorys([]);
            }
            setRestart(false);
        }
        if (session.user.id !== '') {
            load_categorys();
        }
    }, [restart, session.user])

    return (
        <section className="flex flex-col gap-10 mt-[65px] py-7">
            <ComponentHeader title="Categorias de notas" subtitle="Selecciona las categorias que deseas agregar o quitar de tus notas" />
            <ComponentList categorys={list_categorys} setRestart={setRestart} user_id={session.user.id} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}