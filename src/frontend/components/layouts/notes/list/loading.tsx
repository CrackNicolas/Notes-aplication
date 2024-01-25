import { Fragment } from "react"

export default function ComponentLoading({ count }: { count: number }) {
    return (
        <Fragment>
            {
                Array.from(Array(count).keys(), n => n + 1).map((index: number) => {
                    return (
                        <div key={index} className={`animate-pulse group grid grid-cols-9 w-full bg-sixth pl-2.5 py-2 cursor-pointer rounded-md border-[0.1px] border-tertiary border-opacity-20`}>
                            <div className="col-span-8 flex flex-col gap-y-1 justify-between">
                                <span className="bg-tertiary opacity-20 w-[170px] h-[13px] rounded-full"></span>
                                <p className="bg-tertiary opacity-20 w-[450px] h-[12px] rounded-full"></p>
                            </div>
                            <div className="col-span-1 flex flex-col place-items-center gap-y-2">
                                <span className="bg-tertiary opacity-20 w-[50px] h-[8px] px-1.5 rounded-full"></span>
                                <div className="flex gap-x-2">
                                    <span className="bg-tertiary opacity-20 w-[17px] h-[17px] px-1.5 rounded-full"></span>
                                    <span className="bg-tertiary opacity-20 w-[17px] h-[17px] px-1.5 rounded-full"></span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}