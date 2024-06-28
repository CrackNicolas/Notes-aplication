'use client'

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { Props_context } from "@/context/types/context";

import ComponentIcon from "@/frontend/components/partials/icon";

export default function ComponentNavTop(props: Props_context) {
    const { section_current, session, button_sesion, setOpacity, opacity } = props;

    const [focus, setFocus] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [view_toggle, setView_toggle] = useState<boolean>(false);

    const ref_nav_toggle = useRef<HTMLDivElement>(null);
    const ref_button_user = useRef<HTMLDivElement>(null);
    const ref_button_toggle = useRef<HTMLButtonElement>(null);

    const handle_click_outside = (event: MouseEvent) => {
        if (ref_nav_toggle.current && !ref_nav_toggle.current.contains(event.target as Node) && !ref_button_toggle.current?.contains(event.target as Node) && !ref_button_user.current?.contains(event.target as Node)) {
            setView_toggle(false);
            setOpacity(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    const handle_click_nav = () => {
        setView_toggle(!view_toggle);
        setOpacity(!view_toggle);
    }

    const get_focus = (name: string) => {
        return (focus === name);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <nav className="fixed w-full bg-primary mt-[-7px] z-50">
            <div className="mx-auto max-w-7xl px-3 sm:px-10">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-[-4px] flex items-center sm:hidden px-0">
                        <button ref={ref_button_toggle} type="button" title="Boton toggle" onClick={() => handle_click_nav()} className="relative inline-flex items-center justify-center rounded-md py-2 outline-none">
                            <ComponentIcon name={view_toggle ? 'close' : 'toggle'} size={view_toggle ? 32 : 27} view_box="0 0 16 16" description_class="hover:text-secondary text-fifth cursor-pointer" />
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/" title="Logo" onMouseOver={() => setFocus('logo')} onMouseLeave={() => setFocus('')}  className="sm:flex hidden flex-shrink-0 items-center">
                            <ComponentIcon testid="icon-home" name={`${get_focus('logo') ? 'logo-fill' : 'logo'}`} size={27} description_class="icon-home text-secondary cursor-pointer" />
                        </Link>
                        {
                            (session.id) && (
                                <div className="hidden sm:ml-4 sm:block">
                                    <div className="flex space-x-1">
                                        <Link href="/dashboard/main" className={`${section_current === "/dashboard/main" ? 'text-secondary' : ''} hover:text-secondary tracking-wider text-fifth px-1 py-2 text-md font-normal transition duration-500`} title="Panel">
                                            Panel
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            isLoading ?
                                <span className="animate-pulse bg-secondary opacity-30 rounded-full w-[32px] h-[32px] " />
                                :
                                (session.id) ?
                                    <div ref={ref_button_user} className="flex gap-x-4 rounded-full" onClick={() => setOpacity(!opacity)} title="Usuario">
                                        {button_sesion}
                                    </div>
                                    :
                                    <Link href="/sign-in" title="Iniciar sesion" className="group border border-tertiary hover:border-secondary border-[0.1px] px-3 rounded-md flex py-[3px] outline-none transition duration-500">
                                        <span className="group-hover:text-secondary text-sm tracking-wider text-tertiary">
                                            Iniciar sesion
                                        </span>
                                    </Link>
                        }
                    </div>
                </div>
            </div>
            <div ref={ref_nav_toggle} title="Menu toggle" className={`mx-4 sm:hidden transition-all duration-500 ease-in-out ${view_toggle ? 'max-h-screen opacity-100 scale-100' : 'max-h-0 opacity-0 scale-75'} overflow-hidden`}>
                <div className="space-y-2 px-0.5 py-2">
                    <Link href="/" title="Inicio" onClick={() => handle_click_nav()} onMouseOver={() => setFocus('home')} onMouseLeave={() => setFocus('')} className="group flex justify-between items-center border hover:border-secondary rounded-md border-1 px-3 py-2">
                        <span className="tracking-wider text-fifth text-md font-normal group-hover:text-secondary transition duration-500">
                            Inicio
                        </span>
                        <ComponentIcon testid="icon-home" name={`${get_focus('home') ? 'home-fill' : 'home'}`} size={23} description_class="icon-home group-hover:text-secondary text-fifth cursor-pointer transition duration-500" />
                    </Link>
                    <Link href="/dashboard/main" title="Panel" onClick={() => handle_click_nav()} onMouseOver={() => setFocus('panel')} onMouseLeave={() => setFocus('')} className="group flex justify-between items-center border hover:border-secondary rounded-md border-1 px-3 py-2">
                        <span className="tracking-wider text-fifth text-md font-normal group-hover:text-secondary transition duration-500">
                            Panel
                        </span>
                        <ComponentIcon testid="icon-home" name={`${get_focus('panel') ? 'panel-fill' : 'panel'}`} size={23} description_class="icon-home group-hover:text-secondary text-fifth cursor-pointer transition duration-500" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
