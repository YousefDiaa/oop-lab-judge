import { NextRequest, NextResponse } from "next/server";
import { runJavaBatch } from "@/lib/judge0";

// Normalise output: trim trailing whitespace from each line and the whole string
function normalise(s: string): string {
  return s
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();
}

function checkResult(
  actual: string,
  expected: string,
  checkType: "exact" | "contains"
): boolean {
  const normActual   = normalise(actual);
  const normExpected = normalise(expected);
  if (checkType === "contains") {
    return normActual.includes(normExpected);
  }
  return normActual === normExpected;
}

// ── Batch run (10 test cases) ────────────────────────────────
async function handleBatch(
  code: string,
  testCases: Array<{ id: number; input: string; expected: string; checkType: "exact" | "contains" }>
) {
  try {
    const stdins = testCases.map(tc => tc.input);
    const batchResults = await runJavaBatch(code, stdins);

    const results = testCases.map((tc, idx) => {
      const run = batchResults[idx];
      const passed = checkResult(run.stdout, tc.expected, tc.checkType);
      
      return {
        id:       tc.id,
        passed,
        stdout:   run.stdout,
        stderr:   run.stderr,
        compile_output: run.compile_output,
        status:   run.status,
        expected: tc.expected,
        checkType: tc.checkType,
      };
    });

    const allPassed = results.every((r) => r.passed);
    return NextResponse.json({ results, allPassed });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    // Return the error mapped to all test cases so the UI displays it cleanly
    const results = testCases.map(tc => ({
      id:       tc.id,
      passed:   false,
      stdout:   "",
      stderr:   msg,
      compile_output: "",
      status:   "Error",
      expected: tc.expected,
      checkType: tc.checkType,
    }));
    return NextResponse.json({ results, allPassed: false });
  }
}

// ── Route handler ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, testCases, mode } = body;

    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    if (mode === "batch" && Array.isArray(testCases)) {
      return handleBatch(code, testCases);
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("run error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
