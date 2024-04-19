export type Props_note = {
    _id?: string,
    title: string,
    description: string,
    category: string,
    priority: string,
    featured: boolean
    file?: {
        id: string,
        name: string,
        url: string
    },
    createdAt: Date,
}