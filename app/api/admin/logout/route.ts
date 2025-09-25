import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Déconnecté" });
  res.cookies.set({
    name: "admin_logged",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });
  return res;
}
