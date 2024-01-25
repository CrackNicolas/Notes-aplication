export function Time_elapsed(fecha_emit: string) {
    const date_provided: any = new Date(fecha_emit);
    const current_date: any = new Date();

    const milliseconds_in_an_second = 1000;
    const seconds_in_an_minute = 60;
    const minutes_in_an_hour = 60;
    const hours_in_an_day = 24;
    const days_in_an_month_average = 30.44; // Valor promedio para manejar variaciones en la duración de los meses
    const months_in_an_year = 12;

    const diference_in_milliseconds = current_date - date_provided;

    const total_seconds = Math.floor(diference_in_milliseconds / milliseconds_in_an_second);
    const total_minutes = Math.floor(total_seconds / seconds_in_an_minute);
    const total_hour = Math.floor(total_minutes / minutes_in_an_hour);
    const total_days = Math.floor(total_hour / hours_in_an_day);
    const total_month = Math.floor(total_days / days_in_an_month_average);
    const years = Math.floor(total_month / months_in_an_year);

    const seconds = total_seconds % seconds_in_an_minute;
    const minutes = total_minutes % minutes_in_an_hour;
    const hours = total_hour % hours_in_an_day;
    const days = total_days % days_in_an_month_average;
    const month = total_month % months_in_an_year;

    return `Hace 
        ${(years > 0) ? (years > 1) ? (years) + ' años' : +(years) + ' año' : ''}
        ${(month > 0) ? (month > 1) ? (month) + ' meses' : +(month) + ' mes' : ''}
        ${(days > 0) ? (days > 1) ? Math.floor(days) + ' dias' : +Math.floor(days) + ' dia' : ''}
        ${(hours > 0) ? hours + ' hs' : ''}
        ${(minutes > 0) ? minutes + ' min' : ''}
        ${(seconds > 0) ? seconds + ' seg' : ''}
    `;
}