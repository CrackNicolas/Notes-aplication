import ComponentIcon from "../../partials/icon";

import { Props_note } from "@/frontend/types/props";

type Props = {
    note: Props_note
}

export default function ComponentNote({ note }: Props) {
    const { id, title, description, creation_date } = note;

    return (
        <div key={id} className="group grid grid-cols-9 w-full bg-sixth pl-2.5 py-2 cursor-pointer rounded-md border-[0.1px] border-secondary border-opacity-20 hover:border-opacity-100">
            <div className="col-span-8 flex flex-col">
                <span className="text-md font-normal group-hover:font-semibold tracking-wide text-secondary">
                    {title}
                </span>
                <p className="line-clamp-1 text-sm text-tertiary opacity-50">
                    {description}
                </p>
            </div>
            <div className="col-span-1 flex flex-col place-items-center gap-y-2">
                <span className="text-tertiary text-[11px] opacity-50 px-1.5">
                    {creation_date}
                </span>
                <div className="flex gap-x-2">
                    <button type="button" title="Eliminar" className="outline-none border-none cursor-pointer">
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