import { cn } from "@/utils/cn";

interface InputGenericProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  defaultValue?: string;
}

export const InputGeneric = ({
  className,
  defaultValue,
  ...props
}: InputGenericProps) => (
  <input
    defaultValue={defaultValue}
    {...props}
    className={cn(
      "w-full rounded-sm border-[1px] border-zinc-400/50 bg-basis p-2 focus:outline-none focus:ring-2 focus:ring-primary",
      className,
    )}
  />
);
