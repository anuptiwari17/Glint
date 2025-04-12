# 🔦 Glint - A Simple Postman-like API Tester

**Glint** is a minimal, fast, and beginner-friendly API testing tool built using the **MERN stack**. It allows you to send and test HTTP requests (GET, POST, PUT, DELETE, etc.) with a clean interface, response viewer, and auto-saved history — all without login or authentication. It also includes an **AI-powered assistant** that provides helpful suggestions when errors occur in your API requests.

---

## 🌟 Features

- Send all types of HTTP requests (GET, POST, PUT, DELETE)
- Add custom headers and body data
- View response status, headers, and body
- AI-based suggestions when an error occurs (e.g., wrong URL, bad headers, or invalid request body)
- Built using MERN stack (MongoDB, Express, React, Node.js)
- Lightweight and beginner-friendly

---

## 📁 Project Structure

```
glint/
├── client/         # React frontend
├── server/         # Express backend
├── .gitignore      # Includes node_modules and env
└── README.md
```

---

## 🔧 Tech Stack

- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **State Management**: React Hooks
- **AI Assistant**: Gemini API

---

## 🔧 Getting Started

### Prerequisites

- Node.js and npm
- Gemini API Key

### 1. Clone the repository

```bash
git clone https://github.com/anuptiwari17/glint.git
cd glint
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/` and add:

```
PORT=5000
GEMINI_API_KEY=your-api-key
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

Open `http://localhost:3000` in your browser 🎉

---

## ✅ Usage

1. Enter an API endpoint and select HTTP method.
2. Optionally add headers or body.
3. Click **Send** and view the response.
4. Your request is saved in history automatically.
5. If there's an error, Glint will use AI to suggest what went wrong and how you can fix it.

---

## 🤖 AI-Powered Error Assistant

When an API request fails (due to status codes like 4xx or 5xx), **Glint** will provide suggestions powered by an AI assistant:

- Diagnose why the request failed
- Recommend how to correct it (e.g., check URL, headers, JSON structure)
- Offer improvement suggestions based on the response and request

This makes debugging faster and smarter 💡

---

## 🙅‍♂️ No Authentication

This tool requires **no login or signup**. Just come, test your API, and go. Perfect for quick prototyping or debugging APIs during development.

---

## 📄 .gitignore

`.gitignore` includes:

```
/node_modules/
.env
```

> This ensures sensitive info and heavy folders are not committed to Git.

---

## 👨‍💻 Author

Built with 💛 by [Anup Tiwari](https://github.com/anuptiwari17)

---
