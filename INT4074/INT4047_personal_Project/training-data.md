# Module A 題庫與學習資料

30 課共 242 題，平均每課約 8.07 題。題量和難度是本應用按先備知識、後續關聯及容易混淆的概念作出的教學配置，不代表考評局出題頻率或難度統計。

| Topic | 微課配置 | 合計 |
|---|---|---:|
| A1 | 6、6、8、6 | 26 |
| A2 | 8、10、8、8、8、6（教材顯示次序） | 48 |
| A3 | 8、8、10、8、10、10、6、6、8、10、8（教材顯示次序） | 92 |
| A4 | 8、10、10、8、6、8、8、8、10 | 76 |

每輪題目按 1 基礎 → 2 應用 → 3 挑戰排列。選擇題選項在不同輪次重新排序，題目／選項識別碼固定。題量理由逐課保存在 `A_TRAINING_POLICY` 及版本化 JSON。

## 經核對的真題節選

來源為 [考評局 2025 ICT 第五級考生表現示例](https://www.hkeaa.edu.hk/DocLibrary/HKDSE/Subject_Information/ict/2025-Sample-ict-Level5-E-J018.pdf)。PDF 掃描頁經視覺核對。資料與提問用中文轉述，保留原來簡答／解釋形式；未將考生筆跡当成評卷參考。本應用解答另行推導。

| 微課／題號 | DSE 題號 | PDF頁（1-based） | 印刷頁 | 原題分值 |
|---|---|---:|---:|---:|
| A2.3-Q10 | 2025 Paper 1B 7(c) | 6 | 7 | 1 |
| A3.8-Q10 | 2025 Paper 1B 4(a)(i) | 3 | 4 | 1 |
| A4.8-Q08 | 2025 Paper 1B 7(a)(i) | 5 | 6 | 2 |
| A4.9-Q10 | 2025 Paper 1B 7(d)(i) | 6 | 7 | 1 |

簡答採預設合理答案的精確比對，其他寫法可能需人工／AI 覆核。文字解釋不作自動語意評分；學生可勾選參考要點自評。自評分數是涵蓋要點的數量，並非官方考試分數。

## 保存與續練

- 題庫版本：`2026-10-10.2`。程式題庫在 `module-a-questions.js`；後續服務可讀取 `data/module-a-question-bank.json`。
- 內容版本：`2026-10-10.textbook.1`。題庫、匯出與新作答事件含教材 section、sectionTitle 和頁碼；完整章節映射見 `textbook-alignment.md`。
- v1 的 204 道題幹、答案與評分保持一致，原有輪次可繼續；保存升級前快照及原題庫 `data/module-a-question-bank-2026-10-10.1.json`。重練及不相容版本更新的旧輪次保存為 archivedSessions，不刪除事件。
- 學習資料 schema：3。使用偽名 learnerId，不以姓名或電郵識別。
- IndexedDB：`ict-learning-history`，版本 1；`events` 保存不可變事件，`profiles` 保存最近進度快照。事件以 eventId 去重，可按 learnerId、lessonId、questionId 或 occurredAt 查詢。
- 草稿及目前輪次同步保存在 `ict-preview-v1` 的 `state.moduleA.training`。IndexedDB 不可用時以 localStorage 保留完整事件；不按任意上限裁切歷史。儲存失敗會顯示訊息，該次答案不會被當作已提交。
- 重練以新 sessionId 開一輪；舊事件留存。資料只存在同一瀏覽器、同一 origin；切換浏览器、清除網站資料或更換網址 origin 不會自動同步。
- 初版單題作答移入 legacyAttempts；舊完成標記移入 legacyCompleted，保留已領獎勵。未混入新版訓練分數。
- 學習紀錄頁可下載完整 JSON 和題庫 JSON。沒有網絡 AI 分析請求。

## 事件資料

`question_attempt` 保存：

| 欄位 | 用途 |
|---|---|
| eventId、learnerId、sessionId | 去重、學生與輪次關聯 |
| lessonId、topicId、questionId、bankVersion、markingVersion | 追溯題目和評分規則 |
| skills、difficulty、questionType、source | 分析知識點、難度、題型與題目來源 |
| questionSnapshot | 保存當時題幹、選項、參考答案／要點與解釋，避免未來題庫修改後失去原題背景 |
| response、selectedOptionId、displayedOptionIds | 保存原始答案及當時選項排列 |
| correct、score、maxScore、grading | 自動／精確答案比對結果；文字 correct=null、score=null |
| attemptNumber、firstAttempt | 分開首次作答與同題重試 |
| confidence、hintUsed、feedbackSeen | 分開獨立作答、提示及已看解答情況 |
| activeTimeMs、firstPresentedAt、attemptPresentedAt、occurredAt | 當次可見作答時間與時間線 |
| misconception | 干擾項／錯誤訊號的代碼，不是已證實的認知缺陷 |

其他事件：`hint_opened`、`self_assessment`、`review_requested`、`session_started`（重練）、`session_completed`、`lesson_completed`。

`self_assessment` 包含所選評核要點與要點數，correct 為 null，不能作為已核實的答對證據。`review_requested` 保留學生認為合理的其他寫法及所對應的原作答事件。

時鐘在題目顯示且 document.hidden=false 時運行，離開或隱藏頁面暫停；已提交後閱讀解答不計入作答用時。用時只是線索，不能單獨推斷能力或閱讀困難。

## 匯出與未來分析

匯出 JSON 包含 schemaVersion、exportedAt、learner（僅偽名ID）、bankVersion、questionDefinitions、trainingPolicy、contentVersion、textbookAlignment、完整 events、currentSessions、archivedSessions、lessonProgress、dseDrafts、legacyEvidence 及 analyticsNotes。不包含登入電郵或密碼。

後续接入服務時，應按 eventId 去重並保留 bankVersion。首次正確率、自評、提示後成功率與重試成功率分開計算。注意樣本量與題目難度，不能直接把作答率當作知識掌握率。對 written 原始答案或 review_requested 項目另行評閱，新增評閱事件並記錄模型／評分版本，保留原始學生作答。

目前尚未設定帳戶同步、後端端點、AI 模型或雲端保存；這份資料結構是後續接入的輸入格式。
