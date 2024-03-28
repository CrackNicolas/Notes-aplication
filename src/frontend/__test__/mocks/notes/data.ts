const date = new Date();

export const note = {
    _id: '1234',
    title: 'Titulo de prueba',
    description: 'Descripcion de prueba',
    priority: 'Alta',
    createdAt: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
}

export const notes = [
    {
        _id: '1234',
        title: 'Titulo de prueba',
        description: 'Descripcion de prueba',
        priority: 'Alta',
        createdAt: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
    }
]

export const labels = [
    { title: "Titulo", name: "title" },
    { title: "Descripcion", name: "description" },
    { title: "Prioridad", name: "priority" }
]