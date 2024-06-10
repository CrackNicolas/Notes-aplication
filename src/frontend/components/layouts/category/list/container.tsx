import { Dispatch, SetStateAction, useState } from "react";

import axios from "axios";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLoading from "./loading";
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_category } from "@/context/types/category"
import { Props_response } from "@/context/types/response";

type Props = {
    categorys: Props_category[],
    setRestart: Dispatch<SetStateAction<boolean>>
}

export default function ComponentList(props: Props) {
    const { categorys, setRestart } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
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
        <article className="relative grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full">
            {
                (categorys.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    categorys.map(category => {
                        return (
                            <div key={category.title} onClick={() => select(category)} className={`group col-span-1 grid place-items-center h-[100px] rounded-md cursor-pointer hover:bg-secondary transition duration-500 ${category.use ? 'bg-secondary' : 'bg-primary border-secondary  border-[0.1px]'}`}>
                                <div className="flex flex-col items-center gap-y-1">
                                    <ComponentIcon name={category.icon} size={27} view_box="0 0 16 16" description_class={`group-hover:text-primary ${category.use ? 'text-primary' : 'text-secondary'} duration-500 group-hover:translate-y-[-5px] `} />
                                    <span className={`group-hover:text-primary text-lg group-hover:font-bold font-semibold ${category.use ? 'text-primary' : 'text-secondary'} tracking-wider duration-500`}>
                                        {category.title}
                                    </span>
                                </div>
                            </div>
                        )
                    })
            }
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </article>
    )
}