# ICT Learning Companion — Project Report Draft

## Project Overview

ICT Learning Companion is a mobile-oriented learning prototype for Hong Kong secondary students studying HKDSE Information and Communication Technology. It combines concise explanations, interactive demonstrations, graded practice and learning records in one interface.

The main learning sequence is **Learn → Explore → Check**. Students first read three key points, explore a concept through an interactive task, and then answer questions arranged from foundation to application and challenge levels.

The current prototype focuses on Compulsory Module A: Information Processing. It contains **30 micro-lessons and 242 questions** across four topics. A1–A3 follow the structure of the supplied Ming Tak textbook; A4 provides spreadsheet and database learning simulations. The question bank includes four selected 2025 HKDSE question extracts, with source links and application-written explanations.

The prototype uses HTML, CSS and JavaScript. Learning records are stored locally in the browser and can be exported as JSON. AI analysis, cloud synchronisation and production authentication are planned extensions. The existing analysis and account screens are demonstrations.

## 1. Evaluations and Advantage Analysis — 10%

### Evaluation of the Current Prototype

| Area | Current assessment | Limitation or next step |
|---|---|---|
| Content organisation | Module A is divided into short lessons, with textbook sections and page references for A1–A3. | The prototype does not yet provide complete coverage of every ICT module. |
| Learning interaction | Students can manipulate examples involving data hierarchy, number representation, validation and spreadsheet calculations. | These are teaching simulations rather than complete spreadsheet or database applications. |
| Practice design | Each lesson contains 6, 8 or 10 questions, depending on its instructional importance. Questions progress through three difficulty levels. | Allocation is a design decision, not a statistical analysis of DSE examination frequency. |
| Feedback and assessment | Objective questions receive feedback. Written explanations support comparison with reference criteria and self-assessment. | Written responses are not automatically evaluated for meaning. Alternative short answers may require review. |
| Navigation | The Learn tab preserves the previous learning page, step and scroll position when students switch between main tabs. Answer submission preserves the current scroll position. | Wider device and usability testing is still required. |
| Learning records | The system retains answers, retries, hint use, confidence and active answering time. | Records remain in the same browser and origin unless exported. |

The existing automated regression suite passed during preparation of this report. It checks question-bank consistency, marking, saved progress, navigation restoration, retries, rewards, export, migration and storage-failure handling. These checks establish functional behaviour; they do not establish improved examination results.

A planned usability study would ask students to locate a lesson, complete an exploration task, answer questions, leave and return to Learn, and export their records. Evaluation measures would include task completion, navigation errors, readability feedback and recovery from mistakes. A later learning study could compare performance on equivalent pre- and post-learning questions. No student-study results are claimed at this stage.

### Advantages of the Design

| Compared with | Intended advantage |
|---|---|
| Static textbook or PDF study | Interactive demonstrations make relationships visible, while short learning points provide a manageable starting point. Textbook references support further reading. |
| Standalone practice sheets | Questions are connected to explanations, exploration tasks and saved feedback within the same lesson. |
| Score-only quizzes | Separate records for first attempts, retries and hints give a more informative account of how an answer was reached. |
| A single long learning page | Short lessons and consistent navigation allow students to pause and resume without losing their place. |

The main strength is the connection between learning, exploration, practice and evidence. These are design advantages to be evaluated, rather than proven claims of superiority. XP, points and collectibles provide additional progress cues, but their effect on motivation has not yet been measured.

## 2. Wireframe — 10%

The wireframe defines the position and hierarchy of components before colour, typography and decoration are applied. The application has four main navigation destinations: **Home, Learn, Plan and Settings**.

### Main Screen Structure

| Screen | Main components, from top to bottom |
|---|---|
| Home | Learning overview; current learning map; progress and reward indicators; entry points to activities; main navigation. |
| Learn / Module A | Module heading; progress summary; continue-learning button; A1–A4 topic cards; learning-records entry; main navigation. |
| Topic list | Back button; topic heading; search field; textbook section groups; lesson cards showing estimated time and question count. |
| Plan | Date overview; next Module A lesson; daily progress; review tasks; learning tasks; demonstration knowledge insights. |
| Settings | Profile; collection entry; study-goal control; reminder toggle; language information; account demonstration controls. |

### Lesson Wireframes

```text
LEARN                    EXPLORE                  CHECK
┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
│ Back               │   │ Back               │   │ Back               │
│ Reference / time   │   │ Reference / time   │   │ Reference / time   │
│ Lesson title       │   │ Lesson title       │   │ Lesson title       │
│ Chinese subtitle   │   │ Chinese subtitle   │   │ Chinese subtitle   │
│ Learn Explore Check│   │ Learn Explore Check│   │ Learn Explore Check│
├────────────────────┤   ├────────────────────┤   ├────────────────────┤
│ Everyday scenario  │   │ Short instruction  │   │ Progress / level   │
│ Three key points   │   │ Interactive task   │   │ Question source    │
│ Optional details   │   │ Controls and result│   │ Question           │
│ Explore button     │   │ Check button       │   │ Answer controls    │
│                    │   │ Return to Learn    │   │ Confidence / hint  │
│                    │   │                    │   │ Submit / feedback  │
├────────────────────┤   ├────────────────────┤   ├────────────────────┤
│ Home Learn Plan Set│   │ Home Learn Plan Set│   │ Home Learn Plan Set│
└────────────────────┘   └────────────────────┘   └────────────────────┘
```

The shared header uses the same title size and spacing in all three steps. Content can scroll beneath the persistent main navigation, with bottom padding to keep controls reachable. The compact lesson header improves first-screen visibility of questions and options.

## 3. User Interface Design — 10%

The interface uses a restrained palette of muted green, warm off-white, sand and lavender. Dark green identifies primary actions and the active navigation item. Rounded cards separate lessons, activities and feedback into readable groups.

The text hierarchy distinguishes page titles, lesson titles, section labels and supporting notes. English ICT terms appear alongside Chinese explanations. Each lesson begins with a familiar situation and three short learning points; additional details are available on demand.

Consistency is maintained through a shared lesson header, repeated card styles, similar button shapes and four persistent navigation destinations. Learn, Explore and Check remain in the same order and position. Clicking the active Learn navigation item does not rebuild or reset the current learning screen.

System feedback includes selected-answer indicators, question progress, correctness messages and saving status. Submission keeps the learner at the current scroll position. A storage failure produces an explicit message instead of presenting the answer as successfully saved.

The prototype includes labelled controls and visible keyboard-focus styling. A full accessibility audit, including contrast measurement, screen-reader testing and testing on smaller devices, remains necessary. Some Settings controls are interface demonstrations; background notifications and language switching are not implemented services.

## 4. Storyboard — 10%

The following storyboard describes a typical Module A learning journey. Each row represents one frame to illustrate with a screenshot or annotated screen.

| Frame | Student action | Screen and system response | Design purpose |
|---|---|---|---|
| 1. Choose a topic | The student opens Learn and selects Module A, then A2. | Topic cards lead to lessons grouped by textbook section. | Make content easy to locate and connect to classroom study. |
| 2. Read the lesson | The student opens Data Hierarchy. | Learn shows a classroom scenario, the lesson reference and three key points. | Establish context with a concise explanation. |
| 3. Explore the concept | The student selects a field, record or table in the demonstration. | Highlighting and an explanation show what the selected component represents. | Connect terminology to a visible example. |
| 4. Answer a question | The student enters Check, selects an answer and submits it. | Feedback appears, the attempt is saved, and the scroll position is preserved. | Support practice without an unexpected page jump. |
| 5. Leave and return | The student switches to Settings, then clicks Learn. | The previous learning page, step and scroll position return. | Preserve continuity during interruptions. |
| 6. Review performance | The student completes the practice set and opens learning records. | Results and recorded attempts support review; records can be exported as JSON. | Provide evidence for revision and future analysis. |

The future AI extension would use these learning records to produce evidence-based explanations of areas requiring review. This is a proposed continuation of the storyboard, not a currently connected service.

## 5. Input and Output — 5%

| Function | Input | Processing | Output |
|---|---|---|---|
| Lesson selection | Topic or lesson selection; search text. | Match the selected lesson or filter the displayed list. | Lesson content, reference, time estimate and question count. |
| Interactive exploration | Control selections, bit changes, numbers or supported formulas. | Apply the demonstration's rules or calculation. | Updated values, highlighting, tables or explanatory results. |
| Objective practice | Selected option, number, short answer or formula. | Validate and compare the response with the configured answer. | Correctness, feedback and a saved attempt. |
| Written practice | Written explanation and selected self-assessment criteria. | Store the response and count selected reference criteria. | Saved writing and self-assessment; no automatic semantic correctness claim. |
| Hints and confidence | Hint request or optional confidence selection. | Record the action against the current question. | Hint text and additional learning-record information. |
| Navigation restoration | Selection of another main tab, followed by Learn. | Retain and restore the previous learning view. | The same page, step, controls and scroll position. |
| Progress and rewards | Completion of the required exploration and question set. | Update completion and check whether the lesson reward was already claimed. | Updated progress and a reward that cannot be claimed twice for the same lesson. |
| Learning-record export | Export request. | Assemble question definitions, progress, sessions and event history. | A downloadable JSON file for later review or analysis. |

Important stored fields include question and lesson identifiers, content and question-bank versions, the original response, grading method, attempt number, hint use, confidence and active answering time. Written self-assessment is kept separate from objective accuracy. Active time excludes periods when the question is hidden, when the student is on another tab within the application, or when feedback is being read after submission.

IndexedDB is the primary local history store, with localStorage providing progress snapshots and a fallback. Exported learner information uses a pseudonymous identifier and excludes login email and password fields. The prototype does not automatically send learning records to an AI service.

## 6. Submission — 3%

The supplied assessment slide states that the report is due on **13 November 2026**. The supplied design brief requires a flowchart storyboard with labelled input/output (I/O), and a PDF containing links to the wireframes, UI and storyboard.

The proposed submission package is:

- A report containing the evaluation, advantage analysis, wireframes, UI rationale, storyboard and I/O specification.
- Labelled screenshots of the main screens and the three lesson steps.
- Wireframe and storyboard figures with captions and readable annotations.
- The working HTML prototype and its required supporting files.
- A short operation guide covering access, lesson navigation, practice, local saving and JSON export.
- References identifying curriculum documents, the supplied textbook and the selected DSE question sources.
- A clear statement of prototype limitations and planned extensions.

The visual design artifacts are now available:

- [Updated Figma UI — 14 editable screens](https://www.figma.com/design/RZ7EY1OfYBUPXosK3EeBtr?node-id=14-6).
- [Storyboard with I/O — three English flowcharts](output/pdf/ict-storyboard-io.pdf).
- [Editable diagrams.net storyboard](output/design/ict-storyboard.drawio).
- [Standalone storyboard viewer](output/design/ict-storyboard.html).
- [Design link sheet and six graphical wireframes](output/pdf/ict-design-links.pdf).

Keep the accompanying files together so local links remain usable. The storyboard is supplied as local files; upload these alongside the link PDF for submission. The Figma redraw contains editable text and vector groups, while a reusable auto-layout component library remains future design work. Confirm the final naming convention, word limit and upload method against the full assignment brief.
