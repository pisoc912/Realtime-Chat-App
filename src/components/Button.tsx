import { CircularProgress } from "@mui/material";
import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "default" | "ghost";
  size?: "default" | "sm" | "lg";
}
const Button: FC<ButtonProps> = ({
  className,
  children,
  variant = "default",
  isLoading,
  size = "default",
  ...props
}) => {
  const buttonClasses = `active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
    ${
      variant === "default"
        ? "bg-slate-900 text-white hover:bg-slate-800"
        : "bg-transparent hover:text-slate-900 hover:bg-slate-200"
    }
    ${
      size === "default"
        ? "h-10 py-2 px-4"
        : size === "sm"
        ? "h-9 px-2"
        : "h-11 px-8"
    }
    ${className || ""}`;

  return (
    <button className={buttonClasses} disabled={isLoading} {...props}>
      {isLoading ? <CircularProgress /> : null}
      {children}
    </button>
  );
};

export default Button;
