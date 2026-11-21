# report_11595347_draft.pdf

原件：INT4074/INT4047_personal_Project/output/report-draft/report_11595347_draft.pdf

## 第 1 页

INT4074 MOBILE APPLICATIONS DESIGN AND DEVELOPMENT · INDIVIDUAL
ASSIGNMENT
ICT Learning Companion
An AI study companion that finds knowledge gaps, plans revision and guides
students through their own mistakes
Student
Zheng Wentao
Student ID
11595347 check
File name
report_11595347.pdf
Due
21 November 2026, 5:00 pm

## 第 2 页

1. Introduction
ICT Learning Companion is a mobile app for Hong Kong secondary students (S4–S6) preparing
for HKDSE ICT. Students often revise by doing many questions, but they rarely find out why they
got an answer wrong, and their revision time is not focused on their weakest topics.
The app uses AI in four connected ways: a short AI diagnostic finds the starting point; an AI
knowledge map shows which points are mastered, need review or still need evidence; an AI
study plan puts weak points first and fits the exam date and the time the student has each day;
and an AI mistake guide does not show the answer straight away, but asks the student to check
each step of their own working until they find the answer themselves. Every guided correction is
saved as evidence, so the map and the plan keep improving.
Platform and tools. Designed for iOS and Android phones (390 × 844 frame). Screens are shown
in English; the app can switch to Traditional Chinese in Settings. Wireframes and UI were
designed as editable vector screens for Figma; the storyboard is a flowchart with I/O tags; an
interactive HTML prototype links all 23 screens.
2. Evaluation of existing apps
The three apps below were chosen because together they cover the three parts of this app:
practice and recall (Quizlet), interactive guided learning (Brilliant) and study planning
(MyStudyLife). Ratings and prices are taken from each app’s App Store page on 11 November
2026 and may differ by region.
2.1 Quizlet: AI-powered flashcards
Developer
Quizlet Inc
URL
https://apps.apple.com/us/app/quizlet-ai-powered-flashcards/id546473125
Rating
4.8 / 5 (about 1.1M ratings, App Store US) · checked 11 Nov 2026
Price
Free; Quizlet Plus / Go subscriptions (US$9.99–44.99 listed)
What it is
General-purpose study app built around flashcard sets that learners create or
search.
Insert screenshot
Home / study set list
take it on your phone or from the store page
Insert screenshot
Learn mode question with feedback
take it on your phone or from the store page

## 第 3 页

Strengths
Huge library: over 700 million flashcard sets, so
most topics already have material.
Several active-recall modes: adaptive Learn
mode, practice tests and spaced repetition.
Retention insights track mastery over time; the
interface is available in Traditional Chinese.
Weaknesses
Content is user-generated and not mapped to
the HKDSE ICT syllabus, so quality and
coverage vary.
Feedback works at the level of a card or
question; it does not trace which step of the
learner’s reasoning went wrong.
Reviewers complain that key study modes are
limited without a paid plan (e.g. Learn mode
limited to a few uses).
2.2 Brilliant: Learn by doing
Developer
Brilliant Worldwide
URL
https://apps.apple.com/us/app/brilliant-learn-by-doing/id913335252
Rating
4.7 / 5 (about 33K ratings, App Store US) · checked 11 Nov 2026
Price
Free download; Brilliant Premium subscription (US$19.99–191.99 listed)
What it is
Interactive STEM courses (maths, coding, computer science, data analysis) taught
through visual problem solving.
Insert screenshot
Interactive lesson screen
take it on your phone or from the store page
Insert screenshot
Tutor / guided hint screen
take it on your phone or from the store page
Strengths
Highly visual, hands-on lessons make abstract
ideas easier to understand.
Its tutor guides learners with hints and
questions instead of giving the answer straight
away.
Adaptive practice adjusts to the learner’s level
and fills gaps.
Weaknesses
Courses are general STEM and not organised
around the HKDSE ICT curriculum or exam
timeline.
English only, which is a barrier for many Hong
Kong secondary students.
Premium subscription is relatively expensive;
pricing is a common complaint in reviews.
2.3 MyStudyLife: Study Planner
Developer
My Study Life, Ltd.
URL
https://apps.apple.com/us/app/mystudylife-study-planner/id910639339
Rating
4.5 / 5 (about 6.2K ratings, App Store US); 3.35 / 5 on Google Play (58.9K ratings) ·
checked 11 Nov 2026
Price
Free; MyStudyLife+ US$6.99 per month or US$39.99 per year
What it is
Student planner for timetables, homework, exams, with an AI study coach (Scout).

## 第 4 页

Insert screenshot
Weekly timetable / planner
take it on your phone or from the store page
Insert screenshot
Scout AI study coach
take it on your phone or from the store page
Strengths
Strong organisation: class timetable, homework
planner, exam calendar and reminders.
Scout, an AI study coach, helps plan study time
and track workload.
Syncs across phone, tablet and computer.
Weaknesses
No learning content or practice questions, so it
cannot see what a student has or has not
understood.
Plans are based on deadlines and workload, not
on the learner’s mastery of each topic.
Mixed rating on Android (3.35) compared with
iOS (4.5); English only.
2.4 Comparison
Quizlet
Brilliant
MyStudyLife
ICT Learning Companion
Subject focus
Any subject (user-
made sets)
Maths, coding,
CS, science
Any (planner only)
HKDSE ICT (Module A first)
Learning content
Flashcards, study
guides
Interactive visual
lessons
None
Micro-lessons with video
and 3 key points
Finds knowledge
gaps
Retention insights
by set
Adaptive, fills
gaps
No
Knowledge map per point,
with evidence and question
count
Plan from
mastery + exam
date
Partly (spaced
repetition)
No exam-date
plan
Plans by schedule
and workload
AI plan from mastery, exam
date and daily time
Help on a wrong
answer
Explanations (Ask
Quizlet)
Guided hints
from the tutor
No
3-step guided questions;
records where the learner
got stuck
Language
Includes
Traditional
Chinese
English
English
English and Traditional
Chinese (switch in Settings)
Cost model
Freemium
Subscription
Freemium
Prototype (not released)
3. Competitive advantages
Each existing app does part of the job well: Brilliant already guides learners with hints, and
MyStudyLife already has an AI planner. The advantage of ICT Learning Companion is that it links
diagnosis, planning and guided correction around one syllabus, using the same learning evidence.

## 第 5 页

1. Built for HKDSE ICT
Micro-lessons follow the ICT curriculum
and textbook order, in English or Traditional
Chinese, so practice and analysis match
what students are examined on.
2. Evidence-based knowledge map
Each knowledge point shows mastered /
review / to confirm, with the number of
questions behind it. With too little data, the
app asks for more practice instead of
guessing.
3. Guided correction, not answer-giving
The AI rebuilds the student’s working and
asks them to judge each step. It records
where the student got stuck (e.g. treating
two’s complement as unsigned), which
feeds the map.
4. Plan from mastery and exam date
The plan is built from mastery, exam date
and daily time, and updates after each task,
so revision time goes to the weakest points
first.
5. Learner control of AI
Students can switch the guide to show
answers directly, turn off AI use of their
records, and rate each AI answer; screens
state that AI may be wrong.
6. Clear first-time experience
Welcome → account → goal → diagnostic
→ first map and plan, with a one-time guide
on the home screen, so new users know
what to do.
4. Design
4.1 Structure and user flow
New users go through Welcome → Sign up → About you → Set goal → Diagnostic intro → AI
diagnostic (10 questions) → Diagnostic result → First AI plan → Today (first-time guide). Returning
users log in and land on Today. The app has five tabs: Today, Learn, Ask AI (centre), Insights
and Me (with Settings). The AI mistake guide runs in a focus mode without the tab bar.
4.2 Wireframes
Low-fidelity, greyscale wireframes for all 23 screens are shown in Appendix A. Each wireframe is
labelled with its main interaction elements (primary button, links, menus). Layout rules: one
primary action per screen at a fixed position near the bottom; back links top-left; touch targets at
least 40 px high; body text at least 12 px.
4.3 UI design
The full-colour screens are shown in Appendix B. The visual style is calm and paper-like to keep
cognitive load low. Colour has one rule: purple = content or actions produced by AI; green =
learning actions.

## 第 6 页

Background #F6F5F1
Learning green #3E6550
AI purple #5B4FA6
AI tint #ECEAF5
Needs review #F7EAD4
Text #2D3230
Typography: Inter for Latin text and Noto Sans TC for Chinese; titles 26–28 px, section titles 17 px,
body 13–14 px, captions 12 px.
4.4 Storyboard with I/O tags
The storyboard (Appendix C, 6 pages) follows the teacher’s flowchart style: section bands, start
and end circles, decision diamonds with YES/NO branches, and page links (A–E). Each screen has
an INPUT tag (data from the learner) above and an OUTPUT tag (data from the app) below, with a
screenshot of the UI. AI processes and stored data (answer records, goal) are shown with their
own symbols, so the data flow behind the AI features is visible.
5. Links
Wireframes and UI (Figma)
add Figma link after importing the 23 SVG screens
Interactive prototype (23
screens)
https://claude.ai/artifact/WRSCVmjd6TWJUMRFDDPQRk
Storyboard with I/O
Appendix C of this report optional: add online link
6. Limitations and future work
This is a design prototype. The AI analysis, study plan and mistake guide are designed but not yet
connected to a live AI service; questions and statistics shown are examples. Future work: connect a
server-side AI service with learning-event data, add a weekly AI report page and exam roadmap, and a
teacher view of class-level weak points.
References
Quizlet: AI-powered flashcards, App Store (US): apps.apple.com/us/app/quizlet-ai-powered-flashcards/i
d546473125
Brilliant: Learn by doing, App Store (US): apps.apple.com/us/app/brilliant-learn-by-doing/id913335252
MyStudyLife: Study Planner, App Store (US): apps.apple.com/us/app/mystudylife-study-planner/id91063
9339
MyStudyLife on Google Play, rating data: appgoblin.info/apps/com.virblue.mystudylife

## 第 7 页

Appendix A · Wireframes (low fidelity)
ICT Learning Companion – Wireframes (low fidelity) 1/2 · Account, onboarding and daily learning
941
••• ▰
ICT Learning Companion
AI finds your weak points and plans revision
1
AI diagnostic
10 questions find your starting point
2
Knowledge map
See what you have not mastered
3
Study plan
20 min a day, weak points first
Get started
Have an account? Log in
1. Welcome
Logo, value line, 3 numbered steps.
Primary: Get started → 02. Link: Log
in → 03.
941
••• ▰
‹ Back
Create account
Save your progress and AI analysis.
Continue with school Google
or use email
Email
alex@student.edu.hk
Password
••••••••
Show
At least 8 characters
Try as a guest (data stays on this phone)
Create account
Have an account? Log in
By continuing you agree to the Terms and Privacy Policy
2. Sign up
Google button, email and password
fields, guest link. Primary: Create
account → 04. Link: Log in.
941
••• ▰
‹ Back
Welcome back
Log in to sync your knowledge map and plan.
Continue with school Google
or use email
Email
alex@student.edu.hk
Password
••••••••
Show
Forgot password?
Log in
No account? Sign up
3. Log in
Google button, email and password,
Forgot password link. Primary: Log
in → 11.
941
••• ▰
‹ Back
1 / 3
About you
Just two details.
Nickname
Alex
Grade
S4
S5
S6
Your grade sets the exam date and syllabus.
Next
4. About you
Progress 1/3, nickname field, grade
chips (single choice). Primary:
Next.
941
••• ▰
‹ Back
2 / 3
Set your goal
AI uses these to size each dayʼs work.
Exam date
15 April 2027
Filled in from S5 · tap to edit
Time per day
10 min
20 min
30 min
You can change this later in your plan.
Next
5. Set your goal
Progress 2/3, exam date (tap to
edit), daily-time chips. Primary:
Next.
941
••• ▰
‹ Back
3 / 3
Answer 10 questions
so AI knows you
About 5 minutes
Pause any time
Not graded
Wrong answers are fine here
Difficulty adapts
AI picks the next question for you
AI
What you will get
Your first knowledge map
+ your first AI study plan
Start diagnostic
Skip for now
6. Diagnostic intro
Progress 3/3, three reassurance
rows, AI card. Primary: Start
diagnostic. Link: Skip for now.
941
••• ▰
‹ Later
AI DIAGNOSTIC · 3 / 10
Your starting point
About 5 min, not graded
AI adjusted the difficulty
8-bit twoʼs complement 11111110
equals which decimal number?
A
254
B
2
C
1
D
126
Submit
When you finish, AI draws your knowledge map
7. AI diagnostic question
Progress 3/10, adaptive tag, four
answer options. Primary: Submit.
941
••• ▰
DIAGNOSTIC DONE · 10 QUESTIONS
Your starting point
AI drew your first map from 10 answers
Knowledge map
Grey = not tested yet
A1
A2
A3
A4
Mastered
Review
To confirm
AI analysis
Start with data representation
Strong: information basics
To improve: twoʼs complement, overflow
Based on 10 answers so far
Create my first study plan
8. Diagnostic result
Knowledge-map grid and legend, AI
summary card. Primary: Create my
first study plan.
941
••• ▰
‹ Today
AI STUDY PLAN
Weak points first
Until 15 Apr · 20 min a day
Today
0 / 3 done
Review · twoʼs complement
8 min
Weak
Practice · 3 overflow Qs
7 min
Weak
Review · data hierarchy
5 min
Keep
AI
Why this plan?
Your weakest points go first this week.
The plan updates after each task.
Start todayʼs tasks
Today
Learn
Ask AI
Insights
Me
9. First AI study plan
Back link, three task rows with
tags, AI “why” card. Primary: Start
today’s tasks.
941
••• ▰
WEDNESDAY · 11 NOV
Morning, Alex
155 days until DSE ICT
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
Continue
A3.4 Twoʼs complement
Module A mastery
62%
Today
Learn
Ask AI
Insights
Me
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
1 / 2
Start here every day
AI plans tasks from your weak points
and time. Just tap “Start todayʼs planˮ.
Next
2 / 2 ask AI any time
10. Today: first-time guide
Dimmed overlay, highlighted AI card,
tooltip 1/2 with Next, highlighted
Ask AI tab.
941
••• ▰
WEDNESDAY · 11 NOV
Morning, Alex
155 days until DSE ICT
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
Continue
A3.4 Twoʼs complement
Module A mastery
62%
Today
Learn
Ask AI
Insights
Me
11. Today
AI suggestion card with three task
chips, continue card, mastery bar,
5-tab bar.
941
••• ▰
LEARN · COMPULSORY PART
Choose a topic
Search topics or concepts
AI picks for you
A3.4 Twoʼs complement
Weak · first try 1 / 4
A3.5 Overflow
Weak · first try 1 / 3
A
Information processing
30 lessons · 62% mastered
B
Computer systems
24 lessons · not started
C
Internet and applications
26 lessons · not started
D
Computational thinking
32 lessons · not started
E
Social implications
18 lessons · not started
Today
Learn
Ask AI
Insights
Me
12. Choose topic
Search field, AI-recommended list,
module list A–E with progress.

## 第 8 页

ICT Learning Companion – Wireframes (low fidelity) 2/2 · AI mistake guide, Ask AI, analysis and profile
941
••• ▰
‹ Choose a topic
A3.4 · ABOUT 8 MIN
Twoʼs complement
Storing negative numbers in 8 bits
1111 1110
= 2
214 · intro video
AI reminder: last time you misread
the sign bit. Watch key point 2.
01
The top bit is the sign bit
02
Negative = invert  1
03
Range 128 to 127
Start practice
Today
Learn
Ask AI
Insights
Me
13. Lesson
Video card with play button, AI
reminder, three key points. Primary:
Start practice.
941
••• ▰
‹ Twoʼs complement
PRACTICE · 2 / 5
01100100  00110010
8-bit)  ?
A
150
B
106
C
Overflow, result is wrong
AI hint 1 / 3
Next hint
Largest 8-bit twoʼs complement value?
Shows the way, not the answer
Submit
Today
Learn
Ask AI
Insights
Me
14. Practice + AI hint
Progress, question, three options,
AI hint card with Next hint.
Primary: Submit.
941
••• ▰
‹ End guide
AI GUIDE · STEP 1 / 3
Letʼs find the problem
01100100  00110010 8-bit)  ?
Your answer: A · 150
Not yet
No answer yet.
Weʼll check your working step by step.
Step 1
Is this your working?
01100100
 100
00110010
 50
100  50
 150
Is this step right?
Yes
No
Show me the answer
15. Guide step 1
Focus mode (no tab bar), step bar,
recap with Not yet tag, Yes / No
buttons, skip link.
941
••• ▰
‹ End guide
AI GUIDE · STEP 2 / 3
Letʼs find the problem
✓
Step 1 decimal sum  150
correct
Step 2
Range of 8-bit twoʼs complement?
A
0 to 255
✕
B
128 to 127
C
256 to 255
AI hint
0 to 255 is the unsigned range.
Think: what does the top bit stand for?
Choose again.
Show me the answer
16. Guide step 2
Done row for step 1, range question
with wrong option marked, AI hint
card.
941
••• ▰
‹ End guide
AI GUIDE · STEP 3 / 3
Letʼs find the problem
✓
Step 1 decimal sum  150
correct
✓
Step 2 range is 128 to 127
2nd try
Step 3
Does 150 fit in this range?
It fits
It doesnʼt
Right: 150 is more than 127.
The result 10010110 starts with 1,
so it is read as negative.
So, what is the answer?
A
150
B
106
C
Overflow, result is wrong
Confirm answer
17. Guide step 3
Two done rows, It fits / It doesn’t,
AI confirmation, final options.
Primary: Confirm answer.
941
••• ▰
‹ Practice · 2 / 5
AI GUIDE · DONE
You found the answer!
C
Overflow, result is wrong
✓
AI recap
Key idea: check the range first
① Decimal sum  150
② Range 128 to 127  stuck here
③ 150 is out of range → overflow
May be wrong · Report
Helpful
Not helpful
Saved to knowledge map: overflow
Stuck on: reading it as unsigned
Try a similar question
Ask AI more
Today
Learn
Ask AI
Insights
Me
18. Guide recap
Correct-answer row, AI recap card,
feedback buttons, saved-to-map row.
Primary: Try a similar question.
941
••• ▰
AI TUTOR
Ask AI
Answers use your learning record
Why invert, then add 1?
AI tutor
So positive and negative numbers can
be added by the same circuit.
3  3 00000011  11111101  0
Try 2 overflow questions?
May be wrong · Report
Helpful
Not helpful
Do 2
Another example
Type your question…
Today
Learn
Ask AI
Insights
Me
19. Ask AI
Learner bubble, AI bubble with
example and feedback, action chips,
input bar.
941
••• ▰
AI INSIGHTS · MODULE A
Find the gaps
Based on 42 answers · updated today 0920
Knowledge map
Tap a cell for evidence
A1
A2
A3
A4
Mastered
Review
To confirm
AI analysis
Weakest: twoʼs complement
Evidence: misread the sign bit, 3 of 4
Review it, then try 3 applied questions.
Based on 4 answers · AI may be wrong
Create a study plan from this
Today
Learn
Ask AI
Insights
Me
20. Knowledge map
Map grid and legend, AI card with
evidence count. Primary: Create a
study plan.
941
••• ▰
AI INSIGHTS · MODULE A
Find the gaps
Based on 42 answers · updated today 0920
Knowledge map
Tap a cell for evidence
A1
A2
A3
A4
Mastered
Review
To confirm
Not enough data
A4 not enough data yet
You have answered only 1 question here.
Do 3 more and AI can find the gaps.
Do 3 A4 questions
Today
Learn
Ask AI
Insights
Me
21. Map: not enough data
Grey row for A4, notice card.
Primary: Do 3 A4 questions.
941
••• ▰
A
Alex
S5 · alex@student.edu.hk
12 days
day streak
186
answered
18
mastered
My goal
DSE ICT · 15 Apr 2027
20 min a day · 155 days left
Edit
This weekʼs AI report
3 points mastered · predicted level 4  5
Mistake book
12 questions · AI guide history
›
Learning record
186 questions · exportable
›
Settings
Learning, AI, account
›
Today
Learn
Ask AI
Insights
Me
22. Me
Avatar and name, three stat tiles,
goal card with Edit, AI report card,
menu list.
941
••• ▰
‹ Me
Settings
Learning
Time per day
20 min ›
Study reminder 1930
Language
English ›
AI
Mistake guide mode
Step by step ›
AI uses my answers
If off, AI stops analysing your answers.
Account
Change password
›
Export learning record
JSON ›
Log out
Today
Learn
Ask AI
Insights
Me
23. Settings
Grouped list (Learning / AI /
Account), toggles, Log out at the
bottom.

## 第 9 页

Appendix B · UI design
ICT Learning Companion – UI design 1/2 · Account, onboarding and daily learning
941
••• ▰
ICT Learning Companion
AI finds your weak points and plans revision
1
AI diagnostic
10 questions find your starting point
2
Knowledge map
See what you have not mastered
3
Study plan
20 min a day, weak points first
Get started
Have an account? Log in
1. Welcome
941
••• ▰
‹ Back
Create account
Save your progress and AI analysis.
Continue with school Google
or use email
Email
alex@student.edu.hk
Password
••••••••
Show
At least 8 characters
Try as a guest (data stays on this phone)
Create account
Have an account? Log in
By continuing you agree to the Terms and Privacy Policy
2. Sign up
941
••• ▰
‹ Back
Welcome back
Log in to sync your knowledge map and plan.
Continue with school Google
or use email
Email
alex@student.edu.hk
Password
••••••••
Show
Forgot password?
Log in
No account? Sign up
3. Log in
941
••• ▰
‹ Back
1 / 3
About you
Just two details.
Nickname
Alex
Grade
S4
S5
S6
Your grade sets the exam date and syllabus.
Next
4. About you
941
••• ▰
‹ Back
2 / 3
Set your goal
AI uses these to size each dayʼs work.
Exam date
15 April 2027
Filled in from S5 · tap to edit
Time per day
10 min
20 min
30 min
You can change this later in your plan.
Next
5. Set your goal
941
••• ▰
‹ Back
3 / 3
Answer 10 questions
so AI knows you
About 5 minutes
Pause any time
Not graded
Wrong answers are fine here
Difficulty adapts
AI picks the next question for you
AI
What you will get
Your first knowledge map
+ your first AI study plan
Start diagnostic
Skip for now
6. Diagnostic intro
941
••• ▰
‹ Later
AI DIAGNOSTIC · 3 / 10
Your starting point
About 5 min, not graded
AI adjusted the difficulty
8-bit twoʼs complement 11111110
equals which decimal number?
A
254
B
2
C
1
D
126
Submit
When you finish, AI draws your knowledge map
7. AI diagnostic question
941
••• ▰
DIAGNOSTIC DONE · 10 QUESTIONS
Your starting point
AI drew your first map from 10 answers
Knowledge map
Grey = not tested yet
A1
A2
A3
A4
Mastered
Review
To confirm
AI analysis
Start with data representation
Strong: information basics
To improve: twoʼs complement, overflow
Based on 10 answers so far
Create my first study plan
8. Diagnostic result
941
••• ▰
‹ Today
AI STUDY PLAN
Weak points first
Until 15 Apr · 20 min a day
Today
0 / 3 done
Review · twoʼs complement
8 min
Weak
Practice · 3 overflow Qs
7 min
Weak
Review · data hierarchy
5 min
Keep
AI
Why this plan?
Your weakest points go first this week.
The plan updates after each task.
Start todayʼs tasks
Today
Learn
Ask AI
Insights
Me
9. First AI study plan
941
••• ▰
WEDNESDAY · 11 NOV
Morning, Alex
155 days until DSE ICT
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
Continue
A3.4 Twoʼs complement
Module A mastery
62%
Today
Learn
Ask AI
Insights
Me
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
1 / 2
Start here every day
AI plans tasks from your weak points
and time. Just tap “Start todayʼs planˮ.
Next
2 / 2 ask AI any time
10. Today: first-time guide
941
••• ▰
WEDNESDAY · 11 NOV
Morning, Alex
155 days until DSE ICT
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
Continue
A3.4 Twoʼs complement
Module A mastery
62%
Today
Learn
Ask AI
Insights
Me
11. Today
941
••• ▰
LEARN · COMPULSORY PART
Choose a topic
Search topics or concepts
AI picks for you
A3.4 Twoʼs complement
Weak · first try 1 / 4
A3.5 Overflow
Weak · first try 1 / 3
A
Information processing
30 lessons · 62% mastered
B
Computer systems
24 lessons · not started
C
Internet and applications
26 lessons · not started
D
Computational thinking
32 lessons · not started
E
Social implications
18 lessons · not started
Today
Learn
Ask AI
Insights
Me
12. Choose topic

## 第 10 页

ICT Learning Companion – UI design 2/2 · AI mistake guide, Ask AI, analysis and profile
941
••• ▰
‹ Choose a topic
A3.4 · ABOUT 8 MIN
Twoʼs complement
Storing negative numbers in 8 bits
1111 1110
= 2
214 · intro video
AI reminder: last time you misread
the sign bit. Watch key point 2.
01
The top bit is the sign bit
02
Negative = invert  1
03
Range 128 to 127
Start practice
Today
Learn
Ask AI
Insights
Me
13. Lesson
941
••• ▰
‹ Twoʼs complement
PRACTICE · 2 / 5
01100100  00110010
8-bit)  ?
A
150
B
106
C
Overflow, result is wrong
AI hint 1 / 3
Next hint
Largest 8-bit twoʼs complement value?
Shows the way, not the answer
Submit
Today
Learn
Ask AI
Insights
Me
14. Practice + AI hint
941
••• ▰
‹ End guide
AI GUIDE · STEP 1 / 3
Letʼs find the problem
01100100  00110010 8-bit)  ?
Your answer: A · 150
Not yet
No answer yet.
Weʼll check your working step by step.
Step 1
Is this your working?
01100100
 100
00110010
 50
100  50
 150
Is this step right?
Yes
No
Show me the answer
15. Guide step 1
941
••• ▰
‹ End guide
AI GUIDE · STEP 2 / 3
Letʼs find the problem
✓
Step 1 decimal sum  150
correct
Step 2
Range of 8-bit twoʼs complement?
A
0 to 255
✕
B
128 to 127
C
256 to 255
AI hint
0 to 255 is the unsigned range.
Think: what does the top bit stand for?
Choose again.
Show me the answer
16. Guide step 2
941
••• ▰
‹ End guide
AI GUIDE · STEP 3 / 3
Letʼs find the problem
✓
Step 1 decimal sum  150
correct
✓
Step 2 range is 128 to 127
2nd try
Step 3
Does 150 fit in this range?
It fits
It doesnʼt
Right: 150 is more than 127.
The result 10010110 starts with 1,
so it is read as negative.
So, what is the answer?
A
150
B
106
C
Overflow, result is wrong
Confirm answer
17. Guide step 3
941
••• ▰
‹ Practice · 2 / 5
AI GUIDE · DONE
You found the answer!
C
Overflow, result is wrong
✓
AI recap
Key idea: check the range first
① Decimal sum  150
② Range 128 to 127  stuck here
③ 150 is out of range → overflow
May be wrong · Report
Helpful
Not helpful
Saved to knowledge map: overflow
Stuck on: reading it as unsigned
Try a similar question
Ask AI more
Today
Learn
Ask AI
Insights
Me
18. Guide recap
941
••• ▰
AI TUTOR
Ask AI
Answers use your learning record
Why invert, then add 1?
AI tutor
So positive and negative numbers can
be added by the same circuit.
3  3 00000011  11111101  0
Try 2 overflow questions?
May be wrong · Report
Helpful
Not helpful
Do 2
Another example
Type your question…
Today
Learn
Ask AI
Insights
Me
19. Ask AI
941
••• ▰
AI INSIGHTS · MODULE A
Find the gaps
Based on 42 answers · updated today 0920
Knowledge map
Tap a cell for evidence
A1
A2
A3
A4
Mastered
Review
To confirm
AI analysis
Weakest: twoʼs complement
Evidence: misread the sign bit, 3 of 4
Review it, then try 3 applied questions.
Based on 4 answers · AI may be wrong
Create a study plan from this
Today
Learn
Ask AI
Insights
Me
20. Knowledge map
941
••• ▰
AI INSIGHTS · MODULE A
Find the gaps
Based on 42 answers · updated today 0920
Knowledge map
Tap a cell for evidence
A1
A2
A3
A4
Mastered
Review
To confirm
Not enough data
A4 not enough data yet
You have answered only 1 question here.
Do 3 more and AI can find the gaps.
Do 3 A4 questions
Today
Learn
Ask AI
Insights
Me
21. Map: not enough data
941
••• ▰
A
Alex
S5 · alex@student.edu.hk
12 days
day streak
186
answered
18
mastered
My goal
DSE ICT · 15 Apr 2027
20 min a day · 155 days left
Edit
This weekʼs AI report
3 points mastered · predicted level 4  5
Mistake book
12 questions · AI guide history
›
Learning record
186 questions · exportable
›
Settings
Learning, AI, account
›
Today
Learn
Ask AI
Insights
Me
22. Me
941
••• ▰
‹ Me
Settings
Learning
Time per day
20 min ›
Study reminder 1930
Language
English ›
AI
Mistake guide mode
Step by step ›
AI uses my answers
If off, AI stops analysing your answers.
Account
Change password
›
Export learning record
JSON ›
Log out
Today
Learn
Ask AI
Insights
Me
23. Settings

## 第 11 页

Appendix C · Storyboard with I/O tags
ICT Learning Companion – Storyboard with I/O (1/6) · Account and onboarding
START
ACCOUNT AND ONBOARDING
Open
the App
INPUT
Read the 3-step intro;
tap Get started or Log in
941
••• ▰
ICT Learning Companion
AI finds your weak points and plans revision
1
AI diagnostic
10 questions find your starting point
2
Knowledge map
See what you have not mastered
3
Study plan
20 min a day, weak points first
Get started
Have an account? Log in
1. Welcome
UI 01
OUTPUT
What the app does:
diagnose → map → plan
Has an
account?
YES
INPUT
Email + password, or
school Google account
3. Log in
UI 03
E
to 11. Today (p.3)
OUTPUT: knowledge map and
study plan synced from the account
INPUT
Email + password, Google,
or try as a guest
941
••• ▰
‹ Back
Create account
Save your progress and AI analysis.
Continue with school Google
or use email
Email
alex@student.edu.hk
Password
••••••••
Show
At least 8 characters
Try as a guest (data stays on this phone)
Create account
Have an account? Log in
By continuing you agree to the Terms and Privacy Policy
2. Sign up
UI 02
OUTPUT
Account created; data can
sync across devices
NO
INPUT
Nickname and grade (S4 /
S5 / S6)
941
••• ▰
‹ Back
1 / 3
About you
Just two details.
Nickname
Alex
Grade
S4
S5
S6
Your grade sets the exam date and syllabus.
Next
4. About you
UI 04
OUTPUT
Exam date and syllabus
estimated from the grade
INPUT
Confirm exam date; choose
10 / 20 / 30 min a day
941
••• ▰
‹ Back
2 / 3
Set your goal
AI uses these to size each dayʼs work.
Exam date
15 April 2027
Filled in from S5 · tap to edit
Time per day
10 min
20 min
30 min
You can change this later in your plan.
Next
5. Set your goal
UI 05
OUTPUT
Goal saved and passed to
the AI planner
A
page 2
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Process (no screen)
Start / page link
End
UI n = screen number in the UI design

## 第 12 页

ICT Learning Companion – Storyboard with I/O (2/6) · AI diagnostic and first plan
AI DIAGNOSTIC AND FIRST PLAN
A
page 1
INPUT
Read why (5 min, not
graded); tap Start
diagnostic
941
••• ▰
‹ Back
3 / 3
Answer 10 questions
so AI knows you
About 5 minutes
Pause any time
Not graded
Wrong answers are fine here
Difficulty adapts
AI picks the next question for you
AI
What you will get
Your first knowledge map
+ your first AI study plan
Start diagnostic
Skip for now
6. Diagnostic intro
UI 06
OUTPUT
Promises the first
knowledge map and first
plan
Start the
diagnostic now?
NO (skip)
Skip for now
→ 21. Map: not enough data (p.5)
INPUT
Choose an answer; tap
Submit
941
••• ▰
‹ Later
AI DIAGNOSTIC · 3 / 10
Your starting point
About 5 min, not graded
AI adjusted the difficulty
8-bit twoʼs complement 11111110
equals which decimal number?
A
254
B
2
C
1
D
126
Submit
When you finish, AI draws your knowledge map
7. AI diagnostic question
UI 07
OUTPUT
Next question; AI adjusts
the difficulty
YES
10 questions
done?
NO
next question
INPUT
Tap Create my first study
plan
941
••• ▰
DIAGNOSTIC DONE · 10 QUESTIONS
Your starting point
AI drew your first map from 10 answers
Knowledge map
Grey = not tested yet
A1
A2
A3
A4
Mastered
Review
To confirm
AI analysis
Start with data representation
Strong: information basics
To improve: twoʼs complement, overflow
Based on 10 answers so far
Create my first study plan
8. Diagnostic result
UI 08
OUTPUT
AI first knowledge map:
strengths and weak points
(10 questions)
YES
INPUT
Read today’s tasks and
“Why this plan?”
941
••• ▰
‹ Today
AI STUDY PLAN
Weak points first
Until 15 Apr · 20 min a day
Today
0 / 3 done
Review · twoʼs complement
8 min
Weak
Practice · 3 overflow Qs
7 min
Weak
Review · data hierarchy
5 min
Keep
AI
Why this plan?
Your weakest points go first this week.
The plan updates after each task.
Start todayʼs tasks
Today
Learn
Ask AI
Insights
Me
9. First AI study plan
UI 09
OUTPUT
3 tasks, weak points
first, with the AI’s
reasons
B
page 3
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Process (no screen)
Start / page link
End
UI n = screen number in the UI design

## 第 13 页

ICT Learning Companion – Storyboard with I/O (3/6) · Daily learning
DAILY LEARNING
B
page 2
E
from login (p.1)
INPUT
Tap Next (shown only
once)
941
••• ▰
WEDNESDAY · 11 NOV
Morning, Alex
155 days until DSE ICT
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
Continue
A3.4 Twoʼs complement
Module A mastery
62%
Today
Learn
Ask AI
Insights
Me
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
1 / 2
Start here every day
AI plans tasks from your weak points
and time. Just tap “Start todayʼs planˮ.
Next
2 / 2 ask AI any time
10. Today: first-time guide
UI 10
OUTPUT
Points out the AI card
and the Ask AI button
INPUT
Tap Start today’s plan or
a task
941
••• ▰
WEDNESDAY · 11 NOV
Morning, Alex
155 days until DSE ICT
AI suggestion for today
Today: 20 minutes
on twoʼs complement.
You missed twoʼs complement twice in a row.
Twoʼs comp.
8 min
Overflow
7 min
Review
5 min
Start todayʼs plan
Continue
A3.4 Twoʼs complement
Module A mastery
62%
Today
Learn
Ask AI
Insights
Me
11. Today
UI 11
OUTPUT
AI daily suggestion, 3
tasks, mastery
Follow the
AI plan?
NO
12. Choose topic · UI 12
I: pick a topic
O: AI recommends weak topics first
INPUT
Watch the video; read 3
key points
941
••• ▰
‹ Choose a topic
A3.4 · ABOUT 8 MIN
Twoʼs complement
Storing negative numbers in 8 bits
1111 1110
= 2
214 · intro video
AI reminder: last time you misread
the sign bit. Watch key point 2.
01
The top bit is the sign bit
02
Negative = invert  1
03
Range 128 to 127
Start practice
Today
Learn
Ask AI
Insights
Me
13. Lesson
UI 13
OUTPUT
AI reminder of the last
mistake; key point 2
highlighted
YES
INPUT
Choose an answer; open
hints 1–3; submit
941
••• ▰
‹ Twoʼs complement
PRACTICE · 2 / 5
01100100  00110010
8-bit)  ?
A
150
B
106
C
Overflow, result is wrong
AI hint 1 / 3
Next hint
Largest 8-bit twoʼs complement value?
Shows the way, not the answer
Submit
Today
Learn
Ask AI
Insights
Me
14. Practice + AI hint
UI 14
OUTPUT
Hints show the way, never
the answer
Correct?
YES
next question
NO
C
page 4
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Process (no screen)
Start / page link
End
UI n = screen number in the UI design

## 第 14 页

ICT Learning Companion – Storyboard with I/O (4/6) · AI mistake guide
AI MISTAKE GUIDE (STEP BY STEP, ANSWER NOT SHOWN FIRST)
C
page 3
INPUT
Judge your own working:
Yes / No
941
••• ▰
‹ End guide
AI GUIDE · STEP 1 / 3
Letʼs find the problem
01100100  00110010 8-bit)  ?
Your answer: A · 150
Not yet
No answer yet.
Weʼll check your working step by step.
Step 1
Is this your working?
01100100
 100
00110010
 50
100  50
 150
Is this step right?
Yes
No
Show me the answer
15. Guide step 1
UI 15
OUTPUT
AI rebuilds your working;
correct answer hidden
Judged
correctly?
NO
OUTPUT
AI gives a hint and asks
again
try again
INPUT
Choose the 8-bit range
941
••• ▰
‹ End guide
AI GUIDE · STEP 2 / 3
Letʼs find the problem
✓
Step 1 decimal sum  150
correct
Step 2
Range of 8-bit twoʼs complement?
A
0 to 255
✕
B
128 to 127
C
256 to 255
AI hint
0 to 255 is the unsigned range.
Think: what does the top bit stand for?
Choose again.
Show me the answer
16. Guide step 2
UI 16
OUTPUT
If wrong: hint about the
misconception; choose
again
YES
INPUT
Judge if 150 fits; choose
the final answer
941
••• ▰
‹ End guide
AI GUIDE · STEP 3 / 3
Letʼs find the problem
✓
Step 1 decimal sum  150
correct
✓
Step 2 range is 128 to 127
2nd try
Step 3
Does 150 fit in this range?
It fits
It doesnʼt
Right: 150 is more than 127.
The result 10010110 starts with 1,
so it is read as negative.
So, what is the answer?
A
150
B
106
C
Overflow, result is wrong
Confirm answer
17. Guide step 3
UI 17
OUTPUT
Confirms the reasoning;
learner picks the answer
Final answer
correct?
NO
hint, try again
INPUT
Rate Helpful / Not
helpful; tap Try a
similar question
941
••• ▰
‹ Practice · 2 / 5
AI GUIDE · DONE
You found the answer!
C
Overflow, result is wrong
✓
AI recap
Key idea: check the range first
① Decimal sum  150
② Range 128 to 127  stuck here
③ 150 is out of range → overflow
May be wrong · Report
Helpful
Not helpful
Saved to knowledge map: overflow
Stuck on: reading it as unsigned
Try a similar question
Ask AI more
Today
Learn
Ask AI
Insights
Me
18. Guide recap
UI 18
OUTPUT
3-step recap, where you
got stuck, saved to the
map
YES
D
page 5
On every guide step — INPUT: Show me the answer
→ jump to 18. Guide recap (answer shown)
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Process (no screen)
Start / page link
End
UI n = screen number in the UI design

## 第 15 页

ICT Learning Companion – Storyboard with I/O (5/6) · AI analysis and study-plan loop
AI ANALYSIS AND STUDY-PLAN LOOP
D
page 4
Answer records
each step, hints,
retries, time
AI analyses
knowledge gaps
finds weak points and
repeated misconceptions
Enough data
for the topic?
NO
941
••• ▰
AI INSIGHTS · MODULE A
Find the gaps
Based on 42 answers · updated today 0920
Knowledge map
Tap a cell for evidence
A1
A2
A3
A4
Mastered
Review
To confirm
Not enough data
A4 not enough data yet
You have answered only 1 question here.
Do 3 more and AI can find the gaps.
Do 3 A4 questions
Today
Learn
Ask AI
Insights
Me
21. Map: not enough data
O: “do 3 more questions”
→ 14. Practice (p.3)
INPUT
Tap a cell to see
evidence; tap Create a
study plan
941
••• ▰
AI INSIGHTS · MODULE A
Find the gaps
Based on 42 answers · updated today 0920
Knowledge map
Tap a cell for evidence
A1
A2
A3
A4
Mastered
Review
To confirm
AI analysis
Weakest: twoʼs complement
Evidence: misread the sign bit, 3 of 4
Review it, then try 3 applied questions.
Based on 4 answers · AI may be wrong
Create a study plan from this
Today
Learn
Ask AI
Insights
Me
20. Knowledge map
UI 20
OUTPUT
Mastered / review / to
confirm, with evidence
and question count
YES
AI updates
the study plan
weak points first,
fits exam date and daily time
Goal
exam date, daily time
Next day: 11. Today
new AI suggestion
Loop
repeats daily
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Process (no screen)
Start / page link
End
UI n = screen number in the UI design

## 第 16 页

ICT Learning Companion – Storyboard with I/O (6/6) · Ask AI and profile
ASK AI (ANY TIME)
ME AND SETTINGS
Tap Ask AI
tab
INPUT
Type a question or tap a
suggestion; rate the
answer
941
••• ▰
AI TUTOR
Ask AI
Answers use your learning record
Why invert, then add 1?
AI tutor
So positive and negative numbers can
be added by the same circuit.
3  3 00000011  11111101  0
Try 2 overflow questions?
May be wrong · Report
Helpful
Not helpful
Do 2
Another example
Type your question…
Today
Learn
Ask AI
Insights
Me
19. Ask AI
UI 19
OUTPUT
Answer that uses the
learning record; offers 2
practice questions
Practise now?
YES
→ 14. Practice
(page 3)
NO
keep asking
Tap Me
tab
INPUT
Tap Edit (goal), Mistake
book or Settings
941
••• ▰
A
Alex
S5 · alex@student.edu.hk
12 days
day streak
186
answered
18
mastered
My goal
DSE ICT · 15 Apr 2027
20 min a day · 155 days left
Edit
This weekʼs AI report
3 points mastered · predicted level 4  5
Mistake book
12 questions · AI guide history
›
Learning record
186 questions · exportable
›
Settings
Learning, AI, account
›
Today
Learn
Ask AI
Insights
Me
22. Me
UI 22
OUTPUT
Streak, questions done,
mastered points, weekly
AI report
INPUT
Daily time, reminder, AI
guide mode, AI data
toggle
941
••• ▰
‹ Me
Settings
Learning
Time per day
20 min ›
Study reminder 1930
Language
English ›
AI
Mistake guide mode
Step by step ›
AI uses my answers
If off, AI stops analysing your answers.
Account
Change password
›
Export learning record
JSON ›
Log out
Today
Learn
Ask AI
Insights
Me
23. Settings
UI 23
OUTPUT
Settings saved; AI stops
analysing if the toggle
is off
Log out?
YES
End
NO
back to the app
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Process (no screen)
Start / page link
End
UI n = screen number in the UI design
