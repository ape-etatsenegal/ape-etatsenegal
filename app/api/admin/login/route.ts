import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const result = await pool.query("SELECT * FROM admin WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Email incorrect" }, { status: 401 });
    }

    const admin = result.rows[0];
    const isValid = await bcrypt.compare(password, admin.password_hash);

    if (!isValid) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    const res = NextResponse.json({ message: "Connexion réussie" });
    res.cookies.set({
      name: "admin_logged",
      value: "true",
      path: "/",
      httpOnly: true,
      maxAge: 3600, // 1h
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
