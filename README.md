# FinSentry

**FinSentry** is an AI-powered personal finance intelligence platform built with the MERN stack. It helps users manage transactions, import CSV data, scan receipts with AI, analyze spending patterns, and generate monthly financial insights.

The project focuses on turning scattered financial activity into a structured, reviewable, and insight-driven ledger.

---

## Overview

FinSentry is designed for users who want more than basic expense tracking.

It supports multiple ways of adding financial data:

- Manual transaction entry
- CSV transaction import
- AI-powered receipt scanning
- Recurring transaction handling

A key feature of FinSentry is **multi-category receipt extraction**. Instead of storing an entire receipt as one vague expense, FinSentry can split a single receipt into multiple category-wise transaction drafts.

Example:

```txt
One D-Mart receipt
→ Food ₹560
→ Grocery ₹920
→ Clothing ₹699
```

Users can review extracted drafts before saving them to their ledger, keeping analytics more accurate and meaningful.

---

## Features

### Authentication

- User registration and login
- JWT-based authentication
- Protected API routes
- Persistent login using stored access token
- Current user restoration on page refresh
- Logout flow

### Transaction Management

- Create income and expense transactions
- View all transactions
- Update transactions
- Delete transactions
- Bulk delete transactions
- Category-based tracking
- Payment method tracking
- Date-based transaction records
- Recurring transaction support

### AI Receipt Intelligence

- Upload receipt images
- Store receipt files using Cloudinary
- Analyze receipts using Gemini AI
- Extract merchant, date, items, categories, and amounts
- Split one receipt into multiple category-wise transaction drafts
- Review extracted rows before saving
- Save selected drafts using bulk create

### CSV Import

- Upload CSV transaction data
- Import multiple transactions at once
- Reduce manual data entry for bank-style records

### Analytics Dashboard

- Total income
- Total expense
- Balance
- Savings rate
- Category-wise spending
- Recent transaction activity
- Dashboard-ready financial overview

### AI Monthly Reports

- Generate monthly AI-written financial summaries
- Explain spending behavior in plain language
- Highlight category trends and saving patterns
- Send monthly reports to the registered email address

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

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod
- Multer
- Cloudinary
- Gemini AI
- Node Cron
- Resend
- Helmet
- CORS
- express-rate-limit

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
│       ├── main.jsx
│       └── index.css
│
└── server/
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        ├── services/
        ├── utils/
        ├── validators/
        └── app.js
```

---

## Frontend Architecture

The frontend uses a clean route-based structure with protected private pages.

### Main frontend layers

```txt
API layer
→ Axios instance and backend request functions

Auth layer
→ AuthContext and useAuth hook

Routing layer
→ React Router and ProtectedRoute

Layout layer
→ DashboardLayout for private app pages

Page layer
→ Login, Register, Dashboard, Ledger, Reports, Profile, etc.
```

### Authentication flow

```txt
Login/Register form
→ AuthContext method
→ API function
→ Axios request
→ Backend response
→ JWT saved in localStorage
→ User stored in context
→ Protected dashboard opens
```

### Refresh flow

```txt
Browser refresh
→ AuthProvider checks localStorage token
→ Frontend calls /api/users/me
→ Backend verifies token
→ User state is restored
```

---

## API Routes

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
GET    /api/transactions/:id
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

## Local Development

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas or local MongoDB
- Cloudinary account
- Gemini API key
- Resend API key

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

Example:

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

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender_email

CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

Backend URL:

```txt
http://localhost:5000
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

## Environment Configuration

The frontend currently uses:

```js
http://localhost:5000/api
```

For deployment, move the API URL to a Vite environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

---

## Current Development Status

### Completed

- Backend API implementation
- Authentication backend
- Transaction backend
- Receipt scanning backend
- CSV import backend
- Analytics backend
- AI reports backend
- React frontend setup
- Tailwind setup
- Routing setup
- Protected routes
- Login/register UI
- Login/register backend integration
- AuthContext implementation
- JWT persistence
- User restore on refresh
- Dashboard shell
- Basic profile page
- Logout flow

### In Progress

- Frontend dashboard analytics page
- Transaction ledger UI
- Receipt review UI
- CSV import UI
- AI reports UI

---

## Planned Frontend Work

- Real analytics dashboard
- Transaction table with search and filters
- Add/edit/delete transaction forms
- Receipt Intelligence review flow
- CSV import screen
- AI monthly reports page
- Responsive dashboard sidebar
- Deployment polish

---

## Design Direction

FinSentry uses two visual directions:

```txt
Public pages
→ light editorial finance style

Private app
→ dark finance command center style
```

The landing page focuses on product storytelling, while the dashboard focuses on usability, financial data, and workflows.

---

## Security Notes

- Passwords are hashed before storage
- JWT is used for authenticated API access
- Protected routes require valid Bearer token
- Helmet is used for secure HTTP headers
- CORS is configured for frontend access
- Rate limiting is applied to reduce abuse

---

## Author

**Anupam Choubey**

GitHub: [anupam-devcodes](https://github.com/anupam-devcodes)

---

## License

This project is intended for academic, learning, and portfolio purposes.
