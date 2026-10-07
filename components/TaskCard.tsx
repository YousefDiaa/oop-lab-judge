"use client";

import React, { useState, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle2,
  XCircle,
  Loader2,
  Terminal,
  FlaskConical,
} from "lucide-react";
import { getTestCases, type TestCase } from "@/lib/testCases";

interface Task {
  number: number;
  title: string;
  description: string;
  testInput: string;
  expectedOutput: string;
}

interface CaseResult {
  id: number;
  passed: boolean;
  stdout: string;
  stderr: string;
  compile_output: string;
  status: string;
  expected: string;
  checkType: "exact" | "contains";
}

interface TaskCardProps {
  task: Task;
  isPassed: boolean;
  onPass: () => void;
}

const DEFAULT_CODE = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here

    }
}
`;

export default function TaskCard({ task, isPassed, onPass }: TaskCardProps) {
  const [expanded, setExpanded]       = useState(!isPassed);
  const [code, setCode]               = useState(DEFAULT_CODE);
  const [running, setRunning]         = useState(false);
  const [results, setResults]         = useState<CaseResult[] | null>(null);
  const [allPassed, setAllPassed]     = useState(false);
  // Which failed case to show details for
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const testCases: TestCase[] = getTestCases(task.number);

  async function handleRunAll() {
    setRunning(true);
    setResults(null);
    setExpandedCase(null);

    try {
      const { runJavaGodbolt } = await import("@/lib/godbolt");
      const stdins = testCases.map(tc => tc.input);
      const batchResults = await runJavaGodbolt(code, stdins);

      const normalise = (s: string) => s.split("\n").map(l => l.trimEnd()).join("\n").trim();
      const checkResult = (actual: string, expected: string, checkType: "exact" | "contains") => {
        const normActual = normalise(actual);
        const normExpected = normalise(expected);
        return checkType === "contains" ? normActual.includes(normExpected) : normActual === normExpected;
      };

      const finalResults = testCases.map((tc, idx) => {
        const run = batchResults[idx];
        const passed = checkResult(run.stdout, tc.expected, tc.checkType);
        return {
          id: tc.id,
          passed,
          stdout: run.stdout,
          stderr: run.stderr,
          compile_output: run.compile_output,
          status: run.status,
          expected: tc.expected,
          checkType: tc.checkType,
        };
      });

      setResults(finalResults);
      const allPassedResult = finalResults.every(r => r.passed);
      setAllPassed(allPassedResult);

      if (allPassedResult && !isPassed) {
        onPass();
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Execution failed.";
      setResults([
        {
          id: 0, passed: false,
          stdout: "", stderr: msg,
          compile_output: "", status: "Error",
          expected: "", checkType: "exact",
        },
      ]);
      setAllPassed(false);
    } finally {
      setRunning(false);
    }
  }

  // Handle Tab key in textarea
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta    = textareaRef.current!;
      const start = ta.selectionStart;
      const end   = ta.selectionEnd;
      const next  = code.substring(0, start) + "    " + code.substring(end);
      setCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4;
      });
    }
  }

  const passCount = results ? results.filter((r) => r.passed).length : 0;
  const totalCount = testCases.length;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 ${
        isPassed ? "border-green-300" : "border-gray-100"
      }`}
    >
      {/* ── Card Header ────────────────────────────────────── */}
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          {isPassed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-gray-500">{task.number}</span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">
              Task {task.number}: {task.title}
            </h3>
            {isPassed ? (
              <p className="text-xs text-green-600 font-medium">
                ✓ All {totalCount} tests passed
              </p>
            ) : results ? (
              <p className="text-xs text-gray-500">
                {passCount}/{totalCount} tests passed
              </p>
            ) : (
              <p className="text-xs text-gray-400">{totalCount} test cases</p>
            )}
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* ── Expanded Content ─────────────────────────────── */}
      {expanded && (
        <div className="px-6 pb-6 space-y-5">

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Problem Description
            </h4>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
              {task.description}
            </pre>
          </div>

          {/* Test Cases Preview */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              Test Cases ({totalCount})
            </h4>
            <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100">
                    <th className="text-left px-3 py-2 text-gray-500 font-medium w-8">#</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Description</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Input</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Expected</th>
                    <th className="text-center px-3 py-2 text-gray-500 font-medium w-16">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {testCases.map((tc) => {
                    const res = results?.find((r) => r.id === tc.id);
                    return (
                      <React.Fragment key={tc.id}>
                        <tr
                          className={`border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                            res && !res.passed ? "bg-red-50/60" : ""
                          }`}
                          onClick={() =>
                            res && !res.passed
                              ? setExpandedCase(expandedCase === tc.id ? null : tc.id)
                              : undefined
                          }
                        >
                          <td className="px-3 py-2 text-gray-400">{tc.id}</td>
                          <td className="px-3 py-2 text-gray-600">{tc.label}</td>
                          <td className="px-3 py-2 font-mono text-blue-700 bg-blue-50/50">
                            {tc.input.length > 20
                              ? tc.input.substring(0, 20) + "…"
                              : tc.input.replace(/\n/g, " ↵ ")}
                          </td>
                          <td className="px-3 py-2 font-mono text-gray-700">
                            {tc.checkType === "contains" && (
                              <span className="text-orange-500 mr-1">[contains]</span>
                            )}
                            {tc.expected.length > 25
                              ? tc.expected.substring(0, 25) + "…"
                              : tc.expected.replace(/\n/g, " ↵ ")}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {!res && running ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400 mx-auto" />
                            ) : !res ? (
                              <span className="text-gray-300">—</span>
                            ) : res.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                            )}
                          </td>
                        </tr>

                        {/* Expandable error details for failed case */}
                        {expandedCase === tc.id && res && !res.passed && (
                          <tr key={`detail-${tc.id}`} className="bg-red-50">
                            <td colSpan={5} className="px-4 py-3">
                              <div className="space-y-2">
                                {res.compile_output && (
                                  <div>
                                    <p className="text-xs font-semibold text-orange-600 mb-1 flex items-center gap-1">
                                      <Terminal className="w-3 h-3" /> Compilation Error
                                    </p>
                                    <pre className="bg-orange-50 border border-orange-200 rounded p-2 text-xs text-orange-800 whitespace-pre-wrap font-mono">
                                      {res.compile_output}
                                    </pre>
                                  </div>
                                )}
                                {res.stderr && (
                                  <div>
                                    <p className="text-xs font-semibold text-red-600 mb-1 flex items-center gap-1">
                                      <Terminal className="w-3 h-3" /> Runtime Error
                                    </p>
                                    <pre className="bg-red-100 border border-red-200 rounded p-2 text-xs text-red-800 whitespace-pre-wrap font-mono">
                                      {res.stderr}
                                    </pre>
                                  </div>
                                )}
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-1">Expected</p>
                                    <pre className="bg-white border border-gray-200 rounded p-2 text-xs text-gray-800 whitespace-pre-wrap font-mono">
                                      {res.expected || "(empty)"}
                                    </pre>
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-1">Got</p>
                                    <pre className="bg-white border border-gray-200 rounded p-2 text-xs text-gray-800 whitespace-pre-wrap font-mono">
                                      {res.stdout || "(no output)"}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Editor */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Your Java Code
            </h4>
            <div className="relative rounded-xl overflow-hidden border border-gray-200">
              {/* Fake editor toolbar */}
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-gray-400 text-xs font-mono">Main.java</span>
                {results && (
                  <span className={`ml-auto text-xs font-semibold ${allPassed ? "text-green-400" : "text-red-400"}`}>
                    {passCount}/{totalCount} passing
                  </span>
                )}
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className="w-full bg-gray-900 text-green-300 font-mono text-sm p-4
                           focus:outline-none resize-none leading-relaxed"
                rows={20}
                placeholder="Write your Java code here..."
              />
            </div>
          </div>

          {/* Run Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleRunAll}
              disabled={running || isPassed}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                         disabled:bg-gray-400 text-white font-semibold
                         px-6 py-2.5 rounded-xl transition"
            >
              {running ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running {totalCount} tests…
                </>
              ) : isPassed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> All Tests Passed ✓
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Run All {totalCount} Tests
                </>
              )}
            </button>

            {/* Overall result badge */}
            {results && !running && (
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm ${
                  allPassed
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {allPassed ? (
                  <><CheckCircle2 className="w-4 h-4" /> All {totalCount} passed!</>
                ) : (
                  <><XCircle className="w-4 h-4" /> {totalCount - passCount} failed — click a ❌ for details</>
                )}
              </div>
            )}
          </div>

          {/* Compile error banner (shown if first case has compile error) */}
          {results && results[0]?.compile_output && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Compilation Error (affects all tests)
              </p>
              <pre className="text-xs text-orange-800 whitespace-pre-wrap font-mono">
                {results[0].compile_output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
