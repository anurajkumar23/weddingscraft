import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const AuthToken = request.cookies.get("jwt")?.value;

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/signup";

  if (loggedInUserNotAccessPaths && AuthToken) {
    try {
      // Verify JWT and extract user data
      const { payload } = await jwtVerify(
        AuthToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      // Redirect logged-in users trying to access login/signup to profile
      return NextResponse.redirect(new URL("/user/profile", request.url));
    } catch (err) {
      // If JWT verification fails, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } else if (!AuthToken) {
    // If there's no token, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else {
    try {
      // Verify JWT and extract user data
      const { payload } = await jwtVerify(
        AuthToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const userRole = payload.role; 


      // Role-based access control for the /user/dashboard route
      if (request.nextUrl.pathname === "/user/profile/dashboard") {
        if (userRole === "seller" || userRole === "admin") {
          return NextResponse.next(); // Allow access
        } else {
          return NextResponse.redirect(new URL("/user/profile", request.url));
        }
      }

      return NextResponse.next();
    } catch (err) {
      // If JWT verification fails, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/user/profile", "/user/profile/dashboard", "/api/:path*"],
};
