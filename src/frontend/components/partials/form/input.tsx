import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormRegister } from "react-hook-form";

import { validation } from "@/frontend/validations/form";

type Props = {
    type?: string,
    name: string,
    id?: string,
    placeholder?: string,
    description_class: string,
    value?: string,
    rows?: number
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required" | "pattern" | "maxLength" | "minLength", string> | undefined
    register: UseFormRegister<FieldValues>,
    required?: boolean
}

export default function ComponentInput(props: Props) {
    const { type, name, id = name, placeholder, description_class, value, rows, error, register, required = true } = props;

    return (
        (!rows) ?
            <input
                {...register(name, validation(name, required))}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                className={` ${(!error) ? 'border-secondary text-secondary placeholder:text-secondary' : 'border-error text-error placeholder:text-error'} ${description_class}`}
            />
            :
            <textarea
                {...register(name, validation(name))}
                id={id}
                placeholder={placeholder}
                name={name}
                rows={rows}
                className={` ${(!error) ? 'border-secondary text-secondary placeholder:text-secondary' : 'border-error text-error placeholder:text-error'} ${description_class}`}
            />
    )
}