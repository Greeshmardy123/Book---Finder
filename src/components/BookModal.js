// src/components/BookModal.jsx
import { Dialog } from "@headlessui/react";

export default function BookModal({ isOpen, onClose, book }) {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal Box */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-2xl font-bold mb-4">
            {book.title}
          </Dialog.Title>

          <p className="text-gray-600 mb-2">
            <strong>Author(s):</strong> {book.author_name?.join(", ") || "N/A"}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>First Published:</strong> {book.first_publish_year || "N/A"}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Subjects:</strong>{" "}
            {book.subject?.slice(0, 5).join(", ") || "N/A"}
          </p>

          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
