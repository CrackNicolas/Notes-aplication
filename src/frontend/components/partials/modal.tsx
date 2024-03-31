import { ReactNode, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';

import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    open: boolean,
    setOpen: any,
    color?: string,
    children: ReactNode
}

export default function ComponentModal(props: Props) {
    const { children, open, setOpen, color = "secondary" } = props;

    return (
        <Transition.Root data-testid="modal" show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-sixth transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-primary bg-tertiary shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className={`relative flex flex-col items-center border-[0.1px] border-${color} border-opacity-50 rounded-lg gap-y-5 px-3 sm:px-5 pb-6 pt-3`}>
                                    <ComponentIcon name='logo' description_class={`absolute top-1.5 left-2 text-${color} opacity-70 `} size={20} />
                                    <div data-testid="view-close" onClick={() => setOpen(false)}>
                                        <ComponentIcon name='close' description_class={`absolute top-0 right-0 text-${color} opacity-70 cursor-pointer`} size={30} />
                                    </div>
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}