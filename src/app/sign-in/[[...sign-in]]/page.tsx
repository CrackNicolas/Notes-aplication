import { ComponentSignIn } from "@/frontend/components/services/clerk";

export default function Page() {
    return (
        <section className="grid place-items-center items-center mt-[80px]">
            <ComponentSignIn/>
        </section>
    )
}