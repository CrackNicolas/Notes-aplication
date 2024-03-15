import { FormEventHandler, LegacyRef, ReactNode } from "react";

export type Props = {
    inputs: ReactNode[],
    buttons: ReactNode,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined
}

export default function ComponentForm(props: Props) {
    const { inputs, buttons, handleSubmit } = props;

    return (
        <form method="POST" onSubmit={handleSubmit} className="flex flex-col gap-y-7">
            <div className="flex flex-col gap-y-3">
                {
                    inputs.map((input, index) => (
                        <div key={index} className="flex flex-col gap-y-0.5">
                            {input}
                        </div>
                    ))
                }
            </div>
            <div className="flex gap-x-10">
                {buttons}
            </div>
        </form>
    )
}