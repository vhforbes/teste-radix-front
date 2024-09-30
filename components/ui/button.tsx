"use client";

import { useFormStatus } from "react-dom";
import Loader from "./loader";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const Button = ({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className={cn(
        "w-fit self-center rounded-sm border-primary bg-primary px-8 py-4 text-center font-medium text-fixed transition-all hover:bg-neutral hover:text-basis",
        className,
      )}
    >
      {pending || isLoading ? <Loader /> : children}
    </button>
  );
};
