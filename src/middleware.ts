import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: ['/l(.*)'],
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
