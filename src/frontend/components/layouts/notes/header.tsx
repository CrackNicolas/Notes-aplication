import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "../../partials/icon";

export default function ComponentHeader({ search }: { search: Dispatch<SetStateAction<string>> }) {
    return (
        <div className="flex justify-between gap-1">
            <span className="text-secondary text-md tracking-wider flex items-end">
                Lista de tereas
            </span>
            <div className="flex items-center">
                <div className="bg-sixth border-[0.1px] border-secondary border-opacity-40 py-1 px-2 rounded-l-xl">
                    <ComponentIcon name="search" description_class="text-fifth" size={20} view_box="0 0 24 24" />
                </div>
                <input
                    type="text"
                    id="search"
                    placeholder="Buscar..."
                    onChange={(e) => search(e.target.value)}
                    className={`bg-sixth border-y-[0.1px] border-r-[0.1px] border-l-none border-secondary border-opacity-40 rounded-r-md outline-none px-2 py-0.5 text-fifth placeholder:opacity-60 placeholdel:text-sm`}
                />
            </div>
        </div>
    )
}