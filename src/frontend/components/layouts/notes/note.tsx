import ComponentIcon from "../../partials/icon";

export default function ComponentNote() {
    return (
        <div className="grid grid-cols-9 w-full bg-sixth px-2.5 py-2 cursor-pointer rounded-md">
            <span className="col-span-8 text-md font-normal tracking-wide text-tertiary">
                Programar una aplicacion que este al nivel de las solicitudes de mi clientes asas das das das das d asd
            </span>
            <div className="col-span-1 flex flex-col place-items-center gap-y-2">
                <span className="text-tertiary text-[11px] opacity-50 px-1.5">
                    Hace 1 min
                </span>
                <div className="flex gap-x-2">
                    <button type="button" title="Eliminar" className="outline-none border-none">
                        <ComponentIcon name="logo" size={20} description_class="text-secondary" />
                    </button>
                    <button type="button" title="Editar" className="outline-none border-none">
                        <ComponentIcon name="logo" size={20} description_class="text-secondary" />
                    </button>
                </div>
            </div>
        </div>
    )
}