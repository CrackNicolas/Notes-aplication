import { Dispatch, SetStateAction } from "react";

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

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex flex-col w-full items-center sm:mt-0 sm:text-left pt-1">
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
                <p className="text-start text-sm text-gray-500 w-full mb-4">
                    {note.description}
                </p>
                <div className="flex justify-between items-center w-full">
                    <a href={(note.file) ? note.file.url : ''} target="_blank" title="Ver archivo" rel="noopener noreferrer" className="group relative overflow-hidden flex hover:w-auto w-[20px] rounded-r-full items-start outline-none">
                        <ComponentIcon name="upload-file-selected" size={20} description_class=" group-hover:py-0.5 min-w-[20px] group-hover:border group-hover:border-secondary group-hover:border-[0.1px] bg-primary text-secondary cursor-pointer group-hover:border-r-0 z-20 bg-primary" />
                        <span className="group-hover:translate-x-0 group-hover:w-[90px] group-hover:h-[20px] translate-x-[-100px] w-0 h-0 transition duration-600 z-10 text-secondary border-y border-y-[0.1px] border-r border-r-[0.1px] border-secondary rounded-r-full flex items-center px-1">
                            Ver archivo
                        </span>
                    </a>
                    <div className="flex gap-x-2 items-center">
                        <span className="rounded-full" title={`Prioridad ${note.priority}`}>
                            <ComponentIcon name="arrow" size={21} description_class={`text-${(note.priority === 'Alta') ? 'red' : (note.priority === 'Media') ? 'orange' : 'green'}-500 ${(note.priority !== 'Baja') && 'rotate-[-180deg]'} cursor-pointer`} />
                        </span>
                        <span className="rounded-full" title={`Nota ${(note.featured ? 'destacada' : 'no destacada')}`}>
                            <ComponentIcon name={`star-${note.featured ? 'fill' : 'half'}`} size={19} description_class="text-secondary cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div>
        </ComponentModal>
    )
}