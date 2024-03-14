import { FieldValues, UseFormRegister } from "react-hook-form";

import { validation } from "@/frontend/validations/form";

type Props = {
    type?: string,
    name: string,
    id?: string,
    placeholder?: string,
    description_class: string,
    value?: string,
    rows?: number
    register: UseFormRegister<FieldValues>,
}

export default function ComponentInput(props: Props) {
    const { type, name, id, placeholder, description_class, value, rows, register } = props;

    return (
        (!rows) ?
            <input {...register(name, validation(name))} type={type} id={id} placeholder={placeholder} value={value} className={description_class} />
            :
            <textarea {...register(name, validation(name))} id={id} placeholder={placeholder} rows={rows} className={description_class} />
    )
}