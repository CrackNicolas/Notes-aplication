'use client'

import { useEffect, useState } from "react"

import axios from "axios";

import { Props_user } from "@/context/types/session";
import Image from "next/image";

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
            <article className="w-full flex justify-between text-center text-secondary text-xl">
                <span>
                    Lista de usuarios
                </span>
                <span>
                    {list_users.length}
                </span>
            </article>
            <article className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-4">
                {
                    list_users.map(list => {
                        return (
                            <div key={list.id} className="flex justify-between items-center w-full bg-sixth rounded-md border-[0.1px] border-secondary p-2.5 ">
                                <Image src={list.image} alt="Imagen de usuario" width={30} height={20} className="rounded-full" />
                                <span className="text-secondary">
                                    {list.name}
                                </span>
                            </div>
                        )
                    })
                }
            </article>
        </section>
    )
}