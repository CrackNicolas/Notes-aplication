import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { Props_response } from '@/context/types/response';

import ComponentForm from '@/frontend/components/layouts/notes/container_form';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentSelect from '@/frontend/components/partials/form/select';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';

import { labels, note } from '@/frontend/__test__/mocks/notes'
import { categorys } from '@/frontend/__test__/mocks/categorys';

const mock = new MockAdapter(axios);

mock.onGet('/api/categorys/true').reply<Props_response>(200, {
    status: 200,
    data: categorys
});

mock.onPost('/api/notes').reply<Props_response>(201, {
    status: 201,
    info: {
        message: 'Nota creada'
    }
});

mock.onPut('/api/notes').reply(200, {
    status: 200,
    info: {
        message: 'Nota editada'
    }
});

const params = new URLSearchParams();
params.append('data', JSON.stringify({ note }));

jest.mock("next/navigation", () => ({
    ...jest.requireActual('next/navigation'),
    useSearchParams: () => params,
}))

describe('Componente <Form/> principal', () => {
    const register = jest.fn(), setSelected = jest.fn();

    test('Renderizacion correcta de elementos', async () => {
        const component = render(<ComponentForm selected={undefined} setRefresh={() => { }} setSelected={() => { }} />);

        const input_title = component.getByPlaceholderText('Escriba el titulo...');
        const input_description = component.getByPlaceholderText('Escriba la descripcion...');
        const inputs_priority = component.getAllByRole('radio');
        const input_file = component.getByLabelText('Subir archivo...');
        const label_title = component.getByTitle('Titulo');
        const label_description = component.getByTitle('Descripcion');
        const load_categorys = component.getByTitle('Cargando categorias');
        const button_deshacer = component.getByRole('button', { name: 'Deshacer' });

        expect(input_title).toBeInTheDocument();
        expect(input_description).toBeInTheDocument();
        expect(load_categorys).toBeInTheDocument();
        expect(label_title).toBeInTheDocument();
        expect(label_description).toBeInTheDocument();
        expect(input_file).toBeInTheDocument();
        expect(button_deshacer).toBeInTheDocument();

        inputs_priority.map(input => {
            expect(input).toBeInTheDocument();
        })

        await waitFor(() => {
            const container = component.getByTitle('Categoria');

            fireEvent.click(container);

            const list_categorys = component.getByTitle('Lista de categorias');

            expect(list_categorys).toBeInTheDocument();
            expect(list_categorys).toHaveClass('overflow-hidden overflow-y-scroll scroll-select h-[130px]');
            expect(container).toBeInTheDocument();
            expect(container).toHaveClass('rounded-b-none');

            const category = component.getByTitle('Viajes');
            fireEvent.click(category);
        })

    })

    test('Renderizacion correcta al crear una nota', async () => {
        setSelected(undefined);
        const { getByTitle, getByRole, getByPlaceholderText, getByLabelText } = render(
            <ComponentForm selected={undefined} setRefresh={() => { }} setSelected={setSelected} />
        );

        const title = getByTitle('Titulo formulario');
        const button_submit = getByTitle('Crear');

        expect(title.textContent).toBe('Crear nota');
        expect(button_submit.textContent).toBe('Crear');

        const input_title = getByPlaceholderText('Escriba el titulo...');
        const input_description = getByPlaceholderText('Escriba la descripcion...');
        const input_priority = getByRole('radio', { name: 'Alta' });

        fireEvent.change(input_title, { target: { value: note.title } });
        fireEvent.change(input_description, { target: { value: note.description } });
        fireEvent.click(input_priority);

        expect(input_title).toHaveValue(note.title);
        expect(input_description).toHaveValue(note.description);
        expect(input_priority).toBeChecked();

        const input_file = getByLabelText('Subir archivo...');

        fireEvent.change(input_file, {
            target: { files: [new File(['archivo de prueba'], 'test-file.png', { type: 'image/png' })] },
        });

        await waitFor(() => {
            const container = getByTitle('Categoria');
            fireEvent.click(container);

            const category = getByTitle('Viajes');
            fireEvent.click(category);

            fireEvent.submit(button_submit);

            const modal_confirmation = getByTitle('modal');
            const button_confirmation = getByRole('button', { name: 'Aceptar' });

            expect(modal_confirmation).toBeInTheDocument();
            expect(button_confirmation).toBeInTheDocument();

            fireEvent.click(button_confirmation);

            expect(modal_confirmation).not.toBeInTheDocument();
        })
    })

    test('Renderizacion correcta al editar una nota', async () => {
        const { getByTitle, getByText } = render(<ComponentForm selected={note} setRefresh={() => { }} setSelected={() => { }} />);

        const title = getByTitle('Titulo formulario');
        const select_file = getByText(`${note.file?.name} cargado`);
        const button_submit = getByTitle('Actualizar');

        expect(title.textContent).toBe('Actualizar nota');
        expect(button_submit.textContent).toBe('Actualizar');
        expect(select_file).toBeInTheDocument();

        await waitFor(() => {
            const title = getByTitle('Seleccionar categoria');
            expect(title.textContent).toBe(note.category.title);

            fireEvent.submit(button_submit);
        })

        await waitFor(() => {
            const modal_confirmation = getByTitle('modal');
            const button_close = getByTitle('Boton cerrar');

            expect(modal_confirmation).toBeInTheDocument();
            expect(button_close).toBeInTheDocument();

            fireEvent.click(button_close);

            expect(modal_confirmation).not.toBeInTheDocument();
        })
    })

    test('Renderizacion correcta al deshacer la operacion', async () => {
        setSelected(note);
        const component = render(<ComponentForm selected={note} setRefresh={() => { }} setSelected={setSelected} />);

        const input_title = component.getByPlaceholderText('Escriba el titulo...');
        const input_description = component.getByPlaceholderText('Escriba la descripcion...');
        const input_priority = component.getByText('Alta');

        expect(input_title).toHaveValue(note.title);
        expect(input_description).toHaveValue(note.description);
        expect(input_priority).toHaveClass('bg-secondary text-primary');

        const button_deshacer = component.getByRole('button', { name: 'Deshacer' });
        fireEvent.click(button_deshacer);

        expect(setSelected).toHaveBeenCalledWith(undefined);
        expect(input_title).toHaveValue('');
        expect(input_description).toHaveValue('');
        expect(input_priority).toHaveClass('text-secondary group-hover:bg-secondary group-hover:text-primary');

        await waitFor(() => {
            const title = component.getByTitle('Seleccionar categoria');
            expect(title.textContent).toBe('Seleccionar categoria...');
        })

    })

    describe('Renderizacion correcta de mensajes de error', () => {
        const validations = [
            { name: "required", message: "requerido", match: /requerido/ },
            { name: "minLength", message: "caracteres", match: /caracteres/ },
            { name: "maxLength", message: "caracteres", match: /caracteres/ },
            { name: "pattern", message: "caracteres no permitidos", match: /caracteres no permitidos/ }
        ]

        const errors = (name: string, message: string) => {
            return {
                [name]: { type: name, message: message }
            }
        }

        validations.forEach(validation => {
            describe(`Error ${validation.name}`, () => {
                labels.forEach(label => {
                    test(`${label.title}`, () => {
                        const { getByTitle } = render(<ComponentLabel title={label.title} html_for={label.name} errors={errors(label.name, validation.message)} />)
                        const label_element = getByTitle(label.title);
                        expect(label_element.textContent).toMatch(validation.match);
                    })
                })
            })
        })

        describe('Sin errores', () => {
            labels.forEach(label => {
                test(`${label.title}`, () => {
                    const { getByTitle } = render(<ComponentLabel title={label.title} html_for={label.name} errors={undefined} />)
                    const label_element = getByTitle(label.title);
                    expect(label_element.textContent).toMatch(new RegExp(label.title));
                })
            })
        })
    });

    describe('Validacion correcta sin errores en los inputs', () => {
        const inputs = labels;
        inputs.forEach(input => {
            test(`${input.name}`, () => {
                const { getByPlaceholderText } = render(<ComponentInput
                    type="text"
                    name={input.name}
                    placeholder="Escriba..."
                    register={register}
                    error={undefined}
                    description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                />)
                const input_element = getByPlaceholderText('Escriba...');
                expect(input_element).toHaveClass('border-secondary text-secondary placeholder:text-secondary');
            })
        })
    })

    describe('Validacion correcta de errores en los inputs', () => {
        const validations = [{ name: "required" }, { name: "minLength" }, { name: "maxLength" }, { name: "pattern" }]

        describe('Titulo', () => {
            validations.forEach(validation => {
                test(`Error ${validation.name}`, () => {
                    const { getByPlaceholderText } = render(<ComponentInput
                        type="text"
                        name="title"
                        placeholder="Escriba el titulo..."
                        register={register}
                        error={validation.name}
                        description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const input_title = getByPlaceholderText('Escriba el titulo...');
                    expect(input_title).toHaveClass('border-error text-error placeholder:text-error');
                })
            })
        })

        describe('Descripcion', () => {
            validations.forEach(validation => {
                test(`Error ${validation.name}`, () => {
                    const { getByPlaceholderText } = render(<ComponentInput
                        rows={3}
                        name="description"
                        placeholder="Escriba la descripcion..."
                        register={register}
                        error={validation.name}
                        description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[80px] scroll py-1.5 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                    />)
                    const input_description = getByPlaceholderText('Escriba la descripcion...');
                    expect(input_description).toHaveClass('border-error text-error placeholder:text-error');
                })
            })
        })

        describe('Categorias', () => {
            test('Error required', async () => {
                const { getByTitle } = render(<ComponentSelect clearErrors={() => { }} setValue={() => { }} select_category={{ title: 'Seleccionar categoria...' }} register={register} error="required" setSelect_category={setSelected} />)

                await waitFor(() => {
                    const container = getByTitle('Categoria');
                    expect(container).toHaveClass('border-error')
                })
            })
        })

        describe('Prioridad', () => {
            const items = [{ name: "1", value: "Alta" }, { name: "2", value: "Media" }, { name: "3", value: "Baja" }];

            describe('Error required', () => {
                items.forEach(item => {
                    test(`Opcion ${item.name}`, () => {
                        const { getByTitle, getByText } = render(<ComponentItemPriority
                            id={item.name}
                            value={item.value}
                            class_icon="text-red-500 rotate-[-180deg]"
                            paint={false}
                            error="required"
                            register={register}
                        />)
                        const label = getByTitle(`${item.value} prioridad`);
                        const text_label = getByText(item.value);

                        expect(label).toHaveClass('border-error');
                        expect(text_label).toHaveClass('text-error group-hover:bg-error group-hover:text-primary');
                    })
                })
            })
        })

        describe('¿Destacar nota?', () => {
            test('Error required', () => {
                const { getByTitle } = render(<ComponentItemFeatured
                    value='SI'
                    paint={false}
                    error="required"
                    register={register}
                />)

                const container = getByTitle('si destacar');
                const title = getByTitle('SI');
                expect(container).toHaveClass('border-error');
                expect(title).toHaveClass('text-error group-hover:bg-error group-hover:text-primary')
            })
        })

    })
});