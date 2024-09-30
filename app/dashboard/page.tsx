import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputGeneric } from "@/components/ui/input-generic";
import { SelectInput } from "@/components/ui/input-select";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-24">
      <Card className="flex flex-col items-center justify-center gap-2">
        <div className="bg-primary text-neutral">
          Texto neutro com fundo primário
        </div>
        <button className="bg-secondary text-neutral">
          Texto neutro com fundo secundário
        </button>
        <div className="text-success">Mensagem de sucesso</div>
        <div className="text-warning">Aviso importante</div>
        <div className="text-error">Mensagem de erro</div>
        <InputGeneric
          name="name"
          type="text"
          className="w-full"
          placeholder="Nome do usuário"
          required
        />
        <SelectInput
          name="admin_rights"
          options={[
            { value: "false", label: "Usuário" },
            { value: "true", label: "Administrador" },
          ]}
        />
        <Button> Clique aqui</Button>
      </Card>
    </main>
  );
}
