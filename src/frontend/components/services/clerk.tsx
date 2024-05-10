import { UserButton, SignIn } from "@clerk/nextjs";

export function ComponentUserButton() {
    return <UserButton afterSignOutUrl="/" appearance={{
        elements: {
            userButtonPopoverActionButtonText__signOut: "text-transparent before:text-tertiary before:content-['Cerrar_sesión']"
        }
    }} />
}
export function ComponentSignIn() {
    return <SignIn appearance={{
        elements: {
            headerTitle: "text-transparent before:text-tertiary before:content-['Iniciar_sesión']",
            headerSubtitle: "text-transparent before:text-tertiary before:content-['Continua_con_tu_aplicación_de_notas']",
            formFieldLabel: "text-transparent before:text-tertiary before:content-['Correo_electrónico']",
            footerActionText: "hidden",
            footerActionLink: "hidden",
            formButtonPrimary: "bg-primary hover:text-secondary hover:bg-primary hover:opacity-60"
        }
    }} />
}