import axios from "axios";

import { Dispatch, SetStateAction, useState } from "react";

import ComponentView from "../view";
import ComponentNote from "../note";
import ComponentHeader from "../header";
import ComponentLoading from "./loading";

import { Props_note } from "@/frontend/types/props";

type Props = {
    notes: Props_note[],
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void,
    setSearch: Dispatch<SetStateAction<string>>
}

export default function ComponentList({ notes, setSelected, selected, setRefresh, setSearch }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [view_note, setView_note] = useState<Props_note | undefined>(undefined);

    const action_note = async (action: string, note: Props_note) => {
        switch (action) {
            case 'view':
                setOpen(true);
                setView_note(note);
                break;
            case 'delete':
                await axios.delete(`api/notes/${note._id}`);
                setRefresh();
                break;
            case 'update':
                setSelected(note);
                break;
        }
    }

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
                                    <ComponentNote note={note} paint={selected?._id === note._id} action_note={action_note} />
                                </div>
                            )
                        })
                }
            </div>
            {
                (view_note !== undefined) && <ComponentView open={open} setOpen={setOpen} note={view_note} />
            }
        </div>
    )
}