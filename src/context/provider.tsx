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
        user: { id: '', name: '', email: '', image: '' }
    },
    button_sesion: <ComponentUserButton />
});

export default function Provider({ children }: Props_layouts) {
    const [session, setSession] = useState<Props_session>({ user: { id: '', name: '', email: '', image: '' } });

    const data_user = useUser();

    const router = useRouter();
    const path = usePathname();

    const load_user = async () => {
        if (data_user.isSignedIn && data_user.user.fullName) {
            const instance_user = {
                id: data_user.user.id,
                name: data_user.user.fullName,
                email: data_user.user.emailAddresses.toString(),
                image: data_user.user.imageUrl
            }
            await axios.get(`/api/categorys`);
            await axios.post("/api/users", instance_user);

            setSession({ user: instance_user });
        } else {
            setSession({ user: { id: '', name: '', email: '', image: '' } });
        }
    }

    useEffect(() => {
        load_user();
    }, [data_user.user])

    useEffect(() => {
        if (!navigator.onLine) {
            router.push("/without_internet")
        }
    }, [path])

    return (
        <Context.Provider value={{ section_current: path.substring(1), session, button_sesion: <ComponentUserButton /> }}>
            <ProgressBar color="#00ffff" options={{ showSpinner: false }} />
            <Template>
                {children}
            </Template>
        </Context.Provider>
    )
}