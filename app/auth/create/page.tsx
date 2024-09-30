import { GloboSvg } from "@/components/icons/globoSvg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreateUserForm } from "@/components/ui/forms/create-user-form";
import { InputGeneric } from "@/components/ui/input-generic";
import { CreateUser } from "@/lib/actions";
import { toast } from "sonner";

export default function CreateAccount() {
  async function create_user(form_data: FormData) {
    const response = await CreateUser(form_data);
    if (response.status !== 200) {
      toast.error("Algo deu errado!");
      return;
    }
    toast.success(`Usuário criado com sucesso`);
  }

  return (
    <div className="flex h-screen items-center justify-center p-4 md:p-0">
      <Card className="flex w-full max-w-[30rem] flex-col items-center px-12 py-4 md:w-2/3">
        <div className="w-24">
          <GloboSvg />
        </div>
        <CreateUserForm />
      </Card>
    </div>
  );
}
