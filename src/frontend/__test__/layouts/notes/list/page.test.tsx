import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import ComponentList from '@/frontend/components/layouts/notes/list/container';
import ComponentNote from '@/frontend/components/layouts/notes/note';
import ComponentHeader from '@/frontend/components/layouts/notes/header';
import ComponentLoading from '@/frontend/components/layouts/notes/list/loading';

import { note, notes } from '@/frontend/__test__/mocks/notes/data';

describe('Lista de notas creadas y editadas', () => {
    const search = jest.fn();
    let modal;
    
    it('Renderizacion correcta de lista de notas',() => {
        const setSelected = jest.fn();
        setSelected(undefined);

        render(<ComponentList notes={notes} setSelected={setSelected} selected={undefined} setRefresh={()=>{}}  setSearch={()=>{}} />);

        const button_delete = screen.getByTestId('btn-delete');
        const button_update = screen.getByTestId('btn-update');
        const button_view = screen.getByTestId('btn-view');
        
        fireEvent.click(button_view);

        modal = screen.getByTestId('modal');
        expect(modal).toBeInTheDocument();

        fireEvent.click(button_delete);

        modal = screen.getByTestId('modal');
        expect(modal).toBeInTheDocument();

        fireEvent.click(button_update);

        expect(setSelected).not.toBe(undefined);

        const view_close = screen.getByTestId('view-close');
        fireEvent.click(view_close);

        expect(view_close).not.toBeInTheDocument();
    })

    describe('Renderizacion correcta de nota',() => {
        it('Renderizacion correcta de elementos',() => {
            render(<ComponentNote note={note} paint={true} action_note={() => {}} />);

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

        it('Renderizacion correcta de time elapsed al crear la nota',() => {
            const new_note = {
                _id: '1234',
                title: 'Titulo de prueba',
                description: 'Descripcion de prueba',
                priority: 'Alta',
                createdAt: new Date(),
            }
            render(<ComponentNote note={new_note} paint={true} action_note={() => {}} />);
            const time = screen.getByTestId('time-elapsed');
            expect(time.textContent).toBe('Hace 0 seg');
        })

        it('Renderizacion correcta de time elapsed al renderizar la nota 1 dia despues',() => {
            render(<ComponentNote note={note} paint={true} action_note={() => {}} />);
            const time = screen.getByTestId('time-elapsed');
            expect(time.textContent).toMatch(/Hace|años|año|meses|mes|dias|dia|hs|min|seg/);
        })
    })

    it('Renderizacion correcta Loading',() => {
        const {container} = render(<ComponentLoading count={8} />);
        expect(container).not.toBeNull();
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