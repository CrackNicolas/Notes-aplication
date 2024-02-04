import { Dispatch, SetStateAction } from "react";
import ComponentIcon from "../../partials/icon";
import ComponentModal from "../../partials/modal";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    message: string
}

export default function ComponentMessageConfirmation(props: Props) {
    const { open, setOpen, message } = props;

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="relative flex flex-col items-center border-[0.1px] border-secondary border-opacity-50 rounded-lg gap-y-5 px-3 sm:px-5 py-5">
                <ComponentIcon name='logo' description_class='absolute top-1.5 left-2 text-secondary opacity-70' size={20} />
                <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                    <span className="flex place-items-center p-3 rounded-full bg-gray-900">
                        <ComponentIcon name='check' description_class='text-secondary' size={30} />
                    </span>
                    <p className="text-center text-xl text-gray-500">
                        {message}
                    </p>
                </div>
                <button onClick={() => setOpen(false)} className="outline-none rounded-full w-[200px] bg-primary hover:bg-secondary cursor-pointer text-secondary hover:text-primary border-[0.1px] border-secondary ">
                    Aceptar
                </button>
            </div>
        </ComponentModal>
    )
}