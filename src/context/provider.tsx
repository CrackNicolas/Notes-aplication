'use client'

import { useUser, UserButton } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { Props_user } from "./types/user";
import { Props_context } from "@/context/types/context";
import { Props_layouts } from "@/frontend/types/props";

import Template from '@/frontend/template/init'

export const Context = createContext<Props_context>({
    section_current: '',
    session: {
        user: { id: '', name: '', email: '' }
    },
    button_sesion: <UserButton afterSignOutUrl="/" />
});

export default function Provider({ children }: Props_layouts) {
    const [session, setSession] = useState<{ user: Props_user }>({ user: { id: '', name: '', email: '' } });

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
            if (user && user.fullName && user.emailAddresses && user.id) {
                setSession({
                    user: {
                        id: user.id,
                        name: user.fullName,
                        email: user.emailAddresses.toString()
                    }
                })
                
                const form = new FormData();
                form.set('id', user.id);
                form.set('name', user.fullName);
                form.set('email', user.emailAddresses.toString());

                await axios.post("/api/users", form); 
            } else {
                router.push('/');
            }
        }
        add_user();
    }, [user])

    return (
        <Context.Provider value={{ section_current: path.substring(1), session, button_sesion: <UserButton afterSignOutUrl="/" /> }}>
            <ProgressBar color="#00ffff" options={{ showSpinner: false }} />
            <Template>
                {children}
            </Template>
        </Context.Provider>
    )
}