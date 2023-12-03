'use client'

import { UserButton, useUser } from "@clerk/nextjs";

import Link from "next/link";

import { Fragment, useState } from "react";

import ComponentIcon from "../icon";

export default function ComponentNav() {
    const {user} = useUser();
    const [view_toggle, setView_toggle] = useState<boolean>(false);

    return (
        <nav className="fixed w-full bg-primary">
            <div className="mx-auto max-w-7xl px-2 sm:px-6">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" onClick={() => setView_toggle(!view_toggle)} className="relative inline-flex items-center justify-center rounded-md p-2 outline-none">
                            <ComponentIcon name="toogle" size={27} view_box="0 0 16 16" description_class="hover:text-secondary text-fifth" />
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/" className="sm:flex hidden flex-shrink-0 items-center">
                            <ComponentIcon name="logo" size={27} description_class="text-secondary" />
                        </Link>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-1">
                                <a href="#" className="hover:text-secondary tracking-wider text-fifth px-3 py-2 text-md font-normal transition duration-500">Panel</a>
                                <a href="#" className="hover:text-secondary tracking-wider text-fifth px-3 py-2 text-md font-normal transition duration-500">Equipo</a>
                                <a href="#" className="hover:text-secondary tracking-wider text-fifth px-3 py-2 text-md font-normal transition duration-500">Proyectos</a>
                                <a href="#" className="hover:text-secondary tracking-wider text-fifth px-3 py-2 text-md font-normal transition duration-500">Calendario</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {
                            (user) ?
                                <div className="flex gap-x-4">
                                    <button type="button" className="relative rounded-full p-1 outline-none">
                                        <ComponentIcon name="notification" size={20} description_class="hover:text-secondary text-fifth" />
                                    </button>
                                    <UserButton/>
                                </div>
                                :
                                <div className="flex gap-x-3">
                                    <Link href="/sign-in" className="group flex px-[1.5px] py-[2.5px] outline-none">
                                        <span className="group-hover:text-secondary text-md tracking-wider text-tertiary">Login</span>
                                    </Link>
                                    <Link href="/sign-up" className="group hover:bg-secondary flex rounded-lg px-[7px] py-[2.5px] border-[0.1px] border-secondary outline-none transition duration-500">
                                        <span className="group-hover:text-primary text-md tracking-wider text-secondary">Registro</span>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className={` bg-room ${view_toggle ? 'visible' : 'hidden'} sm:hidden`}>
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <a href="#" className="hover:text-secondary tracking-wider text-fifth block px-3 py-2 text-md font-normal transition duration-500">Panel</a>
                    <a href="#" className="hover:text-secondary tracking-wider text-fifth block px-3 py-2 text-md font-normal transition duration-500">Equipo</a>
                    <a href="#" className="hover:text-secondary tracking-wider text-fifth block px-3 py-2 text-md font-normal transition duration-500">Proyectos</a>
                    <a href="#" className="hover:text-secondary tracking-wider text-fifth block px-3 py-2 text-md font-normal transition duration-500">Calendario</a>
                </div>
            </div>
        </nav>

    )
}