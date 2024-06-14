import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: ['/', '/favicon.ico', '/without_internet']
});

export const config = {
    matcher: [
        '/((?!api/|_next|favicon.ico).*)',
        '/(trpc)(.*)',
    ]
}