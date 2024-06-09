'use client'

import { useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { Props_session, Props_user } from "@/context/types/session";
import { Props_context } from "@/context/types/context";
import { Props_layouts } from "@/frontend/types/props";

import { ComponentUserButton } from "@/frontend/components/services/clerk";

import Template from '@/frontend/template/init'
import { Time_elapsed } from "@/frontend/logic/format_time";

export const Context = createContext<Props_context>({
    section_current: '',
    session: {},
    button_sesion: <ComponentUserButton />
});

export default function Provider({ children }: Props_layouts) {
    const [session, setSession] = useState<Props_session>({});

    const data_user = useUser();

    const router = useRouter();
    const path = usePathname();

    const load_user = async () => {
        if (data_user.isSignedIn && data_user.user.fullName) {
            const data_session = (await data_user.user.getSessions())[0];

            const instance_user: Props_user = {
                name: data_user.user.fullName,
                email: data_user.user.emailAddresses.toString(),
                image: data_user.user.imageUrl,
                rol: (data_user.user.id === 'user_2Z2e0jzKi44dKmBj2q6kOLeKJeR') ? 'admin' : 'member'
            }

            const instance_session: Props_session = {
                id: data_user.user.id,
                status: (data_session.status === 'active'),
                last_time: Time_elapsed(data_session.lastActiveAt) + ' '+ data_session.lastActiveAt.toString().split(' ')[4] + 'hs',
                origin: {
                    IP_adress: (data_session.latestActivity.ipAddress) ? data_session.latestActivity.ipAddress : '',
                    city: (data_session.latestActivity.city) ? data_session.latestActivity.city : ''
                },
                user: instance_user
            }

            await axios.get(`/api/categorys`);
            await axios.post("/api/sessions", instance_session);

            setSession(instance_session);
        } else {
            await axios.put("/api/sessions", { id: session.id, status: false });
            setSession({});
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