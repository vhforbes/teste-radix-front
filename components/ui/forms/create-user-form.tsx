"use client";

import Link from "next/link";
import { InputGeneric } from "../input-generic";
import { Button } from "../button";
import { CreateUser } from "@/lib/actions";
import { toast } from "sonner";
import { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

export const CreateUserForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const create_user = async (form_data: FormData) => {
    const response = await CreateUser(form_data);

    if (response?.status !== 201) {
      toast.error("Algo deu errado!");
      setErrorMessage(response?.message);
      return;
    }

    if (response.status === 201) {
      toast.success("Usuário criado com sucesso");

      redirect("/auth/login");
    }
  };

  return (
    <form noValidate className="w-full" action={create_user}>
      <Image
        alt="radix logo"
        className="mx-auto"
        src={"/radix.jpg"}
        width={120}
        height={120}
      />

      <div>
        <label htmlFor="email" className="input-label">
          Nome:
        </label>
        <InputGeneric
          name="name"
          type="text"
          placeholder="Seu Nome"
          required
          className="mb-6"
        />
      </div>

      <div>
        <label htmlFor="email" className="input-label">
          Email:
        </label>
        <InputGeneric
          name="email"
          type="email"
          placeholder="email@email.com"
          required
          className="mb-6"
        />
      </div>

      <label htmlFor="password" className="input-label">
        Senha:
      </label>
      <InputGeneric
        name="password"
        type="password"
        placeholder="*******"
        required
        className="mb-8"
      />

      <label htmlFor="password" className="input-label">
        Confirmar Senha:
      </label>
      <InputGeneric
        name="confirm-password"
        type="password"
        placeholder="*******"
        required
        className="mb-8"
      />

      <div className="w-full text-center">
        <Button type="submit">Criar</Button>
      </div>

      <div
        className="flex flex-col items-center justify-center space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            {errorMessage.split(",").map((error: string) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </>
        )}
      </div>

      <div className="mb-4 mt-6 w-full text-center">
        <Link
          href="/auth/login"
          className="mx-auto text-center font-medium hover:animate-pulse hover:underline"
        >
          Já possui uma conta? Faça login aqui
        </Link>
      </div>
    </form>
  );
};
