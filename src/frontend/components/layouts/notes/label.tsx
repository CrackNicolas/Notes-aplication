import { FieldErrors, FieldValues } from "react-hook-form";

type Props = {
    title: string,
    html_for: string,
    errors: FieldErrors<FieldValues>
}

export default function ComponentLabel(props: Props) {
    const { title, html_for, errors } = props;

    return (
        <label htmlFor={html_for} className="text-sm font-normal text-secondary tracking-wider">
            {
                (errors.name?.type) ? 'error' : title
            }
        </label>
    )
}