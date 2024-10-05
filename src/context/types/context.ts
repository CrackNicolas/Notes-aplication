import { Dispatch, SetStateAction } from "react"

import { Props_session } from "@/context/types/session"
import { Props_theme } from "@/frontend/types/props"

export type Props_context = {
    section_current: string,
    session: Props_session,
    button_sesion: JSX.Element,
    opacity: boolean,
    theme: Props_theme,
    setTheme: Dispatch<SetStateAction<Props_theme>>,
    setOpacity: Dispatch<SetStateAction<boolean>>
    path?: string
}