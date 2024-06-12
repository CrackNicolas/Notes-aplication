'use client'

import { useContext } from "react";

import ComponentNotes from "@/frontend/components/layouts/notes/container";

import { Context } from "@/context/provider";

export default function Notes() {
    const { session } = useContext(Context);

    return <ComponentNotes session={session} />
}