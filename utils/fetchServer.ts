import { auth } from "@/auth";

export async function fetchServer(url: string, options: RequestInit) {
  const session = await auth();

  const isFormData = options.body instanceof FormData;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options.headers, // Allow overriding
      },
    });

    if (response.status === 500) {
      throw new Error("Unexpected server response");
    }

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    return response;
  } catch (error) {
    console.error("Network or other error", error);
    throw error;
  }
}
