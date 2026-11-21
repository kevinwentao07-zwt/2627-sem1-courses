# Lesson_Plan_EN.pdf

原件：INT2065/PacketLab_School_Materials/Teacher/English/Lesson_Plan_EN.pdf

## 第 1 页

Inside the Internet  /  1
Network Devices and TCP IP
Lesson plan for Secondary 4 or 5 ICT
Class __________  Teacher __________  Dates __________
Planning assumption: about 30 students, working in pairs at 15 computers.
Place in the teaching programme
These two 70-minute double lessons form the core of a longer sequence on network devices and data 
transmission. Further lessons or parts of lessons are used to finish investigations, revisit difficulties and apply the 
ideas. The teacher decides the continuation after reviewing student work; 140 minutes is not the total unit limit.
The topic is part of Networking and Internet Basics in the compulsory Internet and its Applications module. This 
sequence covers NIC, modem, switch, router and access point functions; local and external paths; and a simplified 
TCP/IP transfer process. Detailed handshakes, TTL, DNS, HTTP, subnet calculations, IPv6 and wireless 
standards are left to other teaching in the school programme.
Previous learning
Students should be able to use a browser and mouse and recognise a computer and Wi-Fi connection. Do not 
assume that they can already explain LAN, WAN, client, server or the device functions. Teach these at the 
beginning of Lesson 1 and check them with the Foundation Notes before introducing route comparisons. No 
online preparation at home is required.
Learning objectives
1. Explain the functions of NIC, modem, switch, router and AP, using a suitable example for each.
2. Trace a stated local or external path and explain why an AP fault affects a wireless transfer while a separate 
working wired path may remain available.
3. Explain how TCP and IP support splitting, addressed delivery, checks and retransmission, and reassembly at 
the receiver. Distinguish arrival order from the original order.
Resources and teaching approach
At the start of Lesson 1, give each learner the Foundation Notes and Hardware Reference. Issue Worksheet pages 
1–3 for guided practice and hold page 4 (Q5) separately. Give out TCP/IP Notes after retrieval at minute 8 of 
Lesson 2. Keep Followup Activities and Progress Check ready for the planned application and follow-up tasks. 
Use classroom slides 1–6 in Lesson 1 and 7–12 in Lesson 2. Keep teacher answers hidden during tasks. Students 
use one language version and keep their own written responses.
Use guided inquiry through a predict–observe–explain routine. The teacher supplies a working example and a 
focused question; students predict a single change, test it and explain the evidence. Written predictions reveal 
initial ideas. Changing one condition makes the comparison interpretable. The teacher asks for the connection or 
protocol that explains the result. A diagram introduces the path; the simulation allows the same condition to be 
changed and tested again. Pair discussion supports practice; an individual response checks what each student can 
explain.

## 第 2 页

Inside the Internet  /  2
Double Lesson 1 Devices and network paths
70 minutes. Focus: objectives 1 and 2. Student work: Foundation quick check and Worksheet Q1–Q3. Use 
classroom slides 1–6.
0–12 minutes  Introduce network purposes
Open with a school case: the classroom Wi-Fi drops, but a wired PC can still reach the school’s internal website. 
Ask how both can be true and save the ideas for Q3. Use Foundation Notes for LAN/WAN and client/server. Run 
quick checks 1 and 3; revisit any confusion about network scope or who requests and provides the service.
12–30 minutes  Compare device functions
Use the Hardware Reference and website function panels to compare NIC, switch, router and AP. Explain modem 
modulation and demodulation using the printed dial-up example; the ISP uplink on the website is not a modem 
model. Students complete Q1 and Foundation check 2. Ask: “Which device gives the computer its network 
interface?” and “Which connects different networks?” Check that the student can explain a choice rather than only 
name it.
30–43 minutes  Compare two paths
Demonstrate PC to Local server through the switch. Repeat with the external Web server destination. Students 
trace the route in Q2 and identify the router at the boundary between networks. Ask: “Does this local transfer need 
Internet access?” Expect a reason based on the working same-LAN path, not a claim that every transfer uses a 
router.
43–48 minutes  Establish the wireless example
Load the working wireless reference network. Confirm successful Laptop to Web server delivery with AP power 
on. Students record Q3a before changing anything. Explain that the prediction is kept even if it later proves 
wrong.
48–62 minutes  Test the AP power fault
Pairs turn off only AP power, send again and record the actual result. They restore AP power and retest without 
changing other settings. Partners exchange operator and recorder roles, but each writes Q3b–d. Ask: “Which 
connection is unavailable?” and “What did restoring power change?” If the starting example fails, restore it before 
interpreting the fault test.
62–70 minutes  Check the explanation
Ask each student to explain on the back of the worksheet whether a separate, unchanged wired PC-to-switch-to-
local-server path must fail when the AP is off. It need not fail: it does not use that AP. Collect the first response, 
discuss the reason and allow a correction in another colour. Review Q1–Q3 and note unfinished work.
Before the next lesson
Identify device or path errors for Follow-up A. If operation was slow, use the static route image to complete the 
reasoning. Carry an unfinished AP investigation into the next teaching period; do not mark incomplete writing as 
a misconception. If local and external paths remain confused, revisit them before relying on that distinction in 
Lesson 2.

## 第 3 页

Inside the Internet  /  3
Double Lesson 2 TCP and IP
70 minutes. Focus: objective 3, with retrieval of objectives 1 and 2. Student work: Worksheet Q4–Q5 and 
Followup Activities Scenario B. Use classroom slides 7–12.
0–8 minutes  Retrieve the previous learning
Return brief feedback from Lesson 1. Without notes, ask for the router and AP functions and one local path. 
Students correct one earlier device explanation after discussion. Use the responses to decide whether a short path 
review is needed.
8–23 minutes  Model the transmission process
Ask students to imagine downloading a worksheet from the school website. In the simplified model, one part 
arrives later than another. Use TCP/IP Notes to model splitting, addressed delivery, checks and retransmission, 
and receiving TCP reassembly. Students explain the stages to a partner and complete Q4a. No address 
calculations are required.
23–35 minutes  Compare arrival and original order
Show out-of-order delivery in TCP/IP mode. Pause after the parts arrive and before reassembly. Ask: “In what 
order did they arrive?” and “In what order must the original message be rebuilt?” Students complete Q4b–c using 
the numbers printed in the question, even if the live example differs. Receiving TCP reassembles the data; the 
switch forwards it along the path.
35–45 minutes  Consider a missing part
Use the missing-part example or the printed Q4d case. Students identify the missing part and explain why the 
complete original message cannot yet be reconstructed. Require retransmission and successful receipt before 
complete reassembly. Use paper parts if repeated animation distracts from the explanation.
45–52 minutes  Apply the path distinction
Use Followup Activities Scenario B. A powered AP retains the laptop Wi-Fi association, but the AP-to-switch 
cable is unplugged. Students explain why the laptop cannot reach the local server while the separate wired PC 
can. Compare this with AP power off. Keep the printed conditions visible; a paper explanation is sufficient if the 
model cannot reproduce them exactly.
52–62 minutes  Collect an individual explanation
Cover or collect Worksheet pages 1–3 and the notes. Give out the separate Q5 sheet. Students write four points 
independently with the website hidden. Circulate to clarify instructions without supplying the answer points. 
Collect Q5 before displaying the model answer.
62–70 minutes  Give feedback and check transfer
Ask: “Will a faster switch restore the correct message order?” Expect disagreement because receiving TCP 
performs message reassembly. Then show the four process points. Students keep their first Q5 answer and add 
one correction in another colour. Collect the original and revised explanations.
If more time is needed
Move Scenario B to a later lesson if necessary. If essential TCP/IP teaching is incomplete, continue it before 
administering Q5; record the changed date and help given. Do not rush missing-data reasoning merely to finish 
within 140 minutes. Use Follow-up B where the independent answer still confuses a protocol, order or receiver 
task.

## 第 4 页

Inside the Internet  /  4
Further teaching after the core lessons
Review individual explanations after each core lesson. Separate an incorrect idea from unfinished work, difficulty 
expressing an answer, or an equipment problem. Give a small group targeted help while others attempt Scenario 
A. Where many students share the same confusion, revisit it with the whole class. The times below are adjustable 
blocks, not a compulsory extra lesson sequence.
Follow-up A Devices and paths  About 20 minutes
Use when students confuse device functions, require a router on every route, or think that AP failure stops every 
device. Resources: Foundation Notes, Hardware Reference, a route view and Progress Check page 1.
0–8 minutes
Ask the learner to explain one earlier answer. Contrast only the functions causing difficulty, including NIC versus 
modem where needed. Complete Progress Check Task 1 with the reference available. Ask the learner to explain a 
choice in a school example.
8–14 minutes
Trace PC–switch–local server. Then compare the powered AP with its cable to the switch disconnected. Students 
complete Task 2 and explain both the failed laptop path and unchanged PC path. During practice, offer: “The 
transfer fails because the connection between ___ and ___ is unavailable.”
14–20 minutes
Remove notes for Task 3. Check whether the learner explains why neither the separate AP nor a router is needed 
on the stated same-LAN path. Give feedback after the response, keep the original answer and record any 
remaining confusion. Repeat the unresolved distinction with a different example later.
Follow-up B TCP and IP  About 25 minutes
Use when Q4 or Q5 confuses TCP/IP roles, receiver reassembly, order or missing data. Resources: TCP/IP Notes, 
paused model or four paper parts, and Progress Check page 2.
0–10 minutes
Ask for the two protocol roles and where reassembly occurs. Re-model the uncertain stage with the notes 
available. Separate forwarding along the path from reconstructing the message at its destination.
10–16 minutes
Complete guided Task 4. Use arrival 4,2,1,3 and then omit part 2. Ask for original order and what is needed 
before the complete message can be reconstructed. The numbers are teaching labels, not real TCP sequence 
numbers.
16–25 minutes
Close the notes and model for Task 5, which changes the order and missing part. Check receiving TCP, original 
order, successful receipt of the missing part and IP addressing/delivery. Give feedback and retain a revised 
response. A correct total with the same important misconception still needs further teaching.

## 第 5 页

Inside the Internet  /  5
Application and assessment
Follow-up C Application  About 35 minutes
Use when students can explain the essential device, path and TCP/IP ideas independently. It can run alongside 
targeted support for other students. Resources: Followup Activities Scenario A, the separate 12-mark 
consolidation and the teacher marking guide.
0–5 minutes
Ask whether local access can work when an external webpage does not. Collect a reason before displaying notes.
5–15 minutes
Partners complete Scenario A. Ask what the successful local test establishes and what still needs checking. It 
supports the tested local path but does not prove that the router, onward link or external service works. Students 
suggest two reasonable checks and justify one; the evidence does not identify a unique fault.
15–30 minutes
When ready, students complete the separate 12-mark consolidation without notes or partner answers. Keep its 
score separate from the core worksheet. Students still requiring help complete guided practice instead; record that 
support rather than treating it as independent assessment.
30–35 minutes
Review selected explanations, ask for a correction and agree one next step. A stronger student can devise a fault 
case and explain how a test distinguishes two possible causes, without adding new protocols or calculations.
How the teacher uses the work
The core worksheet is marked out of 24: Q1 4, Q2 4, Q3 4, Q4 8 and Q5 4. Q1–Q4 include supported practice. 
Q3a awards a prediction recorded before testing, even if it is wrong. Q3b requires both actual observations. The 
total therefore does not, by itself, show independent understanding. Use the marking guide to check the reason as 
well as the term or result.
Q5 is an independent explanation after teaching. Progress Check is unmarked: Tasks 1, 2 and 4 allow support; 
Tasks 3 and 5 provide fresh individual responses without notes. The later consolidation is separately out of 12. 
These are original classroom tasks, not official HKEAA questions or marking criteria.
Later checking and continuation
At the next available lesson, use a new route or missing-part question for 3–5 minutes before showing notes. 
Compare it with the original difficulty. A copied correction shows revision; a fresh explanation shows whether the 
learner can now use the idea. Continue relevant support if the error remains. Finish essential work before moving 
on to the next topic under the school scheme of work.
Record briefly in the mark book or teacher notes: learner, concept or unfinished task, help given and date, fresh 
response, and next action. Keep actual teaching time and any work moved between lessons. Further teaching may 
occupy part of a later double lesson or several periods, according to progress.

## 第 6 页

Inside the Internet  /  6
Classroom preparation and teacher review
Before teaching
Test the local, external and wireless reference examples, AP power control and TCP/IP pause/reset on the 
classroom computer. Set the class language and check the projector view. Open Students/Network_Lab_EN.html 
locally and keep Teacher/Backup_Stills available. Check the current live address before distributing it; a 
deployment address may change. Keep Q5 separate and teacher answers hidden during individual work.
Access and classroom management
Let partners alternate operator and recorder while each keeps a worksheet. Use a clear pause signal and stable 
camera view when explaining a stage. Offer oral rehearsal, a word bank and a static path image during practice. If 
writing or language obscures a learner’s understanding, ask for an individual oral explanation and record the 
changed assessment conditions. Do not assess speed of mouse use as network understanding.
If the technology fails
Try restoring the reference once. After about two minutes, use the local HTML or printed route and packet 
examples. The offline model has fewer controls than the live website. State the conditions and record what was 
actually observed; do not label an unrelated model failure as the intended AP result. Resume any unfinished 
investigation later.
Accuracy and responsible use
The simulation simplifies routes, timing and message parts. Combined home equipment may perform several 
functions. The ISP uplink is not a modem demonstration. Use fictional data, provide paper access and follow 
school policy for external hosting. Acknowledge actual AI assistance and human checking. This plan proposes 
teaching and assessment; no classroom trial or measured improvement is claimed.
Notes after teaching
Which idea remained unclear and what did the students say or write?
_____________________________________________________________________
What was carried forward and why?
_____________________________________________________________________
What further teaching was used and how much time did it take?
_____________________________________________________________________
What did the fresh individual response show?
_____________________________________________________________________
What should change before teaching this sequence again?
_____________________________________________________________________
References
Curriculum Development Council and HKEAA. (2021). Information and communication technology curriculum 
and assessment guide (Secondary 4–6), printed pp. 21–23. Education Bureau.
White, R., and Gunstone, R. (1992). Probing understanding. Falmer Press.
The INT2065 course brief governs the submission and presentation. School lesson timings and the optional 
continuation blocks are planning choices.
