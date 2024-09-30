import { object, string, z } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email obrigatório" }).email(
    "Email inválido",
  ),
  password: string({ required_error: "Senha obrigatória" }).min(
    1,
    "Senha obrigatória",
  ),
});

export const passwordRequirements = [
  {
    regex: /[0-9]/,
    message: "Sua senha deve conter pelo menos um número.",
  },
  {
    regex: /[^A-Za-z0-9]/,
    message: "Sua senha deve conter ao menos um caracter especial.",
  },
  {
    regex: /[A-Z]/,
    message: "Sua senha deve conter ao menos uma letra maiúscula",
  },
  {
    regex: /[a-z]/,
    message: "Sua senha deve conter ao menos uma senha Minúscula",
  },
];

export const otpSchema = z
  .string()
  .length(6, "O código OTP deve ter 6 dígitos");

export const passwordSchema = z
  .string()
  .min(8)
  .refine((password: string) => {
    const errors: string[] = [];

    passwordRequirements.forEach((requirement) => {
      if (!requirement.regex.test(password)) {
        errors.push(requirement.message);
      }
    });

    if (errors.length > 0) {
      throw new Error(errors.join(","));
    }

    return true;
  });
export const getOtpSchema = object({
  email: string({ required_error: "Email obrigatório" }).email(
    "Email inválido",
  ),
});
export const forgotPasswordSchema = object({
  password: passwordSchema,
  otp: otpSchema,
});
