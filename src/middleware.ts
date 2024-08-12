import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log(request.cookies);
  // const allCookies = request.cookies.getAll();
  // console.log("All cookies:", allCookies);

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
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/profile", "/api/:path*"],
};
