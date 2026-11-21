# Presentation_Guide_and_Script_EN.docx

原件：INT2065/PacketLab_School_Materials/Teacher/English/Presentation_Guide_and_Script_EN.docx

Packet Lab: 25-minute script
INT2065   /   41 slides   /   Presenters A–E
This is the complete English speech for the 25-minute presentation. Start the clock on slide 1. Read only the spoken paragraphs; stage cues are for the presenter and the demo operator.
A   0:00–4:00   /   Slides 01–06
Learners, opening materials and objectives.
B   4:00–9:00   /   Slides 07–14
Teaching with the lesson plan.
C   9:00–15:00   /   Slides 15–29
Teaching with Packet Lab.
D   15:00–20:00   /   Slides 30–37
Assessment, feedback and follow-up.
E   20:00–25:00   /   Slides 38–41
Educational value and evaluation.
Live demo · Slide 19 · 10:25–11:35
C narrates. D switches to the prepared website, keeps Laptop → Web server fixed, tests AP on, AP off and AP restored, then returns to the deck. Preload https://int2065.herolch07.me/ and the offline backup.
Finding your part
Use the PDF bookmarks or your own script in Presenters/A through E. The PowerPoint speaker notes use the same words and timing.
Presenter A: Opening and student handouts
25-minute presentation   /   Slides 01–03   /   0:00–1:50
Slide 01. Inside the Internet   0:00–0:45
Stage cue (do not read): Open with the teaching proposal. Refer to the students, then preview the order of the talk.
Good evening. We are proposing two lessons on how data moves across a network. The lessons are for Secondary Four or Five ICT students, working in pairs. Our main teaching tool is Packet Lab, which lets students follow a route and test what happens when one connection changes. Each student also writes their own explanation. Today we will show what we hand out at the start, how we use the lesson plan to guide the class, and what evidence we would collect to decide what to teach next.
Slide 02. The starting point   0:45–1:33
Stage cue (do not read): Read the school scenario, then indicate where the teacher pauses. Leave the explanation until the AP investigation.
We would start with a situation students recognise. The classroom Wi-Fi stops working, but a wired computer can still open the school's internal website. I would ask the class, “How can both of those things be true?” I would take two or three ideas and keep them on the board without giving the answer yet. Some students may use Wi-Fi and Internet as if they mean the same thing. We want to hear that reasoning first, so we can return to the same example after the test.
Slide 03. Foundation notes   1:33–1:50
Stage cue (do not read): Point to LAN/WAN and client/server. This excerpt is the Foundation Notes handout.
At the start of Lesson One, we hand out the Foundation Notes and the Hardware Reference. In the opening twelve minutes, we use the Foundation Notes to check LAN, WAN and who requests or provides a service.
Presenter A: Content, hardware reference and objectives
25-minute presentation   /   Slides 04–06   /   1:50–4:00
Slide 04. What we teach   1:50–2:28
Stage cue (do not read): Show the two content areas. Explain how the first prepares students for the second.
We teach students to follow a route before we ask them to explain what happens to the data travelling along it. For the first lesson, the question is, “Which devices does this transfer need?” In the second, it is, “How does the receiver recover the original data?” That keeps the sequence manageable. We cover the device functions and a simplified TCP/IP process, without asking students to configure a whole network or calculate IP addresses.
Slide 05. Hardware reference   2:28–2:45
Stage cue (do not read): Point to the function column on the handout. Explain when it is distributed and when students start using it.
We distribute this Hardware Reference at the beginning of Lesson One. At minute twelve, students use its function column for Q1. They compare what the switch and router do, then explain their choice for the given network.
Slide 06. Three learning objectives   2:45–4:00
Stage cue (do not read): Point to each objective and connect it to evidence. Hand over to B.
Here is what we would look for by the end. First, students can explain what a device does in an example. In Q1 they use the reference to compare the network interface card, switch, router and access point. We check the modem separately with the printed example, because there is no modem model in the website. Second, students can trace a working path and explain why an access point fault affects one route but may leave another route working. Q2 and Q3 give us that evidence. Third, students can explain how TCP and IP help transfer data, including what the receiver does when a part is missing. Q4 lets them practise, and Q5 checks their explanation without support. B will now show how the lesson plan gets students from the first question to those answers.
Presenter B
25-minute presentation   /   Slides 07–10   /   4:00–6:25
Slide 07. The two-lesson sequence   4:00–4:25
Stage cue (do not read): Point to Lesson 1 on the left and Lesson 2 on the right.
Thanks. We planned two seventy-minute double lessons. In the first, students learn what the devices do, follow a route, and investigate a wireless fault. In the second, they use what they remember about routes to make sense of TCP/IP. At the end, each student explains the process on their own.
Slide 08. Before class   4:25–5:00
Stage cue (do not read): Point to Teacher first, then Students. Keep the deck on screen.
Before class, I’d get the Foundation Notes, Hardware Reference and worksheets ready. I’d keep the individual exit question, Q5, separate for Lesson Two. On the classroom computer, I’d test the local, external and wireless examples, check the TCP/IP controls, and have the offline model and printed examples ready. Students can draw on everyday experience with a browser, mouse and Wi-Fi. They don’t need to do any online preparation at home.
Slide 09. Lesson 1: devices, routes, fault   5:00–5:55
Stage cue (do not read): Use the two columns to pair the teacher action with student work. Pause at 43–48 and 48–62.
In Lesson One, I’d start with a question. If classroom Wi-Fi drops, why can a wired PC still open the school’s internal site? The quick checks let me hear how students are thinking about that. We then compare device functions, and students use Q1 to explain a device choice. In Q2, they trace two working routes. That matters for Q3, because students need to know which connection they’re about to test. I’d show the wireless route working first, then have students write their prediction. They test with the access point off and on, and record what actually happens. To finish, each student explains what happens to the separate wired path.
Slide 10. One route crosses a network boundary   5:55–6:25
Stage cue (do not read): Trace the local path first. Then point to the router on the external path.
Here’s the comparison students make in Q2. In the first example, the PC reaches the local server through the switch. For the second, I keep the same sender and choose an external destination. Now the route goes through a router. I’d ask, ‘Does the first transfer need internet access?’ I want students to point to the route and explain that the transfer stays within the local network.
Presenter B continued
25-minute presentation   /   Slides 11–14   /   6:25–9:00
Slide 11. Lesson 2: from packets to explanation   6:25–7:20
Stage cue (do not read): Point to retrieval, the Q4 rows and the individual Q5 task. Keep the focus on what each student explains.
Lesson Two opens with a short recall check on device roles and a local path. Then I’d model a worksheet download using the TCP/IP Notes. Students explain the stages to a partner before working through Q4. They compare the order the parts arrive in with the order the receiver needs. If a part is missing, I ask why the receiver has to wait. We also revisit the route idea with a different fault. This time the access point is powered, but its cable to the switch is unplugged. At minute fifty-two, I put away the earlier work and hide the website. Each student writes four points for Q5. I collect those first answers before we discuss a correction.
Slide 12. Pedagogies in the Two-Lesson Plan   7:20–8:00
Stage cue (do not read): Point to the simulation and collaborative learning rows. Use one example from each lesson.
Two choices in this table are worth pointing out. The simulation makes it possible to pause on something students can usually only imagine. In Lesson Two, for example, I can stop after the parts arrive and ask what the receiver still needs to do. And in the wireless test, one partner operates while the other records, then they swap. Both students still write their own answers. That gives them a chance to talk through what they see and gives me an answer from each student.
Slide 13. After class: choose the next task   8:00–8:25
Stage cue (do not read): Point to Routes, then TCP/IP.
After class, the answer tells me what to revisit. If a student puts a router on every route, I’d go back to a local transfer. If they can follow a route but struggle to explain reassembly, I’d use a fresh missing-part case. If a student ran out of time, I’d let them finish before deciding what they’ve understood.
Slide 14. Why This Lesson Design?   8:25–9:00
Stage cue (do not read): Point to the three design choices. Hand over to Presenter C at 9:00.
The order matters. Once students can trace a working route, they have a way to reason about what happens when one connection changes. Writing down a prediction gives them something to compare with the test result, so they can say why they changed their mind. And the individual answers show me where each student’s explanation breaks down, so I can give feedback on that specific idea. C will now show how the wireless investigation works in Packet Lab.
Presenter C: Packet Lab and the live AP test
25-minute presentation   /   Slides 15–19   /   9:00–11:35
Slide 15. Where Packet Lab fits   9:00–9:35
Stage cue (do not read): Introduce Packet Lab as the main teaching tool. D has the browser tab prepared. Keep the deck visible here.
Packet Lab is our main teaching tool. Network Lab lets students trace and compare routes. In TCP/IP Lab, the teacher can pause a transfer and let students explain what has reached the receiver so far. We choose a prepared example for each objective, so students spend their time interpreting the result. We will show the access point test live. For the TCP/IP part, we will stay with the numbered slides and the worksheet.
Slide 16. AP test: predict first   9:35–9:56
Stage cue (do not read): Read the teacher prompt to illustrate the classroom interaction. Then show Q3.
I would ask the class, “If we switch off only the access point, which connection will fail? What do you expect for the separate wired PC?” I would give students a moment to commit to an answer before touching the controls.
Slide 17. Worksheet Q3: AP power   9:56–10:10
Stage cue (do not read): Point to Q3a, then the observation boxes. Keep the result hidden.
On Q3a, students write the prediction first. We award that point for making a prediction before the test, even if it is wrong. The observation boxes below are for the actual outcomes.
Slide 18. AP on: establish the baseline   10:10–10:25
Stage cue (do not read): Point to the baseline question. D gets ready to switch on slide 19.
First we check that the laptop can reach the web server with the AP on. If delivery already fails, restore the prepared example before testing. That gives us a fair comparison.
Slide 19. AP off: retest the same route   10:25–11:35
Stage cue (do not read): LIVE DEMO 10:25–11:35. C narrates; D switches to the preloaded browser. Send with AP on, switch only AP power off and resend, restore power and resend. Speak each result after it appears. If the baseline fails, use the prepared offline example or AP stills. Return to slide 19, then advance.
Here is the prepared wireless route. We are sending from the laptop to the same web server each time. With the access point on, this first transfer gives us a working baseline. Now we turn off just the access point and send again. This time the transfer fails. We leave the sender and destination alone, restore access point power, and send once more. Delivery returns. In class, both partners would record the two outcomes in Q3. Then I would ask them to name the connection that explains the change.
Presenter C: Interpreting the test and modelling TCP/IP
25-minute presentation   /   Slides 20–25   /   11:35–13:54
Slide 20. AP restored: delivery returns   11:35–11:55
Stage cue (do not read): After D returns to the deck, point to the restored state.
The repair was to restore AP power. The students should record that delivery worked again, as well as recording the failure. Comparing those two observations is what lets them relate the change in power to the change in the result.
Slide 21. AP test: explain the result   11:55–12:22
Stage cue (do not read): Point to the laptop path, then the unchanged wired PC path.
Now we return to the opening question. The laptop loses the wireless link provided by the powered-off access point. The wired PC can still reach the local server through the switch because that path does not use the AP. Students should explain which connection they lost and why the separate route still works.
Slide 22. Packet Lab: the two paths   12:22–12:35
Stage cue (do not read): Point to the two routes in the screenshot. Keep the deck visible after this.
I would ask a student to point to the missing connection, then trace the separate wired path. That makes the reason visible to the class.
Slide 23. TCP/IP: sending the data   12:35–13:15
Stage cue (do not read): Introduce the worksheet download and point to the TCP and IP roles.
For Lesson Two, we return to something students do every day: downloading a worksheet from a school website. After the retrieval questions, we give out the TCP/IP Notes. At the sender, TCP divides the data into smaller parts and keeps track of their order. IP uses destination addresses to support delivery across networks. We pause at this point and ask students to explain one role of each protocol to a partner, then write those roles in Q4a. The labels on the next slide help us talk about order.
Slide 24. TCP/IP: the parts can arrive out of order   13:15–13:37
Stage cue (do not read): Point to 1, 3, 2 and pause briefly before advancing.
When the parts arrive, I would pause the model before it shows the completed message. I would ask the class to say only what they can see so far. Here the arrival order is one, three, two. Those are teaching labels, not actual TCP sequence numbers.
Slide 25. TCP/IP: the receiver restores the order   13:37–13:54
Stage cue (do not read): Contrast the new order with the previous slide and point to the receiver.
Once all the data is present, receiving TCP restores the original order: one, two, three. The switch forwards data along the path. I would ask students to name where the complete message is put back together.
Presenter C: Using Q4 and the TCP/IP Notes
25-minute presentation   /   Slides 26–29   /   13:54–15:00
Slide 26. Worksheet Q4: Arrival order   13:54–14:05
Stage cue (do not read): Point to the two answer blanks in Q4b and the receiver question below.
Students use Q4's printed numbers, even if the model differs. They write both orders and say where the data is reassembled.
Slide 27. TCP/IP: part 2 is missing   14:05–14:30
Stage cue (do not read): Point to the gap and leave a brief pause for the imagined classroom response.
We then change the case. Parts one and three arrive, but part two is missing. I would ask, “Can we rebuild the complete message now? Why?” We can arrange the pieces we have, but the original message is still incomplete. That is the reasoning students need for Q4d.
Slide 28. TCP/IP: retransmission fills the gap   14:30–14:49
Stage cue (do not read): Show the missing part returning before describing complete reassembly.
TCP can arrange for the missing data to be sent again. The receiver must receive it before finishing reassembly. I would ask the class to name both steps: retransmission, then successful receipt. Only then can the complete message be rebuilt.
Slide 29. TCP/IP learning notes   14:49–15:00
Stage cue (do not read): Point to the first and last steps in the notes. Hand over to D.
Students use these notes during practice. We put them away before the final explanation. D will now show how we assess that.
Presenter D: Guided work, Q5 and the marking guide
25-minute presentation   /   Slides 30–34   /   15:00–17:25
Slide 30. Q1–Q4: guided work   15:00–15:35
Stage cue (do not read): Explain what each guided question reveals to the teacher.
The first four questions help us decide what to do while we are teaching. Q1 shows whether students can distinguish device functions. Q2 shows whether they see the boundary between two networks. In Q3, we compare the initial prediction with the recorded result and the reason they give. Q4 shows whether they distinguish forwarding, arrival order and reassembly. I would look at those answers while students work, then ask a prompt about the specific idea they have missed.
Slide 31. Q5: independent explanation   15:35–15:54
Stage cue (do not read): State what gets covered or collected and why.
Q5 checks what each student can explain independently. We cover or collect worksheet pages one to three and the notes, hide the website, and ask students to work without their partners. The teacher can clarify the instructions without supplying the answer.
Slide 32. Worksheet Q5: Exit task   15:54–16:05
Stage cue (do not read): Point to the instruction and four answer spaces.
Each student writes four points on this separate Q5 sheet. We collect it before showing the model answer.
Slide 33. What earns credit in Q5   16:05–17:02
Stage cue (do not read): Go through the four criteria once. Use a brief sample error to demonstrate the judgment.
Each distinct point earns one mark. We look for TCP splitting the data and tracking order, IP addressing and delivery, TCP checking for missing data and arranging retransmission, and TCP at the receiver reassembling the complete data in order. We accept different wording if the meaning is right. Suppose a student describes delivery correctly but says a switch puts the data back in order. We can credit the delivery point if it is clear, but the reassembly point is still missing. That tells us more about the next teaching step than a total on its own.
Slide 34. Marking guide: Q5   17:02–17:25
Stage cue (do not read): Point to the model answer as a teacher resource. Explain when the class sees it.
This is the teacher's marking guide. We keep it out of sight while students answer. After collecting Q5, we use the faster-switch question as a quick oral check. Then we show the model answer and ask students to add one correction in another colour, leaving the original visible.
Presenter D: Feedback, a fresh check and follow-up
25-minute presentation   /   Slides 35–37   /   17:25–20:00
Slide 35. Feedback, then a fresh check   17:25–18:18
Stage cue (do not read): Use the same-LAN misconception. Distinguish feedback from the next independent check.
Here is how I would act on a route misconception. A student says, “Every transfer has to go through a router.” I would go back to the wired PC, switch and local server, and ask the student to show where that particular route crosses a network boundary. It does not. If several students make the same mistake, I would reteach the comparison with the class. If it is a small group, I would use the relevant Follow-up A activity with them. Then I would remove the notes and give them a different case, so the new answer tells us more than a copied correction.
Slide 36. Progress check: A fresh case   18:18–18:45
Stage cue (do not read): Point to Progress Check Task 3 and state the expected explanation.
In this new case, the PC and server share a working same-LAN switch path. The AP is off on a separate laptop path. Students answer without notes: the wired PC needs neither that AP nor a router for this transfer. We are looking for the reason. This Progress Check is unmarked and helps the teacher decide whether to move on.
Slide 37. Support and extension   18:45–20:00
Stage cue (do not read): Contrast support and extension using concrete examples. Hand over to E.
During guided practice, we can simplify the route view, supply a word bank or let a student rehearse an explanation aloud. The student still has to name the connection and say why it matters. In Lesson Two, Scenario B changes the fault: the AP stays powered, but the cable from the AP to the switch is unplugged. The laptop can still be associated with Wi-Fi, yet it cannot reach the wired server through that route. Comparing this with AP power off helps students separate wireless association from onward delivery. If the gap is about TCP/IP instead, we use Follow-up B and check a fresh missing-part case. Students who can already explain the core ideas can try the separate application task. E will finish by explaining why we chose the tool and how we would evaluate the lesson.
Presenter E: Educational value and responsible use
25-minute presentation   /   Slides 38–39   /   20:00–23:00
Slide 38. What the model adds   20:00–21:25
Stage cue (do not read): Link educational value to the controlled test. Explain one limitation of the model.
What does the model add to a printed diagram? A diagram is useful for pointing to the route. Packet Lab lets us send along the same route, change one connection, and compare the two outcomes. That repeatable comparison makes the student's explanation more concrete. They can point to what changed and explain why one transfer failed while another path might still work. The simulation is deliberately simplified. The numbered parts are teaching labels, the Internet cloud summarises onward networks, and the provider uplink is not a modem model. We explain those limits when we teach, so students know which ideas the model represents and which details are outside it. I would keep the route diagram visible during the first explanation and use the simulation only when we are ready to change a condition. On the next test, students take over the controls. That gives them a chance to check their own prediction against the evidence.
Slide 39. Access, privacy and AI use   21:25–23:00
Stage cue (do not read): Describe the safeguards you would apply in class. Mention the offline alternative and teacher review of AI-assisted materials.
For classroom access, we would use fictional data and avoid asking for student logins or personal traffic. We prepare the site before class and check that the labels are readable from the back of the room. In pairs, both students get a turn, and both write an explanation. If the Internet connection fails, we can use the offline lab, prepared stills or paper examples. The task stays the same: predict, observe or inspect the given result, then explain. We would disclose any AI assistance used in preparing the teaching materials and check the examples and marking ourselves. The teacher keeps responsibility for what is taught and how answers are judged. If a student has difficulty reading the screen or operating the mouse, I would offer the same route in print and ask for the same explanation. If writing masks their understanding, the teacher can ask for an individual oral explanation and record how it was collected. We are assessing the network reasoning.
Presenter E: Evaluation and conclusion
25-minute presentation   /   Slides 40–41   /   23:00–25:00
Slide 40. A trial would test the design   23:00–24:35
Stage cue (do not read): Explain what you would collect in a trial and how it would affect the next lesson. Do not claim results.
If we trialled the lessons, we would look at three things. First, can a student explain a new route or missing-part case unaided? Second, can the class complete the essential tasks in the time available? Third, can students use and read the resources, including the paper version? For example, if most students predict correctly but cannot explain why the wired path still works, we would spend more time contrasting the two routes. If a technical issue slows the class down, we would move to the prepared alternative and carry any unfinished reasoning forward. I would also keep the student's first answer, the correction after feedback, and the answer to the fresh case separate. If the fresh explanation still uses the same wrong idea, the teacher revisits that concept even if the worksheet total looks fine. If it is secure, the student moves on to the application task. This is a proposed teaching sequence. We have not trialled it with a class or measured learning gains.
Slide 41. What should students be able to explain?   24:35–25:00
Stage cue (do not read): Close at 25:00. Then follow the lecturer’s arrangements for questions.
To finish, we want students to be able to say which route worked, what changed, and why. We give them references to get started, use Packet Lab to test their ideas, and then collect an explanation they can give on their own. Thank you.
