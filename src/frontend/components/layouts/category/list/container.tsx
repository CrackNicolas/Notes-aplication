import { Dispatch, SetStateAction, useState } from "react";

import axios from "axios";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentItems from "@/frontend/components/layouts/category/list/items";
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_category } from "@/context/types/category"
import { Props_response } from "@/context/types/response";

type Props = {
    categorys: Props_category[],
    setRestart: Dispatch<SetStateAction<boolean>>,
    redirect: (path:string) => void
}

export default function ComponentList(props: Props) {
    const { categorys, setRestart, redirect } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const select = async (category: Props_category) => {
        setLoading(true);

        const { data } = await axios.put('/api/categorys', {
            title: category.title,
            use: !category.use
        });

        setLoading(false);
        setResponse(data);
        setOpen(true);
        setRestart(true);
    }

    return (
        <article className="relative">
            <span className="absolute left-0 top-[-40px] bg-primary rounded-full p-1.5 hover:bg-room transition duration-500" title="Volver atras" onClick={() => redirect('/dashboard/config') }>
                <ComponentIcon name="return" size={22} description_class="rotate-[-180deg] text-secondary cursor-pointer" />
            </span>
            <ComponentItems categorys={categorys} select={select} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </article>
    )
}