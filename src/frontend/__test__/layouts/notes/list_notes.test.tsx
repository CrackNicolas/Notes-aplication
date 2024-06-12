import '@testing-library/jest-dom';

import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';

import ComponentList from '@/frontend/components/layouts/notes/list/container';
import ComponentNote from '@/frontend/components/layouts/notes/note';
import ComponentHeader from '@/frontend/components/layouts/notes/header';

import { Props_note } from '@/context/types/note';

import { note, notes } from '@/frontend/__test__/mocks/notes';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onDelete(`/api/notes/${note._id}`).reply(204, {
    status: 204,
    info: {
        message: 'Nota eliminada'
    }
});

describe('Componente <List/> de crud', () => {
    const setSelected = jest.fn(), search = jest.fn();
    const date = new Date();

    describe('Renderizacion correcta del Header', () => {
        let component: RenderResult;

        beforeEach(() => {
            component = render(<ComponentHeader search={search} result={true} />);
        })

        test('Con resultados "NO" encontrados', () => {
            const message = component.getByText('No se encontraron resultados');
            expect(message).toBeInTheDocument();
        })

        test('Con resultados "SI" encontrados', () => {
            component.rerender(<ComponentHeader search={search} result={false} />);
            const message = component.getByText('Notas');
            expect(message).toBeInTheDocument();
        })

        test('Al buscar una nota', () => {
            const input_search = component.getByPlaceholderText('Buscar...');

            fireEvent.change(input_search, { target: { value: "Nombre de nota" } });

            expect(input_search).toBeInTheDocument();
            expect(input_search).toHaveValue('Nombre de nota');
        })
    })

    describe('Renderizacion correcta de nota', () => {
        let component: RenderResult;

        beforeEach(() => {
            component = render(<ComponentNote note={note} paint={true} action_note={() => { }} />);
        })

        test('Renderizacion correcta de elementos', () => {
            const note_element = component.getByTitle('Nota');
            const button_delete = component.getByRole('button', { name: 'Eliminar' });
            const button_update = component.getByRole('button', { name: 'Editar' });
            const button_view = component.getByRole('button', { name: 'Ver' });

            expect(note_element).toBeInTheDocument();
            expect(button_delete).toBeInTheDocument();
            expect(button_update).toBeInTheDocument();
            expect(button_view).toBeInTheDocument();
            expect(note_element).toHaveClass('border-opacity-100');
        })

        describe('Time elapsed al renderizar la nota', () => {
            const times = [
                {
                    name: 'demasiado',
                    date: new Date(date.getFullYear() - 24, 6, 21)
                },
                {
                    name: 'mucho',
                    date: new Date(date.getFullYear() - 1, 1, 28)
                },
                {
                    name: 'mediado',
                    date: new Date(date.getFullYear(), date.getMonth() - 2, date.getDate() - 1)
                },
                {
                    name: 'poco',
                    date: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
                }
            ]

            times.map(time => {
                test(`Creada hace ${time.name} tiempo`, () => {
                    note.createdAt = time.date;
                    const element_time = component.getByTitle('Tiempo transcurrido');
                    expect(element_time.textContent).toMatch(/Hace|años|año|meses|mes|dias|dia|hs|min|seg|Recien creada/);
                })
            })
        })
    })


    describe('Renderizacion correcta de lista de notas', () => {
        test('Renderizacion correcta de Loading con 0 notas', () => {
            const component = render(<ComponentList notes={[]} setSelected={() => { }} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);
            const loading_notes = component.getAllByTitle('Loading de nota')[0];
            expect(loading_notes).toBeInTheDocument();
        })

        test('Renderizacion correcta de contenedor con mas de 8 notas', () => {
            let list_notes: Props_note[] = [];
            for (let i = 1; i < 9; i++) {
                list_notes.push({
                    _id: "id_" + i,
                    title: `Titulo de prueba ${i}`,
                    description: `Descripcion de prueba ${i}`,
                    category: {
                        title: 'Viajes',
                        icon: 'plane'
                    },
                    priority: 'Alta',
                    featured: true,
                    createdAt: new Date(),
                    user_id: 'user_d2e0jzKi44asdasd2eKJeR'
                });
            }
            const component = render(<ComponentList notes={list_notes} setSelected={() => { }} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);
            const container = component.getByTitle('Lista de notas');
            expect(container).toHaveClass('overflow-hidden overflow-y-scroll scroll pr-1');
        })

        test('Funcionamiento correcto del boton view', () => {
            setSelected(undefined);
            const { getByRole, getByTitle } = render(<ComponentList notes={notes} setSelected={setSelected} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);

            const button_view = getByRole('button', { name: 'Ver' });
            fireEvent.click(button_view);

            const modal = getByTitle('modal');
            expect(modal).toBeInTheDocument();

            const button_close = getByRole('button', { name: 'Boton cerrar' });
            fireEvent.click(button_close);

            expect(modal).not.toBeInTheDocument();
        })

        test('Funcionamiento correcto del boton update', () => {
            const { getByRole } = render(<ComponentList notes={notes} setSelected={setSelected} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);
            const button_update = getByRole('button', { name: 'Editar' });
            fireEvent.click(button_update);
            expect(setSelected).not.toBe(undefined);
        })

        describe('Funcionamiento correcto del boton delete', () => {
            let component: RenderResult;
            let button_delete: HTMLElement;

            beforeEach(() => {
                component = render(<ComponentList notes={notes} setSelected={setSelected} selected={note} setRefresh={() => { }} setSearch={() => { }} />);
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
})