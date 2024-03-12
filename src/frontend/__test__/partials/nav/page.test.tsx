import '@testing-library/jest-dom'

import { fireEvent, render, screen } from "@testing-library/react"

import ComponentNav from "@/frontend/components/partials/nav/container"

describe('Nav', () => {
    describe('Renderizacion correcta en el cambio de seccion', () => {
        const sections = [
            { name: "dashboard" },
            { name: "notes" }
        ];
    
        sections.forEach(section => {
            it(`La seccion ${section.name} se pinta correctamente`, () => {
                render(<ComponentNav section_current={section.name} user={undefined} button_sesion={<></>} />);
                const section_element = screen.getByTestId(section.name);
                expect(section_element).toHaveClass('text-secondary');
            });
        });
    });

    it('Renderizacion correcta con elementos basicos', () => {
        render(<ComponentNav section_current="/" user={undefined} button_sesion={<></>} />)

        const link_home = screen.getByTitle('Logo');
        const button_toggle = screen.getByTitle('Toggle');
        const nav_toggle = screen.getByTestId('nav-toggle');
        const icon_home = screen.getByTestId('logo');

        expect(link_home).toBeInTheDocument();

        fireEvent.click(button_toggle);
        expect(nav_toggle).toHaveClass('visible');

        fireEvent.click(button_toggle);
        expect(nav_toggle).toHaveClass('hidden')

        fireEvent.mouseOver(link_home);
        expect(icon_home).toHaveAttribute('name', 'logo-fill');

        fireEvent.mouseLeave(link_home);
        expect(icon_home).toHaveAttribute('name', 'logo');
    })

    it('Renderizacion correcta con sesion no iniciada', () => {
        render(<ComponentNav section_current="/" user={undefined} button_sesion={<></>} />)

        const link_login = screen.getByTitle('Login');
        const link_registrar = screen.getByTitle('Registrar');

        expect(link_login).toBeInTheDocument();
        expect(link_login).toHaveAttribute('href', '/sign-in');
        expect(link_registrar).toBeInTheDocument();
        expect(link_registrar).toHaveAttribute('href', '/sign-up');
    })

    it('Renderizacion correcta con sesion iniciada', () => {
        render(<ComponentNav section_current="/" user={{ user: "Usuario" }} button_sesion={<></>} />)

        const button_notification = screen.getByTitle('Notificaciones');

        expect(button_notification).toBeInTheDocument();
    })
})