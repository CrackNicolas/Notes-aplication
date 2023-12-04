export default function ComponentForm() {
    return (
        <div className="col-span-1 flex flex-col gap-y-2">
            <div className="flex justify-center">
                <span className="text-2xl text-secondary font-semibold text-center">Crear nota</span>
            </div>
            <form className="flex flex-col gap-y-7">
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-0.5">
                        <label htmlFor="title" className="text-sm font-normal text-secondary tracking-wider">Titulo</label>
                        <input type="text" id="title" placeholder="Escriba el titulo..." className="bg-primary w-full rounded-md border-[0.1px] border-secondary border-opacity-50 py-1.5 px-2 outline-none text-secondary tracking-wide placeholder:text-secondary placeholder:opacity-70 sm:text-md" />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <label htmlFor="description" className="text-sm font-normal text-secondary tracking-wider">Descripcion</label>
                        <textarea rows={3} id="description" placeholder="Escriba la descripcion..." className="bg-primary w-full rounded-md border-[0.1px] border-secondary border-opacity-50 py-1.5 px-2 outline-none text-secondary tracking-wide placeholder:text-secondary placeholder:opacity-70 sm:text-md" />
                    </div>
                </div>
                <button type="submit" title="Crear nota" className="flex w-full justify-center rounded-md text-secondary border-[0.1px] border-secondary border-opacity-80 px-3 py-1.5 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                    Crear nota
                </button>
            </form>
        </div>
    )
}