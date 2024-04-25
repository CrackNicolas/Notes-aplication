export function Query(segments: string[]) {
    const title = segments[0];
    const category = segments[1];
    const featured = segments[2];

    return {
        $or: [
            { title: { $regex: `(?i)^${title}` } },
            { category: category },
            { featured: featured }
        ]
    }
}