import { Dispatch, SetStateAction, useState } from "react";

import axios from "axios";

import ComponentLoading from "./loading";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_category } from "@/context/types/category"
import { Props_response } from "@/context/types/response";

type Props = {
    categorys: Props_category[],
    setRestart: Dispatch<SetStateAction<boolean>>
}

export default function ComponentList(props: Props) {
    const { categorys, setRestart } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const select = async (category: Props_category) => {
        const { data } = await axios.put('/api/categorys', {
            title: category.title,
            use: !category.use
        });

        setOpen(true);
        setResponse(data);
        setRestart(true);
    }

    return (
        <article className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full">
            {
                categorys.length === 0 && <ComponentLoading count={10} />
            }
            {
                categorys.map(category => {
                    return (
                        <div key={category.title} onClick={() => select(category)} className={`col-span-1 grid place-items-center ${category.use ? 'bg-secondary' : 'bg-primary border-secondary border-[0.1px]'} h-[100px] rounded-md cursor-pointer`}>
                            <span className={`text-xl font-semibold ${category.use ? 'text-primary' : 'text-secondary'} tracking-wide`}>
                                {category.title}
                            </span>
                        </div>
                    )
                })
            }
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </article>
    )
}