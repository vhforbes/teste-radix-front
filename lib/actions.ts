"use server";

import { auth } from "@/auth";
import { fetchServer } from "@/utils/fetchServer";
import { revalidatePath } from "next/cache";
import { z, ZodError } from "zod";

const createAccountSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Confirmação de senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não combinam",
    path: ["confirmPassword"], // Path to target the field causing the error
  });

export async function CreateUser(formData: FormData) {
  console.log("Getting create user request");

  try {
    const formObject = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    };

    createAccountSchema.parse(formObject);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/user`;

    const body = JSON.stringify({
      name: formObject.name,
      email: formObject.email,
      password: formObject.password,
    });

    const response = await fetchServer(url, {
      method: "POST",
      body,
    });

    const data = await response?.json();

    if (response.status !== 200) {
      return {
        message: data.message,
        status: response?.status,
      };
    }

    return {
      message: data.message,
      status: response?.status,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("Zod validation errors:", error.errors);
      return {
        message: error.errors.map((err) => err.message).join(", "),
        status: 400,
      };
    }

    console.error(error);
    throw error;
  }
}

export const UploadCSV = async (form_data: FormData) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/csv-upload/upload`;

  const file: any = form_data.get("file");

  if (!file.size) {
    return {
      message: "Nenhum arquivo selecionado",
      status: 0,
    };
  }

  try {
    const response = await fetchServer(url, {
      method: "POST",
      body: form_data, // Correctly sends form-data
      headers: {}, // No Content-Type here
    });

    if (!response.ok) {
      return {
        status: response,
      };
    }

    revalidatePath("/upload-csv");

    return {
      status: response.status,
    };
  } catch (error: any) {
    console.error("Upload CSV Error:", error.message);
    return { status: 0 || 500, message: error.message };
  }
};
