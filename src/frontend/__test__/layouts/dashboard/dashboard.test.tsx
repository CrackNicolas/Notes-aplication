import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import ComponentDashboardMain from '@/frontend/components/layouts/dashboard/main'
import ComponentTemplateDashboard from '@/frontend/components/partials/template/dashboard/container'

import { items_main } from '@/frontend/constant/dashboard'
import { items_config } from '@/frontend/constant/dashboard'

const mock_push = jest.fn();

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: () => ({
        push: mock_push
    })
}));

describe('Componente <DashboardMain/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<ComponentDashboardMain items={items_main} />);
    });

    test('Renderizacion correcta en el Header', () => {
        Analyze(component);
    });

    test('Renderizacion correcta en los Items', () => {
        items_main.forEach(item => {
            const title = component.getByTitle(item.title);
            const icons = component.getAllByTestId('icon-item');

            expect(title).toHaveAttribute('href', item.url);
            expect(component.getByText(item.title)).toBeInTheDocument();
            expect(component.getByText(item.description)).toBeInTheDocument();

            icons.map(icon => {
                fireEvent.mouseOver(title);
                fireEvent.mouseLeave(title);
                fireEvent.click(icon);
            });
        });
    });

    test('Renderizacion correcta loading Items', () => {
        component.rerender(<ComponentDashboardMain items={[]} />);

        const items_loading = component.getAllByTitle('Cargando...');

        items_loading.map(item => {
            expect(item).toBeInTheDocument();
        })
    });
})

describe('Componente <DashboardConfig/>', () => {
    let component: RenderResult

    beforeEach(() => {
        component = render(<ComponentTemplateDashboard items={items_config} view_redirect={true} />);
    });

    test('Renderizacion correcta en el Header', () => {
        Analyze(component);
    });

    test('Renderizacion correcta en los Items', () => {
        items_config.forEach(item => {
            expect(component.getByText(item.title)).toBeInTheDocument()
            expect(component.getByTitle(item.title)).toHaveAttribute('href', item.url);
            expect(component.getByText(item.description)).toBeInTheDocument()
        })
    });

    test('Redirigir a la ruta correcta', () => {
        const volver = component.getByTitle("Volver atras");

        fireEvent.click(volver);

        expect(mock_push).toHaveBeenCalledWith('/dashboard/main');
    });
})

function Analyze(component: RenderResult) {
    const title = component.getByText("Panel de Control");
    const subtitle = component.getByText("Organiza tu mundo, mantente al tanto de lo más importante.");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
}