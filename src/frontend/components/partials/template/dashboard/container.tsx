import ComponentHeader from "./header"
import ComponentItem from "./item"

type Item = {
    url: string,
    title: string,
    description: string
}

type Props = {
    header?: {
        title: string,
        subtitle: string
    },
    items: Item[]
}

export default function ComponentTemplateDashboard(props: Props) {
    const { header = {
        title: 'Panel de Control',
        subtitle: 'Organiza tu mundo, mantente al tanto de lo más importante.'
    }, items } = props;

    return (
        <section className="bg-primary sm:pt-20 pt-16 pb-9">
            <article className="mx-auto max-w-7xl px-4 lg:px-10">
                <ComponentHeader title={header.title} subtitle={header.subtitle} />
                <div className="mx-auto place-items-center mt-1 sm:mt-7 grid max-w-2xl grid-cols-1 lg:gap-8 gap-3 pt-10 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {
                        items.map((item,index) => {
                            return <ComponentItem key={index} url={item.url} title={item.title} description={item.description} />
                        })
                    }
                </div>
            </article>
        </section>
    )
}