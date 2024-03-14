import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ComponentForm from '@/frontend/components/layouts/notes/form';
import ComponentLabel from '@/frontend/components/layouts/notes/label';
import ComponentInput from '@/frontend/components/layouts/notes/input';

describe('Formulario de creacion y edicion de notas', () => {
    it('Renderizacion correcta', () => {
        render(<ComponentForm selected={undefined} setRefresh={() => { }} setSelected={() => { }} />)

        const title = screen.getByTestId('title-global');
        const input_title = screen.getByPlaceholderText('Escriba el titulo...');
        const input_description = screen.getByPlaceholderText('Escriba la descripcion...');
        const inputs_priority = screen.getAllByRole('radio');
        const label_title = screen.getByTestId('title');
        const label_description = screen.getByTestId('description');
        const button_submit = screen.getByTestId('Enviar');
        const button_deshacer = screen.getByTestId('Deshacer');

        expect(title).toBeInTheDocument();
        expect(input_title).toBeInTheDocument();
        expect(input_description).toBeInTheDocument();
        expect(label_title).toBeInTheDocument();
        expect(label_description).toBeInTheDocument();
        expect(button_submit).toBeInTheDocument();
        expect(button_deshacer).toBeInTheDocument();

        inputs_priority.map(input => {
            expect(input).toBeInTheDocument();
        })
    });

    it('Renderizacion correcta para crear notas', () => {
        render(<ComponentForm selected={undefined} setRefresh={() => { }} setSelected={() => { }} />)

        const title = screen.getByTestId('title-global');
        const button_submit = screen.getByTestId('Enviar');

        expect(title.textContent).toBe('Crear nota');
        expect(button_submit.textContent).toBe('Crear nota');
    });

    it('Renderizacion correcta para editar notas', () => {
        const notes = {
            _id: '1234',
            title: 'Titulo de prueba',
            description: 'Descripcion de prueba',
            priority: 'Alta',
            createdAt: '2020-01-21'
        }

        render(<ComponentForm selected={notes} setRefresh={() => { }} setSelected={() => { }} />)

        const title = screen.getByTestId('title-global');
        const button_submit = screen.getByTestId('Enviar');

        expect(title.textContent).toBe('Editar nota');
        expect(button_submit.textContent).toBe('Editar nota');
    });

    describe('Renderizacion correcta de mensajes de error', () => {
        const validations = [
            { name: "required", match: /requerido|requerida/ },
            { name: "minLength", match: /caracteres/ },
            { name: "maxLength", match: /caracteres/ },
            { name: "pattern", match: /caracteres no permitidos/ }
        ]

        const labels = [
            { title: "Titulo", name: "title" },
            { title: "Descripcion", name: "description" },
            { title: "Prioridad", name: "priority" }
        ]

        validations.forEach(validation => {
            describe(`Error ${validation.name}`, () => {
                labels.forEach(label => {
                    it(`${label.title}`, () => {
                        render(<ComponentLabel title={label.title} html_for={label.name} validation={{}} error={validation.name} />)

                        const label_element = screen.getByTestId(label.name);

                        expect(label_element.textContent).toMatch(validation.match);
                    })
                })
            })
        })
    });

    describe('Validacion correcta de errores en los inputs', () => {
        describe('required', () => {
            it('Title', () => {
                const register = jest.fn();
                
                render(<ComponentInput
                    type="text"
                    name="title"
                    placeholder="Escriba el titulo..."
                    register={register}
                    error="required"
                    description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                />)

                const input_title = screen.getByLabelText('title');

                expect(input_title).toHaveClass('border-error text-error placeholder:text-error');










            })

        })
    })
});