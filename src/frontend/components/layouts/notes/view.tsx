import { Dispatch, SetStateAction } from "react";

import ComponentModal from "../../partials/modal";

import { Props_note } from "@/frontend/types/props";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    note: Props_note
}

export default function ComponentView(props: Props) {
    const { open, setOpen, note } = props;

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                <span className="font-normal tracking-wide text-secondary">
                    {note.title}
                </span>
                <p className="text-center text-sm text-gray-500">
                    {note.description}
                </p>
            </div>
        </ComponentModal>
    )
}