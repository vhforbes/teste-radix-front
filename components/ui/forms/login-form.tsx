"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { InputGeneric } from "../input-generic";
import { authenticate } from "@/lib/auth.actions";
import { Button } from "../button";
import Image from "next/image";

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      noValidate
      className="flex w-full flex-col justify-between"
      action={dispatch}
    >
      <Image
        alt="radix logo"
        className="mx-auto"
        src={"/radix.jpg"}
        width={120}
        height={120}
      />

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

      <div className="w-full text-center">
        <Button type="submit">Entrar</Button>
      </div>

      <div
        className="flex flex-col items-center justify-center space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            {errorMessage.split(",").map((error) => (
              <p className="text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </>
        )}
      </div>

      <div className="mb-4 mt-6 w-full text-center">
        <Link
          href="/auth/create"
          className="mx-auto text-center font-medium hover:animate-pulse hover:underline"
        >
          Criar conta
        </Link>
      </div>
    </form>
  );
};
