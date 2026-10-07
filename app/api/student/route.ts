import { NextRequest, NextResponse } from "next/server";
import { getStudent } from "@/lib/sheets";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }
  try {
    const student = await getStudent(id);
    return NextResponse.json(student);
  } catch (err) {
    console.error("getStudent error:", err);
    return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 });
  }
}
