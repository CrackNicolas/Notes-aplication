import { FieldError, FieldErrorsImpl, LiteralUnion, Merge } from "react-hook-form";

type Props = {
    title: string,
    html_for: string,
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required" | "pattern" | "maxLength" | "minLength", string> | undefined
}

export default function ComponentLabel(props: Props) {
    const { title, html_for, error } = props;

    const message = () => {
        switch (error) {
            case 'required':
                return `${title} requerid${(title === "Descripcion" || title === "Prioridad") ? 'a' : 'o'}`;
            default:
                return title;
        }
    }

    return (
        <label htmlFor={html_for} className={`text-sm font-normal ${(error === undefined) ? 'text-secondary' : 'text-error'} tracking-wider`}>
            {
                message()
            }
        </label>
    )
}