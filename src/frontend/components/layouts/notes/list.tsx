import ComponentHeader from "./header";
import ComponentNote from "./note";

import { Props_note } from "@/frontend/types/props";

export default function ComponentList() {

    const list_notes = [
        {
            id: 'asasas-asasasd',
            title: 'Primera nota',
            description:'a',
            creation_date:'2000-20-12'
        },
        {
            id: 'aaa-asasasd',
            title: 'Segunda nota',
            description:'b',
            creation_date:'2000-20-02'
        }
    ]

    return (
        <div className="col-span-2 flex flex-col gap-y-2">
            <ComponentHeader />
            <div className="flex flex-col gap-y-1 overflow-hidden overflow-y-scroll scroll h-[calc(100vh-155px)] pr-1">
                {
                    list_notes.map((note: Props_note) => {
                        return (
                            <ComponentNote note={note} />
                        )
                    })
                }
            </div>
        </div>
    )
}