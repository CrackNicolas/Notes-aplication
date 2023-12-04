import ComponentHeader from "./header";
import ComponentNote from "./note";

export default function ComponentList(){
    return (
        <div className="col-span-2 flex flex-col gap-y-2">
            <ComponentHeader/>
            <div className="flex flex-col gap-y-1 overflow-hidden overflow-y-scroll scroll h-[calc(100vh-155px)] pr-1">
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
                <ComponentNote/>
            </div>
        </div>
    )
}