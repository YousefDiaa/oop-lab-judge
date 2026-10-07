import { NextRequest, NextResponse } from "next/server";
import { markStudentComplete, recordSubmission } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === "markComplete") {
      await markStudentComplete(body.studentId);
      return NextResponse.json({ success: true });
    }

    if (body.action === "recordSubmission") {
      await recordSubmission({
        studentId:   body.studentId,
        studentName: body.studentName,
        taskNumber:  body.taskNumber,
        status:      body.status,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("submit error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
