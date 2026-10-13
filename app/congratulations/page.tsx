"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Trophy, Home, Sparkles } from "lucide-react";

function CongratulationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract first name (or fallback to student)
  const fullName = searchParams.get("name") || "";
  const labParam = searchParams.get("lab") || "1";
  const firstName = fullName ? fullName.split(" ")[0] : "Student";

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full mx-4 text-center border border-gray-100 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10" />

      {/* Icon */}
      <div className="relative mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Trophy className="w-12 h-12 text-green-600" />
        <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Congratulations!
      </h1>
      
      <p className="text-xl font-medium text-gray-700 mb-6">
        Well done, <span className="text-green-600 font-bold">{firstName}</span>!
      </p>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-gray-600 leading-relaxed text-sm">
        You have successfully solved all{" "}
        <strong>
          {labParam === "2" ? "Java OOP Lab 2 tasks" : "8 Java OOP Lab tasks"}
        </strong>
        .
        <br />
        <br />
        Your results have been automatically recorded in the system, and your attendance is marked as <strong>Completed</strong>.
      </div>

      <button
        onClick={() => router.push("/")}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
      >
        <Home className="w-5 h-5" /> Return to Home
      </button>
    </div>
  );
}

export default function CongratulationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<div className="animate-pulse w-96 h-96 bg-gray-200 rounded-3xl" />}>
        <CongratulationsContent />
      </Suspense>
    </div>
  );
}
