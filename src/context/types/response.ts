/* 
    200 - Solicitud cumplida (GET)|(UPDATE)
    201 - Solicitud cumplida de creacion (POST)
    204 - Solicitud cumplida pero no hay que retornar (DELETE)
    400 - Solicitud incumplida debido a que el servidor no puede realizar la operacion 
          debido a que existen errores en los datos que se enviaron (Ej: Key duplicadas)
    401 - Solicitud incumplica debido a que las credenciales son invalidas
    404 - Solicitud incumplida por la no existencia de algun parametro (_id)
    500 - Solicitud incumplida por errores en el servidor
*/

import { Props_note } from "@/context/types/note"
import { Props_session } from "@/context/types/session"
import { Props_category } from "@/context/types/category"

export type Props_response = {
    status: Props_status
    data?: Props_note[] | Props_note | Props_category[] | Props_session[]
    info?: { message: string }
}
export type Props_status = 200 | 201 | 204 | 400 | 401 | 404 | 500;