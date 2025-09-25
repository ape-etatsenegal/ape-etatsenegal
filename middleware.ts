import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Protege toutes les pages /admin sauf /admin/login
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const isLogged = req.cookies.get("admin_logged")?.value === "true";

    if (!isLogged) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store"); // évite le retour arrière avec cache
  return res;
}

export const config = { matcher: ["/admin/:path*"] };
