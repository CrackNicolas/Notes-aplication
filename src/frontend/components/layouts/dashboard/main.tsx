import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

export default function ComponentDashboardMain() {
    const items = [
        {
            url: '/notes',
            title: 'Administrador de notas',
            description: 'Realiza la creacion, edicion, eliminacion y visualizacion de notas con facilidad.'
        },
        {
            url: '/dashboard/config',
            title: 'Configuracion de notas',
            description: 'Configura tus notas para mejorar tu experiencia personalizando diversos aspectos.'
        }
    ]

    return <ComponentTemplateDashboard items={items} />
}