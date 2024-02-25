import { Props_inputs } from "../types/props"

export const validation = (name: string): Props_inputs => {
    switch (name) {
        case 'title':
            return {
                required: true,
                minLength: 5,
                maxLength: 45,
                pattern: /^[A-Z a-z._]+$/i
            }
        case 'description':
            return {
                required: true,
                minLength: 15,
                maxLength: 500,
                pattern: /^[A-Z a-z._]+$/i
            }
        case "priority":
            return {
                required: true
            }
        default:
            return {}
    }
}