# FinSentry

**FinSentry** is an AI-powered personal finance workspace built with the MERN stack. It helps users track income and expenses, import CSV transactions, scan receipts with AI, understand spending patterns, and generate monthly financial summaries.

The project is designed as a practical finance intelligence system, not just a basic expense tracker.

---

## Highlights

- JWT-based authentication with protected dashboard routes
- Transaction ledger with search, filters, sorting, pagination, and CRUD actions
- CSV import for bulk transaction entry
- AI receipt scanning with reviewable transaction drafts
- Mixed-category receipt splitting for receipts that contain different spending types
- Analytics dashboard with income, expenses, balance, savings rate, cashflow trends, and expense breakdown
- AI-generated monthly reports with email delivery support
- Clean dark dashboard UI and responsive public pages

---

## Core Feature: AI Receipt Intelligence

FinSentry can analyze a receipt image and convert it into editable transaction drafts.

For mixed-category receipts, the system can split items into category-wise drafts before saving.

```txt
Example mixed receipt
→ Grocery ₹920
→ Shopping ₹699
→ Healthcare ₹250
```

The user can review, edit, select, and approve extracted rows before they are added to the ledger.

---

## Tech Stack

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

## Project Structure

```txt
finsentry/
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
└── server/
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        ├── services/
        ├── utils/
        └── validators/
```

---

## Main Modules

### Authentication

Users can register, log in, stay authenticated after refresh, and access protected routes using JWT-based authentication.

### Dashboard

The dashboard gives a financial overview with:

- Total income
- Total expenses
- Balance
- Savings rate
- Cashflow trend
- Expense category breakdown
- Recent transactions

### Transactions

The transaction ledger supports:

- Add, edit, and delete transactions
- Bulk delete
- Search and filters
- Pagination
- Recurring transaction fields
- Category and payment method tracking

### Receipt Scanner

Users can upload receipt images. Gemini AI extracts transaction drafts, which can be reviewed before saving.

### CSV Import

Users can upload CSV files to add multiple transactions at once.

### AI Reports

Users can generate monthly summaries from their transaction history and send reports to email.

> Email delivery uses Resend. In test mode, emails can only be sent to the verified Resend account email unless a sending domain is verified.

---

## API Overview

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
```

### User

```txt
GET /api/users/me
```

### Analytics

```txt
GET /api/analytics/dashboard
```

### Transactions

```txt
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

```txt
POST /api/reports/monthly/generate
POST /api/reports/monthly/send
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anupam-devcodes/finsentry.git
cd finsentry
```

### 2. Backend setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

Create a `.env` file inside `server/`:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=FinSentry AI <onboarding@resend.dev>

CLIENT_URL=http://localhost:5173
```

### 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Frontend Auth Flow

```txt
Login/Register
→ API request through Axios
→ JWT saved in localStorage
→ AuthContext stores user
→ Protected routes become accessible
→ /api/users/me restores user after refresh
```

---

## Design Direction

FinSentry uses two visual systems:

```txt
Public pages  → light editorial fintech style
Private app   → dark professional finance workspace
```

The UI focuses on clarity, readable financial data, and explainable workflows.

---

## Status

Completed:

- Backend API
- Auth flow
- Dashboard
- Transactions ledger
- Receipt scanning flow
- CSV import
- Monthly AI reports
- Public pages
- Privacy and Terms pages
- Responsive UI polish

Planned improvements:

- Production deployment
- Custom verified email domain
- More advanced analytics filters
- Optional avatar upload support

---

## Author

**Anupam Choubey**

GitHub: [anupam-devcodes](https://github.com/anupam-devcodes)
