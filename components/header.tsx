import Link from "next/link";
import { GloboSvg } from "./icons/globoSvg";
import ThemeSwitch from "./ui/theme-switch";
import { Session } from "next-auth";

export const Header = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex items-center justify-between bg-primary p-2">
      <div className="hidden text-white md:block md:w-28">
        <ThemeSwitch />
      </div>
      <div className="w-10 md:mx-auto">
        <GloboSvg className="fill-white" />
      </div>
      <div className="flex w-28 items-center gap-4 font-bold text-white">
        {session ? `Olá ${session.user?.name}` : null}
      </div>
    </div>
  );
};
