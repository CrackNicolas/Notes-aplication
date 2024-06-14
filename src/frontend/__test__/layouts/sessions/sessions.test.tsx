import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import ComponentHeader from '@/frontend/components/layouts/sessions/header';
import ComponentList from '@/frontend/components/layouts/sessions/list/container';

import { sessions } from '@/frontend/__test__/mocks/session';

describe('Componente <Sessions/>', () => {

    test('Renderizacion correcta en el Header', () => {
        const { getByText } = render(<ComponentHeader count_sessions={5} />);

        const title = getByText("Lista de usuarios");
        const count = getByText("5");

        expect(title).toBeInTheDocument();
        expect(count).toBeInTheDocument();
    });

    describe('Renderizacion correcta en <List/>', () => {
        test('Sin sesiones', () => {
            const { getAllByTitle } = render(<ComponentList sessions={[]} />);
    
            const items_loading = getAllByTitle('Cargando...');
    
            items_loading.map(item => {
                expect(item).toBeInTheDocument();
            })
        });
    
        test('Con sesiones', () => {
            const { getByTitle } = render(<ComponentList sessions={sessions} />);
    
            sessions.map(session => {
                const item = getByTitle(`Sesion ${session.user?.name}`);
    
                expect(item).toBeInTheDocument();
            })
        });
    })
})