import { ChangeEvent } from "react";
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

    const additional_validation = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.target.value = event.target.value.replace(/[\r\n]+/g, "").replace(/\s\s+/g, " ");
    }

    return (
        (!rows) ?
            <input
                {...register(name, validation(name, required))}
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={(event) => additional_validation(event)}
                className={` ${(!error) ? 'dark:border-dark-secondary border-secondary dark:text-dark-secondary text-secondary dark:placeholder:text-dark-secondary placeholder:text-secondary' : 'dark:border-dark-error border-error dark:text-dark-error text-error dark:placeholder:text-dark-error placeholder:text-error'} ${description_class}`}
                placeholder={placeholder}
            />
            :
            <textarea
                {...register(name, validation(name))}
                id={id}
                name={name}
                rows={rows}
                onChange={(event) => additional_validation(event)}
                className={` ${(!error) ? 'dark:border-dark-secondary border-secondary dark:text-dark-secondary text-secondary dark:placeholder:text-dark-secondary placeholder:text-secondary' : 'dark:border-dark-error border-error dark:text-dark-error text-error dark:placeholder:text-dark-error placeholder:text-error'} ${description_class}`}
                placeholder={placeholder}
            />
    )
}