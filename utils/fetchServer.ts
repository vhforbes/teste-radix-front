export async function fetchServer(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 500) {
      return null;
    }

    if (response.status === 401) {
      throw new Error("Unautorized");
    }

    return response;
  } catch (error) {
    console.error("Network or other error", error);
    throw error;
  }
}
