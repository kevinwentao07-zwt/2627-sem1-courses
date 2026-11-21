# Teacher-Answers-English_v2.pdf

原件：TLS3092/Group presentation/TLS3092_v4/Teacher-Answers-English_v2.pdf

## 第 1 页

Teacher answers · Lesson 1 HTML
Page 1 / 2 · Accept other reasonable explanations.
Diagnostic questions and tag matching
1. A heading identifies the topic of a page or section and helps readers understand its structure.
2. A hyperlink.
3. Image rights, permission, copyright or privacy. Students can use an alias and a fictional profile.
These answers stay on each student's screen or paper. Read them while circulating and take a show of hands,
including "Which HTML tags do you remember from the Compulsory Part?" Use the result to adjust the
demonstration.
Matching: h1 → D main heading; p → C paragraph; img → A image; a → B hyperlink.
Debugging example
<h1>My Portfolio</h1>
<p>I enjoy photography.</p>
<img src="mountain.svg" alt="Mountain ridges and sunrise">
<a href="#projects">My Projects</a>
<section id="projects"><h2>My Projects</h2></section>
The target problems are a missing </h1> and missing alt for a content image. Accept other specific, appropriate
descriptions. A decorative image may use empty alt, but this task explicitly uses a content image.
Optional HTML self-check after class
Only after the HTML activities: 1. h1. 2. href. 3. Correct the path, then check alt. 4. An alias, interests and permitted
materials.
Exit Ticket guidance
Students download the learning record and submit it with the exported HTML through the school's usual channel.
Read these before Lesson 2.
Prompt
Evidence of achievement
Follow-up
Explain two
elements
For example: h1 identifies the main topic; p groups an introduction;
img embeds an image; a creates a link. Each explanation is
reasonable.
Move beyond "larger text" to
topic and structure.
Repair a
Add href, for example <a href="#projects">My Projects</a>, with an
id="projects" target.
Compare src and href, then
retry.
Debug and
transfer
Identify an actual error, its fix and a preview or click test. Propose a
readability improvement for CSS (this last part may become the post-
lesson task if time is short).
If the answer is only "fixed it",
request a specific
demonstration.
Portfolio draft criteria
Record "achieved / needs revision" for: a clear heading and introduction, a loaded image, appropriate alt, a useful
link, basic source structure, an independently opened export, suitable materials and an explained choice. The
teacher judges open responses and content quality. Do not turn the automatic check count into a final grade.
Use oral questions covering all four elements to check that students can explain at least three. Completing a template does not prove
independent understanding. Follow paper work with browser testing.

## 第 2 页

Teacher answers · Lesson 2 CSS
Page 2 / 2
Before class · Lesson 1 HTML recap
Answers: 1 A (h1/p); 2 B (src gives the source, alt a text alternative); 3 C (href="#projects" matches the id); 4 B
(close h1 before p). This reviews Lesson 1, not CSS. Answer independently for five minutes, then review errors and
test the draft at minutes 5–8.
Rules, prediction and debugging
h1 is the selector; color is the property; #17634b is the value. The final paragraph colour is #17634b because,
under equal conditions with the same selector, the later declaration wins. Add a colon after color and a semicolon
after the colour code.
h1 { color: #17634b; font-size: 28px; }
section { padding: 20px; margin-top: 24px;
  border: 1px solid #c7d6ce; }
padding is the space inside the border; margin is the space outside it. Check CSS values and complete
declarations in a browser.
Optional CSS self-check after class
Only after the CSS activities: 1. Selector. 2. padding. 3. The later rule when origin, importance, layer and specificity
are equal. 4. Sufficient contrast, line spacing and underlines.
Exit Ticket guidance
Prompt
Evidence of achievement
Follow-up
HTML and CSS
HTML describes content structure; CSS controls presentation.
The same HTML can receive different styles.
Toggle CSS and check that the
content remains.
Paragraph
colour
For example, p { color: #243b35; }. Correctly identify p, color and
#243b35.
Change a property or value and
explain its effect.
Box model and
testing
Distinguish inner and outer spacing; identify an improvement
and a preview, narrow-view or peer reading test.
Label a paper box model, then
change it in a browser.
Observe more than a score
The lab samples body and h1 contrast, font size, line height, section spacing and link underlining. It does not
assess every background, nested area or meaning. Add keyboard, narrow-view and actual reading tests.
Deciding the next teaching step
If students can copy a template but cannot explain it, predict the effect of a new rule next lesson. Revisit padding
and margin with the box diagram if needed. If file handling is the main barrier, practise backup and import first so
students can keep their work.
Paper work assesses concepts and design. Browser display, images, links and exports must be tested when devices recover.
