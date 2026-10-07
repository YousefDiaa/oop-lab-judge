// ============================================================
// OOP Lab Judge — Google Apps Script Web App
// Deploy as: Execute as Me | Anyone can access
// ============================================================

const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // <-- Replace after creating the sheet

// ── Entry points ────────────────────────────────────────────

function doGet(e) {
  const action = e.parameter.action;
  try {
    if (action === "getStudent") return getStudent(e.parameter.id);
    if (action === "getTasks")   return getTasks();
    return jsonResponse({ error: "Unknown GET action: " + action });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === "markComplete")    return markComplete(data.studentId);
    if (data.action === "recordSubmission") return recordSubmission(data);
    return jsonResponse({ error: "Unknown POST action" });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// ── Handlers ────────────────────────────────────────────────

function getStudent(studentId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Students");
  const rows  = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === String(studentId).trim()) {
      return jsonResponse({
        found:     true,
        name:      rows[i][1],
        status:    rows[i][2] || "pending",
        completedAt: rows[i][3] || null
      });
    }
  }
  return jsonResponse({ found: false });
}

function getTasks() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Tasks");
  const rows  = sheet.getDataRange().getValues().slice(1); // skip header row

  const tasks = rows.map(r => ({
    number:         r[0],
    title:          r[1],
    description:    r[2],
    testInput:      r[3],
    expectedOutput: r[4]
  }));

  return jsonResponse({ tasks });
}

function markComplete(studentId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Students");
  const rows  = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === String(studentId).trim()) {
      sheet.getRange(i + 1, 3).setValue("Completed");
      sheet.getRange(i + 1, 4).setValue(new Date().toISOString());
      return jsonResponse({ success: true });
    }
  }
  return jsonResponse({ success: false, error: "Student not found" });
}

function recordSubmission(data) {
  // Optional: logs each submission attempt to a "Submissions" sheet
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName("Submissions");
  if (!sheet) sheet = ss.insertSheet("Submissions");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Student_ID", "Student_Name", "Task", "Status"]);
  }

  sheet.appendRow([
    new Date().toISOString(),
    data.studentId,
    data.studentName,
    data.taskNumber,
    data.status
  ]);

  return jsonResponse({ success: true });
}

// ── Helper ──────────────────────────────────────────────────

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
