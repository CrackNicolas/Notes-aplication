'use client'

import { useContext, useEffect, useState } from "react";

import { Context } from "@/context/provider";

import ComponentDashboardMain from "@/frontend/components/layouts/dashboard/main";

import { items_main } from "@/frontend/enums/dashboard"

import { Props_items_dashboard } from "@/frontend/types/props"

export default function Dashboard() {
  const { session: { user } } = useContext(Context);

  const [items, setItems] = useState<Props_items_dashboard[]>([]);

  useEffect(() => {
    switch (user?.rol) {
      case 'admin':
        setItems(items_main);
        break;
      case 'member':
        if (items_main[0].url === '/sessions') {
          items_main.shift();
        }
        setItems(items_main);
        break;
    }
  }, [user]);

  return <ComponentDashboardMain items={items} />
}