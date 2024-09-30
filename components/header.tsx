import Link from "next/link";
import { GloboSvg } from "./icons/globoSvg";
import ThemeSwitch from "./ui/theme-switch";
import { Session } from "next-auth";

export const Header = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex items-center justify-between bg-primary p-2">
      <div className="hidden text-white md:block md:w-44">
        {session ? `Logado como: ${session.user?.email}` : null}
      </div>
      <div className="w-10 md:mx-auto">
        <GloboSvg className="fill-white" />
      </div>
      <div className="flex w-44 items-center gap-4 font-bold">
        <Link className="text-white hover:text-white/50" href={"/videos"}>
          Videos
        </Link>
        <Link className="text-white hover:text-white/50" href={"/users"}>
          Usuários
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
};
