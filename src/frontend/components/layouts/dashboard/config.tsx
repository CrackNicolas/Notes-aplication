import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

import { items_config } from "@/frontend/constant/dashboard"

export default function ComponentDashboardConfig() {
    return <ComponentTemplateDashboard items={items_config} view_redirect={true} />
}