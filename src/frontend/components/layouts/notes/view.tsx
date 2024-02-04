import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "../../partials/icon";
import ComponentModal from "../../partials/modal";

import { Props_note } from "@/frontend/types/props";

type Props = {
    open: boolean,
    setOpen: any,
    note: Props_note
}

export default function ComponentView(props: Props) {
    const { open, setOpen, note } = props;

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="relative flex border-[0.1px] border-secondary border-opacity-50 rounded-lg gap-y-3 px-3 sm:px-5 py-5">
                <ComponentIcon name='logo' description_class='absolute top-1.5 left-2 text-secondary opacity-70' size={20} />
                <div onClick={() => setOpen(false)}>
                    <ComponentIcon name='close' description_class='absolute top-0 right-0 text-secondary opacity-70 cursor-pointer' size={30} />
                </div>
                <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                    <span className="font-normal tracking-wide text-secondary">
                        {note.title}
                    </span>
                    <p className="text-center text-sm text-gray-500">
                        {note.description}
                    </p>
                </div>
            </div>
        </ComponentModal>
    )
}