import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import ComponentList from '@/frontend/components/layouts/notes/list/container';
import ComponentNote from '@/frontend/components/layouts/notes/note';
import ComponentHeader from '@/frontend/components/layouts/notes/header';

import { Props_note } from '@/frontend/types/props';

import { note, notes } from '@/frontend/__test__/mocks/notes/data';

describe('Lista de notas creadas y editadas', () => {
    const search = jest.fn();
    const setSelected = jest.fn();
    const date = new Date();

    describe('Renderizacion correcta de lista de notas', () => {
        it('Renderizacion correcta de Loading con 0 notas', () => {
            render(<ComponentList notes={[]} setSelected={() => { }} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);
            const loading_notes = screen.getAllByTestId('loading-notes')[0];
            expect(loading_notes).toBeInTheDocument();
        })

        it('Renderizacion correcta de contenedor con mas de 8 notas', () => {
            let list_notes: Props_note[] = [];
            for (let i = 1; i < 9; i++) {
                list_notes.push({
                    _id: "id_" + i,
                    title: `Titulo de prueba ${i}`,
                    description: `Descripcion de prueba ${i}`,
                    priority: 'Alta',
                    createdAt: new Date(),
                });
            }
            render(<ComponentList notes={list_notes} setSelected={() => { }} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);
            const container = screen.getByTestId('container-list-notes');
            expect(container).toHaveClass('overflow-hidden overflow-y-scroll scroll pr-1');
        })

        it('Funcionamiento correcto del boton view', () => {
            setSelected(undefined);
            render(<ComponentList notes={notes} setSelected={setSelected} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);

            const button_view = screen.getByTestId('btn-view');
            fireEvent.click(button_view);

            const modal = screen.getByTestId('modal');
            expect(modal).toBeInTheDocument();

            const button_close = screen.getByTestId('view-close');
            fireEvent.click(button_close);

            expect(modal).not.toBeInTheDocument();
        })

        it('Funcionamiento correcto del boton delete', async () => {
            
        });

        it('Funcionamiento correcto del boton update', () => {
            render(<ComponentList notes={notes} setSelected={setSelected} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);

            const button_update = screen.getByTestId('btn-update');
            fireEvent.click(button_update);
            expect(setSelected).not.toBe(undefined);
        })
    })

    describe('Renderizacion correcta de nota', () => {
        it('Renderizacion correcta de elementos', () => {
            render(<ComponentNote note={note} paint={true} action_note={() => { }} />);

            const note_element = screen.getByTestId('note');
            const button_delete = screen.getByTestId('btn-delete');
            const button_update = screen.getByTestId('btn-update');
            const button_view = screen.getByTestId('btn-view');

            expect(note_element).toBeInTheDocument();
            expect(button_delete).toBeInTheDocument();
            expect(button_update).toBeInTheDocument();
            expect(button_view).toBeInTheDocument();
            expect(note_element).toHaveClass('border-opacity-100');
        })

        describe('Time elapsed al renderizar la nota', () => {
            it('Creada hace mucho tiempo', () => {
                const new_note = {
                    _id: '1234',
                    title: 'Titulo de prueba',
                    description: 'Descripcion de prueba',
                    priority: 'Alta',
                    createdAt: new Date(date.getFullYear() - 24, 6, 21),
                }
                render(<ComponentNote note={new_note} paint={true} action_note={() => { }} />);
                const time = screen.getByTestId('time-elapsed');
                expect(time.textContent).toMatch(/Hace|años|año|meses|mes|dias|dia|hs|min|seg/);
            })

            it('Creada hace mediado tiempo', () => {
                const new_note = {
                    _id: '1234',
                    title: 'Titulo de prueba',
                    description: 'Descripcion de prueba',
                    priority: 'Alta',
                    createdAt: new Date(date.getFullYear() - 1, 1, 28),
                }
                render(<ComponentNote note={new_note} paint={true} action_note={() => { }} />);
                const time = screen.getByTestId('time-elapsed');
                expect(time.textContent).toMatch(/Hace|años|año|meses|mes|dias|dia|hs|min|seg/);
            })

            it('Creada hace poco tiempo', () => {
                const new_note = {
                    _id: '1234',
                    title: 'Titulo de prueba',
                    description: 'Descripcion de prueba',
                    priority: 'Alta',
                    createdAt: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
                }
                render(<ComponentNote note={new_note} paint={true} action_note={() => { }} />);
                const time = screen.getByTestId('time-elapsed');
                expect(time.textContent).toMatch(/Hace|años|año|meses|mes|dias|dia|hs|min|seg/);
            })
        })
    })

    describe('Renderizacion correcta Header', () => {
        it('Con resultados "NO" encontrados', () => {
            render(<ComponentHeader search={search} result={true} />);
            const message = screen.getByText('No se encontraron resultados');
            expect(message).toBeInTheDocument();
        })

        it('Con resultados "SI" encontrados', () => {
            render(<ComponentHeader search={search} result={false} />);
            const message = screen.getByText('Notas');
            expect(message).toBeInTheDocument();
        })

        it('Al buscar una nota', () => {
            render(<ComponentHeader search={search} result={false} />);

            const input_search = screen.getByPlaceholderText('Buscar...');

            fireEvent.change(input_search, { target: { value: "Nombre de nota" } });

            expect(input_search).toBeInTheDocument();
            expect(input_search).toHaveValue('Nombre de nota');
        })
    })

})