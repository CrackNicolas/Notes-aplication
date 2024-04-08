import ComponentHeader from "./header"
import ComponentItem from "./item"

export default function ComponentDashboard() {
    return (
        <section className="bg-primary sm:pt-20 pt-16 pb-9">
            <article className="mx-auto max-w-7xl px-4 lg:px-10">
                <ComponentHeader />
                <div className="mx-auto place-items-center mt-1 sm:mt-7 grid max-w-2xl grid-cols-1 lg:gap-8 gap-3 pt-10 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <ComponentItem url="/notes" title="Administrador de notas" description="Realiza la creacion, edicion, eliminacion y visualizacion de notas con facilidad." />
                    <ComponentItem url="" title="Estadisticas de uso" description="Descubre patrones y mejora tu productividad con estadísticas y frecuencia de uso." />
                    <ComponentItem url="" title="Notas destacadas" description="Acceso rápido a tus notas clave. Tu atajo instantáneo a la información más importante." />
                    <ComponentItem url="" title="Recordatorios" description="No pierdas tareas importantes. Alertas y notificaciones para una gestión sin preocupaciones." />
                    <ComponentItem url="" title="Categorias y etiquetas" description="Clasifica y detalla tus notas fácilmente. Flexibilidad total para una organización precisa." />
                    <ComponentItem url="" title="Archivos adjuntos" description="Mejora tus notas con imágenes y documentos para una experiencia completa." />
                </div>
            </article>
        </section>
    )
}