import { Suspense } from "react";
import Lab2Page from "./Lab2Page";
import { Loader2 } from "lucide-react";

export default function Lab2Route() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <Lab2Page />
    </Suspense>
  );
}
