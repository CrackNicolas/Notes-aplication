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
        <div className={`relative group grid grid-cols-9 w-full bg-sixth pl-2.5 py-2 cursor-pointer rounded-md border-[0.1px] border-secondary ${paint ? 'border-opacity-100' : 'border-opacity-20 hover:border-opacity-100'}`}>
            <div className="col-span-7 md:col-span-8 flex flex-col">
                <span className="flex text-md font-normal group-hover:font-semibold tracking-wide text-secondary">
                    {title}
                    {(priority === "Alta") && <ComponentIcon name="arrow" size={20} description_class="text-red-500 rotate-[-180deg] " />}
                    {(priority === "Media") && <ComponentIcon name="arrow" size={20} description_class="text-orange-500 rotate-[-180deg]" />}
                    {(priority === "Baja") && <ComponentIcon name="arrow" size={20} description_class="text-green-500" />}
                </span>
                <p className="line-clamp-1 text-sm text-tertiary opacity-50">
                    {description}
                </p>
                <span className="sm:visible invisible absolute right-3 text-tertiary text-[11px] opacity-50 ">
                    {Time_elapsed(createdAt)}
                </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-end">
                <div className="flex gap-2 items-end justify-center w-[100px] h-full">
                    <button onClick={() => action_note('delete', note)} type="button" title="Eliminar" className="outline-none border-none">
                        <ComponentIcon name="delete" size={20} description_class="text-fifth hover:text-red-500 cursor-pointer" />
                    </button>
                    <button onClick={() => action_note('update', note)} type="button" title="Editar" className="outline-none border-none">
                        <ComponentIcon name="update" size={20} description_class="text-fifth hover:text-secondary cursor-pointer" />
                    </button>
                    <button onClick={() => action_note('view', note)} type="button" title="Ver" className="outline-none border-none">
                        <ComponentIcon name="see" size={20} description_class="text-fifth hover:text-secondary cursor-pointer" />
                    </button>
                </div>
            </div>
        </div>
    )
}