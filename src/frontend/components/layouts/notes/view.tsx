import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

import { Props_note } from "@/context/types/note";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    note: Props_note
}

export default function ComponentView(props: Props) {
    const { open, setOpen, note } = props;
    
    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center sm:mt-0 sm:text-left">
                <span className="absolute top-[5px] text-tertiary opacity-30 text-[12px]">
                    Creada el 12 de jul de 2020
                </span>
                <span className="font-normal tracking-wide text-secondary">
                    {note.title}
                </span>
                <p className="text-start text-sm text-gray-500 w-full mb-2">
                    {note.description}
                </p>
                <div className="flex justify-between items-center w-full ">
                <ComponentIcon name={note.category.icon} size={22} description_class="text-secondary cursor-pointer" />
                    <ComponentIcon name="arrow" size={16} description_class={`text-${(note.priority === 'Alta') ? 'red' : (note.priority === 'Media') ? 'orange' : 'green'}-500 ${(note.priority !== 'Baja') && 'rotate-[-180deg]'} cursor-pointer`} />
                    <ComponentIcon name={`star-${note.featured ? 'fill' : 'half'}`} size={22} description_class="text-secondary cursor-pointer" />
                </div>
            </div>
        </ComponentModal>
    )
}