import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    count_sessions: number
}

export default function ComponentHeader(props: Props) {
    const { count_sessions } = props;

    return (
        <article className="w-full flex justify-between items-center">
            <button type="button" title="Sesiones de usuario" className="flex items-center gap-x-3 outline-none">
                <ComponentIcon name="users-fill" size={24} description_class="dark:text-dark-secondary text-secondary" />
                <span className="text-secondary dark:text-dark-secondary text-xl tracking-wider font-semibold">
                    Sesiones de usuario
                </span>
            </button>
            <span className="text-secondary dark:text-dark-secondary font-semibold text-xl">
                {count_sessions}
            </span>
        </article>
    )
}