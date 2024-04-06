import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import ComponentHome from '@/frontend/components/layouts/home/container'

describe('Componente <Home/>', () => {
    test('Renderizacion correcta', () => {
        const component = render(<ComponentHome />);

        const logo = component.getByTestId("icon-home");
        const title = component.getByText('Aplicacion de notas');
        const subtitle = component.getByText('¡Organiza tu vida, toma notas sin límites!');
        const link = component.getByRole("link");

        expect(logo).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/dashboard');
    })
})