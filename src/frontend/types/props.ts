import { ReactNode } from "react"

export type Props_layouts = {
    children: ReactNode
}
export type Props_note = {
    _id?: string,
    title: string,
    description: string,
    priority: string,
    createdAt: Date
}
export type Props_inputs = {
    required?: boolean
    minLength?: number,
    maxLength?: number,
    pattern?: RegExp
}