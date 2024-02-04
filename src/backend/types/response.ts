/* 
    200 - Solicitud cumplida (GET)|(UPDATE)
    201 - Solicitud cumplida de creacion (POST)
    204 - Solicitud cumplida pero no hay que retornar (DELETE)
    400 - Solicitud incumplida debido a que el servidor no puede realizar la operacion 
          debido a que existen errores en los datos que se enviaron (Ej: Key duplicadas)
    404 - Solicitud incumplida por la no existencia de algun parametro (_id)
    500 - Solicitud incumplida por errores en el servidor
*/

export type Props_response = {
    status: 200 | 201 | 204 | 400 | 404 | 500
    info?: object
}