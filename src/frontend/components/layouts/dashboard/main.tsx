import ComponentTemplateDashboard from "@/frontend/components/partials/template/dashboard/container"

import { Props_items_dashboard } from "@/frontend/types/props"

export default function ComponentDashboardMain({ items }: { items: Props_items_dashboard[] }) {
    return <ComponentTemplateDashboard items={items} />
}