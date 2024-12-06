import { SignOutButton } from "./sign-out-button";
import ThemeSwitch from "./ui/theme-switch";
import { Session } from "next-auth";

export const Header = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex items-center justify-between bg-primary p-2">
      <div className="hidden text-white md:block md:w-28">
        <ThemeSwitch />
      </div>
      <div className="md:mx-auto">
        <p>RADIX TEST</p>
      </div>

      {session ? (
        <div className="flex w-28 flex-col items-end font-bold text-white">
          Olá {session.user?.name}
          <SignOutButton />
        </div>
      ) : null}
    </div>
  );
};
