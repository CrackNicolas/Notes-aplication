import { FieldError, FieldErrorsImpl, LiteralUnion, Merge } from "react-hook-form";

import { Props_inputs } from "@/frontend/types/props";

type Props = {
    title: string,
    html_for: string,
    validation?: Props_inputs
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required" | "pattern" | "maxLength" | "minLength", string> | undefined
}

export default function ComponentLabel(props: Props) {
    const { title, html_for, validation, error } = props;

    const connector_primary = (title === "Titulo") ? "El" : "La"

    const message = (): string => {
        switch (error) {
            case 'required':
                return `${title} requerid${(title === "Descripcion" || title === "Prioridad") ? 'a' : 'o'}`;
            case 'minLength':
                return `${connector_primary} ${title.toLowerCase()} debe ser mayor a ${validation?.minLength} caracteres`;
            case 'maxLength':
                return `${connector_primary} ${title.toLowerCase()} debe ser menor a ${validation?.maxLength} caracteres`;
            case 'pattern':
                return `Se detectaron caracteres no permitidos`;
            default:
                return title;
        }
    }

    return (
        <label data-testid={html_for} htmlFor={html_for} className={`line-clamp-1 text-sm font-normal ${(!error) ? 'text-secondary' : 'text-error'} tracking-wider`}>
            {
                message()
            }
        </label>
    )
}