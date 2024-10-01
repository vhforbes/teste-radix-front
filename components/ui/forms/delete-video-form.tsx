"use client";

import { DeleteVideo } from "@/lib/actions";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

export const DeleteVideoForm = ({ id }: { id: number }) => {
  const delete_form = async (formData: FormData) => {
    formData.append("id", id.toString());

    const response = await DeleteVideo(formData);

    if (response.status !== 200) {
      toast.error("Algo deu errado!");
      return;
    }

    toast.success("Video excluído com sucesso!");
  };

  return (
    <form action={delete_form}>
      <button type="submit">
        <MdDeleteForever width={24} height={24} />
      </button>
    </form>
  );
};
