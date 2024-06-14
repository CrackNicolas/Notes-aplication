import '@testing-library/jest-dom';
import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import ComponentList from '@/frontend/components/layouts/search/list';

import { note, notes } from '@/frontend/__test__/mocks/notes';

describe('Componente <Search/>', () => {
    const action_note = jest.fn();

    describe('Renderizacion correcta de <List/>', () => {
        test('Sin notas', () => {
            const { getAllByTitle } = render(<ComponentList notes={[]} action_note={action_note} />);

            const items_loading = getAllByTitle('Cargando nota');

            items_loading.map(item => {
                expect(item).toBeInTheDocument();
            })
        });

        test('Con notas', () => {
            const { getAllByTitle } = render(<ComponentList notes={notes} action_note={action_note} />);

            const items_loading = getAllByTitle('Nota');

            items_loading.map(item => {
                expect(item).toBeInTheDocument();
            })

        });
    })

    describe('Renderizacion correcta de cada tipo de nota', () => {
        notes.map(note => {
            test(`Con prioridad ${note.priority}`, () => {
                const { getByRole } = render(<ComponentList notes={[note]} action_note={action_note} />);

                const button_view = getByRole('button', { name: 'Ver' });

                fireEvent.click(button_view);
            })
        })
    })

    test('Funcionamiento correcto del boton view', () => {
        const { getByRole, getByTitle } = render(<ComponentList notes={[note]} action_note={action_note} />);

        const button_view = getByRole('button', { name: 'Ver' });
        fireEvent.click(button_view);

        const modal = getByTitle('modal');
        expect(modal).toBeInTheDocument();

        const button_close = getByRole('button', { name: 'Boton cerrar' });
        fireEvent.click(button_close);

        expect(modal).not.toBeInTheDocument();
    })

    test('Funcionamiento correcto del boton update', () => {
        const { getByRole } = render(<ComponentList notes={[note]} action_note={action_note} />);
        const button_update = getByRole('button', { name: 'Editar' });

        fireEvent.click(button_update);
    })

    describe('Funcionamiento correcto del boton delete', () => {
        let component: RenderResult;
        let button_delete: HTMLElement;

        beforeEach(() => {
            component = render(<ComponentList notes={[note]} action_note={action_note} />);
            button_delete = component.getByRole('button', { name: 'Eliminar' });
        })

        test('Renderizacion correcta de modal confirmation', async () => {
            fireEvent.click(button_delete);

            await waitFor(() => {
                const modal = component.getByTitle('modal');
                const text_modal = component.getByTitle('¿Seguro que desea eliminar?');
                const button_no = component.getByRole('button', { name: 'NO' });
                const button_si = component.getByRole('button', { name: 'SI' });

                expect(modal).toBeInTheDocument();
                expect(text_modal.textContent).toBe('¿Seguro que desea eliminar?');
                expect(button_no).toBeInTheDocument();
                expect(button_si).toBeInTheDocument();
            })
        })

        test('Renderizacion correcta de modal confirmation con respuesta "NO"', async () => {
            fireEvent.click(button_delete);

            await waitFor(() => {
                const button_no = component.getByRole('button', { name: 'NO' });
                const text_modal = component.getByTitle('¿Seguro que desea eliminar?');

                fireEvent.click(button_no);

                expect(text_modal).not.toBeInTheDocument();
            })
        })

        test('Renderizacion correcta de modal confirmation con respuesta "SI"', async () => {
            fireEvent.click(button_delete);

            await waitFor(() => {
                const button_si = component.getByRole('button', { name: 'SI' });
                const text_modal = component.getByTitle('¿Seguro que desea eliminar?');

                fireEvent.click(button_si);

                expect(text_modal).not.toBeInTheDocument();
            })
        })
    })
})