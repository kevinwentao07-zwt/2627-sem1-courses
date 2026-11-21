# ict-storyboard-io.pdf

原件：INT4074/INT4047_personal_Project/output/pdf/ict-storyboard-io.pdf

## 第 1 页

01 / A learning journey with a clear return path
Storyboard · navigation and screen transitions · I = learner input · O = software output
START
Open the browser preview
O: Home [UI 01]
Journey, level and points
I: Tap Learn
O: Curriculum library [UI 02]
I: Select Module A
O: Four topics [UI 03–04]
I: Select A1 / A2 / A3 / A4
O: Textbook lesson list [UI 05]
I: Select a micro-lesson
O: Restore its saved session
O: Learn [UI 06]
Three key ideas + one situation
I: Manipulate the example
O: Explore response [UI 07]
I: Open Check [UI 08–09]
O: 6–10 graded practice items
A / Continue on page 02
Submit, feedback and persistence
I: Tap Plan
O: Next lesson / review [UI 10]
I: Tap Settings
O: Study preferences [UI 11]
I: Tap Learn again
O: Restore the previous Learn view
with its step and scroll position
I: Open learning notes
O: Learning history [UI 12–13]
C / Continue on page 03
Learning record and JSON export
Open lesson
Explore
Check
Return to last Learn view
NAVIGATION RULES
Switching the main tab preserves the Learn view.
Explicit Back moves up the curriculum hierarchy.
Submitting an answer keeps the current scroll position.
Next question begins at the top of the question view.
Scope: Module A has 30 micro-lessons and 242 items. Home, Plan and account details include demonstration content.
Symbols: start / connector | process | I/O | decision | stored data | dashed = future extension

## 第 2 页

02 / One question, feedback and durable history
Storyboard · assessment and failure branches · objective marking and written self-assessment remain separate
A / O: Present a question
Foundation → application → challenge
I: Answer + Submit
Optional confidence and hint
Valid answer?
Non-empty; numeric if required
O: Prompt for a valid answer
No attempt is recorded
Written explanation?
Grade objective response
MCQ / number / reference match
Record raw written response
correct = null; pending review
Create an attempt event
Keep answer, time, hint and retry flags
Write to browser-local history
IndexedDB → localStorage fallback
Save succeeded?
O: Storage error + retry guidance
Retain draft; roll back this attempt
O: Feedback in the same position
Written: reference points + optional
self-assessment, saved separately
More questions?
I: Next / Finish
B / Continue on page 03
Finish the practice session
No
Correct input
Yes
No
Yes
Yes
No
Retry after storage is available
I: Retry a wrong objective answer (a new attempt)
I: Next
Yes: advance to next item; start at the top
No
Hint opens and retries are recorded separately from an unassisted first answer. No data is sent to AI.
Symbols: start / connector | process | I/O | decision | stored data | dashed = future extension

## 第 3 页

03 / Complete, review and export the evidence
Storyboard · results and I/O · browser-local storage is implemented; remote AI analysis is a future extension
B / Practice session finished
Explore step visited?
I: Return to Explore
O: Interactive learning example
Complete the lesson
First completion: +60 XP / +30 points
Repeat practice: no extra reward
O: Session result
First-answer score, active time and
question-by-question review
C / I: Open complete learning record
O: Topic summaries + review links
[UI 12–13]
I: Export learning data (JSON)
Read all saved events and sessions
Full history readable?
O: Download versioned JSON
Events + question definitions +
current and archived sessions
O: Export error / retry
Do not download incomplete history
FUTURE / manual hand-off
AI or teacher analysis of exported data
Browser-local learning history
Question ID / source / difficulty
Answer / marking / timestamps
Hint / confidence / active time
First attempt / retries / self-assessment
No
Yes
Visit Explore
Persist completion
I: View records
Export
Yes
No
Retry
Not connected
O: Read summaries
Read complete event history
EVIDENCE RULES
Written self-assessment is not an official DSE mark.
Accuracy is shown with its question sample size.
No login, cloud sync or automatic AI analysis yet.
Completion save failure: roll back progress and rewards, then retry.
Navigating away preserves Learn position; active question timing pauses until the view becomes visible again.
Symbols: start / connector | process | I/O | decision | stored data | dashed = future extension
