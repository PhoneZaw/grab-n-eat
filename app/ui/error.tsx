"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 text-center bg-background">
      <AlertCircle
        className="w-16 h-16 text-destructive mb-4"
        aria-hidden="true"
      />
      <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong</h1>
      <p className="text-xl text-muted-foreground mb-6">
        We apologize for the inconvenience. Please try again.
      </p>
      <Button
        onClick={() => router.push("/")}
        size="lg"
        className="font-semibold"
      >
        Go to Home Page
      </Button>
      {error.digest && (
        <p className="mt-4 text-sm text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
