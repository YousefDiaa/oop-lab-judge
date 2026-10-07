import { NextResponse } from "next/server";
import { getTasks } from "@/lib/sheets";

export async function GET() {
  try {
    const tasks = await getTasks();
    return NextResponse.json({ tasks });
  } catch (err) {
    console.error("getTasks error:", err);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
