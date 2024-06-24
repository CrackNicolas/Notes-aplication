import { Dispatch, SetStateAction, useState } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentView from "@/frontend/components/layouts/notes/view";

import { Time_elapsed } from "@/frontend/logic/time";
import { Props_delete_note, Props_note } from "@/context/types/note";

type Props = {
    note: Props_note,
    paint?: boolean,
    update_note: (note: Props_note) => void,
    state: boolean,
    notes_selected: Props_delete_note[],
    setNotes_selected: Dispatch<SetStateAction<Props_delete_note[]>>
}

export default function ComponentNote(props: Props) {
    const { note, paint = false, update_note, state, notes_selected, setNotes_selected } = props;
    const { title, description, priority, createdAt } = note;

    const [view_note, setView_note] = useState<Props_note | undefined>(undefined);
    const [open_modal_view, setOpen_modal_view] = useState<boolean>(false);

    const open_view = (note: Props_note) => {
        setView_note(note);
        setOpen_modal_view(true);
    }

    const include_note = (id?: string) => {
        const notes = notes_selected.map(note => note._id);
        return notes.includes(id);
    }

    const note_selection = (data: Props_delete_note) => {
        if (state) {
            setNotes_selected(prev => include_note(data._id) ? prev.filter(n => n._id !== data._id) : [...prev, { _id: data._id, file: data.file }])
        }
    }

    return (
        <div onClick={() => note_selection({ _id: (note._id) ? note._id : '', file: note.file?.id })} title="Nota" className={`relative transition-padding group grid grid-cols-9 w-full bg-sixth ${state ? 'sm:pl-12.5 pl-12 sm:pr-2.5 pr-2' : 'sm:px-2.5 px-2'} sm:py-2 py-1.5 cursor-pointer rounded-md border-[0.1px] border-secondary ${paint ? 'border-opacity-100' : 'border-opacity-20 hover:border-opacity-100'}`}>
            {
                state && (
                    <div className="absolute h-full flex items-center px-2">
                        {
                            include_note(note._id) ?
                                <span className='border-[0.1px] border-error bg-primary rounded-full transition-padding p-1'>
                                    <ComponentIcon
                                        name='check'
                                        size={20}
                                        description_class="text-error m-auto mt-[1px] icon-transition icon-visible"
                                    />
                                </span>
                                :
                                <span className='border-[0.1px] border-secondary'>
                                    <ComponentIcon
                                        name='check'
                                        size={12}
                                        description_class="text-secondary transition-width icon-transition icon-hidden"
                                    />
                                </span>
                        }
                    </div>
                )
            }
            <div className="col-span-8 flex flex-col">
                <span className="flex">
                    <span className="line-clamp-1 text-md font-normal group-hover:font-semibold tracking-wide text-secondary">
                        {title}
                    </span>
                    {(priority === "Alta") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto right-3 text-red-500 rotate-[-180deg] mt-[3px] " />}
                    {(priority === "Media") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto right-3 text-orange-500 rotate-[-180deg] mt-[3px] " />}
                    {(priority === "Baja") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto right-3 text-green-500 mt-[2.7px] " />}
                </span>
                <p className="line-clamp-1 text-sm text-tertiary opacity-50">
                    {description}
                </p>
                <span title="Tiempo transcurrido" className="sm:visible invisible absolute right-3 text-tertiary text-[11px] opacity-50">
                    {Time_elapsed(createdAt)}
                </span>
            </div>
            <div className="col-span-1 flex flex-col items-end">
                <div className="flex gap-2 items-end justify-center w-[45px] h-full">
                    <button onClick={() => update_note(note)} type="button" title="Editar" className="outline-none border-none">
                        <ComponentIcon name="update" size={18} description_class="text-fifth hover:text-secondary cursor-pointer" />
                    </button>
                    <button onClick={() => open_view(note)} type="button" title="Ver" className="outline-none border-none">
                        <ComponentIcon name="see" size={19} description_class="text-fifth hover:text-secondary cursor-pointer" />
                    </button>
                </div>
            </div>
            {
                (view_note) && <ComponentView open={open_modal_view} setOpen={setOpen_modal_view} note={view_note} />
            }
        </div >
    )
}