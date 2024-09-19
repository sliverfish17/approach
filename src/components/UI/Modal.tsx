import { ReactNode, useEffect, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose, isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed p-4 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
      >
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 flex justify-center w-6 h-6 items-center bg-gray-300 hover:bg-gray-400 rounded-full"
        >
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
