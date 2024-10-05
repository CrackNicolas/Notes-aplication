import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormRegister } from "react-hook-form";

import { validation } from "@/frontend/validations/form";

type Props = {
    id?: string,
    type?: string,
    name: string,
    rows?: number,
    value?: string,
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required" | "pattern" | "maxLength" | "minLength", string> | undefined
    register: UseFormRegister<FieldValues>,
    required?: boolean,
    placeholder?: string,
    description_class: string
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
                className={` ${(!error) ? 'dark:border-dark-secondary border-secondary dark:text-dark-secondary text-secondary dark:placeholder:text-dark-secondary placeholder:text-secondary' : 'dark:border-dark-error border-error dark:text-dark-error text-error dark:placeholder:text-dark-error placeholder:text-error'} ${description_class}`}
            />
            :
            <textarea
                {...register(name, validation(name))}
                id={id}
                placeholder={placeholder}
                name={name}
                rows={rows}
                className={` ${(!error) ? 'dark:border-dark-secondary border-secondary dark:text-dark-secondary text-secondary dark:placeholder:text-dark-secondary placeholder:text-secondary' : 'dark:border-dark-error border-error dark:text-dark-error text-error dark:placeholder:text-dark-error placeholder:text-error'} ${description_class}`}
            />
    )
}