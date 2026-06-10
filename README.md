# FinSentry AI — MERN AI Finance SaaS Platform

FinSentry AI is an AI-powered personal finance SaaS platform built with the MERN stack. The project helps users track income, expenses, recurring payments, receipt-based transactions, CSV imports, and financial analytics from a clean dashboard.

This project is being built as a placement-ready major project with a strong backend architecture, real-world finance workflows, AI-powered receipt scanning, background automation, and scalable API design.

---

## Project Status

Backend development is currently in an advanced stage.

### Completed Backend Modules

* User authentication with JWT
* User registration and login
* Protected routes using authentication middleware
* Global error handling system
* Custom AppError utility
* Async error handling wrapper
* Zod-based request validation
* Transaction CRUD APIs
* Transaction filters, search, sorting, and pagination
* Dashboard analytics API
* Monthly transaction trend API
* Bulk transaction delete API
* Bulk transaction create API
* CSV transaction import
* Cloudinary receipt image upload
* Gemini AI receipt scanning
* Multi-category receipt extraction
* Recurring transactions with cron jobs

---

## Core Idea

Most personal finance apps require users to manually enter every transaction. FinSentry AI reduces manual effort by allowing users to upload receipts, import CSV files, and automate recurring payments.

The system can scan a receipt using Gemini AI and extract transaction details. If a receipt contains multiple spending categories, such as food, grocery, and clothing, the backend returns multiple category-wise transaction drafts so that analytics remain accurate.

---

## Key Features

### Authentication

* User registration
* User login
* Password hashing
* JWT token generation
* Protected user routes

### Transaction Management

* Create income and expense transactions
* View all user transactions
* View a single transaction
* Update transactions
* Delete transactions
* Bulk delete transactions
* Bulk create transactions
* Store amount in paise for precision

### Advanced Transaction Querying

Users can filter and organize transactions using:

* Type
* Category
* Payment method
* Search keyword
* Start date
* End date
* Pagination
* Sorting by date, amount, category, or creation time

### Analytics Dashboard

The backend provides analytics for:

* Total income
* Total expense
* Balance
* Expense by category
* Recent transactions
* Monthly income and expense trends

### CSV Import

Users can upload CSV files containing multiple transactions. The backend parses the CSV, validates each row using Zod, and inserts all valid transactions into MongoDB.

### Receipt Upload

Users can upload receipt images. The backend stores receipt images on Cloudinary and attaches the receipt URL to the transaction.

### AI Receipt Scanning

FinSentry AI integrates Gemini AI to scan receipt images and extract transaction details.

The AI receipt scanning flow:

```text
Receipt image upload
        ↓
Image buffer converted to base64
        ↓
Gemini AI analyzes receipt
        ↓
AI returns JSON response
        ↓
Backend parses JSON
        ↓
Zod validates extracted data
        ↓
Frontend receives editable transaction drafts
```

### Multi-Category Receipt Extraction

A practical receipt may contain multiple categories.

Example:

```text
Food: ₹500
Grocery: ₹1200
Clothing: ₹2000
Total: ₹3700
```

Instead of saving this as one incorrect transaction, FinSentry AI splits it into multiple category-wise transaction drafts:

```text
Food       ₹500
Grocery    ₹1200
Clothing   ₹2000
```

This keeps the analytics dashboard accurate.

### Recurring Transactions

Users can create recurring transactions such as:

* Monthly rent
* Salary
* Subscriptions
* EMI payments
* Weekly expenses

The backend uses a cron job to automatically check due recurring transactions and create normal transaction copies.

Example:

```text
Original transaction:
Rent ₹10000 monthly

Cron job runs daily:
If nextRecurringDate is due, create a new rent transaction
Then update the nextRecurringDate
```

Generated recurring copies are linked to the original recurring template using `recurringParent`.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Zod
* Multer
* csv-parse
* Cloudinary
* Gemini AI
* node-cron

### Frontend

Frontend development is upcoming.

Planned frontend stack:

* React.js
* Tailwind CSS
* React Router
* Axios
* Charting library for analytics dashboard

---

## Backend Architecture

```text
Client Request
        ↓
Express App
        ↓
Routes
        ↓
Middlewares
        ↓
Controllers
        ↓
Services
        ↓
Models
        ↓
MongoDB / External APIs
        ↓
Response
```

### Folder Responsibilities

```text
src/config
Database, Cloudinary, and Gemini configuration

src/controllers
Request and response handling

src/routes
API endpoint definitions

src/services
Business logic

src/models
MongoDB schemas and models

src/middleware
Authentication, validation, upload, and error middleware

src/validators
Zod schemas for request validation

src/cron
Background scheduled jobs

src/utils
Reusable helper utilities
```

---

## Important Backend Flows

### Authentication Flow

```text
User registers or logs in
        ↓
Password is hashed or verified
        ↓
JWT token is generated
        ↓
Frontend stores token
        ↓
Protected APIs use Bearer token
        ↓
Auth middleware verifies user
```

### Transaction Creation Flow

```text
User sends transaction data
        ↓
Zod validates request body
        ↓
Service converts amount to paise
        ↓
Transaction is saved in MongoDB
        ↓
Formatted transaction is returned
```

### AI Receipt Scan + Bulk Save Flow

```text
User uploads receipt
        ↓
/scan-receipt API analyzes receipt using Gemini
        ↓
Backend returns extractedTransactions array
        ↓
Frontend shows editable rows
        ↓
User reviews and clicks Save All
        ↓
/bulk-create API saves all selected transactions
        ↓
Analytics dashboard remains category-wise accurate
```

### Recurring Transaction Flow

```text
User creates recurring transaction
        ↓
Backend calculates nextRecurringDate
        ↓
Cron job runs daily
        ↓
Due recurring transactions are found
        ↓
Normal transaction copies are created
        ↓
nextRecurringDate is updated
```

---

## API Overview

### Auth APIs

```http
POST /api/auth/register
POST /api/auth/login
```

### User APIs

```http
GET /api/users/me
```

### Transaction APIs

```http
POST   /api/transactions
GET    /api/transactions
GET    /api/transactions/:id
PATCH  /api/transactions/:id
DELETE /api/transactions/:id
```

### Bulk Transaction APIs

```http
POST   /api/transactions/bulk-create
DELETE /api/transactions/bulk
```

### CSV Import API

```http
POST /api/transactions/import
```

### Receipt APIs

```http
POST /api/transactions/scan-receipt
POST /api/transactions/:id/receipt
```

### Analytics APIs

```http
GET /api/analytics/dashboard
GET /api/analytics/monthly-trend
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGODB_URI=my_mongodb_connection_string
JWT_SECRET=my_jwt_secret

CLOUDINARY_CLOUD_NAME=my_cloudinary_cloud_name
CLOUDINARY_API_KEY=my_cloudinary_api_key
CLOUDINARY_API_SECRET=my_cloudinary_api_secret

GEMINI_API_KEY=my_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

---

## Running the Backend Locally

```bash
cd server
npm install
npm run dev
```

Expected output:

```text
MongoDB connected
[Recurring Cron] Scheduled successfully.
FinSentry server is running on http://localhost:5000
```

---

## Current Backend Highlights

This backend is not limited to simple CRUD operations. It includes:

* AI-powered receipt understanding
* Multi-category transaction extraction
* CSV bulk import
* Bulk create and delete operations
* Real analytics with MongoDB aggregation
* Background cron automation
* External image upload with Cloudinary
* Clean error handling and validation structure

---

## Upcoming Features

* Frontend dashboard
* Monthly AI financial reports
* Email reports using Resend
* Smart spending insights
* Financial health score
* Deployment
* API documentation
* Security and production polish

---

## Project Goal

The goal of FinSentry AI is to build a real-world, recruiter-ready MERN SaaS project that demonstrates:

* Backend architecture
* REST API design
* Authentication
* MongoDB data modeling
* AI integration
* Background jobs
* File uploads
* CSV processing
* Analytics
* Clean error handling
* Production-ready thinking

---

## Author

Built by **Anupam Choubey** as a full-stack project with a focus on practical engineering, learning, and real-world financial problem solving.

---

## Note

This repository documents the complete development journey of FinSentry AI. The project is being built incrementally with tested backend modules, clean architecture, and practical feature development.