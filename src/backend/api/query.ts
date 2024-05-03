export function Query(segments: string) {
    const criteria = JSON.parse(segments);

    return {
        $or: [  
            { title: { $regex: `(?i)^${criteria?.title}` } },
            { category: criteria?.category },
            { priority: criteria?.priority },
            { createdAt: { $gte: criteria?.dates?.startDate, $lte: criteria?.dates?.endDate } },
            { featured: criteria?.featured }
        ]
    }
}