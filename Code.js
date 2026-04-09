// ============================================
// ROMRxBodyBuilding — Google Apps Script
// Miami Vice x Golden Era Bodybuilding
// ============================================
// SETUP: Replace SHEET_ID with your Google Sheet ID
var SHEET_ID   = '1CWrLP4z_RXrBrnwmzPkabAxoWWT7-T2KxQyG9yRaops';
var ADMIN_CODE = 'ROMRXBB_ADMIN_2026'; // Change before launch

// ==========================================
// MAIN ENTRY POINT
// ==========================================
function doGet(e) {
  var action = e && e.parameter ? (e.parameter.action || '') : '';
  try {
    switch (action) {
      // Auth
      case 'login':           return handleLogin(e);
      case 'resendCode':      return handleResendCode(e.parameter.email);
      // Profile
      case 'submitAssessment': return handleSubmitAssessment(e);
      case 'getProfile':      return handleGetProfile(e.parameter.email, e.parameter.code);
      // Programs
      case 'getProgram':      return handleGetProgram(e.parameter.email);
      // Training
      case 'logWorkout':      return handleLogWorkout(e);
      case 'logCheckIn':      return handleLogCheckIn(e.parameter.email, e.parameter.date, e.parameter.exercise);
      case 'getTrainingLog':  return handleGetTrainingLog(e.parameter.email);
      // Level Up
      case 'requestLevelUp':  return handleRequestLevelUp(e.parameter.email);
      case 'approveLevelUp':  return handleApproveLevelUp(e.parameter.token);
      case 'rejectLevelUp':   return handleRejectLevelUp(e.parameter.token, e.parameter.reason);
      // Coach
      case 'coachLogin':      return handleCoachLogin(e);
      case 'coachRoster':     return handleCoachRoster(e.parameter.coachEmail, e.parameter.page, e.parameter.pageSize);
      case 'generateWarmup':  return handleGenerateWarmup(e.parameter.coachEmail, e.parameter.lift);
      // Admin
      case 'adminLogin':      return handleAdminLogin(e.parameter.adminCode);
      case 'adminGetClients': return handleAdminGetClients(e.parameter.adminCode);
      case 'adminAddClient':  return handleAdminAddClient(e.parameter.adminCode, e.parameter.email, e.parameter.fullName, e.parameter.level);
      case 'adminBulkImport': return handleAdminBulkImport(e.parameter.adminCode, e.parameter.csvData);
      default:
        return jsonResp({success: false, error: 'Unknown action: ' + action});
    }
  } catch(err) {
    logError((e && e.parameter) ? (e.parameter.email || '') : '', action, err);
    return jsonResp({success: false, error: err.toString()});
  }
}

function doPost(e) {
  return doGet(e);
}

// ==========================================
// UTILITIES
// ==========================================
function jsonResp(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function generateCode(len) {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code  = '';
  for (var i = 0; i < (len || 6); i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function logError(email, action, err) {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName('Errors') || ss.insertSheet('Errors');
    sheet.appendRow([new Date(), email || '', action || '', err ? err.toString() : '', (err && err.stack) ? err.stack : '']);
  } catch(e2) { Logger.log('logError failed: ' + e2.toString()); }
}

// ==========================================
// SETUP — run once to initialize sheets
// ==========================================
function setupSheets() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var schemas = {
    'Users':                  ['Email','Full_Name','Access_Code','Dashboard_Enabled','Created_Date','Subscription_Status','Training_Age','Current_Level','Coach_Email','Welcome_Sent'],
    'Assessments':            ['Email','Assessment_Date','Joint','Left_Value','Right_Value','Asymmetry_Pct','Status'],
    'Gym_Readiness_Profiles': ['Email','Assessment_Date','Exercise','ROM_Status','ROM_Score'],
    'Programs':               ['Level','Exercise_Name','Sets','Reps','Notes','Video_URL','Muscle_Group','Min_ROM_Required'],
    'Training_Logs':          ['Email','Date','Exercise','Sets','Reps','Weight_lbs','Notes'],
    'Coach_Clients':          ['Coach_Email','Client_Email','Assigned_Date'],
    'Level_Up_Requests':      ['Email','Current_Level','Requested_Level','Request_Date','Status','Token','Coach_Email','Resolved_At'],
    'Exercise_CheckIns':      ['Email','Date','Exercise','Completed_At'],
    'Alert_Dismissals':       ['Coach_Email','Client_Email','Alert_Type','Dismissed_At'],
    'Errors':                 ['Timestamp','Email','Action','Error','Stack']
  };
  for (var name in schemas) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.appendRow(schemas[name]);
      sheet.getRange(1, 1, 1, schemas[name].length).setFontWeight('bold').setBackground('#36454F').setFontColor('#FAF9F6');
      Logger.log('Created: ' + name);
    }
  }
  Logger.log('Setup complete.');
}

// ==========================================
// PLACEHOLDER HANDLERS — Phase 3+ build out
// ==========================================
function handleLogin(e)                           { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleResendCode(email)                  { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleSubmitAssessment(e)                { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleGetProfile(email, code)            { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleGetProgram(email)                  { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleLogWorkout(e)                      { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleLogCheckIn(email, date, exercise)  { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleGetTrainingLog(email)              { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleRequestLevelUp(email)              { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleApproveLevelUp(token)              { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleRejectLevelUp(token, reason)       { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleCoachLogin(e)                      { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleCoachRoster(email, page, pageSize) { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleGenerateWarmup(email, lift)        { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleAdminLogin(code)                   { return jsonResp({success: (code === ADMIN_CODE)}); }
function handleAdminGetClients(code)              { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleAdminAddClient(code, e, n, l)      { return jsonResp({success: false, error: 'Not implemented yet'}); }
function handleAdminBulkImport(code, csv)         { return jsonResp({success: false, error: 'Not implemented yet'}); }
