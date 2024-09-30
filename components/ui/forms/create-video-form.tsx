"use client";

import Link from "next/link";
import { InputGeneric } from "../input-generic";
import { Button } from "../button";
import { CreateVideo } from "@/lib/actions";
import { toast } from "sonner";
import { useState } from "react";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export const CreateVideoForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const create_video = async (form_data: FormData) => {
    const response = await CreateVideo(form_data);

    if (response?.status !== 200) {
      toast.error("Algo deu errado!");

      console.log(response);

      setErrorMessage(response?.message);

      return;
    }

    if (response.status === 200) {
      toast.success("Usuário criado com sucesso");

      redirect("/auth/login");
    }
  };

  return (
    <form
      noValidate
      className="flex w-full flex-col justify-center"
      action={create_video}
    >
      <div>
        <label htmlFor="name" className="input-label">
          Title:
        </label>
        <InputGeneric
          name="title"
          type="text"
          placeholder="Título do Vídeo"
          className="mb-6"
        />
      </div>

      <div>
        <label htmlFor="url" className="input-label">
          Url do vídeo:
        </label>
        <InputGeneric
          name="url"
          type="text"
          placeholder="https://www.youtube.com/watch?v=w5ebcowAJD8"
          required
          className="mb-6"
        />
      </div>

      <div className="w-full text-center">
        <Button type="submit">Criar video</Button>
      </div>

      <div
        className="flex flex-col items-center justify-center space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            {errorMessage.split(",").map((error: string) => (
              <p className="mt-4 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </>
        )}
      </div>

      <Link href="/dashboard" className="mx-auto mt-4 flex items-center gap-4">
        <FaArrowLeft className="my-2 hover:animate-pulse" />
        <span>Voltar</span>
      </Link>
    </form>
  );
};
