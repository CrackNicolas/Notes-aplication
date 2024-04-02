import "@testing-library/jest-dom"
import { fireEvent, render } from '@testing-library/react';

import ComponentMessage from '@/frontend/components/layouts/messages/confirmation';

import { list_messages } from "@/frontend/__test__/mocks/messages";

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

describe('Componente <Messages/>', () => {
    const setOpen = jest.fn();

    describe('Renderizacion correcta de mensajes', () => {
        list_messages.map(message => {
            test(`Con status ${message.status}`, () => {
                const component = render(
                    <ComponentMessage
                        open={true}
                        setOpen={setOpen}
                        response={{ status: message.status, info: { message: message.text } }}
                    />
                )

                const button = component.getByRole('button', { name: 'Aceptar' });

                expect(button).toBeInTheDocument();
                expect(button).toHaveClass(`text-${message.color}`);
                expect(button).toHaveClass(`border-${message.color}`);

                fireEvent.click(button);
                expect(setOpen).toHaveBeenCalledWith(false);

                const element_message = component.getByText(message.text);
                expect(element_message).toBeInTheDocument();
                expect(element_message).toHaveClass('text-gray-500');
            })
        })
    })
});