import { Props_note } from "@/context/types/note"

export const note: Props_note = {
    _id: '1234',
    title: 'Titulo de prueba',
    description: 'Descripcion de prueba',
    category: {
        title: 'Viajes',
        icon: 'plane'
    },
    priority: 'Alta',
    featured: true,
    createdAt: new Date(),
    file:{
        id:'1234',
        name:'Archivo',
        url:'url'
    },
    user_id: 'user_d2e0jzKi44asdasd2eKJeR'
}

export const notes: Props_note[] = [
    {
        _id: '1234',
        title: 'Titulo de prueba',
        description: 'Descripcion de prueba',
        category: {
            title: 'Viajes',
            icon: 'plane'
        },
        priority: 'Alta',
        featured: true,
        createdAt: new Date(),
        file:{
            id:'1234',
            name:'Archivo',
            url:'url'
        },
        user_id: 'user_d2e0jzKi44asdasd2eKJeR'
    }
]

export const labels = [
    { title: "Titulo", name: "title" },
    { title: "Descripcion", name: "description" },
    { title: "¿Destacar nota?", name: "featured" },
    { title: "Prioridad", name: "priority" }
]