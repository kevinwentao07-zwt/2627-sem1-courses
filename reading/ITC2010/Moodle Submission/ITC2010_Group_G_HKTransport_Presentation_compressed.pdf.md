# ITC2010_Group_G_HKTransport_Presentation_compressed.pdf

原件：ITC2010/Moodle Submission/ITC2010_Group_G_HKTransport_Presentation_compressed.pdf

## 第 1 页

ITC2010  /  DIGITAL LITERACY  /  GROUP G
HKTRANSPORT
Plan a trip on Hong Kong public transport
YOU XUAN HE 11592644
ZHENG WENTAO 11595347
TAM TSZ KIT 11601861
LIU YIWEN 11595361
Scan to try HKTransport

## 第 2 页

GROUP G
Who presents each part
YOU XUAN HE
P1–P4
The problem, our goals
and the app’s design
ZHENG WENTAO
P5–P9
How we built the app
and three live demos
TAM TSZ KIT
P10–P12
Prototype results,
student feedback and
the promo video
LIU YIWEN
P13–P16
Ethics, what we’d
improve and Q&A
HKTransport  /  ITC2010 Digital Literacy
2

## 第 3 页

THE PROBLEM
What students told us about map apps
HKTransport  /  ITC2010 Digital Literacy
CITYMAPPER
Arrival times
Some students found Citymapper’s bus times
more reliable.
Search and routing
They found it easier to search for places and plan
trips in Google Maps.
GOOGLE MAPS
Search and routing
Some students liked Google Maps for finding
places and planning trips.
Public transport times
Students said buses sometimes came at a
different time from what Google Maps showed.
We wanted people to see live bus times as they travelled and choose routes with less walking or fewer
changes.
3

## 第 4 页

WHO IT IS FOR
Find stops near a place you know
STUDENTS IN HONG KONG
Type “EdUHK” to see the bus and minibus stops
near campus.
VISITORS AND NEWCOMERS
New to Hong Kong? Search for a place you
know to find stops nearby.
Bus and minibus stops near EdUHK
HKTransport  /  ITC2010 Digital Literacy
Search “EdUHK”
See nearby stops
4

## 第 5 页

DEVELOPMENT
What I changed while building the prototype
HKTransport  /  ITC2010 Digital Literacy
1
Page design
The AI got some of the
page layouts wrong, so
I fixed them.
2
Route planning
When the app returned
poor routes, I looked up
routing algorithms and
tools.
3
Voice and 3D
The app sometimes
heard me wrong. I also
had trouble with the 3D
vehicle model.
4
Working with AI
I told the AI what to fix
and tested each
change in the app.
I designed the interface and built the core features. (Wentao)
5

## 第 6 页

ROUTE PLANNING
How the app plans a trip
HKTransport  /  ITC2010 Digital Literacy
01  TRIP REQUEST
“Tsim Sha Tsui to
Central, please.
Less walking.”
02  DEEPSEEK
DeepSeek reads
what you ask and
can suggest lines to
take.
03  ROUTE CHECK
The app checks that
the lines run and the
transfers are possible.
04  ARRIVAL TIMES
Live arrivals update the wait.
The app sorts the routes and
shows them on the map.
VALID
No valid suggestion
or AI unavailable
RAPTOR SEARCH
Searches the transport
network for a route.
The first estimate uses the timetable. The app updates it when live data comes in.
6

## 第 7 页

DEMO 01 / DESTINATION
Directions to the first ramen result
“Ramen in Mong Kok”
“The first one from Tsim Sha
Tsui?”
HKTransport  /  ITC2010 Digital Literacy
Find a ramen shop, then ask how to get to the
first one on the list.
1  FIND A PLACE
2  USE THE RESULT AS THE
DESTINATION
7

## 第 8 页

DEMO 02 / ROUTE OPTIONS
Compare two routes to Central
“Tsim Sha Tsui to Central, less walking”
7 min
Direct on the Tsuen Wan Line 18 min
281A and MTR, with an 87 m
walk
Check the
walk and the
total travel
time.
HKTransport  /  ITC2010 Digital Literacy
8

## 第 9 页

DEMO 03 / LIVE ARRIVALS
Watch the arrival estimate change
ESTIMATE
LIVE
HKTransport  /  ITC2010 Digital Literacy
12 min
10 min
Tsim Sha Tsui to Ramen Taifu via the Tsuen Wan Line
When live times
come in, the app
updates the wait
and sorts the
routes again.
9

## 第 10 页

PROTOTYPE RESULTS
What you can do with HKTransport
HKTransport  /  ITC2010 Digital Literacy
BEFORE YOU LEAVE
Plan journeys
Compare routes by bus, minibus, MTR
and Light Rail.
Search for journey
The keypad only lets you type numbers for
real routes.
Favourites
Save stops you use a lot.
Ask
Type or speak. You can ask about a
result.
On your journey
Arrival times
Find out the estimated arrival times.
Location of your bus
Find out where the bus is expected to be
on its journey.
Continue your journey
Find out what stop you are approaching
and when you should alight.
Formatting
Choose between three languages and
dark mode.
10

## 第 11 页

STUDENT QUESTIONNAIRE
Student feedback and our response
HKTransport  /  ITC2010 Digital Literacy
TOPIC
WHAT STUDENTS TOLD US
WHAT WE BUILT
Bus arrivals
Students said some buses came
earlier or later than Google Maps
showed.
We show live bus times when bus
companies share them.
Place search
Google Maps made it easier to
find a place.
Type a landmark or shop name to find a
destination.
Route choice
Some students said it was easier
to plan a route in Google Maps.
You can ask for less walking or fewer
changes in your own words.
We asked students at our university about the map apps they use.
11

## 第 12 页

PROMO VIDEO
See HKTransport in use
HKTransport  /  ITC2010 Digital Literacy
12

## 第 13 页

ETHICS
How we check routes and handle trip data
HKTransport  /  ITC2010 Digital Literacy
ROUTE AND PLACE INFORMATION
Wrong routes or times
We check the AI’s routes against route data.
Live times come from the transport companies.
Out-of-date shop hours
Check when the shop opens before you leave.
TRIP DATA AND PRIVACY
Private trip history
Your device keeps a list of your past trips and
saved stops.
Text sent to DeepSeek
If you ask the assistant a question, our server
sends it to DeepSeek.
13

## 第 14 页

ETHICS
Security, access and running costs
HKTransport  /  ITC2010 Digital Literacy
SECURITY AND COST
Leaked keys or misuse
The DeepSeek key stays on our server. The
server only takes requests the assistant can
handle.
Running costs
We limit requests. When we reach Google’s
usage limit, the app switches to free maps and
data.
ACCESS AND TRANSPARENCY
Barriers to access
The app is free and comes in English,
Traditional Chinese and Simplified Chinese.
You can also speak to it.
Unclear data sources
The source code is public, and we list the data
providers.
14

## 第 15 页

NEXT STEPS
Changes we’d make next
HKTransport  /  ITC2010 Digital Literacy
TRIP PLANNING
Trams and ferries
Add tram and ferry routes.
Step-free routes
Show how to enter stations and where the lifts
are.
Service alerts
Warn people about service changes and
typhoons.
TRUST AND UPKEEP
AI notice
Tell users what we send to DeepSeek.
More user testing
Ask more students and visitors to try the app.
Hosting
Give the app a permanent web address.
15

## 第 16 页

HKTRANSPORT  /  ITC2010 DIGITAL LITERACY
Any questions?
Find a route and see when the next bus or train is due.
LIVE PROTOTYPE
hk.52-220-124-215.sslip.io
SOURCE CODE
github.com/kevinwentao07-zwt/hktransport
Data: hkbus.app, transport operators, Google Maps and OpenFreeMap
