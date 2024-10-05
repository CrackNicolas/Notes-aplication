import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    count_sessions: number
}

export default function ComponentHeader(props: Props) {
    const { count_sessions } = props;

    return (
        <article className="w-full flex justify-between items-center">
            <span className="flex items-center gap-3 dark:text-dark-secondary text-secondary text-xl tracking-wider">
                <ComponentIcon name="users-fill" size={24} description_class="dark:text-dark-secondary text-secondary" />
                Lista de usuarios
            </span>
            <span className="dark:text-dark-secondary text-secondary text-xl">
                {count_sessions}
            </span>
        </article>
    )
}