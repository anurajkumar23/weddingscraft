import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const AuthToken = request.cookies.get("jwt")?.value;

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/signup";

  const NotLoggedINUserNotAccessPaths = request.nextUrl.pathname === '/user/profile/:path*';

  if (loggedInUserNotAccessPaths && AuthToken) {
    try {
      // Verify JWT and extract user data

      // Redirect logged-in users trying to access login/signup to profile
      return NextResponse.redirect(new URL("/user/profile", request.url));
    } catch (err) {
      // If JWT verification fails, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } else  {
    // If there's no token, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ['/user/profile/:path*', "/user/profile/dashboard", "/api/:path*"],
};