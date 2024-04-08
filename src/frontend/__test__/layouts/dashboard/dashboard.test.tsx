import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import ComponentDashboard from '@/frontend/components/layouts/dashboard/main'

describe('Componente <Dashboard/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<ComponentDashboard />);
    });

    test('Renderizacion correcta en el Header', () => {
        const title = component.getByText("Panel de Control");
        const subtitle = component.getByText("Organiza tu mundo, mantente al tanto de lo más importante.");

        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
    })

    test('Renderizacion correcta en los Items', () => {
        const items = [
            {
                url: "",
                title: "Resumen de Actividad",
                description: "Un vistazo rápido a tu historial de actividad: desde nuevas notas hasta actualizaciones clave."
            },
            {
                url: "",
                title: "Estadisticas de uso",
                description: "Descubre patrones y mejora tu productividad con estadísticas y frecuencia de uso."
            },
            {
                url: "",
                title: "Notas destacadas",
                description: "Acceso rápido a tus notas clave. Tu atajo instantáneo a la información más importante."
            },
            {
                url: "",
                title: "Recordatorios",
                description: "No pierdas tareas importantes. Alertas y notificaciones para una gestión sin preocupaciones."
            },
            {
                url: "",
                title: "Categorias y etiquetas",
                description: "Clasifica y detalla tus notas fácilmente. Flexibilidad total para una organización precisa."
            },
            {
                url: "",
                title: "Archivos adjuntos",
                description: "Mejora tus notas con imágenes y documentos para una experiencia completa."
            }
        ];

        const icons = component.getAllByTestId("icon");

        icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            fireEvent.mouseOver(icon);
            fireEvent.mouseLeave(icon);
        })

        items.forEach(item => {
            expect(component.getByText(item.title)).toBeInTheDocument()
            expect(component.getByText(item.title)).toHaveAttribute('href', item.url);
            expect(component.getByText(item.description)).toBeInTheDocument()
        })
    })

})