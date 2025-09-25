// components/Modal.tsx
import React, { useEffect, useState } from "react";

interface ModalProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // animation d'entrée
  }, []);

  const handleClose = () => {
    setVisible(false); // déclenche animation de sortie
    setTimeout(onClose, 300); // attendre la fin de l'animation
  };

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-500 text-green-700"
      : type === "error"
      ? "bg-red-100 border-red-500 text-red-700"
      : "bg-yellow-100 border-yellow-500 text-yellow-700";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div
        className={`border-l-4 p-4 rounded shadow-lg max-w-sm w-full transform transition-all duration-300
        ${bgColor} ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        <div className="flex justify-between items-center">
          <p>{message}</p>
          <button onClick={handleClose} className="font-bold text-xl ml-4">
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;