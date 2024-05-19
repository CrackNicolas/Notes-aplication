import axios from "axios";

import { Dispatch, SetStateAction, useState } from "react";

import ComponentNote from "@/frontend/components/layouts/notes/note";
import ComponentHeader from "@/frontend/components/layouts/notes/header";
import ComponentLoading from "./loading";
import ComponentMessageWait from "@/frontend/components/layouts/messages/wait";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_note } from "@/context/types/note";
import { Props_session } from "@/context/types/session";
import { Props_response } from "@/context/types/response";

type Props = {
    notes: Props_note[],
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void,
    setSearch: Dispatch<SetStateAction<string>>,
    session: Props_session
}

export default function ComponentList(props: Props) {
    const { notes, setSelected, selected, setRefresh, setSearch, session } = props;

    const [open_modal_confirmation, setOpen_modal_confirmation] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();
    const [loading, setLoading] = useState<boolean>(false);

    const action_note = async (action: string, note: Props_note) => {
        switch (action) {
            case 'delete':
                setLoading(true);
                const { data } = await axios.delete(`/api/notes/${note._id}`, {
                    headers: {
                        Authorization: `Bearer ${session.token}`
                    }
                });
                setOpen_modal_confirmation(true);
                setResponse(data);
                setLoading(false);
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
            <div title="Lista de notas" className={`flex flex-col gap-y-1 ${(notes.length >= 7) && 'overflow-hidden overflow-y-scroll scroll pr-1'} h-[calc(100vh-165px)]`}>
                {
                    (notes.length === 0) ?
                        <ComponentLoading count={8} />
                        :
                        notes.map((note: Props_note) => {
                            return (
                                <ComponentNote key={note._id} note={note} paint={selected?._id === note._id} action_note={action_note} />
                            )
                        })
                }
            </div>
            {
                (response) && <ComponentMessageConfirmation open={open_modal_confirmation} setOpen={setOpen_modal_confirmation} response={response} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </div>
    )
}