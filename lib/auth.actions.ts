"use server";

import { UnauthorizedError, signIn, signOut } from "@/auth";
import { fetchServer } from "@/utils/fetchServer";
import { AuthError } from "next-auth";
import { z, ZodError } from "zod";

type StateType = { success: boolean; message: string } | undefined;

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      redirectTo: "/dashboard/home",
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return "Credenciais inválidas";
      }

      if (error.cause && error.cause.err instanceof ZodError) {
        return error.cause.err.errors.map((err) => err.message).join(", ");
      }

      return "Algo deu errado...";
    }
    throw error;
  }
}

export type CreateAccountResult = { success: true } | string;

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

export async function create_account(
  prevState: string | undefined,
  formData: FormData,
): Promise<CreateAccountResult> {
  try {
    const formObject = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    };

    createAccountSchema.parse(formObject);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

    const body = JSON.stringify({
      name: formObject.name,
      email: formObject.email,
      password: formObject.password,
    });

    try {
      const response = await fetchServer(url, {
        method: "POST",
        body,
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        console.log("400 Error: ", errorData);
        return errorData?.detail || "Falha ao criar conta";
      }

      return { success: true };
    } catch (error) {
      console.error("Failed to create user", error);
      throw error;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join(", ");
    }

    throw error;
  }
}

export const signOutAction = async () => {
  await signOut({ redirectTo: "/auth/login" });
};
