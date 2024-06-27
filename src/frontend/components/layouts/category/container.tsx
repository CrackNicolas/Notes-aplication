'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

import axios from "axios";

import ComponentIcon from "@/frontend/components/partials/icon";
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
        <section className="relative flex flex-col gap-12 mt-[65px] py-7">
            <ComponentHeader title="Categorias de notas" subtitle="Selecciona las categorias que deseas agregar o quitar de tus notas" />
            <span className="absolute top-[110px] left-0 bg-primary rounded-full p-1.5 hover:bg-room transition duration-500" title="Volver atras" onClick={() => router.push('/dashboard/config') }>
                <ComponentIcon name="return" size={22} description_class="rotate-[-180deg] text-secondary cursor-pointer" />
            </span>
            <ComponentList categorys={list_categorys} setRestart={setRestart} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}