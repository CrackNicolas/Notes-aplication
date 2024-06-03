import Image from "next/image";

import { Props_user } from "@/context/types/session"

import ComponentLoading from "./loading";

export default function ComponentList({ users }: { users: Props_user[] }) {
    return (
        <article className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-4">
            {
                (users.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    users.map(user => {
                        return (
                            <div key={user.id} className="relative flex items-start gap-3 w-full overflow-hidden bg-sixth rounded-md border-[0.1px] border-opacity-30 border-secondary p-2.5 group hover:border-opacity-100 cursor-pointer">
                                <span className="absolute text-secondary top-0 right-2">
                                    {user.sessions} sesiones
                                </span>
                                <Image src={user.image} alt="Imagen de usuario" width={30} height={20} className="rounded-full mt-1" />
                                <div className="flex flex-col">
                                    <span className="line-clamp-1 text-secondary font-bold text-md tracking-wider">
                                        {user.name}
                                    </span>
                                    <span className="line-clamp-1 text-fifth group-hover:text-tertiary font-normal text-sm">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        )
                    })
            }
        </article>
    )
}