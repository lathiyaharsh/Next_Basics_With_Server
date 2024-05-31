import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// Define the protected non-API routes
const protectedRoutes: Record<string, string[]> = {
  user: ["/dashboard", "/profile", "/logout"],
  manager: ["/dashboard", "/profile", "/manager"],
  admin: ["/dashboard", "/admin"]
};

const authRoutes = ["/login", "/register"];

const publicRoutes = ["/blog", "/about"];

export default async function middleware(req: NextRequest) {

  const token = req.cookies.get("session")?.value;
  const nextUrlPath = req.nextUrl.pathname;

  if (nextUrlPath.startsWith("/api")) {
    return NextResponse.next();
  }

  if (nextUrlPath.startsWith("/_next/") || nextUrlPath.startsWith("/.next/")) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(nextUrlPath)) {
    return NextResponse.next();
  }

  if (authRoutes.includes(nextUrlPath)) {
    
    if (token) {
      try {
        const secretKey = process.env.SECRETKEY;
        const secretBytes = new TextEncoder().encode(secretKey);
        const { payload } = await jose.jwtVerify(token, secretBytes) as { payload: { role: string, _id: string } };

        const role = payload.role;
        const userProtectedRoutes = protectedRoutes[role] || [];

        const dashboardURL = new URL(userProtectedRoutes[0] || "/dashboard", req.nextUrl.origin);
        return NextResponse.redirect(dashboardURL.toString());
      } catch (error) {
        console.error("Token verification failed:", error);
        const loginURL = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(loginURL.toString());
      }
    }

    return NextResponse.next();
  }

  const allProtectedRoutes = Object.values(protectedRoutes).flat();
  if (allProtectedRoutes.includes(nextUrlPath)) {
    if (!token) {
      const loginURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(loginURL.toString());
    }

    try {
      const secretKey = process.env.SECRETKEY;
      const secretBytes = new TextEncoder().encode(secretKey);
      const { payload } = await jose.jwtVerify(token, secretBytes) as { payload: { role: string, _id: string } };

      const role = payload.role;
      const userProtectedRoutes = protectedRoutes[role] || [];

      if (!userProtectedRoutes.includes(nextUrlPath)) {
        const dashboardURL = new URL(userProtectedRoutes[0] || "/dashboard", req.nextUrl.origin);
        return NextResponse.redirect(dashboardURL.toString());
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      const loginURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(loginURL.toString());
    }
  }

  return NextResponse.next();
}


//api secure routes
// import { NextRequest, NextResponse } from "next/server";
// import * as jose from "jose";

// const privateRoutes: Record<string, string[]> = {
//   user: ["/dashboard", "/profile"],
//   manager: ["/dashboard", "/profile", "/manager"],
//   admin: ["/dashboard", "/admin"]
// };

// const publicRoutes = ["/login", "/register"];

// export default async function middleware(req: NextRequest) {
//   const token = req.cookies.get("session")?.value;
//   const nextUrlPath = req.nextUrl.pathname;

//   // Bypass specific routes
//   if (nextUrlPath.startsWith("/_next/") || nextUrlPath.startsWith("/.next/")) {
//     return NextResponse.next();
//   }

//   // Redirect unauthenticated users trying to access private routes
//   if (!token && privateRoutes.user.concat(privateRoutes.manager).concat(privateRoutes.admin).includes(nextUrlPath)) {
//     const loginURL = new URL("/login", req.nextUrl.origin);
//     return NextResponse.redirect(loginURL.toString());
//   }

//   if (token) {
//     try {

//       const secretKey = process.env.SECRETKEY;
//       if (!secretKey) {
//         throw new Error("Secret key is not defined");
//       }

//       const secretBytes = new TextEncoder().encode(secretKey);
//       const { payload } = await jose.jwtVerify(token, secretBytes) as { payload: { role: string , _id:string} };

//       const id : any = payload._id;
     
//       const role = payload.role;
//       const userPrivateRoutes = privateRoutes[role] || [];

//       // Redirect authenticated users away from public routes
//       if (publicRoutes.includes(nextUrlPath)) {
//         const dashboardURL = new URL(userPrivateRoutes[0], req.nextUrl.origin);
//         return NextResponse.redirect(dashboardURL.toString());
//       }

//       // Ensure users only access their allowed routes
//       if (!userPrivateRoutes.includes(nextUrlPath)) {
//         const dashboardURL = new URL("/dashboard", req.nextUrl.origin);
//         return NextResponse.redirect(dashboardURL.toString());
//       }

//       return NextResponse.next();

//     } catch (error) {
//       console.error("Token verification failed:", error);
//       const loginURL = new URL("/login", req.nextUrl.origin);
//       return NextResponse.redirect(loginURL.toString());
//     }
//   }

//   // Default response
//   return NextResponse.next();
// }
