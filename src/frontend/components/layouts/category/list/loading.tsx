import { Fragment } from "react"

export default function ComponentLoading({ count }: { count: number }) {
    return (
        <Fragment>
            {
                Array.from(Array(count).keys(), n => n + 1).map((index: number) => {
                    return (
                        <div key={index} className="animate-pulse col-span-1 grid gap-0 place-items-center bg-primary border-secondary border-[0.1px] border-opacity-50 h-[100px] rounded-md cursor-pointer px-4">
                            <span className="rounded-full w-[40px] h-[40px] bg-secondary opacity-20"></span>
                            <span className="rounded-full w-full mx-3 h-[20px] bg-secondary opacity-20"></span>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}