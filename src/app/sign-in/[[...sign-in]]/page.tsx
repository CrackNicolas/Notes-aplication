'use client'

import { useEffect, useState } from "react";

import { ComponentSignIn } from "@/frontend/components/services/clerk";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <section className="grid place-items-center items-center mt-[80px]">
            {
                isLoading ?
                    <div className="flex flex-col gap-y-5 justify-center items-center py-[120px] ">
                        <div className="animate-spin rounded-full h-[70px] w-[70px] border-t-[1.5px] border-b-[1.5px] border-secondary" />
                        <span className="text-secondary tracking-wider">
                            Cargando
                        </span>
                    </div>
                    :
                    <ComponentSignIn />
            }
        </section>
    )
}