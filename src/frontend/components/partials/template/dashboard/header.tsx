type Props = {
    title?: string,
    subtitle?: string
}

export default function ComponentHeader(props: Props) {
    const { title = '', subtitle = '' } = props;

    return (
        <div className="px-5 mx-auto max-w-2xl">
            <h2 className="text-3xl text-center font-bold tracking-wider text-secondary sm:text-4xl">
                {title}
            </h2>
            <p className="mt-2 text-md text-center tracking-wider text-tertiary opacity-40 font-thin">
                {subtitle}
            </p>
        </div>
    )
}