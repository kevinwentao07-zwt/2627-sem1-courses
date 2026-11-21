# ICT HTML 初版

直接以瀏覽器開啟 `ict-preview.html`，不需要安裝套件或連線。

點「Try as Alex · 試用現有學員」可直接探索；Sign up 可以試看 Lv. 1、零積分與空白收藏牆。

可操作流程：
- Home、Learn、Plan、Settings 四個導航。
- 知識框架、章節準備度測驗（5 題需答對 4 題）。
- 硬件生活情境前測（文字先出現，約 1.8 秒後出現選项），依答案給初步建議。
- CSS 立體電腦示意、部件學習、練習與一次性獎勵。
- 等級、XP、積分、收藏篩選與展示架更新。
- 月度 Wi-Fi 任務的單人示範。

此版本包含 A 資訊處理互動微課，以及原有硬件單元流程。其餘模組目前只有框架。AI 分析為規則式示範；真實登入、班級組隊與完整 3D 模型尚未接入。資料只保存於本機瀏覽器，不會傳送密碼。點左側「重設示範資料」可恢復 Alex 初始狀態。

依 Figma 已完成的畫面預覽與確認的設計邏輯製作。因 Figma MCP 已達 Starter 方案上限，未能取得程式匯出內容，因此是人工轉製的互動初版。

## Plan 更新

Plan 已調整為「今日進度 → 到期複習 → 今日學習 → 底部 AI 分析」。可完成複習並更新今日進度，示例進度會保存在本機。詳細接口、後端排程与 AI 資料流見 `plan-api.md`。目前 API 尚未接入。

## A 資訊處理預覽

開啟 `ict-preview.html`，點左側「預覽 A · 資訊處理」，或進入 Learn → Information Processing。手機可點「Try as Alex」，再進入 Learn。

- A1（4 課）、A2（6 課）、A3（11 課）、A4（9 課），共 30 節短課。
- 每課提供生活情境、三個學習重點、互動探索與 6／8／10 題 Check 訓練；30 課共 242 題，由基礎到應用及挑戰。
- 可操作八達通流程、資料層級、存取模式、有效性／核實／奇偶檢查、取樣、二進制／十六進制／二補數、溢出、UTF-8 和影像大小估算。
- A4 支援指定公式運算、引用示意、IF 門檻、篩選／排序、多工作表連動、樞紐分組／圖表、假設分析、表單與單表查詢解讀；屬教學模擬，不是完整 Excel 或 SQL 引擎。
- Check 混合選擇、數值、簡答／公式及文字解釋。含 4 道經核對的 2025 DSE Paper 1B 真題節選（中文轉述與原題連結）；參考解答為本應用解釋，不是官方評卷參考。每主題另保留一道原創 DSE 風格文字題。
- 完整作答事件優先存 IndexedDB，草稿／當前輪次另保存在本機；不可用時回退 localStorage，保存失敗會明示並撤回本次提交。可刷新續練、重練而保留歷史，並在學習紀錄頁匯出 JSON。Plan 依目前輪次錯題提供複習入口。

A1–A3 已按用戶提供的《明德資訊及通訊科技 · 資訊處理 (1)》三章十三個小節重新分組，附教材印刷頁碼。每課以三個短要點呈現，延伸術語按需展開；新增數據庫索引、檢查數位、條碼／二維碼、數據單位和多媒體格式微課及練習。A4 不在這冊教材中，保留現有設計。詳細映射見 `textbook-alignment.md`。

依據教育局《ICT 課程及評估指引 2021》A 部分（印刷頁 12–15）整理；A1–A4 微課編號與拆分是本應用設計，非官方章節编号。37 小時是官方學校課程建議，微課分鐘為預覽估計，本版尚非完整 37 小時教材。

`module-a.js`、`module-a-questions.js`、`module-a-training.js`、`module-a.css` 與 `ict-preview.html` 應放在同一資料夾；可直接離線開啟 HTML。開發時也可提供本地伺服器，使用 `/ict-preview.html?preview=module-a` 直接進入 A 部分。

## 題庫與後續 AI 分析

版本化題庫在 `data/module-a-question-bank.json`；學習紀錄格式、題量配置與真題來源見 `training-data.md`。保存的內容包括題目／輪次／事件編號、知識點、難度、題型、原始答案、評分方式、首次／重試、提示與解答使用情況、信心及可見作答用時。文字自評不混入客觀正確率，合理的其他簡答可標記待覆核。

目前未接入 AI 或帳戶同步；匯出後可在後續開發中接入分析服務。保留原初版單題紀錄與已領獎勵，但不把舊單題完成當作新版整輪完成。

驗證：`node tests/module-a-training.cjs`；瀏覽器亦已核對 IndexedDB 提交、刷新續練、數值題、文字自評、真題來源及 JSON 下載。

## 設計交付

新版 UI 已加入現有 Figma 的 `05 · Module A & Unified UI — 12 Oct 2026` 畫板，共 14 個畫面。

- Figma：https://www.figma.com/design/RZ7EY1OfYBUPXosK3EeBtr?node-id=14-6
- 英文 Storyboard 與 I/O：`output/pdf/ict-storyboard-io.pdf`
- 可編輯 diagrams.net 檔案：`output/design/ict-storyboard.drawio`
- 獨立預覽：`output/design/ict-storyboard.html`
- 連結及 Wireframe PDF：`output/pdf/ict-design-links.pdf`

保持 design 與 pdf 資料夾的相對位置；本地 Storyboard 尚未託管為公開連結。
