# 03_Reference_Network_Hardware_EN.pdf

原件：INT2065/PacketLab_School_Materials/Students/English/pdf/03_Reference_Network_Hardware_EN.pdf

## 第 1 页

Network Hardware Reference
Start with the five A devices. B and C are for comparison.
PRIORITY   A = Core devices   B = Also learn   C = Extension comparison
WEBSITE   MODEL = Device model   IN DEVICE = Built-in function   NONE = No separate 
simulation
Device
Priority
Website
Function and key distinction
NIC
Network 
interface card
A
IN DEVICE
PC / Laptop
Provides a device with an interface to a network. Wired NICs 
use Ethernet; wireless NICs use Wi-Fi. Select PC or Laptop to 
inspect its NIC settings and explanation.
Switch
A
MODEL
Connects devices in the same LAN. Forwards data through 
the appropriate port towards the receiving device.
Router
A
MODEL
Connects different networks and forwards packets using 
destination IP addresses. A same-LAN transfer need not pass 
through it.
Access point
AP
A
MODEL
Connects wireless devices to a wired LAN. Wi-Fi access alone 
does not guarantee Internet access; the onward route must 
also work.
Modem
A
NONE
Modulates data onto signals for transmission and 
demodulates received signals back into data. Dial-up uses 
analogue telephone signals; cable modems use the cable 
network.
Server
B
MODEL
Provides services or resources to clients. The site has a local 
server model and a remote web destination. A web server 
supplies webpage data; a client requests a service.
Hub
B
NONE
Older comparison device. Repeats incoming signals to every 
other port. Unlike a switch, it does not select a destination 
port using MAC addresses.
Bridge
C
NONE
Connects LAN segments and filters or forwards frames using 
MAC addresses. A switch performs a similar role across 
multiple ports.
Repeater
C
NONE
Regenerates and retransmits signals to extend transmission 
distance. It does not select a route using an IP address.

## 第 2 页

Communication links and media
Link
Main feature
Website representation
UTP cable
Twisted copper wires carry electrical 
signals.
Simplified Ethernet cable links; internal 
wire structure is not shown.
Optical fibre
Carries light; resists electromagnetic 
interference.
No fibre transmission model.
Microwave / 
satellite
Microwave links use radio waves; 
satellites relay radio signals.
No microwave or satellite model.
Remember: The ISP uplink represents the provider’s network boundary, not a modem 
demonstration. LAN and WAN describe network scope, not two dedicated cable types.
A/B/C show study priorities for this sequence, not examination frequency. Modems, NICs, switches, 
routers and links are explicitly named in the current guide. AP, server and hub support lesson 
comparisons. Bridge and repeater are extensions.
Source: CDC–HKEAA ICT Curriculum and Assessment Guide (2021), printed p. 22. Website labels refer 
to the supplied Packet Lab build.
