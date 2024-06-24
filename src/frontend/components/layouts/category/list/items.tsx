import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLoading from "@/frontend/components/layouts/category/list/loading";

import { Props_category } from "@/context/types/category";

type Props = {
    categorys: Props_category[],
    select: (category: Props_category) => Promise<void> | void,
    use_paint?: boolean
}

export default function ComponentItems(props: Props) {
    const { categorys, select, use_paint = false } = props;

    return (
        <article className="relative grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 w-full">
            {
                (categorys.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    categorys.map(category => {
                        return (
                            <div key={category.title} title={`Categoria ${category.title}`} onClick={() => select(category)} className={`group col-span-1 grid place-items-center h-[100px] rounded-md cursor-pointer hover:bg-secondary transition duration-500 ${use_paint ? 'hover:bg-secondary bg-primary border-secondary  border-[0.1px]' : `${category.use ? 'bg-secondary' : 'bg-primary border-secondary  border-[0.1px]'}`} `}>
                                <div className="flex flex-col items-center gap-y-1">
                                    <ComponentIcon name={category.icon} size={27} view_box="0 0 16 16" description_class={`group-hover:text-primary ${use_paint ? 'hover:text-primary text-secondary' : `${category.use ? 'text-primary' : 'text-secondary'} `} duration-500 group-hover:translate-y-[-5px] `} />
                                    <span className={`group-hover:text-primary text-lg group-hover:font-bold font-semibold ${use_paint ? 'hover:text-primary text-secondary' : `${category.use ? 'text-primary' : 'text-secondary'}`} tracking-wider duration-500`}>
                                        {category.title}
                                    </span>
                                </div>
                            </div>
                        )
                    })
            }
        </article>
    )
}