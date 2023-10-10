import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    ignoredRoutes: ['/api/wh(.*)'],
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/api(.*)'],
};
