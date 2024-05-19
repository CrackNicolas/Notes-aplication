'use client'

import { useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { Props_session } from "@/context/types/session";
import { Props_context } from "@/context/types/context";
import { Props_layouts } from "@/frontend/types/props";

import { ComponentUserButton } from "@/frontend/components/services/clerk";

import Template from '@/frontend/template/init'

export const Context = createContext<Props_context>({
    section_current: '',
    session: {
        user: { id: '', name: '', email: '' }
    },
    button_sesion: <ComponentUserButton />
});

export default function Provider({ children }: Props_layouts) {
    const [session, setSession] = useState<Props_session>({ user: { id: '', name: '', email: '' } });

    const data_user = useUser();

    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!navigator.onLine) {
            router.push("/without_internet")
        }
    }, [path])

    useEffect(() => {
        const add_user = async () => {
            const user_init = {
                user: {
                    id: (data_user.isSignedIn) ? data_user.user.id : '',
                    name: (data_user.isSignedIn && data_user.user.fullName) ? data_user.user.fullName : '',
                    email: (data_user.isSignedIn) ? data_user.user.emailAddresses.toString() : ''
                }
            }

            setSession(user_init);

            if (user_init.user.id !== '') {
                localStorage.setItem('user', JSON.stringify(user_init));

                const form = new FormData();
                form.set('id', user_init.user.id);
                form.set('name', user_init.user.name);
                form.set('email', user_init.user.email);

                await axios.post("/api/users", form);
                await axios.get(`/api/categorys`);
            }
        }

        const user = localStorage.getItem('user');
        if (!user) {
            add_user();
        }
        if (user) {
            setSession(JSON.parse(user));
        }
        if (!data_user.isSignedIn) {
            setSession({ user: { id: '', name: '', email: '' } })
            localStorage.removeItem('user');
        }

    }, [data_user.user])

    return (
        <Context.Provider value={{ section_current: path.substring(1), session, button_sesion: <ComponentUserButton /> }}>
            <ProgressBar color="#00ffff" options={{ showSpinner: false }} />
            <Template>
                {children}
            </Template>
        </Context.Provider>
    )
}