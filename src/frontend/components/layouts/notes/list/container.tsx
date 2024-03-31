import axios from "axios";

import { Dispatch, SetStateAction, useState } from "react";

import ComponentView from "../view";
import ComponentNote from "../note";
import ComponentHeader from "../header";
import ComponentLoading from "./loading";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_note } from "@/frontend/types/props";
import { Props_response } from "@/context/types/response";

type Props = {
    notes: Props_note[],
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void,
    setSearch: Dispatch<SetStateAction<string>>
}

export default function ComponentList({ notes, setSelected, selected, setRefresh, setSearch }: Props) {
    const [open_modal_view, setOpen_modal_view] = useState<boolean>(false);
    const [open_modal_confirmation, setOpen_modal_confirmation] = useState<boolean>(false);
    const [view_note, setView_note] = useState<Props_note | undefined>(undefined);
    const [response, setResponse] = useState<Props_response>();

    const action_note = async (action: string, note: Props_note) => {
        switch (action) {
            case 'view':
                setOpen_modal_view(true);
                setView_note(note);
                break;
            case 'delete':
                const { data } = await axios.delete(`api/notes/${note._id}`);
                setOpen_modal_confirmation(true);
                setResponse(data);
                setRefresh();
                break;
            case 'update':
                setSelected(note);
                break;
        }
    }

    return (
        <div className="col-span-full lg:col-span-2 flex flex-col gap-y-2">
            <ComponentHeader search={setSearch} result={notes.length === 0} />
            <div data-testid="container-list-notes" className={`flex flex-col gap-y-1 ${(notes.length >= 7) && 'overflow-hidden overflow-y-scroll scroll pr-1'} h-[calc(100vh-165px)]`}>
                {
                    (notes.length === 0) ?
                        <ComponentLoading count={8} />
                        :
                        notes.map((note: Props_note) => {
                            return (
                                <div key={note._id} data-testid="list-notes" className="rounded-md">
                                    <ComponentNote note={note} paint={selected?._id === note._id} action_note={action_note} />
                                </div>
                            )
                        })
                }
            </div>
            {
                (view_note) && <ComponentView open={open_modal_view} setOpen={setOpen_modal_view} note={view_note} />
            }
            {
                (response) && <ComponentMessageConfirmation open={open_modal_confirmation} setOpen={setOpen_modal_confirmation} response={response} />
            }
        </div>
    )
}