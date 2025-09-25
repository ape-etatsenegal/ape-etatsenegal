import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, nom, prenom, email, message, date_inscription FROM utilisateurs ORDER BY date_inscription DESC"
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Impossible de récupérer les utilisateurs" },
      { status: 500 }
    );
  }
}
