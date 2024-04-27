export function Query(segments: string[]) {
    const title = segments[0];
    const category = segments[1];
    const priority = segments[2];
    const featured = segments[3];

    return {
        $or: [
            { title: { $regex: `(?i)^${title}` } },
            { category: category },
            { priority: priority },
            { featured: featured }
        ]
    }
}