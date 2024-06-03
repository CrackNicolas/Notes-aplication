'use client'

import Link from "next/link";

import { useEffect, useState } from "react";

import ComponentIcon from "@/frontend/components/partials/icon";

import { Time_elapsed } from "@/frontend/logic/format_time";

type Props = {
  url: string,
  title: string,
  description: string
}

export default function ComponentItem(props: Props) {
  const { url, title, description } = props;

  const [focus, setFocus] = useState<boolean>(false);
  const [last_time, setLast_time] = useState<string>('Prueba nuestra funcion');

  useEffect(() => {
    const date = localStorage.getItem(url);
    setLast_time((date) ? Time_elapsed(new Date(JSON.parse(date))) : 'Prueba nuestra funcion');
  }, [url])

  const view = () => {
    localStorage.setItem(url, JSON.stringify(new Date()));
  }

  return (
    <Link href={url} onClick={() => view()} title={title} className="flex w-full flex-col items-start justify-between bg-sixth sm:px-4 px-3 sm:py-3 py-3 cursor-pointer rounded-md hover:shadow-sm hover:shadow-secondary transition duration-700" onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
      <div className="flex items-center justify-between w-full gap-x-4 text-xs pr-1">
        <span className="text-tertiary opacity-50 hover:opacity-100 transition duration-700">
          {last_time.replace('Creada', 'Ultima vez')}
        </span>
        <ComponentIcon name={`${focus ? 'logo-fill' : 'logo'}`} size={20} description_class="text-secondary cursor-pointer" />
      </div>
      <div className="group relative">
        <span className="line-clamp-1 text-lg font-normal hover:font-semibold tracking-wide text-secondary">
          {title}
        </span>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-tertiary opacity-50 hover:opacity-100 transition duration-700">
          {description}
        </p>
      </div>
    </Link>
  )
}