import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult } from "@testing-library/react"

import ComponentNav from "@/frontend/components/partials/nav/container"

describe('Componente <Nav/>', () => {
    let component: RenderResult;

    beforeEach(() => {
        component = render(<ComponentNav section_current="/" user={undefined} button_sesion={<></>} />)
    })

    describe('Renderizacion correcta en el cambio de seccion', () => {
        const sections = [
            { name: "dashboard", title: "Panel" },
            { name: "notes", title: "Notes" }
        ];

        sections.forEach(section => {
            test(`Seccion ${section.name} renderizada correctamente`, () => {
                component.rerender(<ComponentNav section_current={section.name} user={undefined} button_sesion={<></>} />);
                const element = component.getByTitle(section.title);
                expect(element).toHaveClass('text-secondary');
            });
        });
    });

    test('Renderizacion correcta con elementos basicos', () => {
        const link_home = component.getByTitle('Logo');
        const button_toggle = component.getByTitle('Toggle');
        const toggle = component.getByTitle('toggle');
        const icon_home = component.getByTestId('icon-home');

        expect(link_home).toBeInTheDocument();

        fireEvent.click(button_toggle);
        expect(toggle).toHaveClass('visible');

        fireEvent.click(button_toggle);
        expect(toggle).toHaveClass('hidden')

        fireEvent.mouseOver(link_home);
        expect(icon_home).toHaveAttribute('name', 'logo-fill');

        fireEvent.mouseLeave(link_home);
        expect(icon_home).toHaveAttribute('name', 'logo');
    })

    describe('Renderizacion de sesion de usuario', () => {
        test('No iniciada', () => {
            const link_login = component.getByTitle('Login');
            const link_registrar = component.getByTitle('Registrar');

            expect(link_login).toBeInTheDocument();
            expect(link_login).toHaveAttribute('href', '/sign-in');
            expect(link_registrar).toBeInTheDocument();
            expect(link_registrar).toHaveAttribute('href', '/sign-up');
        })

        test('Iniciada', () => {
            component.rerender(<ComponentNav section_current="/" user={{ user: "Usuario" }} button_sesion={<></>} />)

            const button = component.getByTitle('Notificaciones');
            expect(button).toBeInTheDocument();
        })
    })
})