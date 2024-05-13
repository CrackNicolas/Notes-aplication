'use client'

import { useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { Props_user } from "./types/user";
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
    const [session, setSession] = useState<{ user: Props_user }>({ user: { id: '', name: '', email: '' } });

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
            setSession({
                user: {
                    id: (data_user.isSignedIn) ? data_user.user.id : '',
                    name: (data_user.isSignedIn && data_user.user.fullName) ? data_user.user.fullName : '',
                    email: (data_user.isSignedIn) ? data_user.user.emailAddresses.toString() : ''
                }
            });

            if (data_user.isSignedIn) {
                const form = new FormData();
                form.set('id', data_user.user.id);
                form.set('name', (data_user.user.fullName) ? data_user.user.fullName : '');
                form.set('email', data_user.user.emailAddresses.toString());
                await axios.post("/api/users", form);
            }

        }
        add_user();
    }, [data_user.isSignedIn])

    return (
        <Context.Provider value={{ section_current: path.substring(1), session, button_sesion: <ComponentUserButton /> }}>
            <ProgressBar color="#00ffff" options={{ showSpinner: false }} />
            <Template>
                {children}
            </Template>
        </Context.Provider>
    )
}