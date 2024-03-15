import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "../../partials/icon";

type Props = {
    search: Dispatch<SetStateAction<string>>,
    result: boolean
}

export default function ComponentHeader(props: Props) {
    const { search, result } = props;

    return (
        <div className="flex justify-between gap-1">
            <span className="sm:flex hidden text-secondary text-md tracking-wider items-end">
                {
                    (result) ? "No se encontraron resultados" : "Notas"
                }
            </span>
            <div className="flex items-center sm:w-auto w-full">
                <div className="bg-sixth border-[0.1px] border-secondary border-opacity-40 py-1 px-2 sm:rounded-l-xl rounded-l-md">
                    <ComponentIcon name="search" description_class="text-fifth" size={20} view_box="0 0 24 24" />
                </div>
                <input
                    type="text"
                    id="search"
                    placeholder="Buscar..."
                    onChange={(e) => search(e.target.value)}
                    className="sm:w-auto w-full bg-sixth border-y-[0.1px] border-r-[0.1px] border-l-none border-secondary border-opacity-40 rounded-r-md outline-none px-2 py-0.5 text-fifth placeholder:opacity-60 placeholdel:text-sm"
                />
            </div>
        </div>
    )
}