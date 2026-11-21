# Vibe coding (II).pdf

原件：ITC2010/Vibe coding (II).pdf

## 第 1 页

From Smart Apps to 
Published Products

## 第 2 页

1.
Every tool has trade-offs. Choosing the right tool for the right job is a skill in itself.

## 第 3 页

The Problem with Keyboard-Only Apps
But what about:
An elderly person doing physical rehabilitation?
A child in a PE class?
An athlete who wants to analyze his or her motion?
The question is: what if the app sees your body?

## 第 4 页

MediaPipe?
•
A free, open-source computer vision library
•
Runs entirely in your browser — no server needed
•
Accesses your webcam via browser permission
What it can detect:
Hands (21 points per hand)
Full body pose (33 body landmarks)
Hand gestures (thumbs up, peace, fist, etc.)

## 第 5 页

LIVE DEMO
The scenario:
•
A patient is recovering from a wrist injury.
•
His physio wants him to practice lifting his hands, 20 times per session.
•
A boring exercise becomes an engaging game.
Game mechanics:
→ Webcam shows in background
→ A fruit falls from the top of the screen
→ Player raises hands to "catch" it
→ Score increases. Speed increases every 10 catches.
→ Encouraging message every 5 catches.
→ No keyboard. Movement is the only controller.

## 第 6 页

TEMPLATE
Build an HTML game using MediaPipe and webcam.
Detect Body part (hand/upperbodt/full body etc.)
Gesture: [GESTURE]. Game mechanic: [MECHANIC].
Target user: [USER]. Style: [STYLE].

## 第 7 页

Example
•
Build an HTML game using MediaPipe and webcam.
•
Detect Body part: Hands. Gesture: Lifting hands upward to a 
target height.
•
Game mechanic: Fruit falls from the top; player "catches" by 
raising hands. Score increases per catch. Speed increases 
every 10 catches. Encouraging message every 5 catches. 
100% movement-controlled (no keyboard).
•
Target user: Patient in wrist rehabilitation (20 reps/session).
•
Style: Engaging, clean, and interactive. Single-file HTML/JS.

## 第 8 页

Example

## 第 9 页

VARIABLE MENU
1.
Gesture: Hand raise, pinch (index+thumb), fist clench, wave left/right, two-hand spread, 
thumbs up
2.
Game mechanic: Catch falling items, pop bubbles, sort L/R, follow moving target, mirror 
movement on-screen
3.
Target user: Elderly wrist rehab, primary PE class, special needs learner, physiotherapy 
patient 
4.
Rehab goal: Wrist flexion, shoulder raise, bilateral, coordination, reaction time, grip 
strength    
5.
Style: Calm/medical, cheerful cartoon, minimal flat, high contrast (visual impairment 
friendly)

## 第 10 页

Base44
10

## 第 11 页

Base44: When Your App Needs Memory 
Refresh the HTML game built from Gemini Canvas
→ The data is gone.
This is called: NO PERSISTENCE
All Canvas apps are stateless:
→ No memory between sessions
→ No user accounts
→ No shared data between users
→ No "database"
The question for your prototype:
Do users need to SAVE data? 
Do MULTIPLE users need to share data?
If YES → you need a different tool.

## 第 12 页

Base44
Base44 is an AI-powered platform that allows users to build fully 
functional applications in just a few minutes.
convert text into personal productivity tools, backend management 
tools, customer portals, or complete enterprise-grade products. 
These applications can be used immediately without any integration.

## 第 13 页

Start
Visit the official Base44 website at https://base44.com/
Log in to your account (using a Google account).

## 第 14 页

Limitation 
As a free user, you can only send 5 credits 
per day and have a limit of 25 credits per 
month.
1 new project: ≈3–5 credits
1 simple request (e.g., adding text, images, 
or changing layout): ≈1 credit
Adding features/Agents to the application: 
≈2 credits

## 第 15 页

Create
Prompt area
Upload document 
AI creates a detailed plan before 
building your app.

## 第 16 页

Building an Application
You can upload images, documents, or copy other websites as a 
reference to clone a website.

## 第 17 页

Writing Effective Prompts on Base44
Because our usage is limited, as a free user, you need to learn how 
to communicate with Base44 effectively to save tokens.

## 第 18 页

Four Core Principles
Clear and Specific: Explain the target user, functions, and main features 
of the application using simple, straightforward English.
Focus on UI/UX: Describe the user operation flow and steps they will 
take.
Describe "Content" Not "Technical Implementation": Let Base44 handle 
the technical details, focusing on the expected outcome.
Iterative Refinement: Your first prompt is just a starting point; improve it 
gradually through dialogue.

## 第 19 页

"Who/What/Why" Framework
■WHO: [Target user]
■WHAT: [Core features]
■WHY: [Value/benefits]
■Tips: Describe multi-page applications by detailing each 
page’s layout, content, interactions, and functions to make 
your prompt more specific.

## 第 20 页

Sample cases you can try
CASE A: Smart Scheduling 
Build a time management app for [User] for managing time slots or 
appointments easily. Users submit name, time, purpose. No double-
booking. Admin sees all reservations.
CASE B: Health Monitoring Dashboard
Build a health tracker for [User] to track personal health data. Users log 
[METRICS] daily. Dashboard: 7-day trend chart, nutrition calculator, alert 
when below target.
CASE C: Daily Expense & Saving Tracker  
Build an expense tracker for [User] to track daily expenses and raise a 
saving habit. Categories: [LIST]. Show pie charts by category. Savings 
goal progress bar.

## 第 21 页

Prompt Template
PART 1: WHO, WHAT, WHY
Design a [platform type] for [target users] to [primary purpose]. Goal: [key objective]
PART 2: USER FLOWS
Onboarding:
Sign-up method: [e.g., email verification]
Main Action: (Page by Page)
[Content], [Tasks], [Features]
PART 3: DASHBOARD
[Your profile] / [Community profile] , [Data graphs]
PART 4: VISUAL REQUIREMENTS
Platform: [mobile/desktop/both]
Theme: [e.g., dark mode, light mode]
Style: [e.g., minimal, colorful, professional]

## 第 22 页

Example
| **PART 1: WHO, WHAT, WHY** | **Platform type:** Mobile-first web application for nutrient absorption monitoring. **Target users:** Individuals 
of all ages seeking to monitor their nutrient intake, understand dietary impact, track personalized nutritional goals, and receive tailored food 
suggestions. **Primary purpose:** To facilitate meal logging, provide comprehensive nutritional analysis, and offer actionable insights for improved 
dietary health. **Key objective:** To empower users with data-driven dietary decisions and awareness of nutrient deficiency impacts. |
| **PART 2: USER FLOWS** | **Onboarding:** User signs up via email, receives email verification, verifies account, and is directed to the 
dashboard. **Main Action:**
1. **Personal Info Setup:** User inputs gender, age, genetic disease(s), and chronic disease(s) to establish personalized daily nutrient targets.
2. **Meal Recording:** User selects date and meal type (Breakfast, Lunch, Tea, Dinner) from a dropdown list. User then takes a photo or uploads an 
image of their meal. Use Multimodal LLM to identify the food items inside the image, and analyze the nutrition, saving the top 100 identified items 
per analysis. The image and associated record are saved to the user's profile.
3. **Post-Meal Analysis:** After logging a meal, the system displays a list of nutrients obtained, the cumulative percentage of the daily target 
fulfilled, remaining nutrients needed, potential health risks associated with deficiencies, and food suggestions to address missing nutrients with 
importance notes.
4. **Record Management:** Users have the ability to delete their meal records and associated images, which triggers a data refresh. 
**Privacy/Sharing Control:** All user data (meals, records, analyses) is private and accessible only to the individual user. |
| **PART 3: DASHBOARD** | **Section 1: Daily Summary:** Shows current day's nutrient totals, percentage of daily recommended intake 
(personalized), and progress bars for key nutrients. **Section 2: Weekly Overview:** Displays nutrient totals and percentage of weekly 
recommended intake (7x daily targets, personalized). **Section 3: Monthly Trends:** Presents nutritional summaries and trends over the last month. 
**Section 4: 6-Month History:** Provides meal history and nutritional trends over the last six months with charts. |
| **PART 4: VISUAL REQUIREMENTS** | **Platform:** Mobile-responsive design, primarily targeting mobile devices. **Privacy indicators:** 
Implicit through user-specific, authenticated access; no explicit sharing features. **Theme:** Clean & clinical aesthetic. **Style:** White 
backgrounds, structured grid layout, medical/wellness feel. Blue-green or teal accent palette. Sans-serif typography (Inter or similar). High contrast, 
precise data visualization (progress bars, circular gauges, simple charts). Nutrient progress shown as percentage bars with color coding (green = 
sufficient, amber = low, red = deficient). Cards with subtle borders and soft shadows. No decorative clutter; every element serves a data or 
navigation purpose. |

## 第 23 页

Wait for 10 minutes

## 第 24 页

Done

## 第 25 页

Edit
Single blob: Indicates that you can make edits.

## 第 26 页

Simple Edit
Group blob: Please do not edit.

## 第 27 页

Adding Collaborators
You can add team members to collaborate with you, but they will 
consume your credits and count towards your daily limit

## 第 28 页

Canvas
Allows your team members to leave comments on the different 
details of your work.

## 第 29 页

Publish and Testing
https://nutri-track-wise.base44.app

## 第 30 页

Dashboard
On the Dashboard, You Can View:
User Data: How many users there are.
Data: User activity logs.
Analytics: Statistical data.

## 第 31 页

User

## 第 32 页

Analysis

## 第 33 页

HTML Integration
■Since we have previously completed some HTML products 
(e.g., Google Gemini Canvas), let's see if we can embed them 
into Base44. 
■We can also ask Base44 to help us prepare a chatbot.

## 第 34 页

HTML Code (No AI features)
■Copy the previously prepared code from Google Gemini.

## 第 35 页

Building a Chatbot in Base44
■Invoke LLM: You can only customize the system prompt and 
use Google Gemini 3 Flash as the base language model.

## 第 36 页

Building a Chat Agent in Base44
■An Agent is a powerful feature capable of using website 
content and user data for interactions.
■It called “Context Stuffing”, is a technique where large 
amounts of text or data are packed directly into the prompt to 
provide the model with grounding

## 第 37 页

Result

## 第 38 页

Result

## 第 39 页

Built-in Integrations
Base44 comes with preloaded integrations: no paid plans, extra setup, or external 
API keys are required. You can easily add AI, messaging, and document processing 
features to any application.
Examples:
●
Invoke LLM: Generate AI responses using detailed prompts through our built-
in models.
●
SendEmail: Send emails to your Base44 users using a custom sender name. 
Note: This feature does not support external mailing lists or file attachments.
Integration Credits: You receive 100 integration credits per month.
1 Action: ≈1 to 3 credits (depending on complexity)
Send Email: ≈1 credit
Analyze Image: 1 credit per image
Invoke LLM interaction: 1 to 3 credits
Agent call: 3 or more credits

## 第 40 页

AI Agents – Autonomous & Goal-Oriented
●
Unlike a workflow, you don't give an Agent a step-
by-step route
●
We just give it a Goal. The Agent acts as a "Project 
Manager" that plans its own unique route to 
achieve that goal
●
It orchestrates tools by itself and adapts to 
feedback and changes

## 第 41 页

The Tech Behind It: ReAct Framework
●
The Loop: The Agent plans an action, uses tools , and 
observes the result. It performs self-verification: "Did this 
achieve my goal?" 
If it faces an error, it 
doesn't just crash (like 
a workflow might); it 
plans an updated 
action, tries a 
different tool, and 
loops again until the 
task is fully complete.

## 第 42 页

The Tech Behind It: ReAct Framework
●
Because the Agent is actively "thinking," making mistakes, and 
correcting itself, tasks naturally take longer. A complex research 
task might take 10+ minutes, but the final output is highly 
refined.

## 第 44 页

Manus AI
●
Manus AI is one of the pioneering AI agent 
platforms designed to autonomously complete 
your overarching goals
●
How does it work? Harness Engineering
●
Harness engineering is the discipline of building 
the execution environment, tools, and feedback 
loops around an AI model to make it reliable and 
autonomous.

## 第 45 页

Manus AI
●Manus AI is not just a chatbot; it is a General Purpose Agent.
●If tools like ChatGPT merely "respond to prompts," Manus is 
capable of autonomously executing complex goals.
●
https://manus.im/

## 第 46 页

Register 
https://manus.im/
Free Tier Allocation: 300
Manus AI provides a generous daily 
allowance for explorers and 
researchers. These credits refresh 
every 24 hours, ensuring you have 
the fuel to automate your daily tasks 
without a subscription barrier.

## 第 47 页

Deep Research
Competitor analysis or 
market trends research.
Report Drafting
Writing comprehensive 
whitepapers or proposals.
Outline Creation
Detailed structured plans for 
books or projects.
WHAT CAN YOU DO DAILY?
With 300 credits, you can accomplish approximately 3 to 4 
complete end-to-end tasks:

## 第 48 页

AI Agent
Prompt: Using a standard 1000-word essay structure, research and draft 
an outline on 'The Benefits of AI.' Do not write the full essay. Include 
verified information, working source links, and an APA 7th edition 
reference page with double spacing. Prepare the final output in both 
.docx and PDF formats.

## 第 49 页

AI Agent
Through the ReAct loop, it navigates 
roadblocks, coordinates tools, and 
directly delivers the final polished 
product
●
The AI agent will automatically coordinate different tools to 
complete your task 
○
Virtual Machine: Manus gives the AI its own secure computer 
environment (a sandbox). The Agent can literally open a 
browser, search, click links, read pages, and use software tools 
just like a human.

## 第 50 页

Microsoft Word (.docx): Fully editable with 
proper H1/H2 tagging and bullet structures.
Professional PDF: Print-ready reports with 
consistent margins and layouts.
Final Product

## 第 51 页

*Average time based on deep research & 10-page report generation.
EFFICIENCY GAINS

## 第 52 页

A True Agent
1.
The Brain: It has the cognitive ability to plan, 
observe, and perform self-verification.
2. The Hands: It autonomously handles tool use and 
actions.
3. The Environment: It operates securely within a 
specific workspace, such as a sandbox, virtual 
machine, or browser.
4. The Channels: It connects and collaborates with you 
through everyday platforms like iMessage, 
WhatsApp, Telegram, WeChat, or Discord.

## 第 53 页

The Manus Skill
In Manus, Skills are essentially pre-built AI 
workflows. You no longer need to write 
the perfect prompt, nor do you need to 
make fine-tune adjustments every time. 
Skills encapsulate a successful process.
●
Reusability: Once a high-quality 
workflow is created, such as a 
worksheet generator, it can be saved 
as a "Skill.“
●
Tool Orchestration: A "Skill" precisely 
instructs the agent on when to 
browse the web, when to run Python 
code for data analysis, what the new 
goals of the current task are, and 
how to structure the final document.

## 第 54 页

Auto-Tool Use
Browses real-time web data, 
runs code for analysis, and 
verifies facts without 
intervention.
Self-Correction
If a draft isn't perfect, the 
agent loops back to fix 
structure and logic before 
delivery.
Direct Delivery
Forget copy-pasting. Receive 
professional files ready for 
your boss or client 
immediately.
THE "MANUS SKILL" ADVANTAGE

## 第 56 页

Building a Skill for an AI Agent
●A skill = one specific capability / workflow given to an AI agent
●Think of it like teaching a new employee one job function at a 
time
●Example: "Summarize a PDF" or "Check flight status" are each 
separate skills

## 第 57 页

Define Goal + Inputs/Outputs
Step 1 — Set the Goal, Inputs & Outputs
●Define the goal clearly: What problem should this skill solve?
●Identify Inputs: What information does the agent need? (a file, a 
question, a date)
●Identify Outputs: What should it produce? (a summary, an 
answer, structured data)

## 第 58 页

Choose Tool + Write Logic
Step 2 — Build the Skill
●Choose the right tool: Does it need an external tool (API, database) 
or just the AI's own reasoning?
●Write the skill logic: Map the Logical Flow (similar to a workflow)
●Keep it modular: One skill, one job — easier to fix and update later

## 第 59 页

Guardrails, Testing & Integration
Step 3 — Make It Reliable
●Add guardrails: Plan for missing input, errors, or unexpected 
requests
●Test in isolation: Try the skill on its own before connecting it to the 
full agent
●Integrate and test: Confirm the agent knows *when* to use this skill

## 第 60 页

Document + Iterate
Step 4 — Refine and Share
●Document the skill: What it does, what it needs, and its limitations
●Iterate based on feedback: Skills rarely work perfectly the first time
●Refinement is part of the process, not a failure

## 第 61 页

Build your first skill
Essay Outline Copilot
Skill Goal: Generate an essay outline from a topic + requirements.
Workflow (4 Stages):
●
Explore: Research topic angles and key sub-questions
●
Clarify: Ask user for missing info (essay type, word count, focus) before drafting
●
Draft: Suggest paragraph structure based on word count; outline each section's purpose
●
Cite & Review: Add APA 7th references (highly cited only); verify links work, swap if 
broken; flag weak sections for revision
Guardrail: Never invent a citation without a matching reference — if a link fails, replace with a 
credible alternative.
Output: Title → Thesis → Section breakdown → Full APA reference list in .docx and .pdf.

## 第 62 页

Build your first skill

## 第 63 页

Manus will use its virtual machine to prepare the 
Skill for you.
If everything looks good, add / 
download your Skill.
Build your first skill

## 第 64 页

Download your skill
You can download your skill (in Markdown format), and this 
workflow can also serve as the prototype for your project.
