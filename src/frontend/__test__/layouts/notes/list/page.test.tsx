import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import ComponentHeader from '@/frontend/components/layouts/notes/header';

describe('Lista de notas creadas y editadas', () => {
    const search = jest.fn();

    it('Renderizar Header con resultados "NO" encontrados', () => {
        render(<ComponentHeader search={search} result={true} />);
        const message = screen.getByText('No se encontraron resultados');
        expect(message).toBeInTheDocument();
    })

    it('Renderizar Header con resultados encontrados', () => {
        render(<ComponentHeader search={search} result={false} />);
        const message = screen.getByText('Notas');
        expect(message).toBeInTheDocument();
    })

    it('Renderizar correctamente al buscar una nota', () => {
        render(<ComponentHeader search={search} result={false} />);

        const input_search = screen.getByPlaceholderText('Buscar...');

        expect(input_search).toBeInTheDocument();

        fireEvent.change(input_search, { target: { value: "Nombre de nota" } });

        expect(input_search).toHaveValue('Nombre de nota');
    })
})