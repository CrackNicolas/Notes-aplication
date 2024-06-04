'use client'

import { useContext, useEffect } from "react";

import { Context } from "@/context/provider";

import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

import { items_main } from "@/frontend/enums/dashboard"

export default function ComponentDashboardMain() {
    const { session: { user } } = useContext(Context);

    useEffect(() => {
        if(user?.rol !== 'admin'){
            items_main.shift();
        }
    },[user])

    return <ComponentTemplateDashboard items={items_main} />
}