# Discord-like Chat Application

當然可以。以下是一份適用於你專題「Kungnection」前端部分的 README 初稿，針對使用 React、Vite、Tailwind CSS 等技術架構的情境編寫，並已考慮到你的需求：登入、註冊、聊天室、使用者設定等元件化模組開發。

⸻

🧠 Kungnection 前端

Kungnection 是一個由成功大學學生團隊開發的通訊平台，靈感來自 Discord，結合即時聊天、使用者管理與頻道系統。此為 前端子系統，使用 React.js + Vite 打造，搭配 Tailwind CSS 建構美觀且響應式的 UI。

📦 技術選型

類別	技術／工具	說明
框架	React 18+	元件化開發，配合 hooks 實現狀態管理與邏輯分離
打包工具	Vite	快速建構工具，優化開發體驗與熱重載
UI 工具	Tailwind CSS	utility-first 的 CSS 框架，快速設計與統一風格
路由	React Router	單頁應用（SPA）下的動態頁面切換
API 請求	Axios	處理與後端的 RESTful 通訊
狀態管理	useState / useEffect / context	控制登入狀態、聊天室更新等

📁 專案結構

kungnection-frontend/
├── public/                  # 靜態資源
├── src/
│   ├── components/          # 可重用 UI 元件（按鈕、Modal、訊息卡片等）
│   ├── pages/               # 各主要頁面（登入、註冊、聊天室、設定等）
│   ├── routes/              # 路由設定
│   ├── services/            # API 請求邏輯（Axios 封裝）
│   ├── context/             # 全域狀態（如登入狀態）
│   ├── assets/              # 圖片與樣式資源
│   └── App.tsx              # 應用程式進入點
├── tailwind.config.js       # Tailwind 設定檔
├── vite.config.ts           # Vite 設定檔
└── package.json             # 專案依賴與腳本

🚀 快速開始
	1.	安裝依賴

npm install

	2.	啟動開發伺服器

npm run dev

	3.	打包生產環境

npm run build

	4.	設定環境變數

建立 .env 檔：

VITE_API_URL=http://localhost:8080

若部署至 Vercel，請將 VITE_API_URL 設為後端伺服器的公開網址。

🧪 可用功能模組
	•	使用者註冊、登入、登出
	•	個人檔案編輯（修改暱稱、頭像）
	•	頻道加入與建立
	•	私人聊天室與頻道聊天室
	•	支援訊息 Markdown 呈現
	•	頻道邀請機制

🔧 尚未實作（或進行中）
	•	視訊通話功能（透過 mediasoup 進行實驗）
	•	群組權限與角色管理
	•	多語系支援

🌐 部署

目前支援 Vercel 快速部署，建議於後端部署至 Render 或 Railway 並啟用 CORS 設定。

👨‍💻 開發者
	•	白昕宸 – 前端架構設計、聊天室互動邏輯

📄 License

本專案採用 MIT License 授權。

⸻
