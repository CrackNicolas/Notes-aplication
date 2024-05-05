export function Query(segments: string[]) {
    const user_id = segments[0];

    if(!segments[1]) return { user_id: user_id };

    const criteria = JSON.parse(segments[1]);

    //TENER EN CUENTA QUE LA FECHA NO FUNCIONA BIEN PROBAR LA BUSQUEDA DE HOY

    return {
        user_id: user_id,
        $or: [
            { title: { $regex: `(?i)^${criteria?.title}` } },
            { 'category.title': criteria?.category?.title },
            { priority: criteria?.priority },
            { createdAt: { $gte: new Date(criteria?.dates?.startDate), $lte: new Date(criteria?.dates?.endDate) } },
            { featured: criteria?.featured }
        ]
    }
}