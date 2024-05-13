import { UserButton, SignIn } from "@clerk/nextjs";

export function ComponentUserButton() {
    return <UserButton afterSignOutUrl="/" appearance={{
        elements: {
            userButtonPopoverCard: "pb-2.5 pt-5 w-[300px]",
            userPreview: "mb-3 px-4",
            userButtonPopoverActionButton: "px-4",
            userButtonPopoverActionButton__manageAccount: "hidden",
            userButtonPopoverActionButtonText__signOut: "text-transparent before:text-tertiary before:content-['Cerrar_sesión']"
        }
    }} />
}
export function ComponentSignIn() {
    return <SignIn appearance={{
        elements: {
            card: "w-[326px] px-7 sm:px-10 sm:w-[400px] pt-7 sm:pt-10 pb-0 sm:pb-2",
            dividerText: "hidden",
            headerTitle: "text-transparent before:text-tertiary before:content-['Iniciar_sesión']",
            headerSubtitle: "text-transparent before:text-tertiary before:content-['Continua_con_tu_aplicación_de_notas']",
            formFieldLabel: "text-transparent before:text-tertiary before:content-['Correo_electrónico']",
            footerActionText: "hidden",
            footerActionLink: "hidden",
            formButtonPrimary: "bg-primary hover:text-secondary hover:bg-primary hover:opacity-60",
            formHeaderTitle: "text-transparent before:text-tertiary before:content-['Código_de_verificación']",
            formHeaderSubtitle: "text-transparent before:text-tertiary before:content-['Ingrese_el_código_de_verificación_enviado_a_su_dirección_de_correo_electrónico']"
        }
    }} />
}