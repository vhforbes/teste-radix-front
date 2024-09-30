"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-fixed"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
