import { Manifest } from 'next/dist/lib/metadata/types/manifest-types';

export default function manifest(): Manifest {
    return {
        name: "Aplicacion de notas",
        short_name: "Notas",
        description: "Aplicación construida en Next.js",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#00ffff",
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
                src: "/images/logo-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            }
        ]
    };
}
