'use client'

import { useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { Props_context } from "@/context/types/context";
import { Props_session, Props_user } from "@/context/types/session";

import { ComponentUserButton } from "@/frontend/components/services/clerk";

import Template from '@/frontend/template/init'

import { Props_layouts, Props_theme, Theme_name } from "@/frontend/types/props";
import { Time_elapsed } from "@/frontend/logic/format_time";
import { Change_topic } from "@/frontend/logic/theme";

export const Context = createContext<Props_context>({
    section_current: '',
    session: {},
    button_sesion: <ComponentUserButton />,
    opacity: false,
    theme: Theme_name.ligth,
    setTheme: () => { },
    setOpacity: () => { }
});

export default function Provider({ children }: Props_layouts) {
    const [session, setSession] = useState<Props_session>({});

    const [theme, setTheme] = useState<Props_theme>(Theme_name.ligth);

    const data_user = useUser();

    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const stored_theme = localStorage.getItem('theme') as Props_theme;
        if (stored_theme) {
            Change_topic({ theme: stored_theme, setTheme });
        }
    }, []);

    const load_user = async () => {
        if (data_user.isSignedIn && data_user.user.fullName) {
            const data_session = (await data_user.user.getSessions())[0];

            const instance_user: Props_user = {
                name: data_user.user.fullName,
                email: data_user.user.emailAddresses.toString(),
                image: data_user.user.imageUrl,
                rol: (data_user.user.id === process.env.ROL_ADMIN_USER_ID) ? 'admin' : 'member'
            }

            const instance_session: Props_session = {
                id: data_user.user.id,
                status: (data_session.status === 'active'),
                last_time: Time_elapsed(data_session.lastActiveAt) + ' ' + data_session.lastActiveAt.toString().split(' ')[4] + 'hs',
                expiret: data_session.expireAt.toISOString(),
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

    const handleOffline = () => {
        router.push('/without_internet');
    };

    const handleOnline = () => {
        if (path === '/offline') {
            router.push('/');
        }
    };

    useEffect(() => {
        load_user();
    }, [data_user.user])

    useEffect(() => {
        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        if (!navigator.onLine) {
            handleOffline();
        }

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [path])

    return (
        <Context.Provider value={{ section_current: path.substring(1), session, button_sesion: <ComponentUserButton />, opacity: false, theme, setTheme, setOpacity: () => { }, path }}>
            <ProgressBar color={theme} options={{ showSpinner: false }} />
            <Template>
                {children}
            </Template>
        </Context.Provider>
    )
}