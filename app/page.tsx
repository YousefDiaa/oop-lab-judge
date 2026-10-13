"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Code2, BookOpen, Layers, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [studentId, setStudentId]     = useState("");
  const [selectedLab, setSelectedLab] = useState<"lab1" | "lab2">("lab2");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res  = await fetch(`/api/student?id=${encodeURIComponent(studentId.trim())}`);
      const data = await res.json();

      if (data.found) {
        const targetPath = selectedLab === "lab2" ? "/lab2" : "/lab";
        router.push(
          `${targetPath}?id=${encodeURIComponent(studentId.trim())}&name=${encodeURIComponent(data.name)}&status=${data.status ?? "pending"}`
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">OOP Lab Judge</h1>
        <p className="text-gray-500 mt-2 text-sm">Java Programming Assessment System</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full max-w-md p-8">
        {/* Lab Selection Tabs */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Select Lab
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setSelectedLab("lab2")}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                selectedLab === "lab2"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lab 2 (New)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedLab("lab1")}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                selectedLab === "lab1"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lab 1</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {selectedLab === "lab2"
              ? "Lab 2: Patterns, 4-digit ID encryption, calc_e method"
              : "Lab 1: Leap year, ATM, loops, primes, palindrome, FizzBuzz"}
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
              `Start ${selectedLab === "lab2" ? "Lab 2" : "Lab 1"} →`
            )}
          </button>
        </form>

        {/* Practice Mode Direct Link */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <Link
            href="/lab2"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
          >
            Preview / Practice Lab 2 without ID <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        <Link
          href="/lab2"
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-blue-200 transition group flex gap-3 items-start"
        >
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Lab 2 Exercises</p>
            <p className="text-xs text-gray-500">Loops, Encryption & Methods</p>
          </div>
        </Link>
        <Link
          href="/lab"
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-blue-200 transition group flex gap-3 items-start"
        >
          <BookOpen className="w-5 h-5 text-green-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Lab 1 Tasks</p>
            <p className="text-xs text-gray-500">8 Logic & Control Flow Tasks</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
