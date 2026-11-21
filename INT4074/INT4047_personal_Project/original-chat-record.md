# 引用的 ChatGPT 對話：教育软件比较

來源：對話讀取工具。本次僅取得 5 個問答回合（10 則訊息），工具未提供更早紀錄的分頁游標。以下保留全部已取得文字，但不能保證是原始對話的全部歷史。原始附件未由工具提供。

## 用戶

整體都過長，不要解釋這麼多，特別第壹部分過於長，然後第一點和其他要分開來，第一點是marketing research，然後後面的部分就是goals and objectives, 不要像寫論文一樣，要分點讓人一目了然，每個點之間也不要有重複的意思

## 助手

可以，这样会清晰很多。按照你老师课件里的逻辑，**Marketing Research** 和 **Goals & Objectives** 应该分开写，不需要像论文一样长篇解释。课件本身也是先做 market research，再建立 app goals and objectives。:chatgpt-content-reference{index="0"}

你可以直接在 `.md` 里这样写：

```md
# 1. Marketing Research

## Current Problems

- Many educational apps still mainly digitise traditional learning materials rather than provide a truly personalised learning experience.
- Learning data is often collected, but students may not receive clear advice on what they should improve next.
- Passive digital learning can reduce engagement. PISA 2022 reported that around 30% of students were distracted by digital devices in most or every mathematics lesson.
- Learning, revision and study planning are often separated across different applications.

## Existing Applications

### Quizlet
- Strength: strong revision tools, flashcards and active recall.
- Limitation: limited subject-specific visualisation.

### Brilliant
- Strength: strong interactive and visual learning.
- Limitation: mainly focused on STEM subjects such as mathematics and programming rather than a complete ICT learning system.

### MyStudyLife
- Strength: strong study planning and academic organisation.
- Limitation: planning is mainly based on schedules and deadlines rather than detailed learning performance.

## Market Gap

Existing apps usually specialise in one part of the learning process.

**Opportunity:** combine visual learning, individual learning analysis and personalised study planning in one application.
```

然后完全分开：

```md
# 2. Goals and Objectives

## Goal

To create a personalised ICT learning application that helps students understand difficult concepts and organise their learning more effectively.

## Objectives

### 1. Video-based Learning
- Provide a short selected learning video before each topic.
- Help students gain basic knowledge before further learning.

### 2. 3D and Interactive Visualisation
- Use 3D models and animations to explain abstract concepts.
- Example: 3D computer hardware models and step-by-step programming execution.

### 3. Individual AI Analysis
- Analyse each student's learning performance.
- Identify weak topics, repeated mistakes and areas that need improvement.

### 4. AI-Personalised Study Plan
- Generate a study plan based on learning performance, examination dates and available study time.
- Adjust learning priorities as the student's performance changes.
```

这样整体结构就很干净：

**Marketing Research**
→ 市场有什么问题  
→ 三个产品现在做到什么  
→ 还有什么 gap

**Goals & Objectives**
→ 我具体要做什么  
→ Video  
→ 3D Visualisation  
→ Individual AI Analysis  
→ AI Study Plan

而且这四个 objectives 之间没有重复：**Video 负责输入知识，3D 负责理解，AI Analysis 负责发现问题，AI Plan 负责决定下一步。**

## 用戶

wireframe 和 storyboard都代表什麼意思

## 助手

簡單來說：

**Storyboard = 使用者「怎麼走」**  
**Wireframe = 每個頁面「長什麼結構」**

你課件裡也是這樣區分的。Storyboard / User Flow 用來表達使用者會怎樣在 App 中移動、需要哪些頁面、頁面的先後順序；它也會包含 decision points 和 endpoint。:chatgpt-content-reference{index="0"} :chatgpt-content-reference{index="1"}

### Storyboard / User Flow
它重點是「流程」。

例如你的 App 可以是：

```text
Open App
   ↓
Login / Register
   ↓
Set Exam Date
   ↓
Home
   ↓
Choose Topic
   ↓
Watch Video
   ↓
3D / Visual Learning
   ↓
Practice
   ↓
AI Analysis
   ↓
Generate Study Plan
   ↓
Back to Home
```

如果有判斷，就用菱形：

```text
Finished Practice?
   ├─ Yes → AI Analysis
   └─ No  → Continue Practice
```

所以 Storyboard 回答的是：

> 使用者從哪裡開始？  
> 下一步去哪裡？  
> 中間有什麼選擇？  
> 最後完成什麼任務？

---

### Wireframe
Wireframe 是把其中一個頁面「畫出來」，但先不追求漂亮。

課件說 wireframe 主要用來幫助人快速理解設計概念，而且應該保持簡單、避免太多視覺效果，讓人專注在核心元素和 navigation。:chatgpt-content-reference{index="2"}

例如你的 Home Page wireframe 可以只是：

```text
┌─────────────────────────┐
│ ICT Learning Companion  │
│                         │
│ Today's Study Plan      │
│ ┌─────────────────────┐ │
│ │ Networking - 15 min │ │
│ │ [ Start ]           │ │
│ └─────────────────────┘ │
│                         │
│ Weak Topics             │
│ Networking   42%        │
│ Programming  61%        │
│                         │
│ Home  Learn  Plan       │
└─────────────────────────┘
```

這時候不用管：

- 最終顏色
- 漂亮 icon
- 3D 模型細節
- 動畫效果

只要表達：

- 有什麼內容
- 按鈕在哪
- 使用者怎麼操作
- navigation 在哪

---

你可以把它們理解成：

| | Storyboard | Wireframe |
|---|---|---|
| 主要回答 | 使用者怎麼走 | 頁面怎麼排 |
| 看的是 | 整個 App 流程 | 單個畫面 |
| 常見形式 | Flowchart | 灰階頁面草圖 |
| 包含 | 頁面、箭頭、判斷 | Button、Text、Image area、Menu |
| 重點 | Navigation / User Journey | Layout / Structure |

所以最合理的順序是：

**先畫 Storyboard → 確定需要哪些頁面 → 再畫每個頁面的 Wireframe。**

你前面那張 Duolingo 類似的圖，其實就是很典型的 **Storyboard / User Flow**，不是 wireframe。

## 用戶

你先幫我設計一個初版的storyboard出來，用什麼工具你可以告訴我，然後你再做（用工作模式也可以）

## 助手

你需要先在上面的 Figma 小组件里选择一个 **team / organization**，然后我才能生成 **“ICT Learning Companion - Initial Storyboard”** 这张 FigJam 图。

你选好之后，初版会按这个结构生成：

**Onboarding → Home & Study Plan → Learning → Practice & AI Analysis → Progress & Next Step**

里面会包括：
- First-time user 的判断
- Exam date / available study time
- Today's Study Plan
- Browse Topics
- Learning Video
- Interactive / 3D Visualisation
- Practice Questions
- Results & Weak-topic Analysis
- Individual AI Analysis
- AI Study Plan Update
- Progress Dashboard
- 回到下一轮学习的循环

这个结构和你给的 Duolingo flowchart 是同一种思路：**分区域、用箭头表示页面移动、用菱形表示 decision point**，而不是直接画 UI。等你选完 Figma 的 plan，我就继续生成。

## 用戶

你這個好像出了點問題，全部橫向排布

## 助手

我已经改成**纵向主流程**了，新的版本放在同一个 FigJam 里。

这版结构是：

**Onboarding**  
↓  
**Home & Study Plan**  
↓  
**Learning**  
↓  
**Practice & Analysis**  
↓  
**AI Study Plan**  
↓  
回到 **Dashboard**

只有像“First-time user?”、“Choose action”、“Practice completed?” 这种 decision point 才做左右分支，所以不会再变成一整排横向节点。

你可以直接打开这个版本继续编辑：
[Open revised FigJam storyboard](https://www.figma.com/board/BrVDgoLZ4UNNiQLsofTTZK?utm_source=chatgpt.com)

我建议下一步我们再做一次精简，把它变得更像你给的 Duolingo 参考图：**每个大区块内部纵向排列，但几个大区块在画布上并排成 3–4 栏**。那样会比纯纵向更像正式 storyboard，也更容易放进报告。

## 用戶

又全部變成豎著的了

## 助手

這次我改成了**混合排布**：不是全橫，也不是全豎，而是「每個階段橫向展開，幾個階段再上下堆疊」。

現在是：

**第 1 排：Onboarding / Setup**  
**第 2 排：Learning**  
**第 3 排：Practice + AI Analysis**  
**第 4 排：Progress + Next Step**

這樣比較接近你給的 Duolingo 參考圖，也比較適合放進 report。你可以直接在上面的 FigJam 裡看最新版 **Storyboard v3**。