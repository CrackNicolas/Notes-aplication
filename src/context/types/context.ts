import { Dispatch, SetStateAction } from "react"

import { Props_session } from "@/context/types/session"

export type Props_context = {
    section_current: string,
    session: Props_session,
    button_sesion: JSX.Element,
    opacity: boolean,
    setOpacity: Dispatch<SetStateAction<boolean>>
}