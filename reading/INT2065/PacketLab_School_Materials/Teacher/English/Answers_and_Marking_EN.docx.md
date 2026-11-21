# Answers_and_Marking_EN.docx

原件：INT2065/PacketLab_School_Materials/Teacher/English/Answers_and_Marking_EN.docx

Worksheet Answers and Marking Guide
Teacher version / Core worksheet 24 marks / Optional consolidation 12 marks
Accept equivalent technically correct wording. Award each distinct point once. These original criteria support formative assessment and are not an official HKEAA marking scheme. Keep this file separate from the student materials.
Q1 Device functions 4 marks
Computer network interface. 
Answer: NIC  Mark: 1
Devices within the same LAN. 
Answer: Switch  Mark: 1
Different networks. 
Answer: Router  Mark: 1
Wireless devices joining a wired LAN. 
Answer: AP  Mark: 1
Q2 Local and external paths 4 marks
a. PC to Switch to Local server. Award 1 mark for Switch and 1 for Local server in the correct positions. [2]
b. Router [1]. It connects different networks and forwards packets towards the destination using destination addressing [1]. Accept “connects the LAN to another network”. “Provides Wi-Fi” alone does not earn the role mark. [2]
Model boundary: the Internet cloud summarises onward networks and equipment. The local example does not require a router. A web server supplies webpage data in response to a request.
Q3 Wireless investigation 4 marks
a. Award 1 mark for a clear prediction recorded before testing, whether correct or incorrect. Expected result: the laptop cannot use that AP connection when the AP is off. Retain the initial answer. [1]
b. Records failure with AP off and successful delivery after restoring it, assuming the other reference settings work. Require both observations for this mark. If another fault occurs, record the actual result and troubleshoot before judging the explanation. [1]
c. The powered-off AP cannot provide the wireless connection the laptop needs. Do not accept a claim that every device must lose Internet access whenever any AP is off. [1]
d. Restore AP power, with Wi-Fi enabled, and retest. No password change is needed when power is the sole changed condition. [1]
TCP and IP answers
Q4 TCP and IP 8 marks
a. TCP: reliable or ordered delivery, checking completeness, retransmission, or reassembly [1]. IP: addressing and packet delivery towards the destination [1]. Award one role per protocol. [2]
b. Arrival order: 1,3,2 [1]. Final order: 1,2,3 [1]. Printed message: NETWORKS CONNECT PEOPLE. The live site may use different text. Assess the ordering principle. [2]
c. At the receiver [1]. Receiving TCP organises the complete data parts into their original order [1]. Do not credit Switch or transit Router as the location of TCP reassembly. [2]
d. The complete message still lacks part 2 [1]. That part needs retransmission and successful receipt before complete reassembly [1]. Do not require sequence-number calculations or connection-handshake details. [2]
Q5 Independent exit explanation 4 marks
Model answer: At the sender, TCP divides the data into smaller parts and tracks their order. IP uses addressing to support packet delivery through networks. TCP checks completeness and arranges retransmission when necessary. At the receiver, TCP reassembles the complete data in the original order.
TCP divides data into smaller parts and tracks their order  1
IP uses destination addressing for delivery through networks  1
TCP checks completeness and arranges retransmission when needed  1
Receiving TCP reassembles complete data in the correct order  1
Do not award repeated points twice. Do not require DNS, HTTP or a fixed number of three packets. The numbered parts simplify order and are not real TCP sequence numbers.
Unmarked transfer probe: “A faster Switch will restore the correct message order.” Expected reasoning: disagree. Switching forwards data along the path. Receiving TCP reassembles the complete data in its original order. Use this oral check after collecting Q5, before giving the model answer.
Feedback language
“Your result is correct. Which connection explains it?” “You identified a forwarding device. Where does TCP reassemble the data?” “Keep arrival order separate from the final order.”
Foundation and application answers
Foundation checks during Double Lesson 1
1. School computer-room network: LAN. A network linking offices in different cities: WAN. Accept a comparison based on limited versus wider geographical coverage. 2. NIC provides the device interface; a modem performs modulation/demodulation for the stated access link. 3. The browser computer is the client; the web server supplies webpage data.
If an answer reveals a gap, revisit the relevant example before the relevant investigation. This check is not part of the 24-mark core worksheet.
Scenario A Local access works
Known working: the PC network interface and the local path through the switch to the local server support the tested communication. The observation does not prove that the router, WAN link or external service works.
Suitable further checks include router power, its upstream/WAN connection, and whether the external destination or provider service is reachable. Change one condition at a time and retest. Do not require a unique diagnosis from the limited evidence. “The NIC must have failed” conflicts with the successful local test.
Scenario B AP uplink disconnected
The laptop cannot reach the wired local server through this AP because the AP-to-switch link is absent. Its wireless association with the AP can remain. The wired PC can still reach the server through the unchanged switch path. Reconnect the AP uplink and retest, keeping other settings unchanged.
Compare with the core AP-off task: AP power off removes the wireless connection itself; uplink disconnection can leave that wireless association present while breaking the onward path.
Use of the website
These are written reasoning tasks. Students may verify a case with supported controls, but keep the stated conditions visible. Do not mark an unexpected model outcome as the answer to a different scenario. The teacher can use a static path description instead.
Optional consolidation marking 12 marks
1 Device choice. 
Expected answer: Switch for the two same-LAN PCs [1]; Router between networks [1]; AP for the wireless tablet joining the wired LAN [1]; Modem for the stated signal conversion [1].  Marks: 4
2 AP power fault. 
Expected answer: Laptop cannot reach the server through that wireless path [1]; wired PC can still reach it [1]; the powered-off AP cannot provide the laptop wireless link [1]; restore AP power and retest [1].  Marks: 4
3 TCP reassembly. 
Expected answer: Final order 1,2,3 [1]; TCP [1]; at the receiver [1]; retransmit and successfully receive the missing part before completing the message [1].  Marks: 4
Accept equivalent technically correct explanations. Each distinct point earns credit once. The assessment contains original classroom questions and is not an HKEAA marking scheme. Keep its 12 marks separate from the 24-mark core worksheet.
Feedback and revision
For a device-choice error, compare the two relevant functions. For a path error, trace only the connections named in the scenario. For a TCP error, separate arrival order from final order and identify the receiver. Give a short prompt, then ask the learner to add a revised explanation without erasing the first response.
Use patterns of errors to plan reteaching. A correct choice without a causal explanation is insufficient evidence for the explanation objective. Do not infer that the website caused learning gains from marks alone.
Record template
________. 
Core /24: ____  Optional /12: ____  Concept to revisit: ________________  Revision checked: ________
________. 
Core /24: ____  Optional /12: ____  Concept to revisit: ________________  Revision checked: ________
________. 
Core /24: ____  Optional /12: ____  Concept to revisit: ________________  Revision checked: ________
Progress Check answers and follow up decisions
Progress Check is unmarked. Use the notes during guided Tasks 1, 2 and 4, then remove them for fresh Tasks 3 and 5. Keep original, supported revision and independent evidence distinct. Select further teaching from the concept gap rather than a combined total.
Page 1 Devices and paths
Task 1: a NIC; b Switch; c Router; d AP; e modem. Require a brief explanation where the original evidence showed name memorisation. A modem modulates/demodulates signals; the NIC is the device network interface.
Task 2: the wired PC can reach the local server through the unchanged Switch path. The laptop cannot reach it through the AP because the AP-to-Switch cable is disconnected. Its Wi-Fi association may remain. Reconnect the cable and retest, keeping the other working settings unchanged.
Task 3: neither the AP nor a Router is required on this stated local path. The PC communicates through the working Switch-to-local-server route in the same LAN. The AP fault affects the separate wireless path. If the learner says all traffic requires a Router or AP, repeat that path distinction in Follow-up A.
Page 2 TCP and IP
Task 4: a 1,2,3,4; b TCP at the receiver; c the message cannot yet be completely reconstructed because part 2 is missing. It must be retransmitted and successfully received before complete reconstruction.
Task 5: a not yet, because part 3 is missing; it requires retransmission and successful receipt. b receiving TCP, at the receiver, original order 1,2,3,4. c IP supports addressing and delivery through networks; the Switch forwards data rather than performing this receiving message reassembly.
Independent readiness and delayed checking
Accept equivalent technically correct wording. For paths require the cause and an unaffected route, not only yes/no. For TCP/IP require receiving TCP, original order and successful receipt of missing data. Check addressed delivery as well. If a critical idea remains wrong, target that distinction and use a fresh recheck before further application. Record an unfinished or technically blocked response as not yet observed.
The /24 core and separate /12 consolidation remain unchanged. Follow-up A/B/C durations and approximate class grouping rules are planning choices, not official HKEAA criteria. See the Lesson Plan follow-up sections for decisions and teaching steps.
