import axios from "axios";

import ComponentIcon from "../../partials/icon";

import { Props_note } from "@/frontend/types/props";
import { Time_elapsed } from "@/frontend/logic/time";

export default function ComponentNote({ note, paint, setRefresh }: { note: Props_note, paint: boolean, setRefresh: () => void }) {
    const { _id, title, description, createdAt } = note;

    const delete_note = async () => {
        await axios.delete(`api/notes/${_id}`);
        setRefresh();
    }

    return (
        <div className={`relative group grid grid-cols-9 w-full bg-sixth pl-2.5 py-2 cursor-pointer rounded-md border-[0.1px] border-secondary ${paint ? 'border-opacity-100' : 'border-opacity-20 hover:border-opacity-100'}`}>
            <div className="col-span-7 md:col-span-8 flex flex-col">
                <span className="text-md font-normal group-hover:font-semibold tracking-wide text-secondary">
                    {title}
                </span>
                <p className="line-clamp-1 text-sm text-tertiary opacity-50">
                    {description}
                </p>
                <span className="sm:visible invisible absolute right-3 text-tertiary text-[11px] opacity-50 ">
                    {Time_elapsed(createdAt)}
                </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col justify-end items-end pr-3 gap-y-2">
                <div className="flex gap-x-2">
                    <button onClick={() => delete_note()} type="button" title="Eliminar" className="outline-none border-none cursor-pointer">
                        <ComponentIcon name="delete" size={20} description_class="text-fifth hover:text-red-500" />
                    </button>
                    <button type="button" title="Editar" className="outline-none border-none">
                        <ComponentIcon name="update" size={20} description_class="text-fifth hover:text-secondary" />
                    </button>
                </div>
            </div>
        </div>
    )
}