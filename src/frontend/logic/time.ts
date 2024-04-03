export function Time_elapsed(fecha_emit: Date): string {
    const fecha_current = new Date();
    const format_fecha_emit = new Date(fecha_emit);
    const difference_in_milliseconds = fecha_current.getTime() - format_fecha_emit.getTime();

    const milliseconds_in_second = 1000;
    const seconds_in_minute = 60;
    const minutes_in_hour = 60;
    const hours_in_day = 24;
    const days_in_month = 30;

    const total_seconds = Math.abs(Math.floor(difference_in_milliseconds / milliseconds_in_second));
    const total_minutes = Math.floor(total_seconds / seconds_in_minute);
    const total_hours = Math.floor(total_minutes / minutes_in_hour);
    const total_days = Math.floor(total_hours / hours_in_day);
    const total_months = Math.floor(total_days / days_in_month);
    const total_years = Math.floor(total_months / 12);

    const remainingMonths = total_months % 12;
    const remainingDays = total_days % days_in_month;
    const remainingHours = total_hours % hours_in_day;
    const remainingMinutes = total_minutes % minutes_in_hour;
    const remainingSeconds = total_seconds % seconds_in_minute;

    const parts = [
        `${total_years} año${total_years !== 1 ? 's' : ''}`,
        `${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`,
        `${remainingDays} día${remainingDays !== 1 ? 's' : ''}`,
        `${remainingHours} hs`,
        `${remainingMinutes} min`,
        `${remainingSeconds} seg`
    ].filter(part => part.startsWith('0') ? false : true);

    return (parts.length === 0) ? 'Recien creada' : `Hace ${parts.join(' ')}`;
}