import { Manifest } from 'next/dist/lib/metadata/types/manifest-types';

export default function manifest(): Manifest {
    return {
        theme_color: "#000000",
        background_color: "#00ffff",
        display: "browser",
        scope: "/",
        start_url: "/",
        name: "Aplicacion de notas",
        short_name: "Notas",
        description: "Aplicacion para crear notas",
        icons: [
            {
                src: "/images/logo.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/images/logo-512.png",
                sizes: "512x512",
                type: "image/png"
            },
            {
                src: "/images/logo-512-black.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            }
        ]
    }
}