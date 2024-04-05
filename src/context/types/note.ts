export type Props_note = {
    _id?: string,
    title: string,
    description: string,
    priority: string,
    createdAt: Date,
    file: {
        id: string,
        url: string
    }
}