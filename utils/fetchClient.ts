"use client";

export async function fetchClient(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Network or other error", error);
    throw error;
  }
}
