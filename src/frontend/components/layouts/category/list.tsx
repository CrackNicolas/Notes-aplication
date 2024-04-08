import { Props_category } from "@/context/types/category"

type Props = {
    categorys: Props_category[]
}

export default function ComponentList(props: Props) {
    const { categorys } = props;

    return (
        <article className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full">
            {
                categorys.map(category => {
                    return (
                        <div key={category.title} className="col-span-1 grid place-items-center bg-primary border-secondary border-[0.1px] h-[100px] rounded-md cursor-pointer">
                            <span className="text-xl font-semibold text-secondary tracking-wide">
                                {category.title}
                            </span>
                        </div>
                    )
                })
            }
        </article>
    )
}