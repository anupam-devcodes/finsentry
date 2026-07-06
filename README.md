# 💰 FinSentry

<p align="center">
AI-powered personal finance platform built with the MERN stack.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-06B6D4?logo=tailwindcss)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Gemini AI](https://img.shields.io/badge/AI-Gemini-blueviolet)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-blue)

</p>

---

## 🚀 Live Demo

🌐 **Application:** https://finsentry-eta.vercel.app

---

## 📖 Overview

FinSentry is a full-stack AI-powered personal finance workspace that enables users to manage their finances through intelligent automation.

Unlike traditional expense trackers, FinSentry combines transaction management, receipt intelligence, AI-generated financial insights, analytics, and automated reporting into a single platform.

The application was built with a production-oriented architecture using React, Express.js, MongoDB, JWT authentication, Cloudinary, Gemini AI, and Resend.

---

## ✨ Key Features

### 🔐 Authentication

- JWT Authentication
- Protected Routes
- Persistent Login
- Secure API Access

### 💳 Transaction Management

- Add / Edit / Delete Transactions
- Bulk Delete
- Search
- Filters
- Pagination
- Category Management
- Payment Methods
- Recurring Transactions

### 🤖 AI Receipt Intelligence

Upload receipt images and let Gemini AI automatically:

- Detect purchased items
- Extract prices
- Categorize expenses
- Generate editable transaction drafts

Supports mixed-category receipts.

Example:

```
Receipt

Milk ........ ₹80
Medicine ... ₹250
Shirt ....... ₹799

↓

Grocery ₹80
Healthcare ₹250
Shopping ₹799
```

Users can review every transaction before importing.

---

### 📈 Analytics Dashboard

Interactive dashboard including

- Income
- Expenses
- Balance
- Savings Rate
- Cash Flow Trends
- Expense Breakdown
- Recent Transactions

---

### 📂 CSV Import

Bulk upload transactions from CSV files.

---

### 📧 AI Monthly Reports

Generate AI-powered financial summaries and send them directly to email.

---

## 🏗️ Architecture

```
React Frontend
        │
 Axios API Layer
        │
 Express REST API
        │
Business Services
        │
 MongoDB Database
        │
 Gemini AI
 Cloudinary
 Resend
```

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Context API
- React Hot Toast
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- Multer
- Cloudinary
- Gemini AI
- Resend
- Node Cron

---

## 📁 Project Structure

```text
finsentry
│
├── client
│   ├── components
│   ├── context
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── routes
│   └── utils
│
└── server
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    ├── services
    ├── validators
    └── utils
```

---

## ⚙️ Environment Variables

Server requires

```env
PORT=
MONGO_URI=

JWT_SECRET=
JWT_EXPIRES_IN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GEMINI_API_KEY=
GEMINI_MODEL=

RESEND_API_KEY=
RESEND_FROM_EMAIL=

CLIENT_URL=
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/anupam-devcodes/finsentry.git
```

Backend

```bash
cd server
npm install
npm run dev
```

Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌐 REST API

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### User

```
GET /api/users/me
```

### Analytics

```
GET /api/analytics/dashboard
```

### Transactions

```
GET    /api/transactions
POST   /api/transactions
PATCH  /api/transactions/:id
DELETE /api/transactions/:id
DELETE /api/transactions/bulk
POST   /api/transactions/import
POST   /api/transactions/scan-receipt
POST   /api/transactions/bulk-create
POST   /api/transactions/:id/receipt
```

### Reports

```
POST /api/reports/monthly/generate
POST /api/reports/monthly/send
```

---

## 🎯 Future Improvements

- Email Domain Verification
- Avatar Upload
- Budget Planning
- Financial Goals
- Multi-Currency Support
- Advanced Analytics
- Mobile PWA

---

## 👨‍💻 Author

**Anupam Choubey**

GitHub:
https://github.com/anupam-devcodes

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.