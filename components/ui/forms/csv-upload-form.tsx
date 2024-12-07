"use client";

import Link from "next/link";
import { Button } from "../button";
import { UploadCSV } from "@/lib/actions"; // Define this action
import { toast } from "sonner";
import { useState } from "react";

export const UploadCSVForm = () => {
  const upload_csv = async (form_data: FormData) => {
    const response = await UploadCSV(form_data);

    console.log(response);

    if (response?.status !== 201) {
      toast.error(response.message ?? "Algo deu errado!");

      return;
    }

    toast.success("Arquivo CSV enviado com sucesso");
  };

  return (
    <form noValidate className="w-full" action={upload_csv}>
      <label htmlFor="csv-file" className="input-label">
        Upload CSV File:
      </label>
      <input
        id="csv-file"
        name="file"
        type="file"
        accept=".csv"
        required
        className="mb-6 block w-full rounded border px-4 py-2"
      />

      <div className="w-full text-center">
        <Button type="submit">Upload</Button>
      </div>
    </form>
  );
};
