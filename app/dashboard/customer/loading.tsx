import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <h2 className="text-2xl font-semibold text-foreground">Loading...</h2>
      </div>
      <div className="mt-8 space-y-4 w-full max-w-md">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        <div className="h-4 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
