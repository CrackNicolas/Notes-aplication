import ComponentIcon from "../../partials/icon";

export default function ComponentNote() {
    return (
        <div className="grid grid-cols-9 w-full bg-sixth pl-2.5 py-2 cursor-pointer rounded-md">
            <div className="col-span-8 flex flex-col">
                <span className="text-md font-normal hover:font-semibold tracking-wide text-secondary">
                    Titulo
                </span>
                <p className="line-clamp-1 text-sm text-tertiary opacity-50 hover:opacity-100 transition duration-700">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, sunt natus, officiis vitae consectetur, labore reiciendis impedit totam sed porro excepturi! Eius esse itaque aliquid neque repellendus suscipit cum architecto?
                </p>
            </div>
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