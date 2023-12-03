import Link from "next/link";
import ComponentIcon from "../../partials/icon";

export default function ComponentItem() {
  return (
    <div className="flex max-w-xl flex-col items-start justify-between bg-sixth px-4 py-3 cursor-pointer rounded-md">
      <div className="flex items-center justify-between w-full gap-x-4 text-xs pr-1">
        <time dateTime="2020-03-16" className="text-tertiary opacity-50">
          Last time mar 16, 2020
        </time>
        <ComponentIcon name="logo" size={20} description_class="text-secondary"/>
      </div>
      <div className="group relative">
        <Link href="" className="text-lg font-normal hover:font-semibold tracking-wide text-secondary">
          Resumen de Actividad
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-tertiary opacity-50">
          Un vistazo rápido a tu historial de actividad: desde nuevas notas hasta actualizaciones clave.
        </p>
      </div>
    </div>
  )
}