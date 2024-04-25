import { FieldErrors, FieldValues } from "react-hook-form";

type Props = {
    title: string,
    html_for: string,
    errors?: FieldErrors<FieldValues>
}

export default function ComponentLabel(props: Props) {
    const { title, html_for, errors } = props;

    const exists_error = errors && errors[html_for];

    return (
        <label title={title} htmlFor={html_for} className={`line-clamp-1 text-sm font-normal ${(!exists_error) ? 'text-secondary' : 'text-error'} tracking-wider`}>
            {
                exists_error ? `${errors[html_for]?.message}` : title
            }
        </label>
    )
}