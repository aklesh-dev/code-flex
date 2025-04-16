import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// * Route matcher for protected routes
const isProtectedRoute = createRouteMatcher(["/generate-program", "/profile"]);

export default clerkMiddleware(async (auth, req) => {
  if(isProtectedRoute(req)) await auth.protect();  //* If protected route, check if user is authenticated
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};