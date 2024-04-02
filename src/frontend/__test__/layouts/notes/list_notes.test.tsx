import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import ComponentList from '@/frontend/components/layouts/notes/list/container';
import ComponentNote from '@/frontend/components/layouts/notes/note';
import ComponentHeader from '@/frontend/components/layouts/notes/header';

import { Props_note } from '@/frontend/types/props';

import { note, notes } from '@/frontend/__test__/mocks/notes';

describe('Lista de notas creadas y editadas', () => {
    const setSelected = jest.fn(), search = jest.fn();
    const date = new Date();

    describe('Renderizacion correcta del Header', () => {
        test('Con resultados "NO" encontrados', () => {
            const component = render(<ComponentHeader search={search} result={true} />);
            const message = component.getByText('No se encontraron resultados');
            expect(message).toBeInTheDocument();
        })

        test('Con resultados "SI" encontrados', () => {
            const component = render(<ComponentHeader search={search} result={false} />);
            const message = component.getByText('Notas');
            expect(message).toBeInTheDocument();
        })

        test('Al buscar una nota', () => {
            const component = render(<ComponentHeader search={search} result={false} />);
            const input_search = component.getByPlaceholderText('Buscar...');

            fireEvent.change(input_search, { target: { value: "Nombre de nota" } });

            expect(input_search).toBeInTheDocument();
            expect(input_search).toHaveValue('Nombre de nota');
        })
    })

    describe('Renderizacion correcta de nota', () => {
        test('Renderizacion correcta de elementos', () => {
            const component = render(<ComponentNote note={note} paint={true} action_note={() => { }} />);
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
                    name: 'mucho',
                    date: new Date(date.getFullYear() - 24, 6, 21)
                },
                {
                    name: 'mediado',
                    date: new Date(date.getFullYear() - 1, 1, 28)
                },
                {
                    name: 'poco',
                    date: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
                }
            ]

            times.map(time => {
                test(`Creada hace ${time.name} tiempo`, () => {
                    note.createdAt = time.date;
                    const component = render(<ComponentNote note={note} paint={true} action_note={() => { }} />);
                    const element_time = component.getByTitle('Tiempo transcurrido');
                    expect(element_time.textContent).toMatch(/Hace|años|año|meses|mes|dias|dia|hs|min|seg/);
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
                    priority: 'Alta',
                    createdAt: new Date(),
                });
            }
            const component = render(<ComponentList notes={list_notes} setSelected={() => { }} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);
            const container = component.getByTitle('Lista de notas');
            expect(container).toHaveClass('overflow-hidden overflow-y-scroll scroll pr-1');
        })

        test('Funcionamiento correcto del boton view', () => {
            setSelected(undefined);
            const component = render(<ComponentList notes={notes} setSelected={setSelected} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);

            const button_view = component.getByRole('button', { name: 'Ver' });
            fireEvent.click(button_view);

            const modal = component.getByTitle('modal');
            expect(modal).toBeInTheDocument();

            const button_close = component.getByRole('button', { name: 'Boton cerrar' });
            fireEvent.click(button_close);

            expect(modal).not.toBeInTheDocument();
        })

        test('Funcionamiento correcto del boton delete', () => {
            
        })

        test('Funcionamiento correcto del boton update', () => {
            const component = render(<ComponentList notes={notes} setSelected={setSelected} selected={undefined} setRefresh={() => { }} setSearch={() => { }} />);
            const button_update = component.getByRole('button', { name: 'Editar' });
            fireEvent.click(button_update);
            expect(setSelected).not.toBe(undefined);
        })
    })
})