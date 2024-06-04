import { Props_category } from "@/backend/types/category"

export type Props_note = {
    title: string,
    description: string,
    category: Props_category
    priority: string,
    featured: boolean,
    file: Props_file,
    user_id: string
}

type Props_file = {
    id: string,
    name: string,
    url: string
}