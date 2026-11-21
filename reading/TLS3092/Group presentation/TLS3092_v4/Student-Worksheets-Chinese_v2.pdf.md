# Student-Worksheets-Chinese_v2.pdf

原件：TLS3092/Group presentation/TLS3092_v4/Student-Worksheets-Chinese_v2.pdf

## 第 1 页

Portfolio Lab · HTML 備用工作紙
Lesson 1 · 70 分鐘 · 第 1 / 4 頁
別名：______________
班號：______
日期：______________
1. 課前診斷（0–10 分鐘，連導入）
1. 網頁的標題有甚麼用途？
2. 哪種功能可讓讀者按文字前往另一頁？
3. 使用照片或個人資料前，應先檢查甚麼？
2. 參考範例（10–20 分鐘）
<!doctype html>
<html lang="zh-HK">
<head>
  <meta charset="utf-8">
  <title>Alex 的 Portfolio</title>
</head>
<body>
  <h1>Alex 的 Portfolio</h1>
  <p>我喜歡攝影。</p>
  <img src="mountain.svg" alt="山脊與日出的練習插圖">
  <a href="#projects">看看我的作品</a>
  <section id="projects"><h2>我的作品</h2></section>
</body>
</html>
head 放文件資料；body 放顯示內容。src 是圖片來源，alt 是文字替代，href 是連結目的地。img 沒有結束標
籤。
3. 標籤配對（20–30 分鐘）
在右欄填 A–D：A 圖片、B 超連結、C 段落、D 主標題。
標籤
功能
屬性／注意事項
<h1>
________
表示頁面的主要主題
<p>
________
相關的句子組成段落
<img>
________
src、alt；內容圖片用具體描述
<a>
________
href；連結文字說明目的地
可查閱參考，不必背碼。使用別名與授權素材；不要求真實照片、電話或住址。

## 第 2 页

HTML · 除錯、設計與反思
Lesson 1 · 第 2 / 4 頁
4. 修好這段源碼（30–45 分鐘）
圈出兩個問題，再寫出修正。圖片是一張山景內容圖。
<h1>My Portfolio
<p>I enjoy photography.</p>
<img src="mountain.svg">
<a href="#projects">My Projects</a>
<section id="projects"><h2>My Projects</h2></section>
5. 紙上 Portfolio（45–60 分鐘）
先畫出內容位置，再寫 body 內的 HTML：主標題、介紹、含 alt 的圖片、可用連結和對應目的地。可用虛構角色。
版面草圖
HTML 草稿
6. 同伴檢查（60–66 分鐘）
伙伴檢查：□ h1　□ p　□ 圖片 src／alt　□ href 與 id 相符　□ 標籤配對
我解釋了哪一項 HTML 選擇；伙伴指出的一個優點和一項具體建議：
7. 個人 Exit Ticket（66–70 分鐘）
1. 解釋今天用過的兩個 HTML 元素的用途。
2. <a>My Projects</a> 欠了甚麼？寫出一個可用例子。
3. 今天修正了甚麼錯誤？你會怎樣在瀏覽器確認修正有效？下一課想改善甚麼？
設備恢復後：把草稿輸入瀏覽器，補測圖片、連結、顯示及保存。紙上檢查不能證明實際網頁正常。

## 第 3 页

Portfolio Lab · CSS 備用工作紙
Lesson 2 · 70 分鐘 · 第 3 / 4 頁
別名：______________
班號：______
日期：______________
課前複習小測 · Lesson 1 HTML（0–5 分鐘）
獨立圈出答案，檢查上一課的掌握；5–8 分鐘訂正後才開始 CSS。
1. 主標題和介紹段落分別用甚麼？
A h1、p　B p、img　C img、a
2. 圖片的 src 和 alt 分別用來做甚麼？
A 描述、來源　B 來源、文字替代　C 兩者都指定連結目的地
3. 目標已有 id="projects"，連結的開始標籤應怎樣寫？
A <a src="#projects">　B <a href="projects">　C <a href="#projects">
4. <h1>我的 Portfolio<p>我喜歡攝影。</p> 欠甚麼？
A 圖片後加 </img>　B 標題後、p 前加 </h1>　C 段落加 href
1. 讀規則與觀察（8–20 分鐘）
HTML 描述內容結構；CSS 控制呈現樣式。圈出下列規則的選擇器，為屬性畫底線，為值畫方框。
h1 { color: #17634b; }
body { font-family: Arial, sans-serif; font-size: 18px;
  line-height: 1.7; color: #243b35; background-color: #f4f8f6; }
h1 選取 h1 元素；.intro 選取 class="intro"；#projects 選取 id="projects"。HTML 和 CSS 可以分開編輯，匯出
時放入 head 內的 style 元素；多頁網站可共用外部 CSS。
2. 預測與除錯（20–35 分鐘）
相同條件、相同選擇器的規則，後面的宣告覆蓋前面的。以下段落最後是甚麼顏色？為甚麼？
p { color: #333333; }
p { color: #17634b; }
修正下面的語法，使標題為指定綠色、字體大小為 28px。
h1 {
  color #17634b
  font-size: 28px;
}
3. 盒模型參考
margin：外距
border：邊框
padding：內距
content：內容
文字與邊框之間：________；邊框外的距離：________。
先預測效果再測試；網頁可讀性包括文字大小、行距、對比和清楚連結，不只配色。

## 第 4 页

CSS · 改善 Portfolio 閱讀體驗
Lesson 2 · 第 4 / 4 頁
4. 設計樣式（35–55 分鐘）
為第一課作品寫 CSS：正文的字型、大小、行高、文字與背景顏色；標題顏色；section 的 padding、margin-top、
border；連結底線。可選有足夠對比的其他配色。
我的 CSS
5. 解釋與同伴回饋（55–65 分鐘）
我改善的一項閱讀問題是甚麼？指出相關 CSS 規則，解釋原因。
同伴建議我怎樣改得更清楚？
6. 個人 Exit Ticket（65–70 分鐘）
① 分辨 HTML 與 CSS 的工作。② 寫一條段落顏色規則，指出選擇器、屬性和值。③ 分辨 padding 與 margin，並
說明你會怎樣測試改善。
設備恢復後要補做的檢查
□ 開啟 HTML，圖片顯示正常；點連結能到目的地。
□ 把 CSS 輸入教材的 CSS 欄，比較有／無樣式。
□ 確認實際字體、顏色、行距與留白，修正無效宣告。
□ 用窄畫面及鍵盤 Tab 檢查；請同伴閱讀內容。
□ 下載 JSON 備份與 HTML；獨立開啟 HTML 再測一次。
紙本能顯示理解、預測和設計。實際呈現、可用連結與檔案匯出必須在設備恢復後驗證。
