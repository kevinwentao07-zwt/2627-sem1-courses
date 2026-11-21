# Presenter_C_EN.docx

原件：INT2065/PacketLab_School_Materials/Presenters/C/Presenter_C_EN.docx

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
