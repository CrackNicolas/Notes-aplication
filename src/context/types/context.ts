import { Props_user } from "./user"

export type Props_context = {
    section_current: string,
    session: {
        user: Props_user
    },
    button_sesion: JSX.Element
} 