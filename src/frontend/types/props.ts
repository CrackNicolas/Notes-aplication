import { ReactNode } from "react"

export type Props_layouts = {
    children: ReactNode
}
export type Props_params_search = {
    [key: string]: any
}
export type Props_items_select = {
    value: string,
    icon: {
        name: string,
        class: string
    }
}
export type Props_items_dashboard = {
    url: string,
    title: string,
    description: string
}
export type Props_loading_notes = {
    value: boolean,
    icon?: string,
    description?: string,
    button?: boolean
}