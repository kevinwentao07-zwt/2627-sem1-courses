# Student-Worksheets-English_v2.pdf

原件：TLS3092/Group presentation/TLS3092_v4/Student-Worksheets-English_v2.pdf

## 第 1 页

Portfolio Lab · HTML backup worksheet
Lesson 1 · 70 minutes · Page 1 / 4
Alias: ______________
Class no.: ______
Date: ______________
1. Diagnostic questions (0–10 minutes, including introduction)
1. What is the purpose of a heading on a web page?
2. What feature lets a reader click text to open another page?
3. What should you check before using a photo or personal information?
2. Reference example (10–20 minutes)
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Alex's Portfolio</title>
</head>
<body>
  <h1>Alex's Portfolio</h1>
  <p>I enjoy photography.</p>
  <img src="mountain.svg" alt="Mountain ridges and sunrise">
  <a href="#projects">View my projects</a>
  <section id="projects"><h2>My projects</h2></section>
</body>
</html>
head holds document information; body holds displayed content. src is the image source, alt is a text
alternative, and href is a link destination. img has no end tag.
3. Match the tags (20–30 minutes)
Write A–D: A image, B hyperlink, C paragraph, D main heading.
Tag
Purpose
Attribute / reminder
<h1>
________
Identifies the page's main topic
<p>
________
Groups related sentences
<img>
________
src and alt; describe a content image meaningfully
<a>
________
href; link text explains the destination
Use the reference; memorising code is not required. Use an alias and permitted images. Real photos, phone numbers and home
addresses are not required.

## 第 2 页

HTML · Debug, design and reflect
Lesson 1 · Page 2 / 4
4. Repair this source (30–45 minutes)
Circle two problems and write the corrections. The mountain picture is a content image.
<h1>My Portfolio
<p>I enjoy photography.</p>
<img src="mountain.svg">
<a href="#projects">My Projects</a>
<section id="projects"><h2>My Projects</h2></section>
5. Paper portfolio (45–60 minutes)
Sketch the layout, then write the HTML inside body: a main heading, introduction, image with alt, and a link with a
matching target. You may use a fictional character.
Layout sketch
HTML draft
6. Peer review (60–66 minutes)
My partner checks: □ h1　□ p　□ image src / alt　□ matching href / id　□ paired tags
The HTML choice I explained, and one strength and one specific suggestion from my partner:
7. Individual Exit Ticket (66–70 minutes)
1. Explain the purposes of two HTML elements you used today.
2. What is missing from <a>My Projects</a>? Write a working example.
3. What error did you fix today, and how would you test the fix in a browser? What would you like to improve next
lesson?
When devices recover, enter your draft and test display, images, links and saving in a browser. Paper checks do not prove that a web
page works.

## 第 3 页

Portfolio Lab · CSS backup worksheet
Lesson 2 · 70 minutes · Page 3 / 4
Alias: ______________
Class no.: ______
Date: ______________
Before class · Lesson 1 HTML recap (0–5 minutes)
Circle answers independently. Review them at minutes 5–8 before starting CSS.
1. Which elements give a main heading and introductory paragraph?
A h1, p　B p, img　C img, a
2. What are the jobs of an image's src and alt, respectively?
A Description, source　B Source, text alternative　C Both give a link destination
3. The target has id="projects". Which start tag gives the correct same-page destination?
A <a src="#projects">　B <a href="projects">　C <a href="#projects">
4. What is missing from <h1>My Portfolio<p>I enjoy photography.</p>?
A Add </img>　B Add </h1> before p　C Add href to p
1. Read rules and observe (8–20 minutes)
HTML gives structure; CSS gives presentation. Circle selectors, underline properties and box values.
h1 { color: #17634b; }
body { font-family: Arial, sans-serif; font-size: 18px;
  line-height: 1.7; color: #243b35; background-color: #f4f8f6; }
h1 selects h1 elements; .intro selects class="intro"; #projects selects id="projects". Edit HTML and CSS
separately. Export places CSS in a style element inside head; several pages can share an external stylesheet.
2. Predict and debug (20–35 minutes)
The rules have the same selector and equal priority. What colour wins, and why?
p { color: #333333; }
p { color: #17634b; }
Fix the syntax below to make the heading green with a font size of 28px.
h1 {
  color #17634b
  font-size: 28px;
}
3. Box-model reference
margin: outside the border
border
padding: inside the border
content
Space between text and border: __________; space outside the border: __________.
Predict, then test. Readability includes text size, line spacing, contrast and clear links, as well as colour choices.

## 第 4 页

CSS · Make your portfolio easier to read
Lesson 2 · Page 4 / 4
4. Design your styles (35–55 minutes)
Write CSS for your Lesson 1 work: body typeface, size, line height, text and background colour; heading colour;
section padding, margin-top and border; underlined links. You may choose another palette with sufficient contrast.
My CSS
5. Explain and review (55–65 minutes)
What reading problem did you improve? Identify the relevant CSS rule and explain your choice.
What specific change did your partner suggest?
6. Individual Exit Ticket (65–70 minutes)
1. Distinguish HTML from CSS. 2. Write a paragraph colour rule and identify its selector, property and value. 3.
Distinguish padding from margin and explain how you would test your improvement.
Complete these tests when devices recover
□ Open the HTML. Check the image and click the link to reach its destination.
□ Enter CSS in the CSS editor and compare styles on/off.
□ Check actual fonts, colours, line spacing and box spacing. Correct invalid declarations.
□ Try a narrow view and Tab navigation. Ask a partner to read the content.
□ Download JSON and HTML. Open the exported HTML independently and retest.
Paper work shows understanding, prediction and design. Test actual display, usable links and file exports when devices recover.
