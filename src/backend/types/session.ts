export type Props_session = {
    id: string,
    status: boolean,
    last_time: string,
    expiret: string,
    origin: Props_origin,
    user: Props_user
}

type Props_origin = {
    IP_adress: string,
    city: string
}

type Props_user = {
    name: string,
    email: string,
    image: string,
    rol: string
}