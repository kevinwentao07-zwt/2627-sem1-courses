# int4074L06  Developing Learning Companion.pdf

原件：INT4074/int4074L06  Developing Learning Companion.pdf

## 第 1 页

6 – Developing An APP: 
Learning Companion
INT4074
Mobile Applications Design and Development

## 第 2 页

Outline
1
1. Review Mobile App Development Lifecycle
2. Class Exercise: Developing A Quiz APP
3. Developing An APP: English Learning Companion

## 第 3 页

1. Review Mobile App Development Lifecycle
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

3
MIT App Inventor 
• https://appinventor.mit.edu  (Home Page)
• https://ai2.appinventor.mit.edu  (Editing)
• Supported browsers: 
 
Chrome, Firefox and Safari
https://appinventor.mit.edu/explore/ai2/setup 
1. Review Mobile App Development Lifecycle

## 第 5 页

LILOs of Last Lecture
4
At the end of this lesson, you should be able to 
1.
Learn and Use user interface components in an APP: 
DatePicker, TimePicker, Notifier, Image, Textbox, ListView
2.
Learn and Use media components in an APP: 
ImagePiker, Camcorder, Camera, SoundRecorder, Player, VideoPlayer, SpeechRecognizer, 
TextToSpeech, Translator
3.
Learn and Use blocks components in an APP: Variable, Procedures, Control (if-else)
4.
Learn and Use drawing and animation (Canvas), Maps, Charts, Storage (CloudDB, 
TinyDB), and Experimental (ChatBot) components in an APP

## 第 6 页

Lesson Intended Learning Outcomes
5
At the end of this lesson, you should be able to 
1.
Design the designer based on given UI using previous components
2.
Develop blocks based on flowcharts 
3.
Learn and Use the file component in APP inventor
4.
Develop and Block a random selection and renew algorithm in an APP 
development
5.
Understand the full procedure to develop an APP including frontend and backend

## 第 7 页

2. Class Exercise: Developing A Quiz APP
6
when the app starts, the first question 
should appear
then questions should be proceeded one 
by one through clicking a “next” button
simple “correct/incorrect” feedback will 
be provided for each answer.
https://appinventor.mit.edu/explore/ai2/quizme

## 第 8 页

7
Develop an APP based on the UI and flowcharts 
• Do it by yourself first. Some detailed blocks given in flowing slides for referring to. 
2. Class Exercise: Developing A Quiz APP

## 第 9 页

Lesson Intended Learning Outcomes
8
At the end of this lesson, you should be able to 
1.
Design the designer based on given UI using previous components
2.
Develop blocks based on flowcharts 
3.
Learn and Use the file component in APP inventor
4.
Develop and Block a random selection and  renew algorithm in an APP 
development
5.
Understand the full procedure to develop an APP including frontend and backend

## 第 10 页

9
2. Class Exercise: Developing A Quiz APP

## 第 11 页

10
• Set “Next” button events:
2. Class Exercise: Developing A Quiz APP

## 第 12 页

11
• Set “submit” button events:
2. Class Exercise: Developing A Quiz APP

## 第 13 页

Lesson Intended Learning Outcomes
12
At the end of this lesson, you should be able to 
1.
Design the designer based on given UI using previous components
2.
Develop blocks based on flowcharts 
3.
Learn and Use the file component in APP inventor
4.
Develop and Block a random selection and renew algorithm in an APP 
development
5.
Understand the full procedure to develop an APP including frontend and backend

## 第 14 页

3. Developing An App:  
English Learning Companion
13
Instructions:
• Get data (i.e., words) from a file (i.e., wordlist.txt)
• Select one word randomly for the wordlist (not repeated), do
• Read the word 
• Let the user input the word 
• Translate the English word to Chinese
• Let the user check the input word and give a feed back
• Let the user read a word and convert it to text for checking
• After all words were selected once, reset automatically and restart 
the process

## 第 15 页

3. Developing An App:  
English Learning Companion
14
Frontend:
• Visible Components
• VerticalArrangement, 
• HorizontalArrangement
• Label
• Button
• TextBox
• Invisible Components
• File
• TextToSpeech
• Translator
• SpeechRecognizer

## 第 16 页

3. Developing An App:  
English Learning Companion
15
Fronted:
• UI Design
• Headline: Small, 24
• Title: Medium, 16
• Body: Medium, 14
• FontTypeface: default (Roboto)
https://m3.material.io/styles/typography/type-scale-tokens

## 第 17 页

3. Developing An App:  
English Learning Companion
16
Fronted:
• Fix Content
• Headline: English Learning 
Companion
• Title: Dictation
• Body: Please click the "Dictation" 
button to obtain the pronunciation 
of the word, type the word into the 
textbox, and then click "Check" to 
receive feedback.

## 第 18 页

6. Developing the APP
17
Hand-on Activities 
 (1)  
Complete the designer parts referring to the UI 
including 
• Label
• Arrangement
• Textbox
• Button

## 第 19 页

3. Developing An App:  
English Learning Companion
18
Backend:
• Dynamic Content
• randomly pick up 1 word
• ensuring no repetition
• if all words have been 
exhausted, reset automatically 
and restart the process.
Dictation
Check
Read
Translation
Feedback
Answer (textbox)
File
TextToSpeech
Translator
Speech
Recognizer

## 第 20 页

3. Developing An App:  
English Learning Companion
19
Backend:
• Preparation
• Variables?  _____, _____, _____, _____
• Initialization
Start
Load the file “wordlist.txt” when initialize
Split the text in the file by commas, then 
append the tokens to a list one by one
Get the length of the word list, then set the 
value of length to a variable
Create another list to describe the status of 
the word  in wordlist, if a word had been 
randomly selected for dictation, the status 
will be set o 1. They are 0 by default
End

## 第 21 页

3. Developing An App:  
English Learning Companion
20
Backend:
• Variables
• Initialize the Screen
Start
Load the file “wordlist.txt” when initialize
Split the text in the file by commas, then 
append the tokens to a list one by one
Get the length of the word list, then set the 
value of length to a variable
Create another list to describe the status of 
the word  in wordlist, if a word had been 
randomly selected for dictation, the status 
will be set o 1. They are 0 by default
End
Global Variables
type
normal
normal
list
list
role
the quantity 
of the words
the index for 
the words list
words list
list of dictated
words
name
n
x
words
used

## 第 22 页

3. Developing An App:  
English Learning Companion
21
Backend:
• Preparation
Start
Load the file “wordlist.txt” when initialize
Split the text in the file by commas, then 
append the tokens to a list one by one
Get the length of the word list, then set the 
value of length to a variable
Create another list to describe the status of 
the word  in wordlist, if a word had been 
randomly selected for dictation, the status 
will be set o 1. They are 0 by default
End

## 第 23 页

3. Developing An App:  
English Learning Companion
22
Backend:
• Preparation
Start
Load the file “wordlist.txt” when initialize
Split the text in the file by commas, then 
append the tokens to a list one by one
Get the length of the word list, then set the 
value of length to a variable
Create another list to describe the status of 
the word  in wordlist, if a word had been 
randomly selected for dictation, the status 
will be set o 1. They are 0 by default
End

## 第 24 页

23
Hand-on Activities 
 (2)  
Complete the preparation block parts referring 
to the flowchart including: 
• File
• Text
• Variables
• List
• for loop
Start
Load the file “wordlist.txt” when initialize
Split the text in the file by commas, then 
append the tokens to a list one by one
Get the length of the word list, then set the 
value of length to a variable
Create another list to describe the status of 
the word  in wordlist, if a word had been 
randomly selected for dictation, the status 
will be set o 1. They are 0 by default
End
3. Developing An App:  
English Learning Companion

## 第 25 页

Lesson Intended Learning Outcomes
24
At the end of this lesson, you should be able to 
1.
Design the designer based on given UI using previous components
2.
Develop blocks based on flowcharts 
3.
Learn and Use the file component in APP inventor
4.
Develop and Block a random selection and renew algorithm in an APP 
development
5.
Understand the full procedure to develop an APP including frontend and backend

## 第 26 页

3. Developing An App:  
English Learning Companion
25
Button – Dictation
• try to explain this piece of code 
by using a flowchart

## 第 27 页

26
Hand-on Activities 
 (3)  
Complete the “DictationButton” block 
parts including: 
• Math: random
• TextToSpeech
• Translator
• List
• If-else logic
• Algorithm
3. Developing An App:  
English Learning Companion

## 第 28 页

Lesson Intended Learning Outcomes
27
At the end of this lesson, you should be able to 
1.
Design the designer based on given UI using previous components
2.
Develop blocks based on flowcharts 
3.
Learn and Use the file component in APP inventor
4.
Develop and Block a random selection and renew algorithm in an APP 
development
5.
Understand the full procedure to develop an APP including frontend and backend

## 第 29 页

3. Developing An App:  
English Learning Companion
28
Button – Check
• Flowchart of the button
Start
When the “Check” 
button is pressed
LabelFeedback 
shows “Incorrent”
The Textbox 
TextAnswer 
is correct?
LabelFeedback 
shows “Corrent”
Reset Textbox TextAnswer and Label 
Translation to null for the next round
End
No
Yes

## 第 30 页

3. Developing An App:  
English Learning Companion
29
Button – Check
• Blocks and codes

## 第 31 页

30
Hand-on Activities 
 (4)  
Complete the “CheckButton”  block parts 
referring to the flowchart including: 
• TextBox
• Text
• List
• If-else-then logic
Start
When the “Check” 
button is pressed
LabelFeedback 
shows “Incorrent”
The Textbox 
TextAnswer 
is correct?
LabelFeedback 
shows “Corrent”
Reset Textbox TextAnswer and Label 
Translation to null for the next round
End
No
Yes
3. Developing An App:  
English Learning Companion

## 第 32 页

3. Developing An App:  
English Learning Companion
31
Start
When the “Read” button is pressed
LabelFeedback shows 
the result and “corrent”
The 
result is 
correct?
LabelFeedback 
shows the result 
and “Incorrent”
End
No
Yes
Call the SpeechRecognizer to convert the 
audio to text (get text)
When the conversion is completed (after 
getting text)
Downcase all results to match wordlist 
format (initial later capitalized by default)
Button – Read
• Flowchart

## 第 33 页

3. Developing An App:  
English Learning Companion
32
Button – Read
• Bocks and codes

## 第 34 页

33
Hand-on Activities 
 (5)  
Complete the “ReadButton”  block parts 
referring to the flowchart including: 
• Text
• SpeechRecognizer
• If-else-then logic
Start
When the “Read” button is pressed
LabelFeedback shows 
the result and “corrent”
The 
result is 
correct?
LabelFeedback 
shows the result 
and “Incorrent”
End
No
Yes
Call the SpeechRecognizer to convert the 
audio to text (get text)
When the conversion is completed (after 
getting text)
Downcase all results to match wordlist 
format (initial later capitalized by default)
3. Developing An App:  
English Learning Companion

## 第 35 页

34
Procedure Summary
• Preparation
• Frontend
• Backend
• Flowchart
• Blocks and codes
3. Developing An App:  
English Learning Companion

## 第 36 页

Lesson Intended Learning Outcomes
35
At the end of this lesson, you should be able to 
1.
Design the designer based on given UI using previous components
2.
Develop blocks based on flowcharts 
3.
Learn and Use the file component in APP inventor
4.
Develop and Block a random selection and renew algorithm in an APP 
development
5.
Understand the full procedure to develop an APP including frontend and backend
