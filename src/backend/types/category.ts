export type Props_category = {
    title: string,
    use?: Props_use[]
    icon: string
}

type Props_use = {
    value: boolean,
    user_id: string
}