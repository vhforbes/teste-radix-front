import { signOutAction } from "@/lib/auth.actions";
import { cn } from "@/utils/cn";
import { RiLogoutBoxLine } from "react-icons/ri";

export const SignOutButton = ({ className }: { className?: string }) => (
  <form action={signOutAction}>
    <button type="submit" className={cn(className)}>
      <RiLogoutBoxLine className="size-4 min-h-6 hover:text-white/50 md:size-5" />
    </button>
  </form>
);
