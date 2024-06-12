'use client'

import { useContext } from "react";

import { Context } from "@/context/provider";

import ComponentHome from "@/frontend/components/layouts/home/container";

export default function Home() {
  const { session } = useContext(Context);

  return <ComponentHome id={session?.id} />
}