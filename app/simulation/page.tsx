"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function SimulationPage() {
  const [rows, setRows] = useState<any[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExcel = async () => {
      try {
        const res = await fetch("/documents/liste_participants.xlsx");
        const arrayBuffer = await res.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        setRows(jsonData);
      } catch (error) {
        console.error("Erreur de lecture du fichier Excel :", error);
      } finally {
        setLoading(false);
      }
    };

    loadExcel();
  }, []);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    setRows((prevRows) => {
      const updated = [...prevRows];
      updated[rowIndex][colIndex] = value;
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Simulation - Liste des Participants
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Chargement du fichier Excel...</p>
        ) : rows.length === 0 ? (
          <p className="text-center text-red-600">Aucune donnée trouvée.</p>
        ) : (
          <div className="overflow-auto shadow-lg rounded-xl border border-gray-200 max-h-[70vh]">
            <table className="min-w-max border-collapse w-full text-sm">
              <thead className="bg-green-600 text-white sticky top-0">
                <tr>
                  {rows[0].map((header: any, i: number) => (
                    <th
                      key={i}
                      className="px-4 py-3 border-b border-gray-300 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row: any[], i: number) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-4 py-2 border-b border-gray-300"
                      >
                        <input
                          type="text"
                          value={cell !== undefined ? cell.toString() : ""}
                          onChange={(e) =>
                            handleCellChange(i + 1, j, e.target.value)
                          }
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-center text-sm mt-4 text-gray-600">
          ✏️ Modifiez les valeurs directement ici. Les changements restent en mémoire.
        </p>
      </div>

      <Footer />
    </div>
  );
}
