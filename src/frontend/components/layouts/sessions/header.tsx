type Props = {
    count_sessions: number
}

export default function ComponentHeader(props: Props) {
    const { count_sessions } = props;

    return (
        <article className="w-full flex justify-between items-center">
            <span className="text-secondary text-xl tracking-wider">
                Lista de usuarios
            </span>
            <span className="text-secondary text-xl">
                {count_sessions}
            </span>
        </article>
    )
}