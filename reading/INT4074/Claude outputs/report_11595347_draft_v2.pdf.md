# report_11595347_draft_v2.pdf

原件：INT4074/Claude outputs/report_11595347_draft_v2.pdf

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
Why these three. Each app is a leading example of one way students study with a phone today,
and each has more than 100,000 App Store ratings: an AI tutor on a course platform (Khan
Academy), an AI problem solver (Photomath) and a flashcard and practice app (Quizlet).
Together they cover the three things this app combines: lessons, practice, and AI help with
mistakes.
Method. All three apps are rated on the same five criteria (Section 2.4), taken from the needs of
an HKDSE ICT student. Ratings are App Store (US) and Google Play figures from third-party app
trackers, checked on 11 November 2026; prices are in US dollars and may differ in Hong Kong.
verify ratings on the HK App Store when taking screenshots
2.1 Khan Academy · Free course platform with an AI tutor (Khanmigo)
Developer
Khan Academy (non-profit)
URL
https://apps.apple.com/us/app/khan-academy/id469863705
Rating
4.6 / 5 on App Store (about 104K ratings); 4.2 / 5 on Google Play (about 172K
ratings)
Price
Free; Khanmigo AI tutor US$4 per month or US$44 per year
What it does
Video lessons and mastery-based practice in maths, science, computing and more.
Khanmigo is an AI tutor that guides with questions instead of giving answers.
Insert screenshot
Unit page with mastery progress
Insert screenshot
Khanmigo page (App Store screenshot)

## 第 3 页

Strengths
Large, high-quality free library with practice
and mastery tracking per skill.
Khanmigo uses Socratic questioning: it asks the
learner to explain their reasoning instead of
solving the problem for them.
Non-profit with no ads, so learners are not
pushed to pay for core lessons.
Weaknesses
Full learner access to Khanmigo is only
available in the United States, so a Hong Kong
student cannot use the AI tutor.
Content follows the US curriculum, not the
HKDSE ICT syllabus or exam format.
The app states that not all website functions are
available in the app.
User evidence. On the Khan Academy help forum, users outside the US report signing up for Khanmigo
and finding it was not available in their country.
2.2 Photomath · AI problem solver (scan a question, get the solution)
Developer
Google
URL
https://apps.apple.com/us/app/photomath/id919087726
Rating
4.8 / 5 on App Store (about 733K ratings); 4.3 / 5 on Google Play (about 3.1M
ratings)
Price
Free; Photomath Plus subscription for full step explanations
What it does
Learners scan a maths problem with the camera and get the answer with step-by-
step solution methods.
Insert screenshot
Scan result with solution steps
Insert screenshot
Photomath Plus prompt on a step
Strengths
Very fast: one scan gives a full worked solution.
Shows several solution methods, which helps
students check homework.
Very large user base and high App Store rating.
Weaknesses
The full solution appears at once, so students
can copy it without thinking through the steps
themselves.
Detailed explanations of each step need the
paid Plus plan.
Maths only; it does not track which topics a
learner is weak in or plan revision.
User evidence. A Canadian App Store reviewer calls it very helpful, but says you must pay to have a step
fully explained.

## 第 4 页

2.3 Quizlet · Flashcard and practice app
Developer
Quizlet Inc
URL
https://apps.apple.com/us/app/quizlet-ai-powered-flashcards/id546473125
Rating
4.8 / 5 on App Store (about 1.1M ratings); 4.7 / 5 on Google Play (about 885K ratings)
Price
Free with ads; Quizlet Plus US$7.99 per month or US$35.99 per year
What it does
Learners create or search flashcard sets and study them with Flashcards, Learn,
Test and Match modes.
Insert screenshot
Learn mode question with feedback
Insert screenshot
Free-plan limit / Quizlet Plus prompt
Strengths
Huge library of user-made study sets covering
almost every subject.
Learn mode brings back terms the learner
misses until they are remembered.
Quick to use on a phone for short revision
sessions.
Weaknesses
Study sets are user-made, so quality varies and
they are not mapped to the HKDSE ICT
syllabus.
Feedback shows the correct answer but does
not find which step of the learner’s reasoning
was wrong; the Q-Chat AI tutor was
discontinued in June 2025.
Free users get a limited number of Learn and
Test rounds; full access needs Quizlet Plus.
User evidence. Third-party review sites report a low Trustpilot score, mainly from users upset that Learn
and Test modes moved behind Quizlet Plus.

## 第 5 页

2.4 Comparison on five criteria
Criterion (score 1–5)
Khan Academy
Photomath
Quizlet
ICT Learning
Companion*
C1 Fits the HKDSE
ICT syllabus
2
 US curriculum;
some computing
courses
1
 Maths only
2
 User-made
sets, quality
varies
5
 Built on the ICT
syllabus
C2 Finds each
learner’s knowledge
gaps
4
 Mastery per skill
1
 No learner
model
3
 Learn mode
tracks missed
terms
4
 Diagnostic and
knowledge map
C3 Helps the learner
fix a mistake
3
 Khanmigo
guides, but US-only
2
 Shows the full
solution at once
2
 Shows
correct answer
only
5
 3-step guide,
answer on request
C4 Plans revision to
an exam date
2
 Mastery goals,
no exam plan
1
 None
2
 No exam-
date plan
5
 Plan from gaps,
exam date, daily time
C5 Access and cost
for HK students
3
 Free lessons; AI
tutor US-only
4
 Free scan;
steps need Plus
3
 Free with
ads; Learn mode
capped
4
 Free core
features (planned)
Total (out of 25)
14
9
12
23
Scale: 1 = not supported, 3 = partly supported, 5 = fully supported. *Design target of the prototype, not a measured
result.
3. Competitive advantages
The comparison shows that no single app covers all five criteria for an HKDSE ICT student. Khan
Academy’s Khanmigo already guides learners with questions, so guided help on its own is not
new. The advantage of ICT Learning Companion is that it brings guided help, gap analysis and
exam planning together for one syllabus, and makes them available to Hong Kong students.

## 第 6 页

1. Revision starts from the
learner’s gaps
GAP IN EXISTING APPS
Quizlet and Photomath do not
know the HKDSE ICT syllabus,
and none of the three plans
revision to an exam date (C1,
C4).
OUR FEATURE
A 10-question AI diagnostic
builds a knowledge map; the AI
plan puts weak points first and
fits the exam date and daily
study time.
WHY IT HELPS LEARNING
Formative assessment: using
evidence of what a student
does not yet know to decide
what to teach next improves
achievement (Black & Wiliam,
1998).
SCREENS
Answer 10 Questions → View
Weak Topics → Get AI Study
Plan
2. Mistakes are fixed by the
learner, not for the learner
GAP IN EXISTING APPS
Photomath shows the full
solution at once; Quizlet shows
only the correct answer;
Khanmigo guides but is not
available to learners in Hong
Kong (C3).
OUR FEATURE
The AI mistake guide asks one
question per step. The learner
judges their own working, gets
a hint when wrong, and sees
the answer only if they ask.
WHY IT HELPS LEARNING
Explaining and retrieving
answers yourself leads to
better understanding and
memory than reading a worked
answer (Chi et al., 1994;
Roediger & Karpicke, 2006).
SCREENS
Practice → Answer AI Question
→ View Recap
3. Each mistake updates
tomorrow’s plan
GAP IN EXISTING APPS
In all three apps, a corrected
mistake is not used to change
what the learner studies next.
OUR FEATURE
The guide records where the
learner got stuck, the
knowledge map updates, and
the next day’s plan targets that
point.
WHY IT HELPS LEARNING
Practice is most useful when it
is focused on specific
weaknesses and repeated over
time (Ericsson et al., 1993).
SCREENS
View Recap → Knowledge Map
→ Open Today
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

## 第 7 页

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
Black, P., & Wiliam, D. (1998). Assessment and classroom learning. Assessment in Education: Principles,
Policy & Practice, 5(1), 7–74.
Chi, M. T. H., de Leeuw, N., Chiu, M.-H., & LaVancher, C. (1994). Eliciting self-explanations improves
understanding. Cognitive Science, 18(3), 439–477.
Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C. (1993). The role of deliberate practice in the acquisition of
expert performance. Psychological Review, 100(3), 363–406.
Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term
retention. Psychological Science, 17(3), 249–255.
Khan Academy, App Store: apps.apple.com/us/app/khan-academy/id469863705; rating data: marlvel.ai

## 第 8 页

Khan Academy Help Center, “Why Khanmigo isn’t available in my country?”: support.khanacademy.org
Photomath, App Store: apps.apple.com/us/app/photomath/id919087726; rating data and reviews: marlvel.a
i, apptail.io
Quizlet, App Store: apps.apple.com/us/app/quizlet-ai-powered-flashcards/id546473125; rating data: marlv
el.ai; pricing and plan limits: nibble-app.com; Q-Chat discontinued: aitoolsatlas.ai
Khanmigo pricing and US-only learner access: kidsaitools.com

## 第 9 页

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

## 第 10 页

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

## 第 11 页

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

## 第 12 页

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

## 第 13 页

Appendix C · Storyboard with I/O tags
START
ACCOUNT AND ONBOARDING
Open
the App
INPUT
Tap Get started
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
OUTPUT
Shows what the app
does
Has an
account?
YES
INPUT
Enter email and
password
Log in
E
OUTPUT: saved plan loads
INPUT
Enter email and
password
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
OUTPUT
Account created
NO
INPUT
Enter nickname and
grade
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
OUTPUT
Exam date estimated
INPUT
Choose exam date and
daily time
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
OUTPUT
Goal sent to AI
planner
A
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Start / page link
End

## 第 14 页

AI DIAGNOSTIC AND FIRST PLAN
A
INPUT
Tap Start diagnostic
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
OUTPUT
Explains the 5-minute
quiz
Start the
diagnostic now?
NO
Skip for now
INPUT
Choose an answer
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
OUTPUT
Next question, AI
adjusts level
YES
10 questions
done?
NO
INPUT
Tap Create study plan
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
OUTPUT
Knowledge map with
weak points
YES
INPUT
Read today’s tasks
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
OUTPUT
3 tasks, weak topics
first
B
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Start / page link
End

## 第 15 页

DAILY LEARNING
B
E
INPUT
Tap Next
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
OUTPUT
Points out AI plan and
Ask AI
INPUT
Tap Start plan
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
OUTPUT
AI plan and 3 tasks
Follow the
AI plan?
NO
Choose topic
AI recommends
weak topics first
INPUT
Watch video, read key
points
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
OUTPUT
AI recalls the last
mistake
YES
INPUT
Answer, or open hints
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
OUTPUT
Hints only, no answer
Correct?
YES
NO
C
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Start / page link
End

## 第 16 页

AI MISTAKE GUIDE
C
INPUT
Judge own working: Yes
/ No
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
OUTPUT
AI shows working,
hides answer
Judged
correctly?
NO
OUTPUT
AI gives a hint and
asks again
INPUT
Choose the range
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
OUTPUT
Hint if wrong
YES
INPUT
Judge, then choose
answer
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
OUTPUT
AI confirms the
reasoning
Final answer
correct?
NO
INPUT
Rate, try a similar
question
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
OUTPUT
Recap saved to map
YES
D
INPUT: Show me the answer (any step)
→ recap with answer shown
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Start / page link
End

## 第 17 页

AI ANALYSIS AND STUDY-PLAN LOOP
D
Answer records
steps, hints, time
AI analyses
knowledge gaps
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
OUTPUT:
practise 3 more
questions
INPUT
Tap a cell, or Create
plan
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
OUTPUT
Mastered, review,
unsure
YES
AI updates
the study plan
Goal
exam date, daily time
Next day: Today
new AI plan
Loop
repeats daily
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Start / page link
End

## 第 18 页

ASK AI (ANY TIME)
ME AND SETTINGS
Tap Ask AI
tab
INPUT
Type or tap a question
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
OUTPUT
AI answer, 2 practice
questions
Practise now?
YES
Practice
NO
Tap Me
tab
INPUT
Tap Settings
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
OUTPUT
Streak, mastery, AI
report
INPUT
Change time, reminder,
AI toggle
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
OUTPUT
Settings saved
Log out?
YES
End
NO
INPUT: data from the learner
OUTPUT: data from the app
Decision
AI process
Stored data
Start / page link
End
