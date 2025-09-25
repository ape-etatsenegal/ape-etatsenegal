"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";
import Modale from "@/components/ui/Modale";

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Nouveau state pour message complet
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  // Bloquer retour arrière
  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);
    const handlePopState = () =>
      window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Récupération utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/utilisateurs");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Erreur récupération utilisateurs :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/");
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (res.ok) {
        setShowPasswordSuccess(true);
        setOldPassword("");
        setNewPassword("");
        setShowModal(false);
      } else {
        const data = await res.json();
        setPasswordError(data.error || "Erreur inconnue");
      }
    } catch (err) {
      setPasswordError("Erreur réseau");
    }
  };

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) setSelectedUsers([]);
    else setSelectedUsers(users.map((u) => u.id));
    setSelectAll(!selectAll);
  };

  const handleSendEmail = async () => {
    if (selectedUsers.length === 0) return;
    try {
      const recipients = users
        .filter((u) => selectedUsers.includes(u.id))
        .map((u) => u.email);

      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipients,
          subject: emailSubject,
          text: emailMessage,
        }),
      });

      if (res.ok) {
        setShowEmailSuccess(true);
        setEmailSubject("");
        setEmailMessage("");
        setSelectedUsers([]);
        setSelectAll(false);
        setShowEmailModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

const handleGeneratePDF = (): void => {
  // PDF paysage
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const greenColor: [number, number, number] = [34, 197, 94];

  // --- Titre ---
  doc.setFontSize(16);
  doc.setTextColor(...greenColor);
  doc.text("Liste des inscrits", 14, 20);

  // --- Tableau principal ---
  const tableColumn = ["N°", "Nom", "Prénom", "Email", "Message"];
  const tableRows: (string | number)[][] = users.map((u, index) => [
    index + 1,
    u.nom,
    u.prenom,
    u.email,
    u.message ? (u.message.length > 150 ? u.message.slice(0, 150) + "…" : u.message) : "—",
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    headStyles: {
      fillColor: greenColor,
      textColor: 255,
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
      overflow: 'linebreak',
      valign: 'middle',
    },
    columnStyles: {
      0: { cellWidth: 20 },    // N° élargi pour nombres jusqu'à 6 chiffres
      1: { cellWidth: 40 },    // Nom
      2: { cellWidth: 40 },    // Prénom
      3: { cellWidth: 60 },    // Email
      4: { cellWidth: 130 },   // Message élargi
    },
  });

  // --- Télécharger PDF ---    
  doc.save("liste_inscrits.pdf");   
};

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="min-h-screen p-4 md:p-8 w-full mx-auto bg-gray-50 font-sans">
      {/* Header personnalisé */}
      <div className="bg-green-600 rounded-xl shadow-lg mb-8 p-6 flex flex-col md:flex-row items-center gap-4 animate-fadeIn">
        <Image
          src="/images/Home.jpg"
          alt="Accueil"
          width={1200}
          height={600}
          className="w-full md:w-48 rounded-lg shadow-md object-cover"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 animate-slideIn">
            Dashboard Admin / Gestion Utilisateurs
          </h1>
          <p className="text-white/90 text-sm md:text-base animate-slideIn delay-100">
            Gérer vos utilisateurs et envoyer des{" "}
            <span className="font-semibold text-green-50 animate-pulse">
              emails personnalisés
            </span>{" "}
            après sélection
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-2 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md
             hover:bg-green-400 hover:shadow-lg transition-colors duration-300"
          >
            Paramètres
          </Button>

          <Button
            onClick={() => setShowEmailModal(true)}
            className="bg-yellow-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md
             hover:bg-yellow-300 hover:shadow-lg transition-colors duration-300"
          >
            Envoyer Email
          </Button>
          <Button
            onClick={handleGeneratePDF}
            className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md
                      hover:bg-green-400 hover:shadow-lg transition-colors duration-300"
          >
            Exporter PDF
          </Button>

          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md
             hover:bg-red-400 hover:shadow-lg transition-colors duration-300"
          >
            Déconnexion
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center py-6 mb-8 bg-green-50 rounded-xl shadow-md animate-fadeIn">
        <h1 className="text-green-700 text-2xl md:text-4xl font-extrabold tracking-wide text-center drop-shadow-md">
          Liste complète des inscrits
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Chargement des utilisateurs...
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-lg border border-green-200">
            <Table className="min-w-full bg-white">
              <TableHeader className="bg-green-100">
                <TableRow>
                  <TableHead className="w-16 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-green-700">
                        All
                      </span>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </TableHead>
                  <TableHead className="text-green-800 font-semibold">
                    Nom
                  </TableHead>
                  <TableHead className="text-green-800 font-semibold">
                    Prénom
                  </TableHead>
                  <TableHead className="text-green-800 font-semibold">
                    Email
                  </TableHead>
                  <TableHead className="text-green-800 font-semibold">
                    Message
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-green-50 transition-all duration-300"
                  >
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell className="text-green-700 font-medium">
                      {user.nom}
                    </TableCell>
                    <TableCell className="text-green-700 font-medium">
                      {user.prenom}
                    </TableCell>
                    <TableCell className="text-green-700 font-medium">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-green-700 font-medium">
                      {user.message ? (
                        user.message.length > 30 ? (
                          <span>
                            {user.message.slice(0, 30)}…
                            <button
                              className="text-blue-600 ml-1 underline hover:text-blue-800"
                              onClick={() => setSelectedMessage(user.message)}
                            >
                              Read more
                            </button>
                          </span>
                        ) : (
                          user.message
                        )
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center mt-4 gap-2">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Précédent
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button className="bg-green-600"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Suivant
            </Button>
          </div>
        </>
      )}

      {/* Modal message complet */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-600 font-bold">
              Message complet
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-green-600">{selectedMessage}</div>
          <DialogFooter className="flex justify-end">
            <Button onClick={() => setSelectedMessage(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal mot de passe */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-600 font-bold">
              Changer le mot de passe
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {passwordError && (
              <p className="text-red-500 font-medium">{passwordError}</p>
            )}
            <div className="relative">
              <Input
                type={showOldPassword ? "text" : "password"}
                placeholder="Ancien mot de passe"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleChangePassword}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal email */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-600 font-bold">
              Envoyer Email
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <Input
              placeholder="Sujet"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="w-full border p-2 rounded resize-none"
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEmailModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleSendEmail}>Envoyer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modales succès */}
      <Modale
        show={showEmailSuccess}
        onClose={() => setShowEmailSuccess(false)}
        title="Succès"
        message="✅ Email envoyé avec succès !"
      />
      <Modale
        show={showPasswordSuccess}
        onClose={() => setShowPasswordSuccess(false)}
        title="Mot de passe modifié"
        message="✅ Votre mot de passe a été changé avec succès !"
      />
    </div>
  );
}
