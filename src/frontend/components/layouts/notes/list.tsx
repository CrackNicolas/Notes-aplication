import ComponentHeader from "./header";
import ComponentNote from "./note";

export default function ComponentList(){
    return (
        <div className="col-span-2 flex flex-col gap-y-2">
            <ComponentHeader/>
            <div>
                <ComponentNote/>
            </div>
        </div>
    )
}