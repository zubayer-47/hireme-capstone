import { 
  clerkMiddleware,
  createRouteMatcher
 } from "@clerk/nextjs/server";

 const isPublicRoute = createRouteMatcher([
  '/auth(.*)',
  '/about',
  '/contact',
  '/'
 ])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
}, { debug: true });

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};