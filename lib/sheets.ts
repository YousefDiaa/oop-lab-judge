// Google Sheets / Apps Script API helper

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL!;

export interface Student {
  found: boolean;
  name?: string;
  status?: "pending" | "Completed";
  completedAt?: string | null;
}

export interface Task {
  number: number;
  title: string;
  description: string;
  testInput: string;
  expectedOutput: string;
}

export async function getStudent(studentId: string): Promise<Student> {
  const url = `${APPS_SCRIPT_URL}?action=getStudent&id=${encodeURIComponent(studentId)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to reach Google Sheet API");
  return res.json();
}

export async function getTasks(): Promise<Task[]> {
  const url = `${APPS_SCRIPT_URL}?action=getTasks`;
  const res = await fetch(url, { next: { revalidate: 300 } }); // cache 5 min
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return data.tasks ?? [];
}

export async function markStudentComplete(studentId: string): Promise<void> {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "markComplete", studentId }),
  });
}

export async function recordSubmission(payload: {
  studentId: string;
  studentName: string;
  taskNumber: number;
  status: "pass" | "fail";
}): Promise<void> {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "recordSubmission", ...payload }),
  });
}
