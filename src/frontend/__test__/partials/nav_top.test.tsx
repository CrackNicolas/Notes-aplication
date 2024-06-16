import '@testing-library/jest-dom'
import { fireEvent, render, RenderResult } from "@testing-library/react"

import ComponentNavTop from "@/frontend/components/partials/nav/top"

import { session } from '@/frontend/__test__/mocks/session';

describe('Componente <Nav/>', () => {
    let component: RenderResult, setOpacity = jest.fn();

    beforeEach(() => {
        component = render(<ComponentNavTop section_current="/" session={session} button_sesion={<></>} opacity={false} setOpacity={setOpacity} />)
    })

    test(`Renderizacion correcta de item panel`, () => {
        component.rerender(<ComponentNavTop section_current="/dashboard/main" session={session} button_sesion={<></>} opacity={false} setOpacity={setOpacity} />)

        const element = component.getAllByTitle('Panel')[0];

        expect(element).toHaveClass('text-secondary');
        expect(element).toBeInTheDocument();
    });

    test('Renderizacion correcta de iconos', () => {
        const link_home = component.getByTitle('Logo');
        const icon_home = component.getAllByTestId('icon-home');
        const buttton_toggle = component.getByTitle('Boton toggle');

        expect(link_home).toBeInTheDocument();
        expect(buttton_toggle).toBeInTheDocument();

        fireEvent.click(buttton_toggle);

        const nav_toggle = component.getByTitle('Menu toggle');
        expect(nav_toggle).toBeInTheDocument();

        fireEvent.mouseDown(buttton_toggle);

        const item_inicio = component.getByTitle('Inicio');
        const item_panel = component.getAllByTitle('Panel')[1];

        expect(item_inicio).toBeInTheDocument();
        expect(item_panel).toBeInTheDocument();

        fireEvent.click(item_inicio);
        fireEvent.click(item_panel);

        icon_home.map(icon => {
            fireEvent.mouseOver(link_home);
            expect(icon).toHaveAttribute('name', 'logo-fill');

            fireEvent.mouseLeave(link_home);
            expect(icon).toHaveAttribute('name', 'logo');
        })
    })

    describe('Renderizacion de sesion de usuario', () => {
        test('Iniciada', () => {
            const button = component.getByTitle('Usuario');

            fireEvent.click(button);
            fireEvent.mouseDown(button);

            expect(button).toBeInTheDocument();
        });

        test('No iniciada', () => {
            component.rerender(<ComponentNavTop section_current="/" session={{}} button_sesion={<></>} opacity={false} setOpacity={setOpacity} />)

            const link_login = component.getByTitle('Iniciar sesion');

            expect(link_login).toBeInTheDocument();
            expect(link_login).toHaveAttribute('href', '/sign-in');
        })
    })

})