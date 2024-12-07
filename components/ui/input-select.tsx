"use client";

import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InputOption {
  value: string;
  label: string;
}

interface SelectGenericProps {
  name: string;
  className?: string;
  options: InputOption[];
  defaultValue?: string;
  // handleChange?: (value: string) => void;
}

export const SelectInput: React.FC<SelectGenericProps> = ({
  name,
  className,
  options,
  defaultValue,
  // handleChange,
}: SelectGenericProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("timePeriod", value);
      params.set("_refresh", Date.now().toString());
    } else {
      params.delete("timePeriod");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-fit">
      <select
        name={name}
        defaultValue={defaultValue}
        className={cn(
          "w-full appearance-none rounded-sm border-[1px] border-zinc-400/50 bg-basis py-2 pl-2 pr-8 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary",
          className,
        )}
        onChange={(e) => handleChange?.(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-neutral">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
