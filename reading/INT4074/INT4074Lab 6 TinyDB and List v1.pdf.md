# INT4074Lab 6 TinyDB and List v1.pdf

原件：INT4074/INT4074Lab 6 TinyDB and List v1.pdf

## 第 1 页

Lab 6 – TinyDB and Listv1
INT4074
Mobile Applications Design and Development
1

## 第 2 页

Part I
Mobile App Frontend Design
2

## 第 3 页

Step 1: Design Components (Designer View)
• TextBox (named TextBoxInput): For the user to type a new item.
• Button (named ButtonAdd): To add the item to the list.
• ListView (named ListView1): To display the items on the screen.
3

## 第 4 页

Step 2: Create Logic Blocks (Blocks View)
• To make a dynamic list where users can add items, use a 
global variable to hold the data list.
1. Initialize Global List: 
    Create a global variable global myList and set it to a make a 
list block (initially empty).
2. Add Item on Button Click:
    When enterButton.Click triggers:
• Use add items to list block: add TextBoxInput.Text into global myList.
• Set ListView1.Elements to global myList.
• Set TextBoxInput.Text to empty text ("") to clear the input box.
4

## 第 5 页

5
ListView
Input Item

## 第 6 页

Part II
Mobile App Backend Logic
MIT App Inventor Block Logic
6

## 第 7 页

7

## 第 8 页

https://ai2a.appinventor.mit.edu/reference/blocks/lists.html
8

## 第 9 页

https://ai2a.appinventor.mit.edu/reference/components/
9

## 第 10 页

https://ai2a.appinventor.mit.edu/reference/other/advanced-listview.html
10

## 第 11 页

Initialization
11

## 第 12 页

Enter button Click
12

## 第 13 页

Erase Button Click
13

## 第 14 页

Clear Button Click
14

## 第 15 页

End
15
