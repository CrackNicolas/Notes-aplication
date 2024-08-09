'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

import axios from "axios";

import ComponentList from "@/frontend/components/layouts/category/list/container"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_category } from "@/context/types/category"
import { Props_response } from "@/context/types/response";

export default function ComponentCategory() {
    const router = useRouter();

    const [list_categorys, setList_categorys] = useState<Props_category[]>([]);

    const [restart, setRestart] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const redirect = (path:string): void => {
        router.push(path);
    }

    useEffect(() => {
        const load_categorys = async () => {
            const { data } = await axios.get(`/api/categorys`);

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

        load_categorys();
    }, [restart])

    return (
        <section className="relative flex flex-col gap-12 sm:pt-20 pt-16 pb-7">
            <ComponentHeader title="Tus Categorías" subtitle="Toca para agregar o quitar categorías de tus notas" />
            <ComponentList categorys={list_categorys} setRestart={setRestart} redirect={redirect} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}