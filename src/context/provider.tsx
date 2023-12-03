'use client'

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { Fragment } from "react";

import { Props_layouts } from "@/frontend/types/props";

export default function Provider({children}:Props_layouts){
    return (
        <Fragment>
            <ProgressBar color="#00ffff"/>
            {children}
        </Fragment>
    )
}