import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const adminLogged = cookieStore.get("admin_logged");

  if (adminLogged?.value === "true") {
    return NextResponse.json({ logged: true });
  }

  return NextResponse.json({ logged: false }, { status: 401 });
}
