import { Suspense } from "react";
import LabPage from "./LabPage";
import { Loader2 } from "lucide-react";

export default function LabRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <LabPage />
    </Suspense>
  );
}
