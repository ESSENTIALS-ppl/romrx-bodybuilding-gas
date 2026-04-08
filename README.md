# ROMRxBodyBuilding GAS

Google Apps Script backend for ROMRxBodyBuilding™.

**Account:** romrxbjj@gmail.com (or dedicated GAS project)  
**Sheet:** ROMRxBodyBuilding Database (to be created)

## Sheets Schema

| Sheet | Columns |
|-------|---------|
| Users | Email, Full_Name, Access_Code, Dashboard_Enabled, Created_Date, Subscription_Status, Belt_Level, Training_Age |
| Assessments | Email, Assessment_Date, Joint, Left_Value, Right_Value, Asymmetry_Pct, Status |
| Gym_Readiness_Profiles | Email, Assessment_Date, Exercise, ROM_Status (GREEN/YELLOW/RED) |
| Programs | Level, Exercise_Name, Sets, Reps, Notes, Video_URL, Muscle_Group |
| Training_Logs | Email, Date, Exercise, Sets, Reps, Weight, Notes |
| Coach_Clients | Coach_Email, Client_Email, Assigned_Date |
| Level_Up_Requests | Email, Current_Level, Requested_Level, Request_Date, Status, Approved_By, Token |
| Exercise_CheckIns | Email, Date, Exercise, Completed_At |
| Alert_Dismissals | Coach_Email, Client_Email, Alert_Type, Dismissed_At |
| Errors | Timestamp, Email, Action, Error, Stack |

## GAS Actions (Phase 3+)
- submitAssessment
- generateProfile
- login / resendCode
- getProfile / getProgram / getTrainingLog
- logWorkout / logCheckIn
- requestLevelUp / approveLevelUp / rejectLevelUp
- coachRoster / coachTrends / coachAlerts
- generateWarmup
- adminAddClient / adminBulkImport
- stripeWebhook

## Setup
1. Create new GAS project in Google Apps Script
2. Copy Code.js to the project
3. Run setupSheets() to initialize database
4. Deploy as Web App (execute as: Me, access: Anyone)
5. Copy deployment URL to romrx-bodybuilding-web/js/config.js
