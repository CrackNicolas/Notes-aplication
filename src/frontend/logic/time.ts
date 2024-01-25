export function Time_elapsed(fecha_emit: string) {
    let date_issue = new Date(fecha_emit.split("T")[0]).getTime();
    let date_current = new Date().getTime();
    let days = Math.round((date_current - date_issue) / (1000 * 60 * 60 * 24));

    if (days < 1) {
        let hour = (date_current - date_issue) / (1000 * 60 * 60 * 24) * 24;
        if (hour < 1) {
            let minute = hour * 60;
            if (minute < 1) {
                let seconds = Math.round(minute * 3600);
                return "hace " + (seconds) + " " + (seconds == 1) ? " segundo" : " segundos";
            }
            return "hace " + (Math.round(minute)) + " " + ((Math.round(minute) == 1) ? " minuto" : " minutos");
        }
        return "hace " + Math.round(hour) + " " + ((Math.round(hour) == 1) ? " hora" : " horas");
    }
    if (days <= 30) {
        return (days == 30) ? "hace 1 mes" : "hace " + days + " " + ((days === 1) ? "dia" : "dias");
    }
    if (days > 30 && days < 365) {
        let month = Math.round(days / 30);
        let difference = days - (month * 30);
        return "hace " + month + ((month == 1) ? " mes" : " meses") + ((difference>0)? " y "+ difference + ((difference==1)? " dia":" dias") : "");
    }
    if (days >= 365 && days < 730) {
        let month = Math.round(days / 30) - 12;
        return "hace 1 año "+(month)+" meses";
    }
    if (days >= 730) {
        let year =  Math.round(days / 365);
        let month = Math.round((days-year*365) / 30);
        return "hace " + year + " años "+ ((month>0)? (month==1)? "y 1 mes": "y "+month+" meses":"");
    }
    return "";
}