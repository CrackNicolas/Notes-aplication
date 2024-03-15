import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ComponentForm from '@/frontend/components/layouts/notes/container_form';
import ComponentLabel from '@/frontend/components/layouts/notes/label';
import ComponentInput from '@/frontend/components/layouts/notes/input';
import ComponentItemPriority from '@/frontend/components/layouts/notes/item_priority';

const register = jest.fn();

const note = {
    _id: '1234',
    title: 'Titulo de prueba',
    description: 'Descripcion de prueba',
    priority: 'Alta',
    createdAt: '2020-01-21'
}

const labels = [
    { title: "Titulo", name: "title" },
    { title: "Descripcion", name: "description" },
    { title: "Prioridad", name: "priority" }
]

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
        render(<ComponentForm selected={note} setRefresh={() => { }} setSelected={() => { }} />)

        const title = screen.getByTestId('title-global');
        const button_submit = screen.getByTestId('Enviar');

        expect(title.textContent).toBe('Editar nota');
        expect(button_submit.textContent).toBe('Editar nota');
    });

    it('Renderizacion correcta al deshacer una operacion', () => {
        const setSelected = jest.fn();
        setSelected(note);
        render(<ComponentForm selected={note} setRefresh={() => { }} setSelected={setSelected} />)

        const input_title = screen.getByPlaceholderText('Escriba el titulo...');
        const input_description = screen.getByPlaceholderText('Escriba la descripcion...');
        const input_priority = screen.getByTestId('text-option_1');

        expect(input_title).toHaveValue(note.title);
        expect(input_description).toHaveValue(note.description);
        expect(input_priority).toHaveClass('bg-secondary text-primary');

        const button_deshacer = screen.getByTestId('Deshacer');
        fireEvent.click(button_deshacer);

        expect(setSelected).toHaveBeenCalledWith(undefined);
        expect(input_title).toHaveValue('');
        expect(input_description).toHaveValue('');
        expect(input_priority).toHaveClass('text-secondary group-hover:bg-secondary group-hover:text-primary');
    })

    describe('Renderizacion correcta de mensajes de error', () => {
        const validations = [
            { name: "required", match: /requerido|requerida/ },
            { name: "minLength", match: /caracteres/ },
            { name: "maxLength", match: /caracteres/ },
            { name: "pattern", match: /caracteres no permitidos/ }
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
        describe('Sin errores', () => {
            labels.forEach(label => {
                it(`${label.title}`, () => {
                    render(<ComponentLabel title={label.title} html_for={label.name} validation={{}} error={undefined} />)
                    const label_element = screen.getByTestId(label.name);
                    expect(label_element.textContent).toMatch(new RegExp(label.title));
                })
            })
        })

    });

    describe('Validacion correcta sin errores en los inputs', () => {
        const inputs = labels;
        inputs.forEach(input => {
            it(`${input.name}`, () => {
                render(<ComponentInput
                    type="text"
                    name={input.name}
                    placeholder="Escriba..."
                    register={register}
                    error={undefined}
                    description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                />)
                const input_element = screen.getByTestId('input-' + input.name);
                expect(input_element).toHaveClass('border-secondary text-secondary placeholder:text-secondary');
            })
        })
    })

    describe('Validacion correcta de errores en los inputs', () => {
        const validations = [{ name: "required" }, { name: "minLength" }, { name: "maxLength" }, { name: "pattern" }]

        describe('Titulo', () => {
            validations.forEach(validation => {
                it(`Error ${validation.name}`, () => {
                    render(<ComponentInput
                        type="text"
                        name="title"
                        placeholder="Escriba el titulo..."
                        register={register}
                        error={validation.name}
                        description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const input_title = screen.getByTestId('input-title');
                    expect(input_title).toHaveClass('border-error text-error placeholder:text-error');
                })
            })
        })

        describe('Descripcion', () => {
            validations.forEach(validation => {
                it(`Error ${validation.name}`, () => {
                    render(<ComponentInput
                        rows={3}
                        name="description"
                        placeholder="Escriba la descripcion..."
                        register={register}
                        error={validation.name}
                        description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const input_description = screen.getByTestId('input-description');
                    expect(input_description).toHaveClass('border-error text-error placeholder:text-error');
                })
            })
        })

        describe('Prioridad', () => {
            const items = [{ name: "option_1", value: "Alta" }, { name: "option_2", value: "Media" }, { name: "option_3", value: "Baja" }];

            describe('Error required', () => {
                items.forEach(item => {
                    it(`${item.name}`, () => {
                        render(<ComponentItemPriority
                            id={item.name}
                            value={item.value}
                            class_icon="text-red-500 rotate-[-180deg]"
                            paint={false}
                            error="required"
                            register={register}
                        />)
                        const label = screen.getByTestId(item.name);
                        const text_label = screen.getByTestId(`text-${item.name}`);

                        expect(label).toHaveClass('border-error');
                        expect(text_label).toHaveClass('text-error group-hover:bg-error group-hover:text-primary');
                    })
                })
            })
        })
    })
});