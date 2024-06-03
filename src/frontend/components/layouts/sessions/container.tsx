'use client'

import { useEffect, useState } from "react"

import axios from "axios";

import ComponentList from "./list/container";

import { Props_user } from "@/context/types/session";

export default function ComponentSessions() {
    const [list_users, setList_users] = useState<Props_user[] | []>([]);

    useEffect(() => {
        const load_users = async () => {
            const { data } = await axios.get('/api/users');
            if (data.status === 200) {
                setList_users(data.data);
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
                    {list_users.length}
                </span>
            </article>
            <ComponentList users={list_users} />
        </section>
    )
}