import { FieldErrors, FieldValues } from "react-hook-form";

type Props = {
    title: string,
    html_for: string,
    errors?: FieldErrors<FieldValues>,
    color?: string
}

export default function ComponentLabel(props: Props) {
    const { title, html_for, errors, color = 'text-secondary' } = props;

    const exists_error = errors && errors[html_for];

    return (
        <label title={title} htmlFor={html_for} className={`line-clamp-1 text-sm font-normal ${(!exists_error) ? color : 'text-error'} tracking-wider`}>
            {
                exists_error ? `${errors[html_for]?.message}` : title
            }
        </label>
    )
}