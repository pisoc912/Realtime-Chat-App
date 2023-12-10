import { FC } from "react";

interface ButtonProps {}

export const buttonVariants = {
  base: "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    variant: {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      ghost: "bg-transparent hover:text-slate-900 hover:bg-slate-200",
    },
    size: {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-2",
      lg: "h-11 px-8",
    },
  },
};

const Button: FC<ButtonProps> = () => {
  return (
    <div
      className={
        buttonVariants.base +
        " " +
        buttonVariants.variants.variant.ghost +
        " " +
        buttonVariants.variants.size.lg
      }
    >
      Button
    </div>
  );
};

export default Button;
