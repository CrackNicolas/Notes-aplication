import '@testing-library/jest-dom'

import { render, screen } from "@testing-library/react"

import ComponentNav from "@/frontend/components/partials/nav/container"

describe('Nav', () => {
    it('Renderizacion correcta con sesion no iniciada', () => {
        render(<ComponentNav section_current="/" user={undefined} button_sesion={<></>} />)

        const link_home = screen.getByTitle('Logo');
        const link_login = screen.getByTitle('Login');
        const link_registrar = screen.getByTitle('Registrar');

        expect(link_home).toBeInTheDocument();
        expect(link_login).toBeInTheDocument();
        expect(link_login).toHaveAttribute('href','/sign-in');
        expect(link_registrar).toBeInTheDocument();
        expect(link_registrar).toHaveAttribute('href','/sign-up');
    })

    it('Renderizacion correcta con sesion iniciada', () => {
        render(<ComponentNav section_current="/" user={{user:"Usuario"}} button_sesion={<></>} />)

        const link_home = screen.getByTitle('Logo');
        const button_notification = screen.getByTitle('Notificaciones')

        expect(link_home).toBeInTheDocument();
        expect(button_notification).toBeInTheDocument();
    })
})