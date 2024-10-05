'use client'

import { dark } from '@clerk/themes'
import { UserButton, SignIn } from "@clerk/nextjs";

import { useContext } from "react";

import { Theme_name } from "@/frontend/types/props";

import { Context } from "@/context/provider";

export function ComponentUserButton() {
    const props = useContext(Context);

    return <UserButton afterSignOutUrl="/" appearance={{
        ...((props.theme == Theme_name.ligth) && { baseTheme: dark }),
        elements: {
            userButtonPopoverCard: "pb-2.5 pt-5 w-[300px]",
            userPreview: "mb-3 px-4",
            userButtonPopoverActionButton: "px-4",
            userButtonPopoverActionButtonIcon: "dark:text-dark-secondary",
            userButtonPopoverActionButton__manageAccount: "hidden",
            userButtonPopoverActionButtonText__signOut: "text-transparent dark:before:text-dark-secondary before:text-tertiary before:content-['Cerrar_sesión']"
        }
    }} />
}
export function ComponentSignIn() {
    const props = useContext(Context);

    return <SignIn afterSignInUrl="/dashboard/main" appearance={{
        ...((props.theme == Theme_name.ligth) && { baseTheme: dark }),
        elements: {
            logoBox: 'absolute right-2 top-2',
            alert: "hidden",
            card: "w-[326px] px-7 sm:px-10 sm:w-[400px] pt-7 sm:pt-10 pb-0 sm:pb-2",
            dividerText: "hidden",
            headerTitle: "text-transparent dark:before:text-dark-secondary before:text-tertiary before:content-['Iniciar_sesión']",
            headerSubtitle: "mb-[-20px] text-sm text-transparent dark:before:text-dark-secondary before:text-tertiary before:content-['Continua_con_tu_aplicación_de_notas']",
            formFieldLabel: "text-transparent dark:before:text-dark-secondary before:text-tertiary before:content-['Correo_electrónico']",
            footerActionText: "hidden",
            footerActionLink: "hidden",
            formButtonPrimary: "bg-primary hover:text-secondary hover:bg-primary dark:hover:opacity-100 hover:opacity-60",
            formHeaderTitle: "text-transparent dark:before:text-dark-tertiary before:text-tertiary before:content-['Código_de_verificación']",
            formResendCodeLink: "before:content-['Reenviar_código'] before:text-blue-700 before:w-full before:text-start invisible before:visible",
            formHeaderSubtitle: "text-transparent dark:before:text-dark-tertiary before:text-tertiary before:content-['Ingrese_el_código_de_verificación_enviado_a_su_dirección_de_correo_electrónico']",
            formFieldErrorText: "before:content-['Cuenta_no_encontrada'] before:text-red-500 before:absolute before:ml-6 w-full text-transparent",
            otpCodeFieldErrorText: "before:content-['Código_incorrecto'] before:text-red-500 before:absolute before:ml-6 w-full text-transparent"
        }
    }} />
}