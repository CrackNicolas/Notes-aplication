'use client'

import { useEffect, useState } from "react"

import axios from "axios";

import ComponentList from "./list/container";

import { Props_session } from "@/context/types/session";

export default function ComponentSessions() {
    const [list_sessions, setList_sessions] = useState<Props_session[] | []>([]);

    useEffect(() => {
        const load_users = async () => {
            const { data } = await axios.get('/api/sessions');
            if (data.status === 200) {
                setList_sessions(data.data);
            }
        }

        load_users();
    }, []);

    return (
        <section className="flex flex-col gap-5 mt-[40px] pt-7 h-[calc(100vh-50px)]">
            <article className="w-full flex justify-between items-center">
                <span className="text-secondary text-xl tracking-wider">
                    Lista de usuarios
                </span>
                <span className="text-secondary text-xl">
                    {list_sessions.length}
                </span>
            </article>
            <ComponentList sessions={list_sessions} />
        </section>
    )
}