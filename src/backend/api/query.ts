export function Query(user_id: string, segment: string) {
    if (!segment) return { user_id: user_id };

    const criteria = JSON.parse(segment);

    //TENER EN CUENTA QUE LA FECHA NO FUNCIONA BIEN PROBAR LA BUSQUEDA DE HOY

    return {
        user_id: user_id,
        $or: [
            { title: { $regex: `(?i)^${criteria?.title}` } },
            { 'category.title': criteria?.category?.title },
            { priority: criteria?.priority },
            { createdAt: { $gte: criteria?.dates?.startDate, $lte: criteria?.dates?.endDate } },
            { featured: criteria?.featured }
        ]
    }
}