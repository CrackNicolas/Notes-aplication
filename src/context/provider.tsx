'use client'

import { usePathname, useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { Fragment, useEffect } from "react";

import { Props_layouts } from "@/frontend/types/props";

export default function Provider({ children }: Props_layouts) {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!navigator.onLine) {
            router.push("/without_internet")
        }
    }, [path])

    return (
        <Fragment>
            <ProgressBar color="#00ffff" />
            {children}
        </Fragment>
    )
}