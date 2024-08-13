import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const AuthToken = request.cookies.get("jwt")?.value;

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/signup";

  if (loggedInUserNotAccessPaths) {
    if (AuthToken) {
      return NextResponse.redirect(new URL("/user/profile", request.url));
    }
  } else {
    if (!AuthToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/profile", "/user/profile/dashboard", "/api/:path*"],
};
