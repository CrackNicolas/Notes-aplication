export function Query(segments: string[]) {
    const user_id = segments[0];

    if(!segments[1]) return { user_id: user_id };

    const criteria = JSON.parse(segments[1]);

    console.log(criteria);
    //2024-05-05T04:42:31.959+00:00
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