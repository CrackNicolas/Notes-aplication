import { Props_category } from "@/context/types/category"

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
    user_id: string,
    createdAt: Date,
}
export type Props_delete_note = {
    _id?: string,
    file?: string
}