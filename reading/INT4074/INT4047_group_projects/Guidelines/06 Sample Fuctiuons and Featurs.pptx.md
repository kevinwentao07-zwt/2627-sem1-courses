# 06 Sample Fuctiuons and Featurs.pptx

原件：INT4074/INT4047_group_projects/Guidelines/06 Sample Fuctiuons and Featurs.pptx

## 第 1 张幻灯片

Function and Features
Animation Splash Screen
Login and Register
Reset Password  (Email Authentication)
Create Task
Edit Task
Delete Task
Realtime Database (
Cloud Based)
Support Multiple User
	
1

## 第 2 张幻灯片

Slash Screen with 
Animation
 
2
Enhance a professional 
user experience by 
using a simple slash screen

## 第 3 张幻灯片

@Override
protected void 
onCreate(Bundle savedInstanceState) {
    
super
.onCreate(savedInstanceState);
    getWindow().setFlags(WindowManager.LayoutParams.
FLAG_FULLSCREEN
, WindowManager.LayoutParams.
FLAG_FULLSCREEN
);
    setContentView(R.layout.
activity_main
);
    
top_animation 
= AnimationUtils.
loadAnimation
(
this
, R.anim.
logoanimation
);
    
bottom_animation 
= AnimationUtils.
loadAnimation
(
this
, R.anim.
titleanimation
);
    
imageView 
= findViewById(R.id.
logo
);
    
textView 
= findViewById(R.id.
topic
);
    
imageView
.setAnimation(
top_animation
);
    
textView
.setAnimation(
bottom_animation
);
    
new 
Handler().postDelayed(
new 
Runnable() {
        
@Override
        
public void 
run() {
            Intent intent = 
new 
Intent(MainActivity.
this
, LoginActivity.
class
);
            startActivity(intent);
            finish();
        }
    },
SPLASH
);
}
Coding of Anmation
Android -> app
 -> res -> 
anim
		logoanimation.xml
		titleanimation.xml
3
<?
xml version
="1.0" 
encoding
="utf-8"
?>
<
set 
xmlns:
android
="http://schemas.android.com/apk/res/android"
>
    <
translate
        
android
:fromXDelta
="-100%"
        
android
:toXDelta
="0%"
        
android
:fromYDelta
="50%"
        
android
:duration
="3000"
/>
    <
alpha
        
android
:fromAlpha
="0.1"
        
android
:toAlpha
="1.0"
        
android
:duration
="1000"
/>
    <
rotate
        
android
:interpolator
="@android:anim/accelerate_decelerate_interpolator"
        
android
:fromDegrees
="0"
        
android
:toDegrees
="+360"
        
android
:pivotX
="50%"
        
android
:pivotY
="50%"
        
android
:duration
="3000" 
/>
</
set
>

## 第 4 张幻灯片

Login Function
Using Google Firebase to 
authenticate the 
Login function.
4

## 第 5 张幻灯片

Coding of Login
5
// authentication the user
mAuth
.signInWithEmailAndPassword(email, password).addOnCompleteListener(
new 
OnCompleteListener<AuthResult>() {
    
@Override
    
public void 
onComplete(
@NonNull 
Task<AuthResult> task) {
        
if 
(task.isSuccessful()){
            Intent intent = 
new 
Intent(LoginActivity.
this
, HomeActivity.
class
);
            startActivity(intent);
            finish();
            
loader
.dismiss();
        }
else 
{
            String error = task.getException().toString();
            Toast.
makeText
(LoginActivity.
this
, 
"Login failed" 
+ error, Toast.
LENGTH_SHORT
).show();
            
loader
.dismiss();
        }
    }
});

## 第 6 张幻灯片

Register Function
User Account will save into
Google Firebase
6

## 第 7 张幻灯片

// registration
reg_btn
.setOnClickListener(
new 
View.OnClickListener(){
    
@Override
    
public void 
onClick(View v) {
        String email = 
reg_email
.getText().toString().trim();
        String password = 
reg_password
.getText().toString().trim();
        String password2 = 
reg_password2
.getText().toString().trim();
        
if 
(TextUtils.
isEmpty
(email)){
            
reg_email
.setError(
"email is required"
);
            
return
;
        }
        
if 
(TextUtils.
isEmpty
(password)){
            
reg_password
.setError(
"Password required"
);
            
return
;
        }
        
if 
(TextUtils.
isEmpty
(password2)){
            
reg_password2
.setError(
"Password required"
);
            
return
;
        }
        
if
(password.length() <
6
){
            
reg_password
.setError(
"Password Must be >= 6 Characters"
);
            
return
;
        }
        
if
(!
reg_password
.getText().toString().equals(
reg_password2
.getText().toString())){
            
reg_password
.setError(
"Password Not matching"
);
            
reg_password2
.setError(
"Password Not matching"
);
            
return
;
        }
 
else 
{
//register the user in firebase
mAuth
.createUserWithEmailAndPassword(email,password).addOnCompleteListener(
new 
OnCompleteListener<AuthResult>() {
    
@Override
    
public void 
onComplete(
@NonNull 
Task<AuthResult> task) {
        
if 
(task.isSuccessful()){
            Toast.
makeText
(RegistrationActivity.
this
, 
"Registration Success." 
, Toast.
LENGTH_SHORT
).show();
            Intent intent = 
new 
Intent(RegistrationActivity.
this
, HomeActivity.
class
);
            startActivity(intent);
            finish();
            
loader
.dismiss();
        }
else 
{
            String error = task.getException().toString();
            Toast.
makeText
(RegistrationActivity.
this
, 
"Registration failed" 
+ error, Toast.
LENGTH_SHORT
).show();
            
loader
.dismiss();
        }
    }
});
Coding of Registration
7
Data add into Firebase Server

## 第 8 张幻灯片

Forget Password Function
System will send a password reset email
to reset password
8

## 第 9 张幻灯片

Coding of Forgot Password
9
@Override
public void 
onClick(View v) {
    
//get the email link to reset password
    
String email = 
resetpasswordemail
.getText().toString().trim();
    
mAuth
.sendPasswordResetEmail(email).addOnSuccessListener(
new 
OnSuccessListener<Void>() {
        
@Override
        
public void 
onSuccess(Void aVoid) {
            Toast.
makeText
(LoginActivity.
this
, 
"Reset Link Sent To Your Email."
, Toast.
LENGTH_SHORT
).show();
        }
    }).addOnFailureListener(
new 
OnFailureListener() {
        
@Override
        
public void 
onFailure(
@NonNull 
Exception e) {
            Toast.
makeText
(LoginActivity.
this
, 
"Reset password failed" 
+ e.getMessage(), Toast.
LENGTH_SHORT
).show();
        }
    });
    
dialog
.dismiss();
}

## 第 10 张幻灯片

RecyclerView
 
10
RecyclerView
 is the 
ViewGroup
 that contains the views corresponding to your data. 
Each individual element in the list is defined by a view holder object.

## 第 11 张幻灯片

R
ecyclerView
 
Architecture
 
11

## 第 12 张幻灯片

Coding of R
ecyclerView
12
RecyclerView
 Layout

## 第 13 张幻灯片

Coding of R
ecyclerView
13
Model Class

## 第 14 张幻灯片

Coding of R
ecyclerView
14
Adapter Class
View Holder Show on the 
RecyclerView

## 第 15 张幻灯片

Coding of R
ecyclerView
15
Adapter Class
Set Data from the model

## 第 16 张幻灯片

Coding of R
ecyclerView
16
HomeActivity
 Class
Set 
RecyclerView
 and Adapter 
RecyclerView

## 第 17 张幻灯片

Create Task Function
User can use the 
Floating Action 
Button to add new task
17

## 第 18 张幻灯片

18
Coding of 
create 
Task Function
// add new task
floatingActionButton 
= findViewById(R.id.
add_tab
);
floatingActionButton
.setOnClickListener(
new 
View.OnClickListener() {
    
@Override
    
public void 
onClick(View v) {
        Intent intent = 
new 
Intent(HomeActivity.
this
, NewTaskActivty.
class
);
        startActivity(intent);
    }
});
Click 
Button 
//Save Button
savebtn
.setOnClickListener(
new 
View.OnClickListener() {
    
@Override
    
public void 
onClick(View v) {
        
final 
EditText title = findViewById(R.id.
tasktitle
);
        
final 
EditText description = findViewById(R.id.
taskdescription
);
        
datebtn 
= findViewById(R.id.
taskdate
);
Model model = 
new 
Model(newTask, newDescription, id, date);
reference
.child(id).setValue(model).addOnCompleteListener(
new 
OnCompleteListener<Void>() {
    
@Override
    
public void 
onComplete(
@NonNull 
Task<Void> task) {
        
if 
(task.isSuccessful()) {
            Intent intent = 
new 
Intent(NewTaskActivty.
this
, HomeActivity.
class
);
            intent.addFlags(Intent.
FLAG_ACTIVITY_NEW_TASK 
| Intent.
FLAG_ACTIVITY_CLEAR_TASK
);
            startActivity(intent);
            finish();
            Toast.
makeText
(NewTaskActivty.
this
, 
"Task has been inserted successfully"
, Toast.
LENGTH_SHORT
).show();
            
loader
.dismiss();
        } 
else 
{
            String error = task.getException().toString();
            Toast.
makeText
(NewTaskActivty.
this
, 
"Failed: " 
+ error, Toast.
LENGTH_SHORT
).show();
            
loader
.dismiss();
        }
    }
});

## 第 19 张幻灯片

Edit Task Function
User can edit any
 task by click the task
on screen
19

## 第 20 张幻灯片

Coding of 
Edit 
Task Function
20
// Task on Click
@Override
public void 
onClick(View v) {
    
final 
DialogPlus dialogPlus = DialogPlus.
newDialog
(
holder
.
mView
.getContext())
            .setContentHolder(
new 
ViewHolder(R.layout.
update
))
            .setExpanded(
true
, 
1100
)
            .create();
    View myview = dialogPlus.getHolderView();
updateButton.setOnClickListener(
new 
View.OnClickListener() {
    
@Override
    
public void 
onClick(View v) {
        Map<String,Object> map = 
new 
HashMap<>();
        map.put(
"task"
, 
myTask
.getText().toString());
        map.put(
"description"
, 
myDescription
.getText().toString());
        FirebaseDatabase.
getInstance
().getReference().child(
"tasks"
).child(
onlineUserID
)
                .child(getRef(
position
).getKey()).updateChildren(map)
                .addOnSuccessListener(
new 
OnSuccessListener<Void>() {
                    
@Override
                    
public void 
onSuccess(Void aVoid) {
                        
dialogPlus
.dismiss();
                    }
                })
                .addOnFailureListener(
new 
OnFailureListener() {
                    
@Override
                    
public void 
onFailure(
@NonNull 
Exception e) {
                        
dialogPlus
.dismiss();
                    }
                });
    }
});
Data update to Firebase Server

## 第 21 张幻灯片

Delete Task Function
User can delete any
 task by click the task
on screen
21

## 第 22 张幻灯片

Coding of 
Delete 
Task Function
22
Delete Data in Firebase Server
delButton.setOnClickListener(
new 
View.OnClickListener() {
    
@Override
    
public void 
onClick(View v) {
        FirebaseDatabase.
getInstance
().getReference().child(
"tasks"
).child(
onlineUserID
)
                .child(getRef(
position
).getKey()).removeValue();
                
dialogPlus
.dismiss();
    }
});
