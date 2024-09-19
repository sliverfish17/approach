import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "red" | "blue" | "green";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  color = "blue",
  onClick,
  disabled,
  className,
  type,
}: ButtonProps) => {
  const baseClasses = "p-2 rounded text-white font-semibold";

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500 hover:bg-red-600";
      case "blue":
        return "bg-blue-500 hover:bg-blue-600";
      case "green":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "";
    }
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const colorClasses = getColorClasses(color);

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
