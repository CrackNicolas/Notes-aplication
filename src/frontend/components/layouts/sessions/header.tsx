import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    count_sessions: number
}

export default function ComponentHeader(props: Props) {
    const { count_sessions } = props;

    return (
        <article className="w-full flex justify-between items-center">
            <button type="button" title="Sesiones de usuario" className="outline-none">
                <ComponentIcon name="users-fill" size={24} description_class="dark:text-dark-secondary text-secondary" />
            </button>
            <button type="button" title="Lista de notas creadas" className="outline-none">
                <ComponentIcon name="list-fill" size={24} description_class="dark:text-dark-secondary text-secondary" />
            </button>
        </article>
    )
}