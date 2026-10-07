"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import { CheckCircle, Trophy, ArrowLeft, Loader2 } from "lucide-react";

interface Task {
  number: number;
  title: string;
  description: string;
  testInput: string;
  expectedOutput: string;
}

export default function LabPage() {
  const params    = useSearchParams();
  const router    = useRouter();

  const studentId   = params.get("id") ?? "";
  const studentName = params.get("name") ?? "";
  const initStatus  = params.get("status") ?? "pending";

  const [tasks, setTasks]               = useState<Task[]>([]);
  const [passedTasks, setPassedTasks]   = useState<Set<number>>(new Set());
  const [allPassed, setAllPassed]       = useState(initStatus === "Completed");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [submitting, setSubmitting]     = useState(false);
  const [error, setError]               = useState("");

  // Fetch tasks from our API route
  useEffect(() => {
    fetch("/api/tasks")
      .then(r => r.json())
      .then(data => {
        setTasks(data.tasks ?? []);
        setLoadingTasks(false);
      })
      .catch(() => {
        setError("Failed to load tasks. Please refresh the page.");
        setLoadingTasks(false);
      });
  }, []);

  // Called by each TaskCard when a task passes
  const handleTaskPass = useCallback(
    async (taskNumber: number) => {
      const newPassed = new Set(passedTasks).add(taskNumber);
      setPassedTasks(newPassed);

      // Record individual task submission in sheet (fire-and-forget)
      fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action:      "recordSubmission",
          studentId,
          studentName,
          taskNumber,
          status:      "pass",
        }),
      }).catch(console.error);

      // Check if all tasks are now passed
      if (newPassed.size === tasks.length && tasks.length > 0) {
        setSubmitting(true);
        try {
          await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "markComplete", studentId }),
          });
        } catch {
          console.error("Failed to mark student as complete");
        } finally {
          setSubmitting(false);
          setAllPassed(true);
          router.replace(`/congratulations?name=${encodeURIComponent(studentName)}`);
        }
      }
    },
    [passedTasks, tasks.length, studentId, studentName]
  );

  // Guard: redirect home if no student ID
  if (!studentId) {
    router.replace("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="text-center">
            <p className="font-semibold text-gray-900 text-sm">{studentName}</p>
            <p className="text-xs text-gray-400">ID: {studentId}</p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            {allPassed ? (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-4 h-4" /> Completed!
              </span>
            ) : (
              <span className="text-gray-600">
                {passedTasks.size} / {tasks.length} passed
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Completion Banner */}
        {allPassed && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4">
            <Trophy className="w-10 h-10 text-green-500 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-green-800">
                🎉 Congratulations, {studentName.split(" ")[0]}!
              </h2>
              <p className="text-green-700 text-sm mt-1">
                You have successfully completed all {tasks.length} tasks. Your submission has been recorded in the system.
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {!allPassed && tasks.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Overall Progress</span>
              <span>{passedTasks.size} of {tasks.length} tasks completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: tasks.length ? `${(passedTasks.size / tasks.length) * 100}%` : "0%" }}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loadingTasks && (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="text-gray-500">Loading your tasks...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submitting Full-Screen Overlay */}
        {submitting && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              <p className="font-semibold text-gray-800 text-lg">Recording your completion...</p>
              <p className="text-gray-500 text-sm">Please wait a moment.</p>
            </div>
          </div>
        )}

        {/* Task Cards */}
        <div className="space-y-6">
          {tasks.map(task => (
            <TaskCard
              key={task.number}
              task={task}
              isPassed={passedTasks.has(task.number)}
              onPass={() => handleTaskPass(task.number)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
