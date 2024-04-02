import { Props_inputs } from "@/frontend/types/props"

export const validation = (name: string): Props_inputs | any => {
    switch (name) {
        case 'title':
            return {
                required: true,
                minLength: 5,
                maxLength: 45,
                pattern: /^[A-Z a-z._áéíóú]+$/i
            }
        case 'description':
            return {
                required: true,
                minLength: 15,
                maxLength: 500,
                pattern: /^[A-Z a-z,._áéíóú]+$/i
            }
        case "priority":
            return {
                required: true
            }
    }
}