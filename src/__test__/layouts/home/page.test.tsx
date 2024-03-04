import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import ComponentHome from '@/frontend/components/layouts/home/container'

describe('Home', () => {
    it('Comprobando vista correcta', () => {
        render(<ComponentHome />)
        const logo = screen.getByTestId("icon");
        const title = screen.getByText('Notes Aplication');
        const subtitle = screen.getByText('¡Organiza tu vida, toma notas sin límites!');
        const link = screen.getByRole("link");

        expect(logo).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/dashboard');
    })
})