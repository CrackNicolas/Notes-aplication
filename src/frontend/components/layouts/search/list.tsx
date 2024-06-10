import { Props_note } from "@/context/types/note"

import ComponentNote from "@/frontend/components/layouts/notes/note";
import ComponentLoading from "@/frontend/components/layouts/notes/list/loading";

type Props = {
    notes: Props_note[],
    action_note: (action: string, note: Props_note) => Promise<void>
}

export default function ComponentList(props: Props) {
    const { notes, action_note } = props;

    return (
        <article className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-4">
            {
                (notes.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    notes.map(note => {
                        return <ComponentNote key={note._id} note={note} action_note={action_note} />
                    })
            }
        </article>
    )
}