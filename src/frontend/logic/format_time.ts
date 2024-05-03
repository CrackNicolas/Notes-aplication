export function Time_elapsed(date: Date): string {
    const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

    const fecha = new Date(date);
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `Creada el ${dia} de ${mes} de ${año}`;
}