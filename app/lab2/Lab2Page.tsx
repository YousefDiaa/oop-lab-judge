"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import { LAB2_TASKS } from "@/lib/lab2Data";
import {
  CheckCircle,
  Trophy,
  ArrowLeft,
  Loader2,
  Sparkles,
  Layers,
  ShieldCheck,
  Calculator,
  User,
} from "lucide-react";
import Link from "next/link";

export default function Lab2Page() {
  const params = useSearchParams();
  const router = useRouter();

  const studentId = params.get("id") ?? "";
  const studentName = params.get("name") ?? (studentId ? `Student (${studentId})` : "Guest Student");
  const initStatus = params.get("status") ?? "pending";

  const [passedTasks, setPassedTasks] = useState<Set<number>>(new Set());
  const [allPassed, setAllPassed] = useState(initStatus === "Completed");
  const [submitting, setSubmitting] = useState(false);

  // Called by each TaskCard when a task passes
  const handleTaskPass = useCallback(
    async (taskNumber: number) => {
      const newPassed = new Set(passedTasks).add(taskNumber);
      setPassedTasks(newPassed);

      // Record individual task submission in sheet if student is logged in
      if (studentId) {
        fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "recordSubmission",
            studentId,
            studentName,
            taskNumber: `Lab2-Task${taskNumber}`,
            status: "pass",
          }),
        }).catch(console.error);
      }

      // Check if all 4 tasks are now passed
      if (newPassed.size === LAB2_TASKS.length) {
        if (studentId) {
          setSubmitting(true);
          try {
            await fetch("/api/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "markComplete", studentId }),
            });
          } catch (e) {
            console.error("Failed to mark student complete:", e);
          } finally {
            setSubmitting(false);
            setAllPassed(true);
            router.replace(
              `/congratulations?name=${encodeURIComponent(studentName)}&lab=2`
            );
          }
        } else {
          setAllPassed(true);
        }
      }
    },
    [passedTasks, studentId, studentName, router]
  );

  const lab1Url = studentId
    ? `/lab?id=${encodeURIComponent(studentId)}&name=${encodeURIComponent(studentName)}&status=${encodeURIComponent(initStatus)}`
    : "/lab";

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* ── Top Nav ────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </button>

            {/* Lab Switcher Tabs */}
            <div className="hidden sm:flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
              <Link
                href={lab1Url}
                className="px-3 py-1 text-gray-600 hover:text-gray-900 rounded-md transition"
              >
                Lab 1 (8 Tasks)
              </Link>
              <span className="px-3 py-1 bg-white text-blue-600 rounded-md shadow-sm">
                Lab 2 (4 Tasks)
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="font-semibold text-gray-900 text-sm flex items-center justify-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" />
              {studentName}
            </p>
            <p className="text-xs text-gray-400">
              {studentId ? `ID: ${studentId}` : "Practice Mode"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            {allPassed ? (
              <span className="flex items-center gap-1 text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" /> Completed!
              </span>
            ) : (
              <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
                {passedTasks.size} / {LAB2_TASKS.length} passed
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-6">
        {/* Lab 2 Hero Card */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              OOP Java Assessment
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Lab 2 — Exercises
            </h1>
            <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Complete the 3 assigned exercises: nested loop patterns, 4-digit ID
              encryption, and method approximation for the mathematical constant{" "}
              <span className="font-serif italic font-bold">e</span>.
            </p>

            {/* Exercise summary badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                  <Layers className="w-4 h-4 text-yellow-300" />
                  <span>Exercise 1: Patterns</span>
                </div>
                <p className="text-xs text-blue-200 mt-1">
                  Part A (Numbers) & Part B (Alphabet Pyramid)
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-300" />
                  <span>Exercise 2: Encryption</span>
                </div>
                <p className="text-xs text-blue-200 mt-1">
                  (digit + 7) % 10 & 1st↔3rd, 2nd↔4th swap
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                  <Calculator className="w-4 h-4 text-pink-300" />
                  <span>Exercise 3: calc_e(int)</span>
                </div>
                <p className="text-xs text-blue-200 mt-1">
                  e = 1 + 1/1! + 1/2! + 1/3! + ...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {allPassed && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm animate-fade-in">
            <Trophy className="w-10 h-10 text-green-500 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-green-800">
                🎉 Congratulations, {studentName.split(" ")[0]}!
              </h2>
              <p className="text-green-700 text-sm mt-1">
                You have successfully solved all Lab 2 tasks! Your solutions passed
                all auto-grading test cases.
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {!allPassed && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between text-xs text-gray-600 mb-1.5 font-medium">
              <span>Overall Lab 2 Progress</span>
              <span className="text-blue-600 font-semibold">
                {passedTasks.size} of {LAB2_TASKS.length} tasks completed
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(passedTasks.size / LAB2_TASKS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Submitting Full-Screen Overlay */}
        {submitting && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              <p className="font-semibold text-gray-800 text-lg">
                Recording your completion...
              </p>
              <p className="text-gray-500 text-sm">Please wait a moment.</p>
            </div>
          </div>
        )}

        {/* Task Cards */}
        <div className="space-y-6">
          {LAB2_TASKS.map((task) => (
            <TaskCard
              key={task.number}
              task={task}
              isPassed={passedTasks.has(task.number)}
              onPass={() => handleTaskPass(task.number)}
              customTestCases={task.testCases}
              defaultCode={task.defaultCode}
              badgeLabel={task.exerciseLabel}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
