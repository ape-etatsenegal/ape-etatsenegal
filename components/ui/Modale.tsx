interface ModaleProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function Modale({ show, onClose, title, message }: ModaleProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-500 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-400"
        >
          OK
        </button>
      </div>
    </div>
  );
}
