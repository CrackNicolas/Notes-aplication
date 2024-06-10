export type Props_session = {
    id?: string,
    status?: boolean,
    last_time?: string,
    expiret?: string,
    origin?: {
        IP_adress: string,
        city: string
    },
    user?: Props_user
}
export type Props_user = {
    name: string,
    email: string,
    image: string,
    rol: string
}