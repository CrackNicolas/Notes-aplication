import { Props_status } from "@/context/types/response"

type Props = {
    status: Props_status,
    text: string,
    color: string
}

export const list_messages: Props[] = [
    {
        status: 200,
        text: 'Mensaje de éxito',
        color: 'secondary'
    },
    {
        status: 400,
        text: 'Mensaje de error',
        color: 'error'
    }
]