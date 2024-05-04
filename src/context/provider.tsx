'use client'

import { useUser, UserButton } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { createContext, useEffect } from "react";

import axios from "axios";

import { Props_context } from "@/context/types/context";
import { Props_layouts } from "@/frontend/types/props";

import Template from '@/frontend/template/init'

export const Context = createContext<Props_context>({
    section_current: '',
    user: {},
    button_sesion: <UserButton afterSignOutUrl="/" />
});

export default function Provider({ children }: Props_layouts) {
    const { user } = useUser();

    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!navigator.onLine) {
            router.push("/without_internet")
        }
    }, [path])

    useEffect(() => {
        const add_user = async () => {
            if (user && user.fullName && user.emailAddresses) {
                const form = new FormData();
                form.set('name', user.fullName);
                form.set('email', user.emailAddresses.toString());

                const { data } = await axios.post("/api/users", form);
                if (data.status === 201) {
                    console.log(data.info.message)
                }
                if (data.status === 500) {
                }
            }
        }
        add_user();
    }, [user])

    return (
        <Context.Provider value={{ section_current: path.substring(1), user, button_sesion: <UserButton afterSignOutUrl="/" /> }}>
            <ProgressBar color="#00ffff" options={{ showSpinner: false }} />
            <Template>
                {children}
            </Template>
        </Context.Provider>
    )
}