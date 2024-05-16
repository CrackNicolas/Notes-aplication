export type Props_session = {
    user: Props_user,
    token: string | null
}
export type Props_user = {
    id: string,
    name: string,
    email: string
}