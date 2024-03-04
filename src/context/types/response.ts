/* 
    200 - Solicitud cumplida (GET)|(UPDATE)
    201 - Solicitud cumplida de creacion (POST)
    204 - Solicitud cumplida pero no hay que retornar (DELETE)
    400 - Solicitud incumplida debido a que el servidor no puede realizar la operacion 
          debido a que existen errores en los datos que se enviaron (Ej: Key duplicadas)
    404 - Solicitud incumplida por la no existencia de algun parametro (_id)
    500 - Solicitud incumplida por errores en el servidor
*/

import { Props_note } from "@/frontend/types/props"

export type Props_response = {
    status: Props_status
    data?: Props_note[] | Props_note
    info?: { message: string }
}
export type Props_status = 200 | 201 | 204 | 400 | 404 | 500;