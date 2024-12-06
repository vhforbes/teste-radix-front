import { Card } from "@/components/ui/card";
import { CreateUserForm } from "@/components/ui/forms/create-user-form";

export default function CreateAccount() {
  return (
    <div className="flex h-screen items-center justify-center p-4 md:p-0">
      <Card className="flex w-full max-w-[30rem] flex-col items-center px-12 py-4 md:w-2/3">
        <CreateUserForm />
      </Card>
    </div>
  );
}
