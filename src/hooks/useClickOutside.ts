import { useEffect, RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClose: () => void,
  isOpen: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, ref]);
};
