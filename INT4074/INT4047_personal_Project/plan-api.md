# Plan 功能與 API 接入結構

目前 HTML 使用 `PLAN_CONFIG.mode: 'demo'`，不會發送 API 請求。已提供 fetch adapter、載入／錯誤／重試狀態與學習事件接口；尚未部署後端，也沒有接入 AI 供應商。這是一份接入規格，不代表真實服務已完成。

## 畫面順序

1. 今天的總時長與完成進度。
2. 今日到期複習：按到期時間排列；完成作答後更新下次複習日。
3. 今日學習：依 Home 已解鎖進度、每日時間和薄弱知識安排。
4. 頁面最底部 AI 知識分析：較熟悉、需複習、待確認，附作答證據。

Learn 仍只展示框架。Plan 不會授予章節解鎖權限，後端必須校驗任務是否已解鎖。

## 職責分配

- 學習後端：學員身份、知識點 ID、章節進度、作答紀錄、每日目標、複習到期時間。
- 複習排程服務：依作答正確性、提示使用、間隔與遺忘表現安排下一次複習。可先用可解釋的間隔規則，再調整模型；不是任意讓 AI 指定到期日期。
- 今日計畫服務：先安排逾期與到期複習，再補入已解鎖的新內容，總時長以每日目標為預算。未完成項目延續，重整不重複建立任務。
- AI 分析服務：從結構化、去識別的學習摘要產生重點與證據，輸出限定知識點與狀態；資料不足時顯示待確認。
- 通知服務：依學員時區與提醒設定發送到期提醒。HTML 畫面不等於背景提醒服務，須額外建置推播或通知通道。

## 接口

身份由伺服器 session 確認，不讓瀏覽器任意指定 userId。建議同源 HttpOnly session；寫入請求由後端檢查 Origin／CSRF token。前端不可放 AI key。

| Method | Endpoint | 功能 |
|---|---|---|
| GET | `/api/v1/plan/today` | 當日安排、到期複習與最新分析 |
| POST | `/api/v1/learning-events` | 追加前測／學習／練習事件，重新計算安排 |
| POST | `/api/v1/reviews/:reviewId/complete` | 校驗複習作答，更新下次到期日 |
| PATCH | `/api/v1/preferences` | 每日目標、時區、提醒時間（預留） |
| POST | `/api/v1/knowledge-analysis/jobs` | 排隊更新 AI 分析（由後端觸發或手動更新） |
| GET | `/api/v1/knowledge-analysis/jobs/:jobId` | 查詢分析工作狀態（預留） |

`GET plan/today` 的示例回應：

```json
{
  "date": "2026-10-09",
  "timezone": "Asia/Hong_Kong",
  "goalMinutes": 15,
  "usedMinutes": 0,
  "items": [
    {
      "id": "review-ram",
      "type": "review",
      "title": "Memory · RAM",
      "subtitle": "工作空間與永久儲存",
      "minutes": 3,
      "dueAt": "2026-10-09T01:00:00Z",
      "status": "pending",
      "route": "review"
    }
  ],
  "insights": {
    "status": "ready",
    "generatedAt": "2026-10-09T01:00:00Z",
    "summary": "把今天的重點留給記憶體。",
    "note": "先複習，再用練習確認理解。",
    "evidenceCount": 6,
    "knowledge": [
      {
        "id": "ram",
        "label": "Memory · RAM",
        "status": "review",
        "evidence": "近兩次練習混淆 RAM 與儲存裝置。"
      }
    ]
  }
}
```

事件具備 `eventId` 作為冪等鍵，避免網絡重試重複計分：

```json
{
  "eventId": "UUID",
  "itemId": "review-ram",
  "knowledgePointId": "ram",
  "kind": "review_attempt",
  "correct": true,
  "occurredAt": "2026-10-09T02:00:00Z"
}
```

正式版應傳 `questionId`、`answerId`、作答時間和提示使用，而非信任客戶端的 `correct`。目前 HTML 題目與答案為示範；正式 API 額外需要獲取題目，後端判分並回傳結果。複習完成回應至少提供 `nextReviewAt`。

## 接入 AI 的資料流

作答事件 → 後端判分與更新知識狀態 → 更新複習排程和今日計畫 → 排隊 AI 分析 → 結果驗證 → 保存最新分析 → Plan 讀取。

AI input 建議包含知識點、已完成節點、近幾次作答、間隔、提示使用和資料量；不需要姓名、email 或原始登入資料。不要僅憑生活前測直接認定掌握。分析失敗時保留最後成功結果及時間，不清空今天的安排；新學員無證據時回傳「待確認」。

## 後續接入步驟

1. 選定學習後端與 AI 供應商。
2. 建立正式登入、資料表、服務端判分和權限校驗。
3. 部署同源 API 與排程工作；API key 僅放服務端環境變數。
4. 將 `PLAN_CONFIG.mode` 改成 `api`，設定 baseUrl。
5. 用真實題目服務替換 HTML 中固定示例題與前端判分；補上分析 pending／stale 狀態、事件同步失敗重試與通知通道。

現階段不應把 demo 題目 ID 或前端 correct 當作正式資料驗證依據。
