# 💰 FinSentry

> **AI-powered Personal Finance Intelligence Platform built with the MERN Stack.**

FinSentry helps users effortlessly manage their finances by combining **AI-powered receipt processing**, **transaction management**, **financial analytics**, and **automated monthly reports** into a single modern workspace.

Unlike traditional expense trackers that require manual data entry, FinSentry leverages **Google Gemini AI** to intelligently extract, categorize, and organize expenses from receipt images while giving users complete control before importing them.

---

## 🚀 Live Demo

🌐 **Application:** https://finsentry-eta.vercel.app

---

# ✨ Features

### 🔐 Authentication

- JWT Authentication
- Protected Routes
- Persistent Login
- Secure API Access

---

### 💳 Transaction Management

- Add / Edit / Delete Transactions
- Bulk Delete
- Smart Search
- Advanced Filters
- Pagination
- Category Management
- Payment Methods
- Recurring Transactions

---

### 🤖 AI Receipt Intelligence

Upload a receipt image and let **Gemini AI** automatically

- Detect purchased items
- Extract prices
- Categorize expenses
- Generate editable transaction drafts

Supports receipts containing multiple expense categories.

Example

```
Milk          ₹80
Medicine     ₹250
Shirt        ₹799
```

↓

```
Grocery      ₹80
Healthcare   ₹250
Shopping     ₹799
```

Every extracted transaction can be reviewed before saving.

---

### 📊 Analytics Dashboard

Interactive dashboard featuring

- Total Income
- Total Expenses
- Balance
- Savings Rate
- Cash Flow Trends
- Expense Breakdown
- Recent Transactions

---

### 📂 CSV Import

Bulk upload transactions using CSV files.

---

### 📧 AI Monthly Reports

Generate AI-powered monthly financial summaries and send them directly to users via email.

---

# 💡 Why FinSentry?

Traditional expense trackers require users to manually enter every transaction, making personal finance management repetitive and time-consuming.

FinSentry simplifies this process through AI-powered automation while ensuring users remain in complete control of their financial data.

The project was built with a production-oriented backend architecture focusing on modularity, scalability, validation, and clean API design.

---

# 🏗️ System Architecture

```
                           ┌──────────────────────┐
                           │     React Client     │
                           │   Dashboard & UI     │
                           └──────────┬───────────┘
                                      │
                               Axios HTTP Client
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │    Express Server    │
                           │  REST API Layer      │
                           ├──────────────────────┤
                           │ Authentication       │
                           │ Validation (Zod)     │
                           │ Controllers          │
                           │ Business Services    │
                           └──────────┬───────────┘
                                      │
             ┌───────────────┬────────┴─────────┬────────────┐
             ▼               ▼                  ▼            ▼
         MongoDB        Gemini AI        Cloudinary      Node Cron
             │                                               │
             └──────────────────────────────┬────────────────┘
                                            ▼
                                      Resend Email API
```

---

# 🤖 AI Receipt Processing Workflow

```
Receipt Image

      │

      ▼

Cloudinary Upload

      │

      ▼

Gemini AI Processing

      │

      ▼

Extract Items & Prices

      │

      ▼

Automatic Categorization

      │

      ▼

Generate Transaction Drafts

      │

      ▼

User Review & Approval

      │

      ▼

MongoDB Storage
```

---

# ⚙️ Engineering Highlights

### Authentication

- JWT-based authentication
- Protected API routes
- Persistent sessions

### Validation

- Zod request validation
- Centralized error handling
- Input sanitization

### Backend Architecture

- Controller-Service pattern
- Modular route organization
- Reusable middleware
- Clean REST API design

### File Processing

- Secure image uploads
- Cloudinary integration
- AI-powered receipt parsing

### Scheduled Jobs

- Monthly financial reports
- Automated email delivery using Node Cron + Resend

---

# 📂 Project Structure

```
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

# 🛠 Tech Stack

## Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Context API
- React Hot Toast
- Recharts

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- Multer
- Node Cron

---

## Third-Party Services

- Google Gemini AI
- Cloudinary
- Resend

---

# 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/anupam-devcodes/finsentry.git
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

# 🔑 Environment Variables

```
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

# 🌐 API Overview

The backend follows a RESTful architecture with dedicated modules for

- Authentication
- User Management
- Transactions
- Receipt Processing
- Analytics
- Reports

The API is organized using the Controller-Service pattern for improved maintainability and scalability.

---

# 🚀 Future Improvements

- Avatar Upload
- Budget Planning
- Financial Goals
- Multi-Currency Support
- Spending Predictions
- AI Budget Recommendations
- Mobile PWA
- Dark Mode
- OCR Fallback for Low-Quality Receipts

---

# 👨‍💻 Author

**Anupam Choubey**

GitHub: https://github.com/anupam-devcodes

---

If you found this project helpful, consider giving it a ⭐.
