'use client'

import Link from "next/link";

import { useState } from "react";

import { Props_context } from "@/context/types/context";

import ComponentIcon from "@/frontend/components/partials/icon";

export default function ComponentNavTop(props: Props_context) {
    const { section_current, session, button_sesion } = props;

    const [focus, setFocus] = useState<boolean>(false);
    const [view_toggle, setView_toggle] = useState<boolean>(false);

    return (
        <nav className="fixed w-full bg-primary mt-[-7px] z-50">
            <div className="mx-auto max-w-7xl px-3 sm:px-10">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" title="Toggle" onClick={() => setView_toggle(!view_toggle)} className="relative inline-flex items-center justify-center rounded-md py-2 outline-none">
                            <ComponentIcon name={view_toggle ? 'close' : 'toggle'} size={view_toggle ? 30 : 27} view_box="0 0 16 16" description_class="hover:text-secondary text-fifth cursor-pointer" />
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/" className="sm:flex hidden flex-shrink-0 items-center" title="Logo" onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
                            <ComponentIcon testid="icon-home" name={`${focus ? 'logo-fill' : 'logo'}`} size={27} description_class="icon-home text-secondary cursor-pointer" />
                        </Link>
                        {
                            session.user.id !== '' && (
                                <div className="hidden sm:ml-4 sm:block">
                                    <div className="flex space-x-1">
                                        <Link href="/dashboard/main" className={`${section_current === "dashboard" ? 'text-secondary' : ''} hover:text-secondary tracking-wider text-fifth px-1 py-2 text-md font-normal transition duration-500`} title="Panel">Panel</Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            session.user.id !== '' ?
                                <div className="flex gap-x-4">
                                    <button type="button" title="Notificaciones" className="relative rounded-full p-1 outline-none">
                                        <ComponentIcon name="notification" size={20} description_class="hover:text-secondary text-fifth" />
                                    </button>
                                    {button_sesion}
                                </div>
                                :
                                <Link href="/sign-in" title="Iniciar sesion" className="group border border-tertiary hover:border-secondary border-[0.1px] px-3 rounded-md flex py-[2.5px] outline-none transition duration-500">
                                    <span className="group-hover:text-secondary text-md tracking-wider text-tertiary">
                                        Iniciar sesion
                                    </span>
                                </Link>
                        }
                    </div>
                </div>
            </div>
            <div title="toggle" className={`mx-4 transform transition-all duration-500 ease-in-out sm:hidden ${view_toggle ? 'max-h-screen opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'} overflow-hidden`}>
                <div className="space-y-2 px-0.5 py-2">
                    <Link href="/dashboard/main" onClick={() => setView_toggle(false)} className="group flex justify-between items-center border hover:border-secondary rounded-md border-1 px-3 py-2">
                        <span className="tracking-wider text-fifth text-md font-normal group-hover:text-secondary transition duration-500">
                            Panel
                        </span>
                        <ComponentIcon testid="icon-home" name={`${focus ? 'logo-fill' : 'logo'}`} size={23} description_class="icon-home group-hover:text-secondary text-fifth cursor-pointer transition duration-500" />
                    </Link>
                    <Link href="/dashboard/main" onClick={() => setView_toggle(false)} className="group flex justify-between items-center border hover:border-secondary rounded-md border-1 px-3 py-2">
                        <span className="tracking-wider text-fifth text-md font-normal group-hover:text-secondary transition duration-500">
                            Panel
                        </span>
                        <ComponentIcon testid="icon-home" name={`${focus ? 'logo-fill' : 'logo'}`} size={23} description_class="icon-home group-hover:text-secondary text-fifth cursor-pointer transition duration-500" />
                    </Link>
                    <Link href="/dashboard/main" onClick={() => setView_toggle(false)} className="group flex justify-between items-center border hover:border-secondary rounded-md border-1 px-3 py-2">
                        <span className="tracking-wider text-fifth text-md font-normal group-hover:text-secondary transition duration-500">
                            Panel
                        </span>
                        <ComponentIcon testid="icon-home" name={`${focus ? 'logo-fill' : 'logo'}`} size={23} description_class="icon-home group-hover:text-secondary text-fifth cursor-pointer transition duration-500" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
