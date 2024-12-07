import Image from "next/image";
import { SignOutButton } from "./sign-out-button";
import ThemeSwitch from "./ui/theme-switch";
import { Session } from "next-auth";
import Link from "next/link";

export const Header = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex h-16 items-center justify-between bg-primary px-4">
      <div className="flex items-center gap-4 text-white">
        <ThemeSwitch />
        <Link
          className="hover:text-slate-300 hover:underline"
          href={"/upload-csv"}
        >
          Upload dados de sensores
        </Link>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 transform">
        <Link href={"/"}>
          <Image src={"/radix.jpg"} width={60} height={60} alt="radix logo" />
        </Link>
      </div>

      {session ? (
        <div className="flex flex-col items-end font-bold text-white">
          <p>Olá {session.user?.name}</p>
          <SignOutButton />
        </div>
      ) : null}
    </div>
  );
};
