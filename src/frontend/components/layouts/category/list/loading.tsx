import { Fragment } from "react"

export default function ComponentLoading({ count }: { count: number }) {
    return (
        <Fragment>
            {
                Array.from(Array(count).keys(), n => n + 1).map((index: number) => {
                    return (
                        <div key={index} className="animate-pulse col-span-1 grid place-items-center bg-primary border-secondary border-[0.1px] border-opacity-50 h-[100px] rounded-md cursor-pointer"></div>
                    )
                })
            }
        </Fragment>
    )
}