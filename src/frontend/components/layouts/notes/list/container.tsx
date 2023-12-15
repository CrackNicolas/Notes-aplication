import { Dispatch, SetStateAction } from "react";

import ComponentNote from "../note";
import ComponentHeader from "../header";
import ComponentLoading from "./loading";

import { Props_note } from "@/frontend/types/props";

type Props = {
    notes: Props_note[],
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void
}

export default function ComponentList({ notes, setSelected, selected, setRefresh }: Props) {
    return (
        <div className="col-span-full lg:col-span-2 flex flex-col gap-y-2">
            <ComponentHeader />
            <div className="flex flex-col gap-y-1 overflow-hidden overflow-y-scroll scroll h-[calc(100vh-155px)] pr-1">
                {
                    (notes.length === 0) && <ComponentLoading />
                }
                {
                    notes.map((note: Props_note) => {
                        return (
                            <div key={note._id} onClick={() => setSelected(note)} className="rounded-md">
                                <ComponentNote note={note} paint={selected?._id === note._id} setRefresh={setRefresh} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}