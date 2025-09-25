import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text } = await req.json();

    if (!subject || !text) {
      return NextResponse.json({ error: "Sujet et message requis" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });  

    let recipients: string[] = [];

    if (to === "all") {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/utilisateurs`);
      const users = await res.json();
      recipients = users.map((u: any) => u.email);
    } else if (Array.isArray(to)) {
      recipients = to;
    } else if (typeof to === "string" && to) {
      recipients = [to];
    } else {
      return NextResponse.json({ error: "Destinataire invalide" }, { status: 400 });
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: "Aucun destinataire trouvé" }, { status: 400 });
    }

    const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/Home.jpg`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:10px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">

          <!-- Logo -->
          <div style="text-align:center; padding:20px;">
            <img src="${logoUrl}" alt="Logo" style="max-width:350px; width:100%; height:auto;">
          </div>

          <!-- Contenu principal -->
          <div style="padding:15px; text-align:center;">
            <h2 style="color:#333333; font-size:22px; margin-bottom:25px;">${subject}</h2>
            <p style="color:#555555; font-size:16px; line-height:1.5; margin-bottom:25px;">${text}</p>

            <!-- Bouton -->
            <div style="text-align:center; margin-bottom:30px;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="
                display:inline-block;
                background:#0070f3;
                color:#ffffff;
                padding:12px 25px;
                border-radius:5px;
                text-decoration:none;
                font-weight:bold;
                width:80%;
                max-width:250px;
              ">Voir le site</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f4f4f4; text-align:center; padding:10px; color:#999999; font-size:12px;">
            &copy; ${new Date().getFullYear()} apesenegal.com - Tous droits réservés
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients.join(", "),
      subject,
      html: htmlContent,
    });

    return NextResponse.json({ message: `Email envoyé à ${recipients.length} utilisateur(s)` });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Erreur lors de l'envoi" }, { status: 500 });
  }
}
