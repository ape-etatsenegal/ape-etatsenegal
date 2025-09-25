import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  // Vérifier le cookie pour autorisation
  const token = req.cookies.get("admin_logged")?.value;
  if (token !== "true")
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  // Récupérer l'ancien et le nouveau mot de passe depuis le body
  const { oldPassword, newPassword } = await req.json();

  if (!oldPassword || !newPassword)
    return NextResponse.json({ error: "Veuillez remplir tous les champs" }, { status: 400 });

  // Récupérer le premier admin (on suppose qu'il n'y en a qu'un)
  const result = await pool.query("SELECT * FROM admin LIMIT 1");
  const admin = result.rows[0];

  if (!admin)
    return NextResponse.json({ error: "Admin non trouvé" }, { status: 404 });

  // Vérifier l'ancien mot de passe
  const isValid = await bcrypt.compare(oldPassword, admin.password_hash);
  if (!isValid)
    return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 401 });

  // Hasher le nouveau mot de passe et mettre à jour
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await pool.query("UPDATE admin SET password_hash = $1 WHERE id = $2", [
    hashedPassword,
    admin.id,
  ]);

  return NextResponse.json({ message: "Mot de passe changé avec succès" });
}
