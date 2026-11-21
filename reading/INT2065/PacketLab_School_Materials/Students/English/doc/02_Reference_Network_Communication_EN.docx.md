# 02_Reference_Network_Communication_EN.docx

原件：INT2065/PacketLab_School_Materials/Students/English/doc/02_Reference_Network_Communication_EN.docx

Network Communication Key Points
Networks and roles
Network  
Devices communicate and share resources such as files and printers.
LAN / WAN  
A Local Area Network (LAN) covers a limited area, such as a school computer room. A Wide Area Network (WAN) covers a wider area and can link networks at different sites.
Client / server  
A client requests a service; a server provides it. A browser requests a webpage and a web server returns the page data.
Five devices and their functions
Network interface card (NIC)  
Lets a device connect to a network by Ethernet or Wi-Fi.
Switch  
Connects devices in the same LAN and forwards data through the appropriate port.
Router  
Connects different networks and forwards packets using the destination IP address.
Access point (AP)  
Lets wireless devices join a wired LAN over Wi-Fi.
Modem  
Modulates and demodulates signals so data can travel over an access link. A dial-up modem uses analogue telephone signals.
Paths and faults
Local transfer  
PC → switch → local server. This path needs no router or Internet connection.
External webpage  
PC → switch → router → Internet → web server.
Wireless access  
A laptop joins the AP over Wi-Fi; the AP connects to the switch by cable. Turning off the AP breaks its wireless link. Unplugging only its cable may leave Wi-Fi connected while access to the wired LAN fails. A separate working wired path still works.
How TCP/IP transfers data
1. Split (TCP)  
The sender splits the data into smaller parts and tracks their order.
2. Deliver (IP)  
Packets carry a destination IP address. Routers use it to forward them.
3. Check and retransmit (TCP)  
Missing parts must be retransmitted and received.
4. Reassemble (TCP)  
The receiver puts the complete data back in the original order.
Example  
Arrival: 1 → 3 → 2. Reassembly: 1 → 2 → 3. If part 2 is missing, the full message cannot be reassembled. The numbers illustrate order.
