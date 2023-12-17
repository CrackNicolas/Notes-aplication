/* 
    200 - Solicitud cumplida (GET)
    201 - Solicitud cumplida de creacion (POST)
    204 - Solicitud cumplida pero no hay que retornar (DELETE)
    500 - Solicitud incumplida por errores en el servidor
*/

export type Props_response = {
    status: 200 | 201 | 204 | 500
    info?: object
}