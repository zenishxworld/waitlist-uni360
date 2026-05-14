/**
 * Google Apps Script — Waitlist Webhook
 *
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this code
 * 3. Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the URL → paste into .env.local as WEBHOOK_URL
 *
 * Sheet columns: A: Timestamp | B: Name | C: Email
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Waitlist") ||
    SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([data.timestamp, data.name, data.email]);

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(
    ContentService.MimeType.JSON
  );
}
