import { FieldValues, UseFormSetValue } from "react-hook-form";

import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    setValue: UseFormSetValue<FieldValues>,
    design?: boolean
}

export default function ComponentInputSearch(props: Props) {
    const { setValue, design = false } = props;

    return (
        <div className="flex items-center sm:w-auto w-full">
            {
                !design && (
                    <div className="bg-sixth border-[0.1px] border-secondary border-opacity-40 py-[4.2px] px-2 sm:rounded-l-xl rounded-l-md">
                        <ComponentIcon name="search" description_class="text-fifth mt-[3px]" size={20} view_box="0 0 24 24" />
                    </div>
                )
            }
            <input
                type="text"
                id="search"
                placeholder="Buscar..."
                onChange={(e) => setValue('title', e.target.value)}
                className={`${design ? 'border-l-[0.1px] rounded-l-md' : 'sm:w-auto border-l-none'} w-full bg-sixth border-y-[0.1px] border-r-[0.1px] border-secondary border-opacity-40 rounded-r-md outline-none px-2 py-1 text-fifth placeholder:opacity-60 placeholdel:text-sm`}
            />
        </div>
    )
}