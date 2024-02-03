import { Dispatch, SetStateAction, useState } from "react";

import ComponentNote from "../note";
import ComponentHeader from "../header";
import ComponentLoading from "./loading";

import { Props_note } from "@/frontend/types/props";
import ComponentView from "../view";

type Props = {
    notes: Props_note[],
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void,
    setSearch: Dispatch<SetStateAction<string>>
}

export default function ComponentList({ notes, setSelected, selected, setRefresh, setSearch }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="col-span-full lg:col-span-2 flex flex-col gap-y-2">
            <ComponentHeader search={setSearch} />
            <div className={`flex flex-col gap-y-1 ${(notes.length >= 7) && 'overflow-hidden overflow-y-scroll scroll pr-1'} h-[calc(100vh-165px)]`}>
                {
                    (notes.length === 0) ?
                        <ComponentLoading count={8} />
                        :
                        notes.map((note: Props_note) => {
                            return (
                                <div key={note._id} className="rounded-md">
                                    <ComponentNote note={note} paint={selected?._id === note._id} setSelected={setSelected} setRefresh={setRefresh} />
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}