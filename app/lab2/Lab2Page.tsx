"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import { LAB2_TASKS } from "@/lib/lab2Data";
import {
  CheckCircle,
  Trophy,
  ArrowLeft,
  Loader2,
  Sparkles,
  BookOpen,
  Thermometer,
  Square,
  Lock,
  KeyRound,
  RotateCcw,
  User,
} from "lucide-react";

export default function Lab2Page() {
  const params = useSearchParams();
  const router = useRouter();

  const studentId = params.get("id") ?? "";
  const studentName =
    params.get("name") ?? (studentId ? `Student (${studentId})` : "Guest Student");
  const initStatus = params.get("status") ?? "pending";

  const [mounted, setMounted] = useState(false);
  const [passedTasks, setPassedTasks] = useState<Set<number>>(new Set());
  const [allPassed, setAllPassed] = useState(initStatus === "Completed");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            taskNumber: `Task${taskNumber}`,
            status: "pass",
          }),
        }).catch(console.error);
      }

      // Check if all 6 tasks are now passed
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
              `/congratulations?name=${encodeURIComponent(studentName)}`
            );
          }
        } else {
          setAllPassed(true);
        }
      }
    },
    [passedTasks, studentId, studentName, router]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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

            <div className="hidden sm:flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100">
              Encapsulation and String
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
        {/* Hero Card */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              OOP Java Assessment
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Encapsulation and String
            </h1>
            <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Complete the 6 assigned exercises covering class encapsulation, computed getters,
              static members, character rule checking, Caesar cipher arithmetic, and word reversal.
            </p>

            {/* Exercise summary badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 text-left">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                  <span>Task 1: Book</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1 line-clamp-1">
                  Encapsulation
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 text-left">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <Thermometer className="w-3.5 h-3.5 text-red-300 shrink-0" />
                  <span>Task 2: Temp</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1 line-clamp-1">
                  Computed Getters
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 text-left">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <Square className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                  <span>Task 3: Rect</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1 line-clamp-1">
                  Static & Validation
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 text-left">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <Lock className="w-3.5 h-3.5 text-green-300 shrink-0" />
                  <span>Task 4: Password</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1 line-clamp-1">
                  String & Character
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 text-left">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <KeyRound className="w-3.5 h-3.5 text-yellow-200 shrink-0" />
                  <span>Task 5: Caesar</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1 line-clamp-1">
                  Char Arithmetic
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 text-left">
                <div className="flex items-center gap-1.5 font-semibold text-xs">
                  <RotateCcw className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                  <span>Task 6: Reverse</span>
                </div>
                <p className="text-[11px] text-blue-200 mt-1 line-clamp-1">
                  Split & StringBuilder
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
                You have successfully solved all 6 Encapsulation and String tasks! Your solutions
                passed all auto-grading test cases.
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {!allPassed && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between text-xs text-gray-600 mb-1.5 font-medium">
              <span>Overall Progress</span>
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
              badgeLabel={`${task.exerciseLabel} (${task.category})`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
