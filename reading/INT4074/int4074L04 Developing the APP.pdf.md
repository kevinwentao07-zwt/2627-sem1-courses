# int4074L04 Developing the APP.pdf

原件：INT4074/int4074L04 Developing the APP.pdf

## 第 1 页

4 – Developing the APP
Coding and Logics
INT4074
Mobile Applications Design and Development

## 第 2 页

Outline
1
1. Review Mobile App Development Lifecycle
2. Developing the APP (using APP Inventor)

## 第 3 页

1 Mobile App Development Lifecycle
2
1.
Discovery and Market Research
2.
Establish Mobile APP Goals and Objectives
3.
Wireframes and Storyboards
4.
Defining the Backend of Mobile APP
5.
Finalize Wireframes and Test the Prototype
6.
Developing the APP
7.
Test and Test Again
8.
Preparing for Launch

## 第 4 页

1 Mobile App Development Lifecycle
3
1.
Discovery and Market Research
2.
Establish Mobile APP Goals and Objectives
3.
Wireframes and Storyboards
4.
Defining the Backend of Mobile APP
5.
Finalize Wireframes and Test the Prototype
6.
Developing the APP
7.
Test and Test Again
8.
Preparing for Launch

## 第 5 页

Review:
4 Defining the Backend of Mobile App
4
Every Android app consists of two Parts:
1. Frontend Design 
(Look and feel of Android app),  i.e., App Screen
2. Backend Logic 
(This contains the logic which will decides how 
our app will work)
Non-Visible Components
Visible components
https://www.neebal.com/blog/demystifying-mobile-app-backend-development-a-comprehensive-guide

## 第 6 页

Review: 
4 Defining the Backend of Mobile App
5
Every Android app consists of two Parts:
1. Frontend Design 
2. Backend Logic 
Non-Visible Components
Visible components
https://www.neebal.com/blog/demystifying-mobile-app-backend-development-a-comprehensive-guide 
Frontend Design 
is created using 
Designer in App 
inventor 2.
Backend Logic is 
created in the 
Blocks Editor.

## 第 7 页

Lesson Intended Learning Outcomes
6
At the end of this lesson, you should be able to 
1. Login the MIT App Inventor platform connecting with AI Companion 
2. Know and separate two main views, i.e., Designer and Blocks
3. Find and understand detailed info. of components and properties 
4. Understand and separate different coding blocks by color
5. Develop an APP with screen, label, button

## 第 8 页

6. Developing the APP
7
MIT App Inventor 
• https://appinventor.mit.edu  (Home Page)
• https://ai2.appinventor.mit.edu  (Editing)
• Supported browsers: 
 
Chrome, Firefox and Safari
https://appinventor.mit.edu/explore/ai2/setup

## 第 9 页

Lesson Intended Learning Outcomes
8
At the end of this lesson, you should be able to 
1. Login the MIT App Inventor platform connecting with AI Companion 
2. Know and separate two main views, i.e., Designer and Blocks
3. Find and understand detailed info. of components and properties 
4. Understand and separate different coding blocks by color
5. Develop an APP with screen, label, button

## 第 10 页

6. Developing the APP
9
App Inventor consists of 
1. the Designer:  
lets you create the app's interface
2. the Blocks Editor
lets you program the app's behavior by putting blocks together
https://appinventor.mit.edu/explore/designer-blocks

## 第 11 页

6. Developing the APP
10
1. Designer

## 第 12 页

6. Developing the APP
11
2. Blocks Editor

## 第 13 页

Lesson Intended Learning Outcomes
12
At the end of this lesson, you should be able to 
1. Login the MIT App Inventor platform connecting with AI Companion 
2. Know and separate two main views, i.e., Designer and Blocks
3. Find and understand detailed info. of components and properties 
4. Understand and separate different coding blocks by color
5. Develop an APP with screen, label, button

## 第 14 页

6. Developing the APP
13
Start a new project:
• a project name must start with an alphabet 
and contain only alphabets, numbers or 
the “underscore” sign.
• The App Inventor saves your project 
periodically. It is safer to save the project 
manually using the menu command 
Projects » Save project
• Online Document: 
https://ai2.appinventor.mit.edu/reference/ 
Palette: find components here 
to use in your application
Viewer: user interface of your 
application

## 第 15 页

6. Developing the APP
14
Overview
• Components
https://ai2.appinventor.mit.edu/reference/components/index.html
https://ai2.appinventor.mit.edu/reference/components/userinterface.html
https://ai2.appinventor.mit.edu/reference/components/userinterface.html#Button

## 第 16 页

6. Developing the APP
15
Overview
• Build-in Blocks
https://ai2.appinventor.mit.edu/reference/blocks/
https://ai2.appinventor.mit.edu/reference/blocks/logic.html

## 第 17 页

6. Developing the APP
16
Screen
• Top-level component containing all other 
components in the program.
• The Screen component does not have the Width 
and Height properties because it always fills up the 
entire screen of the Android device.

## 第 18 页

6. Developing the APP
17
Components & Properties:
• e.g. the Text property of Label1 is the text in 
display. 
• Please change it to 
“Hello World\nINT4074”
• \n is a new-line character to insert a new line

## 第 19 页

6. Developing the APP
18
Parent - Child Relationship:
• As an example, since Button1 is placed on Screen1, Screen1 is called 
the container or parent of Button1.
• Button1 is called the child of Screen1. 
• Not every kind of components can be a container.

## 第 20 页

Lesson Intended Learning Outcomes
19
At the end of this lesson, you should be able to 
1. Login the MIT App Inventor platform connecting with AI Companion 
2. Know and separate two main views, i.e., Designer and Blocks
3. Find and understand detailed info. of components and properties 
4. Understand and separate different coding blocks by color
5. Develop an APP with screen, label, button

## 第 21 页

6. Developing the APP
20
Coding Blocks:
• In case of using multiple 
Screen components, each 
one of them has its own 
code, which is created in its 
Viewer and can use only its 
contained components.
Built-in: code blocks that does 
not belong to a component, 
e.g., math.opertion
Select a component (Sreen1 or one 
contained in Screen1 in this case) 
to find it code blocks

## 第 22 页

6. Developing the APP
21
Coding Blocks:
• There are 4 types of the code blocks of a 
component.
• Event handler: the brown “when…do…” 
blocks
• Methods calls: the purple 
“call…” blocks
• Property getter: the light-green 
“ComponentName.Property” blocks 
• Property setters: the dark-green 
“set ComponentName.Property” blocks

## 第 23 页

6. Developing the APP
22
Coding Blocks:
• Event handler: the brown “when…do…” blocks
• Event Handler will execute the codes placed in the do part (or socket) 
of its block when a certain event occurs in the component.
• Note: all the codes of an event handler are completely executed 
before another event handler can be executed. 
• For example, after clicking a button, during the time of this event’s 
handler execution, clicking the button again (or another kind of event 
occurs) will not execute the handler of this event until the previous 
handler execution finishes.

## 第 24 页

6. Developing the APP
23
Coding Blocks:
• Methods calls: the purple “call…” blocks
• A method call executes a certain method of the 
component. A method does a certain function of 
the component.
• Similar to that in Python

## 第 25 页

6. Developing the APP
24
Coding Blocks:
• Property getter: the light-green 
“ComponentName.Property” blocks 
• A property getter gets the value of a certain property 
of the component.
• Property setters: the dark-green “set 
ComponentName.Property” blocks
• A property setter sets the value of a certain property 
of the component.
• They allow you to access the current state of a 
component’s property, enabling a more interactive 
and responsive user experience (dynamically)

## 第 26 页

6. Developing the APP
25
Coding Blocks:
• A block has a red X icon if it has an error, or 
• a yellow triangle icon if it has a warning 
(after clicking the button “Show Warning”).
• Clicking the icon shows the warning or 
error message. Debug all the warnings and 
errors!

## 第 27 页

Lesson Intended Learning Outcomes
26
At the end of this lesson, you should be able to 
1. Login the MIT App Inventor platform connecting with AI Companion 
2. Know and separate two main views, i.e., Designer and Blocks
3. Find and understand detailed info. of components and properties 
4. Understand and separate different coding blocks by color
5. Develop an APP with screen, label, button

## 第 28 页

6. Developing the APP
27
Label
• Labels are components used to show text
• A label displays text which is specified by 
the Text property. 
• Other properties, all of which can be set in 
the Designer or Blocks Editor, control the 
appearance and placement of the text.

## 第 29 页

6. Developing the APP
28
Button
• Button with the ability to detect clicks. 
• Many aspects of its appearance can be 
changed, as well as whether it is clickable 
(Enabled). Its properties can be changed 
in the Designer or in the Blocks Editor. 
• Properties
• Events

## 第 30 页

6. Developing the APP
29
Establish Your App --- helloworld 
• Interface:
Start
Hide the text label by default
When the “Launch Button” is pressed
Show the text label
Change the button’s text to “Clear”
End

## 第 31 页

6. Developing the APP
30
Extension: 
Develop an App to test all button events
• Use different labels for each events
• Set colors and background color

## 第 32 页

Lesson Intended Learning Outcomes
31
At the end of this lesson, you should be able to 
1. Login the MIT App Inventor platform connecting with AI Companion 
2. Know and separate two main views, i.e., Designer and Blocks
3. Find and understand detailed info. of components and properties 
4. Understand and separate different coding blocks by color
5. Develop an APP with screen, label, button
