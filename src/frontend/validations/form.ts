export const validation = (name: string, required: boolean = true): any => {
    switch (name) {
        case 'title':
            return {
                required: {
                    value: required,
                    message: 'Titulo requerido'
                },
                minLength: {
                    value: 5,
                    message: 'El titulo deber ser mayor a 5 caracteres'
                },
                maxLength: {
                    value: 45,
                    message: 'El titulo deber ser menor a 45 caracteres'
                },
                pattern: {
                    value: /^[A-Z a-z._áéíóúñ]+$/i,
                    message: 'Se detectaron caracteres no permitidos'
                }
            }
        case 'description':
            return {
                required: {
                    value: required,
                    message: 'Descripcion requerida'
                },
                minLength: {
                    value: 15,
                    message: 'La descripcion deber ser mayor a 15 caracteres'
                },
                maxLength: {
                    value: 500,
                    message: 'La descripcion deber ser menor a 500 caracteres'
                },
                pattern: {
                    value: /^[A-Z a-z,._áéíóúñ0-9]+$/i,
                    message: 'Se detectaron caracteres no permitidos'
                }
            }
        case "priority":
            return {
                required: {
                    value: required,
                    message: 'Prioridad requerida'
                }
            }
        case 'featured':
            return {
                required: {
                    value: required,
                    message: 'Selecciona una opcion'
                }
            }
        case 'category':
            return {
                required: required
            }
    }
}