import ComponentIcon from "../../partials/icon";

import { Props_note } from "@/frontend/types/props";
import { Time_elapsed } from "@/frontend/logic/time";

type Props = {
    note: Props_note,
    paint: boolean,
    action_note: (action: string, note: Props_note) => void
}

export default function ComponentNote(props: Props) {
    const { note, paint, action_note } = props;
    const { title, description, priority, createdAt } = note;

    return (
        <div data-testid="note" className={`relative group grid grid-cols-9 w-full bg-sixth sm:px-2.5 px-2 sm:py-2 py-1.5 cursor-pointer rounded-md border-[0.1px] border-secondary ${paint ? 'border-opacity-100' : 'border-opacity-20 hover:border-opacity-100'}`}>
            <div className="col-span-6 sm:col-span-7 md:col-span-8 flex flex-col">
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
                <span data-testid="time-elapsed" className="sm:visible invisible absolute right-3 text-tertiary text-[11px] opacity-50">
                    {Time_elapsed(createdAt)}
                </span>
            </div>
            <div className="col-span-3 sm:col-span-2 md:col-span-1 flex flex-col items-end">
                <div className="flex gap-2 items-end justify-center w-[75px] h-full">
                    <button onClick={() => action_note('delete', note)} type="button" data-testid="btn-delete" title="Eliminar" className="outline-none border-none">
                        <ComponentIcon name="delete" size={18} description_class="text-fifth hover:text-red-500 cursor-pointer" />
                    </button>
                    <button onClick={() => action_note('update', note)} type="button" data-testid="btn-update" title="Editar" className="outline-none border-none">
                        <ComponentIcon name="update" size={18} description_class="text-fifth hover:text-secondary cursor-pointer" />
                    </button>
                    <button onClick={() => action_note('view', note)} type="button" data-testid="btn-view" title="Ver" className="outline-none border-none">
                        <ComponentIcon name="see" size={19} description_class="text-fifth hover:text-secondary cursor-pointer" />
                    </button>
                </div>
            </div>
        </div>
    )
}