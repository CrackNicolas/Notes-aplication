import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ComponentMessage from '@/frontend/components/layouts/messages/confirmation';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

describe('Messages', () => {
    it('Renderizar correctamente con estado 200', () => {
        const setOpen = jest.fn();
        render(
            <ComponentMessage
                open={true}
                setOpen={setOpen}
                response={{ status: 200, info: { message: 'Mensaje de éxito' } }}
            />
        );

        const button = screen.getByRole('button', { name: 'Aceptar' });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('text-secondary');
        expect(button).toHaveClass('border-secondary');

        fireEvent.click(button);
        expect(setOpen).toHaveBeenCalledWith(false);

        const message = screen.getByText('Mensaje de éxito');
        expect(message).toBeInTheDocument();
        expect(message).toHaveClass('text-gray-500');
    });

    it('Renderizar correctamente con estado 400', () => {
        const setOpen = jest.fn();
        render(
            <ComponentMessage
                open={true}
                setOpen={setOpen}
                response={{ status: 400, info: { message: 'Mensaje de error' } }}
            />
        );

        const button = screen.getByRole('button', { name: 'Aceptar' });

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('text-error');
        expect(button).toHaveClass('border-error');

        fireEvent.click(button);
        expect(setOpen).toHaveBeenCalledWith(false);

        const message = screen.getByText('Mensaje de error');
        expect(message).toBeInTheDocument();
        expect(message).toHaveClass('text-gray-500');
    });
});