"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Code2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted]     = useState(false);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res  = await fetch(`/api/student?id=${encodeURIComponent(studentId.trim())}`);
      const data = await res.json();

      if (data.found) {
        router.push(
          `/lab2?id=${encodeURIComponent(studentId.trim())}&name=${encodeURIComponent(data.name)}&status=${data.status ?? "pending"}`
        );
      } else {
        setError("Academic ID not found. Please check your ID and try again.");
      }
    } catch {
      setError("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  }

  // Pre-hydration placeholder to prevent browser extension (Dark Reader, etc.) attribute mismatches
  if (!mounted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50" suppressHydrationWarning>
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">OOP Lab Judge</h1>
          <p className="text-gray-500 mt-2 text-sm">Encapsulation and String Assessment</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-md p-8 min-h-[350px] animate-pulse" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50" suppressHydrationWarning>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">OOP Lab Judge</h1>
        <p className="text-gray-500 mt-2 text-sm">Encapsulation and String Assessment</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-md p-8">
        <div className="mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Encapsulation and String</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            6 Exercises: Book, Temperature, Rectangle, Password, Caesar & Reverse Words
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Academic ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder="e.g. 83834070"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder:text-gray-400 transition"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !studentId.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                       text-white font-semibold py-2.5 rounded-lg transition
                       flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Looking up...
              </>
            ) : (
              "Start Encapsulation and String →"
            )}
          </button>
        </form>

        {/* Practice Mode Direct Link */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <Link
            href="/lab2"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center justify-center gap-1"
          >
            Preview / Practice without ID <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Overview card */}
      <div className="mt-6 w-full max-w-md">
        <Link
          href="/lab2"
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-blue-300 transition group flex gap-3 items-start"
        >
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Encapsulation & String Tasks</p>
            <p className="text-xs text-gray-500">6 OOP Class & String Manipulation Exercises</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
