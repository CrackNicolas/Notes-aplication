import { Dispatch, SetStateAction } from "react";

import ComponentIcon from "../../partials/icon";
import ComponentModal from "../../partials/modal";

import { Props_response, Props_status } from "@/context/types/response";

type Props = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    response: Props_response,
}

export default function ComponentMessageConfirmation(props: Props) {
    const { open, setOpen, response: { status, info } } = props;

    const icon = (status: Props_status): JSX.Element => {
        switch (status) {
            case 200: case 201: case 204:
                return <ComponentIcon name='check' description_class='text-secondary' size={30} />
            case 400: case 404: case 500:
                return <ComponentIcon name='close' description_class='text-error' size={30} />
        }
    }

    const color = (status: Props_status): string => {
        switch (status) {
            case 200: case 201: case 204:
                return "secondary";
            case 400: case 404: case 500:
                return "error";
        }
    }

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className={`relative flex flex-col items-center border-[0.1px] border-${color(status)} border-opacity-50 rounded-lg gap-y-5 px-3 sm:px-5 py-5`}>
                <ComponentIcon name='logo' description_class={`absolute top-1.5 left-2 text-${color(status)} opacity-70 `} size={20} />
                <div className="flex flex-col w-full items-center text-center sm:mt-0 sm:text-left">
                    <span className="flex place-items-center p-3 rounded-full bg-gray-900">
                        {
                            icon(status)
                        }
                    </span>
                    <p className="mt-2 text-center text-xl text-gray-500">
                        {info?.message}
                    </p>
                </div>
                <button name="Aceptar" onClick={() => setOpen(false)} className={`outline-none rounded-full w-[200px] bg-primary hover:opacity-100 opacity-70 cursor-pointer text-${color(status)} border-[0.1px] border-${color(status)} `} type="button">
                    Aceptar
                </button>
            </div>
        </ComponentModal>
    )
}