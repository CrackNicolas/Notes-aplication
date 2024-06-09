export function Query(user_id: string, segment: string) {
    if (!segment) return { user_id: user_id };

    const criteria = JSON.parse(segment);

    const date: { $gte: string, $lte?: string } = {
        $gte: criteria?.dates?.startDate
    };

    if (criteria?.dates?.endDate !== criteria?.dates?.startDate) {
        date['$lte'] = criteria?.dates?.endDate
    }

    return {
        user_id: user_id,
        $or: [
            { title: { $regex: `(?i)^${criteria?.title}` } },
            { 'category.title': criteria?.category?.title },
            { priority: criteria?.priority },
            { createdAt: date },
            { featured: criteria?.featured }
        ]
    }
}