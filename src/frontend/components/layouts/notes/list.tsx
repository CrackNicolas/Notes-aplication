import { Dispatch, SetStateAction } from "react";

import ComponentHeader from "./header";
import ComponentNote from "./note";

import { Props_note } from "@/frontend/types/props";

type Props = {
    notes: Props_note[],
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined
}

export default function ComponentList({ notes, setSelected, selected }: Props) {
    return (
        <div className="col-span-2 flex flex-col gap-y-2">
            <ComponentHeader />
            <div className="flex flex-col gap-y-1 overflow-hidden overflow-y-scroll scroll h-[calc(100vh-155px)] pr-1">
                {
                    notes.map((note: Props_note) => {
                        return (
                            <div key={note.id} onClick={() => setSelected(note)} className="rounded-md">
                                <ComponentNote note={note} paint={selected?.id === note.id} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}