import Image from "next/image";

import { Dispatch, SetStateAction, useState } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentModal from "@/frontend/components/partials/modal";

import { Props_note } from "@/context/types/note";

import { Time_elapsed } from "@/frontend/logic/format_time";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    note: Props_note
}

export default function ComponentView(props: Props) {
    const { open, setOpen, note } = props;

    const [view_file, setView_file] = useState<boolean>(false);

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center sm:mt-0 sm:text-left py-1">
                <span title="Fecha de creacion" className="absolute top-[5px] text-tertiary opacity-30 text-[12px]">
                    {Time_elapsed(note.createdAt)}
                </span>
                <div className="flex justify-between items-center w-full">
                    <span className="text-start line-clamp-1 font-normal tracking-wide text-secondary text-lg">
                        {note.title}
                    </span>
                    <span className="rounded-full" title={`Categoria ${note.category.title.toLowerCase()}`}>
                        <ComponentIcon name={note.category.icon} size={20} description_class="text-secondary cursor-pointer" />
                    </span>
                </div>
                <p className="text-start text-sm text-gray-500 w-full mb-5">
                    {note.description}
                </p>
                <div className="flex justify-between items-center w-full">
                    {
                        (note.file) && (
                            <button onClick={() => setView_file(!view_file)} type="button" title="Ver archivo" className="bg-primary outline-none border border-[0.1px] border-secondary rounded text-secondary px-2 font-bold py-1 hover:bg-secondary hover:text-primary transition duration-500">
                                {
                                    view_file ? 'Cerrar archivo':'Ver archivo'
                                }
                            </button>
                        )
                    }
                    <div className="flex gap-x-2 items-center">
                        <span className="rounded-full" title={`Prioridad ${note.priority}`}>
                            <ComponentIcon name="arrow" size={21} description_class={`text-${(note.priority === 'Alta') ? 'red' : (note.priority === 'Media') ? 'orange' : 'green'}-500 ${(note.priority !== 'Baja') && 'rotate-[-180deg]'} cursor-pointer`} />
                        </span>
                        <span className="rounded-full" title={`Nota ${(note.featured ? 'destacada' : 'no destacada')}`}>
                            <ComponentIcon name={`star-${note.featured ? 'fill' : 'half'}`} size={19} description_class="text-secondary cursor-pointer" />
                        </span>
                    </div>
                </div>
                {
                    view_file && (
                        <div className="grid place-items-center w-full mt-5">
                            <Image src={(note.file) ? note.file?.url : ''} alt="Archivo guardado" width={200} height={200} className="h-[265px] w-[265px] sm:h-[350px] sm:w-[350px]" title={note.file?.name} />
                        </div>
                    )
                }
            </div>
        </ComponentModal>
    )
}