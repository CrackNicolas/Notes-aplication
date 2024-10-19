'use client'

import { useRouter } from "next/navigation";

import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

import { items_config } from "@/frontend/enums/dashboard"

export default function ComponentDashboardConfig() {
    const router = useRouter();

    const redirect = (path: string) => router.push(path);
    
    return <ComponentTemplateDashboard items={items_config} view_redirect={true} redirect={redirect} />
}