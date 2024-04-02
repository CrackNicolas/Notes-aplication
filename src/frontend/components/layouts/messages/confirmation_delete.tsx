import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setConfirmation: Dispatch<SetStateAction<boolean>>
}

export default function ComponentMessageConfirmationDelete(props: Props) {
    const { open, setOpen, setConfirmation } = props;

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                <span className="flex place-items-center p-2.5 rounded-full bg-gray-900">
                    <ComponentIcon name='delete-note' description_class='text-error' size={25} />
                </span>
                <p className="mt-2 text-center text-xl text-gray-500">
                    ¿Seguro que desea eliminar?
                </p>
            </div>
            <div className="flex gap-x-2 sm:gap-x-5">
                <button type="button" title="SI" onClick={() => setConfirmation(true)} className={`outline-none rounded-full w-[135px] sm:w-[200px] bg-primary hover:opacity-100 opacity-70 cursor-pointer text-secondary border-[0.1px] border-secondary`}>
                    SI
                </button>
                <button type="button" title="NO" onClick={() => setOpen(false)} className={`outline-none rounded-full w-[135px] sm:w-[200px] bg-primary hover:opacity-100 opacity-70 cursor-pointer text-error border-[0.1px] border-error`}>
                    NO
                </button>
            </div>
        </ComponentModal>
    )
}