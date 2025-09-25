import { cookies } from "next/headers";
import pool from "./db";
import jwt from "jsonwebtoken";

export async function getAdminSession(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/admin_session=([^;]+)/);
    const token = match?.[1];
    if (!token) return null;

    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    // Vérifie que l'admin existe dans la BDD
    const result = await pool.query("SELECT id, email FROM admin WHERE id = $1", [payload.id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch {
    return null;
  }
}
