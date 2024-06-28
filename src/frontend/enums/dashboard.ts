import { Props_items_dashboard } from "@/frontend/types/props"

export const items_main: Props_items_dashboard[] = [
    {
        url: '/sessions',
        icon: 'users',
        title: 'Administra sesiones de usuario',
        description: 'Revisa sesiones activas y cerradas en tu aplicacion de notas de forma facil.'
    },
    {
        url: '/notes',
        icon: 'note',
        title: 'Crear nota',
        description: 'Escribe y guarda tus ideas o recordatorios importantes. Mantén tus notas organizadas.'
    },
    {
        url: '/dashboard/config',
        icon: 'setting',
        title: 'Configuracion de notas',
        description: 'Configura tus notas para mejorar tu experiencia personalizando diversos aspectos.'
    },
    {
        url: '/notes/search',
        icon: 'list',
        title: 'Lista de notas',
        description: 'Encuentra rápidamente tus notas con esta funcion y mejora tu productividad en un instante.'
    }
]
export const items_config = [
    {
        url: '/notes/category',
        icon: 'setting',
        title: 'Administracion de categorias',
        description: 'Realiza la creacion, edicion, eliminacion y visualizacion de categorias con facilidad.'
    }
]