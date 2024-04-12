import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import ComponentDashboardMain from '@/frontend/components/layouts/dashboard/main'

import { items_main } from '@/frontend/enums/dashboard'

describe('Componente <Dashboard/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<ComponentDashboardMain />);
    });

    test('Renderizacion correcta en el Header', () => {
        const title = component.getByText("Panel de Control");
        const subtitle = component.getByText("Organiza tu mundo, mantente al tanto de lo más importante.");

        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
    })

    test('Renderizacion correcta en los Items', () => {
        const icons = component.getAllByTestId("icon");

        icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
            fireEvent.mouseOver(icon);
            fireEvent.mouseLeave(icon);
        })

        items_main.forEach(item => {
            expect(component.getByText(item.title)).toBeInTheDocument()
            expect(component.getByTitle(item.title)).toHaveAttribute('href', item.url);
            expect(component.getByText(item.description)).toBeInTheDocument()
        })
    })

})