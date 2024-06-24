import { Dispatch, Fragment, SetStateAction, useState } from "react";

import axios from "axios";

import ComponentItems from "@/frontend/components/layouts/category/list/items";
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
        <Fragment>
            <ComponentItems categorys={categorys} select={select} />
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </Fragment>
    )
}