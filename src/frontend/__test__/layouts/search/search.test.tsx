import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import ComponentInputSearch from '@/frontend/components/layouts/search/input_search';
import ComponentSelectStatic from '@/frontend/components/partials/form/select_static';
import ComponentButtonCreate from '@/frontend/components/layouts/search/button_create';

describe('Componente <Search/> principal', () => {
    test('Renderizacion correcta de <SelectStatic/>', () => {
        const setSelect_priority = jest.fn();
        const { getByTitle } = render(
            <ComponentSelectStatic
                title="Prioridad"
                select='Prioridad'
                setSelect={setSelect_priority}
                items={[
                    { value: 'Alta', icon: { name: 'arrow', class: 'text-red-500 rotate-[-180deg]' } },
                    { value: 'Media', icon: { name: 'arrow', class: 'text-orange-500 rotate-[-180deg]' } },
                    { value: 'Baja', icon: { name: 'arrow', class: 'text-green-500' } }
                ]}
            />
        );

        const list = getByTitle('Lista de opciones');
        const container = getByTitle('Prioridad');
        const item = getByTitle('Media');

        expect(list).toBeInTheDocument();

        fireEvent.mouseDown(list);
        fireEvent.click(container);
        fireEvent.click(item);

        const item_default = getByTitle('Prioridad...');

        fireEvent.click(item_default);
    })

    test('Renderizacion correcta <InputSearch/>', () => {
        const setValue = jest.fn();
        const { getByPlaceholderText } = render(
            <ComponentInputSearch setValue={setValue} />
        );

        const input = getByPlaceholderText('Buscar...');

        fireEvent.change(input, { target: { value: 'Titulo de nota' } });

        expect(setValue).toHaveBeenCalledWith('title', 'Titulo de nota');
        expect(input).toBeInTheDocument();
    })

    describe('Renderizacion correcta <ButtonCreate/>', () => {
        test('Sin responsive', () => {
            const { getByTitle } = render(<ComponentButtonCreate />);

            const title = getByTitle('Crear nota');

            expect(title).toBeInTheDocument();
            expect(title).toHaveAttribute('href', '/notes');
        })

        test('Usando responsive', () => {
            const { getByTitle } = render(<ComponentButtonCreate response={false} />);

            const title = getByTitle('Crear nota');

            expect(title).toBeInTheDocument();
            expect(title).toHaveAttribute('href', '/notes');
            expect(title).toHaveClass('group relative flex items-center justify-between gap-x-1 rounded-md text-primary border-[0.1px] border-secondary border-opacity-80 px-1 bg-secondary py-0.5 text-md font-normal hover:font-semibold tracking-wider hover:bg-primary hover:text-secondary outline-none');
        })
    })
})