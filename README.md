# 記帳網站 expense-tracker
![Index page for expense-tracker](expense-tracker.png)
## 介紹
這是一個簡單的記帳網站，旨在幫助使用者記錄和管理他的支出。


## 功能

- 註冊帳號：
使用者可以通過提供必要的資訊註冊帳號，以便能夠使用本網站的功能。

- 登入/登出：
已註冊的使用者可以通過提供他們的帳號資訊登入，只有登入狀態的使用者才能訪問網站的內容，否則將被導向登入頁面。

- 瀏覽支出清單：
在登入後，使用者可以在首頁一次瀏覽所有支出的清單。

- 查看支出清單總金額：
在首頁，使用者可以查看所有支出清單的總金額，這將有助於他們追蹤和掌握自己的支出情況。

- 新增支出：
使用者可以新增一筆支出，並填寫相關的資料。

- 編輯支出屬性：
使用者可以編輯已存在的支出資料，但一次只能編輯一筆，這將有助於他們更正錯誤或更新支出的相關資訊。

- 刪除支出：
使用者可以刪除任何一筆支出，但一次只能刪除一筆。這將有助於他們管理自己的支出清單。

- 根據類別篩選支出：
使用者可以根據支出的「類別」篩選支出資料。總金額的計算只會包括被篩選出來的支出總和，這有助於他們更精確地分析支出。

## 使用技術和工具

- 後端框架: Node.js + Express

- 前端模板引擎: HTML + CSS + JavaScript

- 資料庫: MongoDB

- 使用者身份驗證: Passport.js

- 加密：bcrypt.js

## 開始使用

1. 打開終端機(Terminal)，Clone 此專案至本機電腦

```
git clone https://github.com/Sunnylin0320/expense-tracker.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
npm install
```

4. 在專案資料夾中新增 .env 檔案，並依照 .env.example 檔案的格式設定環境變數
5. 建立種子資料

  ```
  npm run seed
  ```
| User | Email             | Password |
| :---:| :---------------: | :------: |
| root | root@example.com | 12345678 |        

6. 啟動伺服器，執行 app.js 檔案

```
npm run start
```

6. 當終端機(Terminal)出現以下字樣，表示伺服器已啟動並成功連結

```
Express is running on http://localhost:3000
```

7. 在任一瀏覽器中輸入 http://localhost:3000 開始使用網站
