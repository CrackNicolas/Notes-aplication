import '@testing-library/jest-dom'

import { RenderResult, render } from '@testing-library/react'

import ComponentHome from '@/frontend/components/layouts/home/container'

describe('Componente <Home/>', () => {
    test('Renderizacion correcta sin inicio de sesion', () => {
        const component = render(<ComponentHome id={undefined} />);
        Analyze(component, '/sign-in');
    })

    test('Renderizacion correcta con inicio de sesion', () => {
        const component = render(<ComponentHome id={'id_de_prueba'} />);
        Analyze(component, '/dashboard/main');
    })
})

function Analyze(component: RenderResult, url: string) {
    const logo = component.getByTestId("icon-home");
    const title = component.getByText('Aplicacion de notas');
    const subtitle = component.getByText('¡Organiza tu vida, toma notas sin límites!');
    const link = component.getByRole("link");

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', url);
}