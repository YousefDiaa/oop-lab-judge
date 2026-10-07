"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Code2, BookOpen, CheckCircle } from "lucide-react";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res  = await fetch(`/api/student?id=${encodeURIComponent(studentId.trim())}`);
      const data = await res.json();

      if (data.found) {
        router.push(
          `/lab?id=${encodeURIComponent(studentId.trim())}&name=${encodeURIComponent(data.name)}&status=${data.status ?? "pending"}`
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">OOP Lab Judge</h1>
        <p className="text-gray-500 mt-2">Java Programming Assessment System</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your academic ID to access your lab tasks.
        </p>

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
                       flex items-center justify-center gap-2"
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
              "Start Lab →"
            )}
          </button>
        </form>
      </div>

      {/* Feature cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <div className="bg-white rounded-xl p-4 shadow-sm flex gap-3 items-start">
          <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-800">8 Java Tasks</p>
            <p className="text-xs text-gray-500">Conditions, loops, and logic challenges</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex gap-3 items-start">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-800">Auto-Graded</p>
            <p className="text-xs text-gray-500">Instant feedback on your code</p>
          </div>
        </div>
      </div>
    </main>
  );
}
