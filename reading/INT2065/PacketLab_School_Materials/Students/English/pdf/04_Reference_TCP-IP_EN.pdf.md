# 04_Reference_TCP-IP_EN.pdf

原件：INT2065/PacketLab_School_Materials/Students/English/pdf/04_Reference_TCP-IP_EN.pdf

## 第 1 页

Inside the Internet   /   1
TCP and IP Learning Notes
A protocol is a set of rules devices follow when communicating. TCP (Transmission Control 
Protocol) and IP (Internet Protocol) work together to transfer data. The four steps below show 
the basic process.
1 Sender splits data  TCP divides data into smaller parts and tracks their order.
2 Delivery through networks  IP uses destination addressing to support packet delivery. 
A packet is a unit used for transmission, containing data and control information such as 
addresses.
3 Check completeness  TCP checks completeness and arranges retransmission of 
missing data when needed.
4 Receiver reassembles  Receiving TCP reassembles the complete data in its original 
order.
Follow one example
Original message: WE LEARN TOGETHER
Teaching labels: 1 WE, 2 LEARN, 3 TOGETHER
If the parts arrive as 2, 3, 1, the receiver still reconstructs 1, 2, 3 to restore the original 
message.
If part 2 is missing, the complete original message cannot yet be reconstructed. The 
missing part must be retransmitted and successfully received.
Two orders to distinguish
Arrival order  The order in which parts reach the receiver.
Final reconstructed order  The original order used to reconstruct the message.
Remember: switches and routers forward data along the path. TCP reassembles the message at 
the receiver.
The labels 1, 2 and 3 simplify the idea of order. They are not actual TCP sequence 
numbers, and messages do not always have three parts.
