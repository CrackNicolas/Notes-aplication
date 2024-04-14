import { Fragment } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, LiteralUnion, Merge, UseFormRegister } from "react-hook-form";

import ComponentInput from "./input";

type Props = {
    value?: string,
    paint?:boolean
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | LiteralUnion<"required", string> | undefined
    register: UseFormRegister<FieldValues>
}

export default function ComponentItemFeatured(props: Props) {
    const { value, paint, error, register } = props;

    return (
        <Fragment>
            <ComponentInput type="radio" name="featured" id={value} value={value} description_class="hidden" register={register} />
            <label htmlFor={value} title={`${value?.toLocaleLowerCase()} destacar`} className={`group border-opacity-50 ${(!error) ? 'border-secondary' : 'border-error'} col-span-1 flex border-[0.1px] rounded-md grid place-items-center overflow-hidden cursor-pointer w-full`}>
                <span title={value} className={` ${paint ? 'bg-secondary text-primary' : ` ${(!error) ? 'text-secondary group-hover:bg-secondary group-hover:text-primary' : 'text-error group-hover:bg-error group-hover:text-primary'}  `} w-full text-center text-sm tracking-wider font-semibold cursor-pointer py-0.5`}>
                    {value}
                </span>
            </label>
        </Fragment>
    )
}