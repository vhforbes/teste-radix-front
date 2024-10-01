"use client";

import Link from "next/link";
import { InputGeneric } from "../input-generic";
import { Button } from "../button";
import { EditVideo } from "@/lib/actions";
import { toast } from "sonner";
import { useState } from "react";
import { redirect } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Video } from "@/types/interfaces";

export const EditVideoForm = ({ videoToEdit }: { videoToEdit: Video }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const edit_video = async (form_data: FormData) => {
    const response = await EditVideo(form_data, videoToEdit.id);

    if (response?.status !== 200) {
      toast.error("Algo deu errado!");

      setErrorMessage(response?.message);

      return;
    }

    if (response.status === 200) {
      toast.success("Vídeo editado com sucesso");

      redirect("/dashboard");
    }
  };

  return (
    <form
      noValidate
      className="flex w-full flex-col justify-center"
      action={edit_video}
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
          defaultValue={videoToEdit.title}
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
          defaultValue={videoToEdit.url}
        />
      </div>

      <div className="w-full text-center">
        <Button type="submit">Editar video</Button>
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
