import { Props_category } from "./category"

export type Props_note = {
    _id?: string,
    title: string,
    description: string,
    category: Props_category,
    priority: string,
    featured: boolean
    file?: {
        id: string,
        name: string,
        url: string
    },
    createdAt: Date,
}