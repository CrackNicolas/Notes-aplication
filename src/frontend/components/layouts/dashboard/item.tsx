'use client'

import Link from "next/link";

import { useState } from "react";

import ComponentIcon from "../../partials/icon";

type Props = {
  last_time: string,
  url: string,
  title: string,
  description: string
}

export default function ComponentItem(props: Props) {
  const { last_time, url, title, description } = props;

  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col h-[130px] items-start justify-between bg-sixth px-4 py-3 cursor-pointer rounded-md hover:shadow-sm hover:shadow-secondary transition duration-700" onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
      <div className="flex items-center justify-between w-full gap-x-4 text-xs pr-1">
        <span className="text-tertiary opacity-50 hover:opacity-100 transition duration-700">
          {"Ultima vez " + last_time}
        </span>
        <ComponentIcon name={`${focus ? 'logo-fill' : 'logo'}`} size={20} description_class="text-secondary" />
      </div>
      <div className="group relative">
        <Link href={url} className="text-lg font-normal hover:font-semibold tracking-wide text-secondary">
          {title}
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-tertiary opacity-50 hover:opacity-100 transition duration-700">
          {description}
        </p>
      </div>
    </div>
  )
}