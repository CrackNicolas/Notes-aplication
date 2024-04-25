export function Url(criteria: string): string {
    let last_criterion = criteria.split('/').slice(-1).join('/');

    if (last_criterion === 'undefined') {
        const new_criteria = criteria.split('/').slice(0, -1).join('/');
        return Url(new_criteria);
    } else {
        return criteria;
    }
}