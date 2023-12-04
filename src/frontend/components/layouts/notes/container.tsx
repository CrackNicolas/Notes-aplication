import ComponentForm from "./form";
import ComponentList from "./list";

export default function ComponentNotes() {
    return (
        <section className="flex min-h-full flex-col justify-center mt-[30px] px-6 py-12 lg:px-10">
            <article className="grid grid-cols-3 gap-4">
                <ComponentForm />
                <ComponentList />
            </article>
        </section>
    )
}