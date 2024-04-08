import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

export default function ComponentDashboardConfig() {
    const items = [
        {
            url: '/notes/category',
            title: 'Administracion de categorias',
            description: 'Realiza la creacion, edicion, eliminacion y visualizacion de categorias con facilidad.'
        },
        {
            url: '/notes/etiquetas',
            title: 'Administracion de etiquetas',
            description: 'Realiza la creacion, edicion, eliminacion y visualizacion de etiquetas con facilidad.'
        }
    ]

    return <ComponentTemplateDashboard items={items} />
}