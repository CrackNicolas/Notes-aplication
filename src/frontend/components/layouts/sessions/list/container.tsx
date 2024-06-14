import Image from "next/image";

import { Props_session } from "@/context/types/session"

import ComponentLoading from "@/frontend/components/layouts/sessions/list/loading";

export default function ComponentList({ sessions }: { sessions: Props_session[] }) {
    return (
        <article className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
            {
                (sessions.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    sessions.map(session => {
                        return (
                            <div key={session.id} title={`Sesion ${session.user?.name}`} className="relative flex items-start gap-3 w-full overflow-hidden bg-sixth rounded-md border-[0.1px] border-opacity-30 border-secondary p-2.5 group hover:border-opacity-100 cursor-pointer">
                                <span className={`absolute shadow-sm ${(session.status) ? 'bg-secondary shadow-secondary' : 'bg-error shadow-error'} w-2 h-2 rounded-full top-2 right-2`} title={`Usuario ${session.status ? 'activo' : 'desconectado'}`} />
                                <Image src={(session.user) ? session.user?.image : 'https://cdn.icon-icons.com/icons2/1381/PNG/512/systemusers_94754.png'} alt="Imagen de usuario" width={34} height={24} className="rounded-full mt-1" />
                                <div className="flex flex-col">
                                    <span className="line-clamp-1 text-secondary font-bold text-lg tracking-wider">
                                        {session.user?.name}
                                    </span>
                                    <span className="line-clamp-1 text-fifth group-hover:text-tertiary font-normal text-[14.5px]">
                                        {session.user?.email}
                                    </span>
                                    <span className="line-clamp-1 text-fifth opacity-80 tracking-wide font-normal text-[12px] mt-1">
                                        {
                                            session.last_time?.replace('Creada', 'Ultima vez')
                                        }
                                    </span>
                                    <span className="line-clamp-1 text-fifth opacity-80 tracking-wide font-normal text-[12px] ">
                                        IP: {session.origin?.IP_adress}
                                    </span>
                                    <span className="line-clamp-1 text-fifth opacity-80 tracking-wide font-normal text-[12px] ">
                                        Ciudad: {session.origin?.city}
                                    </span>
                                </div>
                            </div>
                        )
                    })
            }
        </article>
    )
}