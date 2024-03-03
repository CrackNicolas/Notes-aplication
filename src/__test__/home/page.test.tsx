import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import ComponentHome from '@/frontend/components/layouts/home/container'

describe('Home', () => {
    it('Comprobando vista correcta de textos', () => {
        render(<ComponentHome/>)
        const title = screen.getByText('Notes Aplication');

        expect(title).toBeInTheDocument();
    })
})