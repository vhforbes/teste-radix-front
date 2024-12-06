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

const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z
    .string()
    .url("Formato de URL inválido")
    .refine((url) => youtubeUrlRegex.test(url), {
      message: "Somente vídeos do YouTube são permitidos",
    }),
});

export async function CreateVideo(formData: FormData) {
  try {
    const session = await auth();

    const formObject = {
      title: formData.get("title"),
      url: formData.get("url"),
    };

    videoSchema.parse(formObject);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/video`;

    const body = JSON.stringify({
      user_id: session?.user?.id,
      title: formObject.title,
      url: formObject.url,
    });

    const response = await fetchServer(url, {
      method: "POST",
      body,
    });

    const data = await response?.json();
    if (response.status !== 200) {
      return {
        message: data.detail,
        status: response?.status,
      };
    }

    revalidatePath("dashboard");

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
  }
}

export async function EditVideo(formData: FormData, videoId: number) {
  try {
    const session = await auth();

    const formObject = {
      title: formData.get("title"),
      url: formData.get("url"),
    };

    videoSchema.parse(formObject);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/video/${videoId}`;

    const body = JSON.stringify({
      user_id: session?.user?.id,
      title: formObject.title,
      url: formObject.url,
    });

    const response = await fetchServer(url, {
      method: "PATCH",
      body,
    });

    const data = await response?.json();
    if (response.status !== 200) {
      return {
        message: data.detail,
        status: response?.status,
      };
    }

    revalidatePath("dashboard");

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
  }
}

export async function DeleteVideo(formData: FormData) {
  const id = Number(formData.get("id"));

  const url = `${process.env.NEXT_PUBLIC_API_URL}/video/${id}`;

  try {
    const response = await fetchServer(url, {
      method: "DELETE",
    });

    const data = await response?.json();

    console.log(response);

    if (response.status !== 200) {
      return {
        message: data.detail,
        status: response?.status,
      };
    }

    revalidatePath("dashboard");

    return {
      message: data.message,
      status: response?.status,
    };
  } catch (error) {
    console.error("Failed to delete video", error);
    throw error;
  }
}
