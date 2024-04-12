import { Props_note } from "@/context/types/note"

export const note: Props_note = {
    _id: '1234',
    title: 'Titulo de prueba',
    description: 'Descripcion de prueba',
    category: 'Viaje',
    priority: 'Alta',
    featured: true,
    createdAt: new Date()
}

export const notes: Props_note[] = [
    {
        _id: '1234',
        title: 'Titulo de prueba',
        description: 'Descripcion de prueba',
        category: 'Viaje',
        priority: 'Alta',
        featured: true,
        createdAt: new Date()
    }
]

export const labels = [
    { title: "Titulo", name: "title" },
    { title: "Descripcion", name: "description" },
    { title: "Prioridad", name: "priority" }
]