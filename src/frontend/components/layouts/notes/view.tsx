import ComponentIcon from "../../partials/icon";
import ComponentModal from "../../partials/modal";

type Props = {
    open: boolean,
    setOpen: any
}

export default function ComponentView(props: Props) {
    const { open, setOpen } = props;

    return (
        <ComponentModal open={open} setOpen={setOpen}>
            <div className="flex items-center gap-y-3 px-3 sm:px-7 py-7">
                <div className="flex h-12 w-12 place-items-center justify-center rounded-full bg-secondary">
                    <ComponentIcon name='check-2' description_class='cursor-not-allowed mt-1 text-tertiary' size={25} />
                </div>
                <div className="flex flex-col items-center mt-3 text-center sm:mt-0 sm:text-left">
                    <span className="font-semibold leading-6 text-secondary">
                        Title
                    </span>
                    <p className="text-center text-sm text-gray-500">
                        Description
                    </p>
                </div>
            </div>
        </ComponentModal>
    )
}