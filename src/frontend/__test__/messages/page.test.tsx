import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import ComponentMessage from '@/frontend/components/layouts/messages/confirmation'

describe('Messages', () => {
    it('Comprobando vista de icono y boton', () => {
        render(<ComponentMessage open={true} setOpen={() => { }} response={{ status: 200 }} />)
        const logo = screen.getAllByTestId("icon")[0];
        const button = screen.getByRole('button', { name: "Aceptar" });

        expect(logo).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })
    
})