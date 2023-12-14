export const validation = (name: string) => {
    switch (name) {
        case 'name':
            return {
                required: true
            }
    }
}