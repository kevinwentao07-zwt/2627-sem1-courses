# Vibe coding (I).pdf

原件：ITC2010/Vibe coding (I).pdf

## 第 1 页

Vibe Coding
From Idea to Working App

## 第 2 页

The Old Way vs. The New Way
1.
You don't need to know code.
2.
You need to know what you want — and how to describe it clearly.
The Old Way                    The New Way
─────────────────────────────────────
───────
Learn HTML/CSS/JS (months)  →  Describe in English 
(minutes)
Hire a developer ($$$)       →  Prompt an AI (free)
Fix bugs line by line        →  Tell AI what's broken
Version control required     →  Iterate through conversation

## 第 3 页

How Vibe Coding Works
1.
Step 1: Describe your app in natural language
2.
         ↓
3.
Step 2: AI generates working HTML/CSS/JS
4.
         ↓
5.
Step 3: Preview the result instantly
6.
         ↓
7.
Step 4: Ask for changes in conversation
8.
         ↓
9.
Step 5: Repeat until satisfied
10.         ↓
11. Step 6: Copy the code / share the link

## 第 4 页

Google Gemini Canvas

## 第 5 页

Interface
Input Prompt
Click "Pro" to generate better results; however, the 
waiting time will be longer (~5 minutes).
Canvas: Transforms static 
results into interactive 
applications, games, or 
quizzes.

## 第 6 页

LIVE DEMO: A Countdown Timer App
Build a countdown timer HTML app. Buttons: Start, Pause, 
Reset. Style: clean white, large numbers.

## 第 7 页

HyperText Markup Language (超文本標記語言 )
• The blueprint language that tells browsers how to display content
• Uses "tags" like labels to mark different types of content:
• <head> for headings, <body> for body contents, <title> for title
HTML

## 第 8 页

Iteration 1 — Change colour theme
Change the colour theme to a dark mode: dark navy 
background.
Neon mint accent for the timer numbers and button borders.

## 第 9 页

Iteration 2 — Change font style
Change the font to a monospace digital clock style. Make the 
timer numbers larger — minimum 120px.

## 第 10 页

Iteration 3 — Add Gemini Features
Enhance the timer by adding a Gemini API-powered chatbot.
Gemini Canvas apps 
are sandboxed 
environments that 
block your personal 
API key for others to 
prevent 
unauthorized usage 
and security leaks.

## 第 11 页

What is API key
An API key is a digital identity card for security and tracking. 
●It is a unique credential letting the AI provider verify who is 
calling the service, count usage, and enforce rate limits 
whenever you access the model programmatically rather 
than through its official consumer chat interface
●The developer is financially responsible unless the end user 
supplies their own key
●Google's Gemini API free tier enforces a request-per-minute 
cap and does not generate cost data since nothing is billed

## 第 12 页

UI/UX 
Principles

## 第 13 页

What is UI/UX and Why Does It Matter?
1.
UI = User Interface
2.
     What your app LOOKS like
3.
     (colours, fonts, layout, buttons)
1.
UX = User Experience  
2.
     How your app FEELS to use
3.
     (is it easy? does it make sense? is it fast?)
1.
A beautiful app with confusing navigation = bad UX
2.
A plain app that does exactly what users need = great UX
1.
Good design is not decoration. It is communication.

## 第 14 页

5 Core UI/UX Principles
1.
① One task per screen
2.
   Don't crowd. Users should never wonder "what do I do here?"
1.
② High contrast text
2.
   Dark text on light background — always. 
3.
   Low contrast = inaccessible to 1 in 12 people (colour blindness)
1.
③ "Don't Make Me Think" (Steve Krug, 2000)
2.
   Buttons say exactly what they do.
3.
   BAD: "Submit" | GOOD: "Save My Note"
1.
④ Visual hierarchy
2.
   Big = important. Small = secondary.
3.
   The eye reads large → colour → position → small text.
1.
⑤ Consistency
2.
   Same colour for same action across all screens.
3.
   Same font for all headings. No surprises.

## 第 15 页

Good vs. Bad UI
1.
BAD UI example:                  GOOD UI example:
2.
─────────────────────────────────────────────────────
3.
• 6 different font sizes          • 2 font sizes (heading + body)
4.
• Red text on orange background   • Dark text on white
5.
• Button says "Click Here"        • Button says "Find My Bus Route"
6.
• 12 items on one screen          • 3 items, clear primary action
7.
• No mobile adaptation            • Card layout, responsive
1.
 Class question: 
2.
   Identify 3 more things wrong in the bad example.

## 第 16 页

HTML Game

## 第 17 页

Features of Interactive Revision Games
版權所有  使用受限
Instant Scoring
 
Customizable 
Game Styles
Customizable 
countdowns for 
each question

## 第 18 页

Subject & Topic: Clearly state the specific subject and area of focus.
 Question Type & Quantity: Specify the format (e.g., MCQ, True/False) 
and how many questions.
 Difficulty & Objective: Define the target student level and learning goals.
 Game Style: Choose a theme (e.g., Battle Royale, RPG, Shooter, etc.).
 Features: Include instant feedback, correct answer displays, 
score/percentage calculation, and the ability to retry missed questions.
Game Generation Prompt Formula

## 第 19 页

SHORT TEMPLATE
Create an HTML game for [User]: [GAME TYPE] about [TOPIC].
Works on mobile.

## 第 20 页

FULL TEMPLATE
Create a single-file HTML5 [GAME TYPE] game about [TOPIC] for [User].
Controls: [CONTROLS]. Win condition: [WIN CONDITION].
Score display top-right. Lives: [NUMBER].
Visual style: [STYLE]. Sound effects: [YES/NO].
Game over screen with score + Play Again button.
Pure HTML, CSS, JavaScript only

## 第 21 页

VARIABLE MENU
Game Type │ Shooting, drag-and-drop, matching, 4-choice quiz, typing, Monopoly-style, 
RPG 
Controls │ Arrow keys, mouse click, spacebar, touch │ 
Style │ Pixel art, cartoon, minimal flat, dark neon, PokeAPI│

## 第 22 页

Full Prompt
Example: Introduction to the Chemical Property Identification
Create a single-file HTML5 4-choice quiz game about the first 20 elements 
for Hong Kong Secondary School Student.
Controls: Mouse click + Touch, Win condition: Answer 10 question 
correctly.
Score display top-right. Lives: 3.
Visual style: Using PokeAPI with Pokemon-battle style. Sound effects: 
YES.
Game over screen with score + Play Again button.
Pure HTML, CSS, JavaScript only and works on mobile.

## 第 23 页

Example: Introduction to the Chemical Property Identification

## 第 24 页

Common Bugs & Easy Fixes
Buttons Not Responding / 
Game Won't Play
02
●
Describe the specific error to Gemini and ask it to 
fix the code. 
●
If that fails, try generating the game from scratch 
once more.
Difficulty Imbalance (Too 
Hard/Too Easy)
01
●
Use specific prompts like "Difficulty: Beginner to 
Intermediate" or "Set ratio to 30% easy, 50% 
medium, and 20% hard questions”

## 第 25 页

Common Bugs & Easy Fixes
Visual Errors or Incorrect 
Character Images
04
●
Ask Gemini to find stock images (free to use) / 
paste the image URL
03
Unable to Save Game 
Progress
●
This is a standard limitation, as Google Gemini 
Canvas currently lacks account login and progress-
saving features

## 第 26 页

Use your own images / videos
iframe
●An HTML element that embeds an external webpage or 
document directly into your current webpage.
●You can use iframes for more than just standard image URLs. 
●For example, you can embed images and videos directly from 
Google Drive.
(Note: To do this, the file's sharing permission must be set to 
"Anyone with the link")

## 第 27 页

Use your own images / videos

## 第 28 页

Publish your work
●Click “Share” and select “Share by Drive”

## 第 29 页

Flashcards
 Vocabulary Cards
 Concept Cards
 Formula Cards
 History Cards

## 第 30 页

Subject & Content: Clearly state what content needs to be 
created.
 Quantity & Type: Specify the number of cards and the 
format.
 Difficulty & Level: Tailor the content to the students' 
educational level.
 Functional Requirements: Features like "click to flip," or 
marking cards as "Mastered" vs. "Needs Review."
Digital Flashcard Generation Prompt Formula
版權所有  使用受限

## 第 31 页

SHORT TEMPLATE
Create HTML flashcards for [TOPIC] for [User].
[NUMBER] cards. Front: [FRONT]. Back: [BACK].
[WITH/WITHOUT] voice. Mobile responsive.
版權所有  使用受限

## 第 32 页

FULL TEMPLATE
Create a single-file HTML flashcard app for [TOPIC] for [User].
[NUMBER] cards total.
Front: [FRONT FORMAT]. Back: [BACK FORMAT].
Navigation: click to flip, arrow keys to move between cards.
Progress bar showing current card / total.
Voice: [YES, lang: zh-HK/en-US/zh-TW] or [NO].
Extras: [Shuffle button / Self-rating: Easy|Hard / Reset button].
Style: [STYLE DESCRIPTION]. Mobile responsive.
版權所有  使用受限

## 第 33 页

VARIABLE MENU
Topic :Cantonese phrases, theories, technical terms, history,  vocabulary, formula 
Front / : Text only, Emoji + word, Q&A, details explanation with example 
Voice lang:  zh-HK (Cantonese) en-US zh-TW (Mandarin)
Extras : Progress bar, shuffle, Easy/Hard self-rating

## 第 34 页

Full Prompt
Example: Teaching and Learning Pedagogy
Create a single-file HTML flashcard app for teaching and learning pedagogy, 
designed for university education students.
Total Cards: 10.
Front: [Theory Name]. Back: [Detailed explanation with examples].
Navigation: Click to flip; use arrow keys to navigate between cards.
Features: Progress bar (current card / total), Shuffle button, and Reset button.
Voice: No.
Style: Surrealism. Technical: Mobile-responsive, pure HTML/CSS/JS.

## 第 35 页

Example: Teaching and Learning Pedagogy

## 第 36 页

Common Bugs & Easy Fixes
Unable to save progress
03
●
This is normal, as it lacks account login and 
database functions to store progress
Too much text on the back of 
the card
02
●
Tell Gemini: "Limit the back of each card to 3–4 
lines, focusing only on the most critical points."
Cards won't flip / Missing data
01
●
Describe the error to Gemini and ask it to fix the 
code. 
●
If the issue persists, try generating the app again 
from scratch

## 第 37 页

Website Generation
 Multi-page Design

## 第 38 页

Purpose & Subject: Clearly define the objective of the 
revision website.
 Content Structure: Specify the number of subjects and 
categories required.
 Functional Requirements: Include features like progress 
tracking, interactive pop-ups for explanations, and dynamic info 
displays.
 Visual Style: Describe the desired design aesthetic.
Website Generation Prompt Formula
版權所有  使用受限

## 第 39 页

SHORT TEMPLATE
Build a [NUMBER]-page website for [PURPOSE].
Audience: [WHO]. Style: [STYLE].
Images: Unsplash (free). Mobile responsive.
版權所有  使用受限

## 第 40 页

FULL TEMPLATE
Build a [NUMBER]-page website for [PURPOSE].
Target audience: [WHO].
Pages: [LIST WITH BRIEF DESCRIPTION OF EACH PAGE].
Key features: [FEATURE LIST].
Images: use Unsplash free image
Style: [STYLE]. Colour accent: [palette]. Font: [FONT DESCRIPTION].
Mobile responsive. Include navigation menu.
版權所有  使用受限

## 第 41 页

VARIABLE MENU
Purpose: Learning and Teaching, resource sharing (e.g., custom prompt templates), health 
awareness, general resources, personal portfolio
Style: Clean & Minimal, Dark Mode, Red-Gold Traditional, Pastel Kawaii, Retro Newspaper, 
Corporate Professional
Features: Games and interactive dashboards, Sliders and quiz widgets, Language toggle 
(EN/繁), Countdown timers

## 第 42 页

Full Prompt
Example: State of matter
Build a 2-page website for introducing the States of Matter.
Target Audience: Secondary school students.
Pages: Homepage: Introduction to the topic. 
Interactive Dashboard: Featuring a slider to control temperature and the 
bouncing of particles.
Key Features: Temperature control, state selection (Solid, Liquid, Gas), and 
pressure indicators.
Style: Neon aesthetic with Red and Blue color accents. Technical: Mobile-
responsive with a navigation menu.

## 第 43 页

Example: State of matter

## 第 44 页

Common Bugs & Easy Fixes
Incorrect UI or Images
04
●
Ask Gemini to find stock images (free to use) / paste 
the image URL
Unable to save progress
03
●
This is normal as they do not include account login 
or database storage
Missing subject pages
02
●
Add this instruction: "Ensure every subject listed 
has its own independent webpage and functional 
link.
Buttons not working / Missing 
data
01
●
Describe the error to Gemini and ask it to fix the 
code. 
●
If it persists, re-generate from scratch.

## 第 45 页

Full Prompt
Circuit Simulator
Build a [1]-page website for [Interactive Circuit Simulation & Ohm's Law].
Target audience: [Secondary school students].
Pages: [Single-page interactive lab].
Key features: Drag & Connect: Battery, resistor, wires, ammeter, and switch.
Physics Engine: Real-time current flow animation, Ohm's Law ($V=IR$) 
calculations, and short-circuit alerts.
Instructional Guidance: Instant feedback on component connections and a "Total 
Resistance" challenge module.
Style: [Technical Blueprint].
Colour accent: [Navy blue and Light Cream].Technical: [Mobile-responsive, Pure 
HTML/CSS/JS]

## 第 46 页

Circuit Simulator

## 第 47 页

More Common Errors
 YOUR RECOVERY STRATEGIES (memorise these):
① DIRECT MENTION
•
  Name the exact broken element in your next prompt
② SCREENCAP + DESCRIBE  
•
  Paste a screenshot → "Fix only what you see here"

## 第 48 页

More Common Errors
ERROR 1: Blank white page — nothing renders
•
User Pro and re-run your prompt again
ERROR 2: Buttons in the header bar are not functional
Why it happens: The Gemini logo covers the whole section.
•
How to fix: → Move all the buttons in the header bar to the 
content area.

## 第 49 页

More Common Errors
ERROR 3: AI adds things you didn't ask for
Why it happens:
→ AI "fills in the gaps" with assumptions
→ Your prompt left room for interpretation
Example: You asked for a quiz → AI added a login screen
How to fix:
→ "Remove everything you added that I did not request. 
→ "Only do exactly what I ask. Nothing more."

## 第 50 页

More Common Errors
ERROR 4: Looks wrong on mobile
Why it happens:
Cannot display on mobile 
How to fix:
→ "Make the web app fully mobile responsive.

## 第 51 页

AI-Powered Features: TTS, STT
Making Your App Talk and Listen
The Web Speech API:
•
Built into Chrome and Edge
•
Free. No API key. No subscription. Works in Hong Kong.
Two directions:
TTS = Text-to-Speech    SST = Speech-to-Text
(App reads TO you)      (App listens TO you)
Use cases:
→ Flashcard reads the answer aloud → language learning
→ Quiz reads the question → accessibility support
→ Timer announces "5 minutes remaining"
→ Dashboard narrates the chart → elderly users

## 第 52 页

TTS Prompt
Prepare a game with TTS feature about [Topic] for [User]
Trigger: [button click / auto on page load / on card flip].
Use Web Speech API (no external library).
Voice language: [zh-HK / en-US / zh-TW / ja-JP].
Speech rate: [0.8 = slower / 1.0 = normal / 1.2 = faster].
Show visual feedback while speaking:  [pulsing speaker icon / highlighted 
text / progress bar]."
VARIABLE OPTIONS:
Language     zh-HK, en-US, zh-TW, ja-JP, ko-KR
Rate         0.7 (slow learner) | 1.0 (normal) | 1.3 (fast)
Trigger      button click | auto | keyboard shortcut
Visual cue   pulsing icon | highlighted word | none

## 第 53 页

TTS Prompt Example
Prepare a game with TTS feature about 
[animals] for [kids]
Trigger: [button click].
Use Web Speech API (no external library).
Voice language: [ en-US].
Speech rate: [1.0 = normal].
Show visual feedback while speaking:  
[pulsing speaker icon].

## 第 54 页

STT Prompt
Prepare a game with STT feature about [Topic] for [User]
Activate: [click button / hold button / keyboard shortcut].
Language: [zh-HK / en-US].
Output: fill the [INPUT FIELD NAME / text area] with transcribed text 
automatically.
Visual indicator while listening:  pulsing red circle with label 
'Listening...'.
Stop listening: [automatically after silence / button click].

## 第 55 页

STT Prompt Example
Prepare a game with STT feature 
about [animals] for [kids]
Activate: [click button].
Language: [zh-HK].
Output: fill the [text area] with 
transcribed text automatically.
Visual indicator while listening:  
pulsing red circle with label 
'Listening...'.
Stop listening: [automatically after 
silence].

## 第 56 页

Gemini Canvas AI Interface Mode
So far: Vibe coding = building STATIC tools (the tool always does the 
same thing)
New level: AI INTERFACE MODE = building tools that USE Gen AI to 
generate responses

## 第 57 页

Gemini Canvas AI Interface Mode
Two powerful cases:
CASE A: Chatbot Interface
→ Your HTML app contains a hidden system prompt
→ Users type questions → Gemini API provides personalised answer
→ Example: Positivity Coach

## 第 58 页

CASE A: Chatbot Interface Full Prompt
SHORT Prompt: "Build an HTML chatbot. 
System prompt: [YOUR SYSTEM PROMPT]. Chat bubble UI."
FULL TEMPLATE:
"Build a single-file HTML chatbot interface. Embedded system prompt (hidden 
from user): '[YOUR RCCO-STRUCTURED SYSTEM PROMPT]'
UI: chat bubble layout 
(user messages: right-aligned, blue background)
(AI messages: left-aligned, light grey background)
Input: text field + send button at bottom.
Header: [TITLE + SUBTITLE DESCRIPTION].
Accent colour: [COLOUR]. Mobile responsive.”
P.S. No RAG support in Canvas (front-end only; no external database). Use 
Gems instead

## 第 59 页

CASE A: Chatbot Interface Full Prompt
Build an HTML chatbot.
System Prompt: [You are a patient counselor here to comfort 
students].UI: Chat bubble interface

## 第 60 页

Gemini Canvas AI Interface Mode
CASE B: AI Image Prompt Generator Interface
→ Your HTML app has dropdown menus / type in column with labelling
→ User selects options → app assembles a high-quality prompt & Image
→ No more struggling to write image prompts from scratch

## 第 61 页

CASE B: AI Image Generator Interface
SHORT: "Build an HTML form with dropdowns for image prompt components. Assemble and 
display the final prompt and image. Copy to Clipboard button and download button."
FULL TEMPLATE:
"Build a single-file HTML AI image prompt generator.
Dropdowns for these categories:
Subject: [Portrait / Architecture / Food / Nature / Street scene]
Style: [Photorealistic / Watercolour / Pixel art / Oil painting / Minimalist]
Mood: [Warm golden / Cool moody / Vibrant / Calm pastel / Dramatic dark]
Composition: [Close-up / Wide establishing / Bird's eye / Low angle]
Setting: [Hong Kong street / Traditional village / Modern campus / Harbour]
Negative prompt: [suggest some common negative prompt for 
human/buildings/animals/object/environment/nature/plants]
On click 'Generate Image': assemble as:
'[Subject], [Style], [Mood], [Composition], [Setting], high quality, detailed, negative prompt: 
[Negatives]'
Display and Image and prompt in large styled text box.
Copy to Clipboard button and download button (show confirmation tick)

## 第 62 页

CASE B: AI Image Generator Interface
Build an HTML interactive panel where students can select different keywords (Subject, 
Content, Year, Art Style, etc.) to generate an educational infographic for learning.

## 第 63 页

Recap: What is a Google Gem?
1.
From Day 3 → RCCO Framework:
2.
  Role + Context + Constraints + Output
3.
A Google Gem = a permanent RCCO system prompt
4.
               saved as a reusable AI assistant
1.
Today's new idea:
2.
→ What if your Gem's entire job was to generate games and dashboards?
3.
→ The Gem pre-loads all the technical constraints. You only supply the topic and style.
4.
  You can get consistent, working output

## 第 64 页

Gems for consistent HTML content 
generation
Name: HTML Interactive Content Generator
SYSTEM PROMPT
Role: You are an expert educational HTML developer specialising in single-file interactive 
artefacts.
Core instruction
•
Create a game for students in Hong Kong based on user input’s topic. 
•
All output must work in a standard Chrome browser and using PokeAPI
•
User have 3 lives and need to complete 10 questions to finish the game
Constraints:
•
Output ONLY complete, valid HTML in a single file
•
Mobile responsive (viewport meta tag always included)  
•
Minimum button size: 44x44px (accessibility)
•
Support both English and Traditional Chinese display
•
Never add features not explicitly requested
Output: Return the complete HTML code only

## 第 65 页

Configure Your Own Gem
Example additions: in the system prompt
→ "All examples should reference Hong Kong context"
→ "Target users are elderly adults aged 65+"  
→ "Always include a Cantonese/English bilingual option"
→ "Games should have an educational reflection section after 
completing all questions“
User prompt: Language/math/programming/History/Science etc.

## 第 66 页

Gems
