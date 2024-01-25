/* 
    200 - Solicitud cumplida (GET)|(UPDATE)
    201 - Solicitud cumplida de creacion (POST)
    204 - Solicitud cumplida pero no hay que retornar (DELETE)
    404 - Solicitud incumplida por la no existencia de algun parametro (_id)
    500 - Solicitud incumplida por errores en el servidor
*/

export type Props_response = {
    status: 200 | 201 | 204 | 500 | 404
    info?: object
}