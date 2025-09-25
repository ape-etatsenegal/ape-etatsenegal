// app/api/inscription/route.ts
export const dynamic = 'force-dynamic'; // <-- Obligatoire pour req.json()

import { NextRequest } from 'next/server';
import pool from '@/lib/db'; // Assure-toi que ta connexion DB est correctement exportée

interface InscriptionData {
  prenom: string;
  nom: string;
  email: string;
  message?: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
  user?: any;
}
export async function POST(req: NextRequest) {
  try {
    const data: InscriptionData & { captchaToken: string } = await req.json(); // ajoute captchaToken
    const { prenom, nom, email, message, captchaToken } = data;

    // Vérifier captcha
    const captchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: "POST" }
    );

    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return new Response(
        JSON.stringify({ error: "Captcha invalide, veuillez réessayer" }),
        { status: 400 }
      );
    }

    // Vérification des champs obligatoires
    if (!prenom || !nom || !email) {
      return new Response(JSON.stringify({ error: "Tous les champs sont requis" }), { status: 400 });
    }

    try {
      const result = await pool.query(
        "INSERT INTO utilisateurs (prenom, nom, email, message) VALUES ($1, $2, $3, $4) RETURNING *",
        [prenom, nom, email, message || null]
      );

      return new Response(
        JSON.stringify({ message: "Inscription réussie", user: result.rows[0] }),
        { status: 201 }
      );
    } catch (dbErr: any) {
      if (dbErr.code === "23505") {
        return new Response(JSON.stringify({ error: "email_exists" }), { status: 409 });
      }
      throw dbErr;
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
