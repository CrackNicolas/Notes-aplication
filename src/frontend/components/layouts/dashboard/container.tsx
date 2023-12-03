import ComponentHeader from "./header"
import ComponentItem from "./item"

export default function ComponentDashboard() {
    return (
        <section className="bg-primary py-24 sm:py-32">
            <article className="mx-auto max-w-7xl px-2 lg:px-10">
                <ComponentHeader />
                <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 pt-10 sm:mt-16 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <ComponentItem/>
                    <ComponentItem/>
                    <ComponentItem/>
                    <ComponentItem/>
                </div>
            </article>
        </section>
    )
}