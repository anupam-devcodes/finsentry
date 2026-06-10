FinSentry AI — AI-Powered Personal Finance Platform

FinSentry AI is a full-stack MERN application that helps users manage personal finances through intelligent transaction tracking, AI-powered receipt processing, recurring payment automation, and automated monthly financial insights.

The platform combines modern backend engineering practices with practical AI integrations to reduce manual financial management and provide a smarter user experience.

Built with a production-oriented architecture, FinSentry AI demonstrates secure authentication, scalable REST APIs, file processing pipelines, background job automation, financial analytics, and AI-assisted workflows.
---

## Why This Project Stands Out

Most finance apps only allow manual transaction entry. FinSentry AI reduces manual effort by combining:

* AI receipt scanning
* Multi-category receipt extraction
* CSV transaction import
* Recurring transaction automation
* AI-generated monthly reports
* Email delivery automation
* Real dashboard analytics

This makes the project more than a CRUD application. It demonstrates real backend engineering, data processing, automation, AI integration, and SaaS-style thinking.

---

## Current Project Status

The backend is in an advanced MVP stage and contains most major product features.

### Completed Backend Modules

* JWT-based authentication
* User registration and login
* Protected routes
* Transaction CRUD APIs
* Transaction filters, search, sorting, and pagination
* Bulk transaction creation
* Bulk transaction deletion
* CSV transaction import
* Cloudinary receipt upload
* Gemini AI receipt scanning
* Multi-category receipt extraction from receipts
* Dashboard analytics
* Monthly income and expense trends
* Recurring transaction automation using cron jobs
* Monthly AI financial reports
* Email report delivery using Resend
* Monthly report cron automation
* Global error handling
* Zod request validation
* Clean service-controller-route architecture

### Current Development Stage

* Backend: advanced MVP stage
* Frontend: planned/upcoming
* Deployment: upcoming
* Final polish and API documentation: in progress

---

## Core Features

### 1. Authentication

Users can securely register, log in, and access protected routes using JWT authentication.

Key capabilities:

* Password hashing
* JWT token generation
* Protected user routes
* Auth middleware for secure APIs

---

### 2. Transaction Management

Users can manage income and expense transactions.

Supported operations:

* Create transaction
* View all transactions
* View single transaction
* Update transaction
* Delete transaction
* Bulk delete transactions
* Bulk create transactions

Money is stored internally in paise to avoid floating-point precision issues.

Example:

```text
₹100.50 → 10050 paise
```

---

### 3. Advanced Filtering and Pagination

Transaction APIs support:

* Filter by transaction type
* Filter by category
* Filter by payment method
* Search by title, description, or category
* Date range filtering
* Pagination
* Sorting by date, amount, category, or creation time

This makes the backend ready for a real dashboard experience.

---

### 4. Dashboard Analytics

The analytics module calculates:

* Total income
* Total expense
* Current balance
* Expense by category
* Recent transactions
* Monthly income and expense trends

This data will power the frontend dashboard.

---

### 5. CSV Transaction Import

Users can upload a CSV file containing multiple transactions.

Backend flow:

```text
CSV file upload
        ↓
Multer reads file
        ↓
CSV buffer converted to text
        ↓
csv-parse converts rows to objects
        ↓
Zod validates each row
        ↓
Valid transactions are inserted into MongoDB
```

This is useful for importing bank statements or bulk financial records.

---

### 6. Cloudinary Receipt Upload

Users can upload receipt images and attach them to transactions.

Backend flow:

```text
Receipt image upload
        ↓
Multer reads image
        ↓
Image buffer converted to base64/data URI
        ↓
Cloudinary stores image
        ↓
Receipt URL is saved in transaction
```

---

### 7. Gemini AI Receipt Scanning

FinSentry AI integrates Gemini to scan receipt images and extract transaction details.

Flow:

```text
Receipt image upload
        ↓
Image buffer converted to base64
        ↓
Gemini analyzes receipt
        ↓
AI returns structured JSON
        ↓
Backend parses JSON
        ↓
Zod validates AI output
        ↓
Frontend receives editable transaction drafts
```

---

### 8. Multi-Category Receipt Extraction

A practical receipt can contain multiple spending categories.

Example mall receipt:

```text
Food: ₹500
Grocery: ₹1200
Clothing: ₹2000
Total: ₹3700
```

Instead of saving the whole receipt under one incorrect category, FinSentry AI extracts category-wise transaction drafts:

```text
Food       ₹500
Grocery    ₹1200
Clothing   ₹2000
```

This keeps analytics accurate.

Final flow:

```text
Receipt uploaded
        ↓
Gemini detects one or more categories
        ↓
Backend returns extractedTransactions array
        ↓
User reviews editable rows
        ↓
Bulk create API saves selected transactions
        ↓
Analytics remain category-wise accurate
```

---

### 9. Recurring Transactions

Users can create recurring transactions such as:

* Monthly rent
* Salary
* Subscriptions
* EMI payments
* Weekly expenses

Backend flow:

```text
User creates recurring transaction
        ↓
Backend calculates nextRecurringDate
        ↓
Cron job runs daily
        ↓
Due recurring templates are found
        ↓
Normal transaction copies are created
        ↓
Original template's nextRecurringDate is updated
```

Generated copies are linked to the original recurring template using `recurringParent`.

---

### 10. Monthly AI Financial Reports

The backend can generate monthly reports using transaction data and Gemini AI.

Report includes:

* Monthly income
* Monthly expenses
* Balance/savings
* Transaction count
* Top expense categories
* AI-generated summary
* AI-generated financial insights

Flow:

```text
Monthly transactions
        ↓
Backend calculates financial summary
        ↓
Gemini generates readable report
        ↓
Report is saved in MongoDB
        ↓
Report can be viewed or emailed
```

---

### 11. Email Report Delivery with Resend

Users can receive monthly AI financial reports by email.

Flow:

```text
Generate monthly report
        ↓
Build HTML + plain text email
        ↓
Send email using Resend
        ↓
Update report status as email_sent
```

The email contains:

* Income
* Expenses
* Savings
* Top spending categories
* AI summary
* AI insights

---

### 12. Monthly Report Cron Automation

A scheduled cron job can automatically send monthly reports.

Example:

```text
1 July 2026 at 8:00 AM
        ↓
Send June 2026 report
```

Cron flow:

```text
Monthly cron starts
        ↓
Find all users
        ↓
Generate previous month's report
        ↓
Send report email
        ↓
Mark report as sent
```

Duplicate email prevention is included so the same report is not repeatedly emailed.

---

## Backend Architecture

FinSentry AI follows a clean layered backend architecture.

```text
Client Request
        ↓
Express App
        ↓
Route
        ↓
Middleware
        ↓
Controller
        ↓
Service
        ↓
Model
        ↓
MongoDB / External API
        ↓
Response
```

### Folder Responsibilities

```text
src/config
Database, Cloudinary, Gemini, and Resend configuration

src/controllers
Handles request and response logic

src/routes
Defines API endpoints

src/services
Contains business logic

src/models
Defines MongoDB schemas and models

src/middleware
Authentication, validation, upload, and error middleware

src/validators
Zod schemas for request validation

src/cron
Scheduled background jobs

src/utils
Reusable helper utilities
```

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
* Resend
* node-cron

### Frontend

Frontend development is planned.

Planned stack:

* React.js
* Tailwind CSS
* React Router
* Axios
* Charting library for analytics

---

## API Overview

### Authentication APIs

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

### Monthly Report APIs

```http
POST /api/reports/monthly/generate
POST /api/reports/monthly/send
```

---

## Important Backend Flows

### Auth Flow

```text
User registers/logs in
        ↓
Password is hashed or verified
        ↓
JWT token is generated
        ↓
Frontend sends token in Authorization header
        ↓
Auth middleware verifies user
        ↓
Protected APIs are accessed
```

### Transaction Creation Flow

```text
User submits transaction
        ↓
Zod validates request body
        ↓
Service converts rupees to paise
        ↓
MongoDB stores transaction
        ↓
Formatted response is returned
```

### AI Receipt Scan Flow

```text
User uploads receipt
        ↓
Multer reads image file
        ↓
Backend converts image buffer to base64
        ↓
Gemini analyzes receipt
        ↓
Backend validates AI JSON response
        ↓
Frontend receives extracted transaction drafts
```

### Multi-Transaction Receipt Save Flow

```text
AI returns extractedTransactions array
        ↓
Frontend displays editable rows
        ↓
User reviews/edits
        ↓
Frontend calls bulk-create API
        ↓
Backend validates every transaction
        ↓
insertMany saves all selected transactions
```

### Recurring Transaction Flow

```text
User creates recurring template
        ↓
Backend calculates nextRecurringDate
        ↓
Cron job runs daily
        ↓
Due templates are found
        ↓
Normal transaction copies are created
        ↓
nextRecurringDate is updated
```

### Monthly AI Report Flow

```text
Monthly transactions
        ↓
Backend calculates totals and category breakdown
        ↓
Gemini generates summary and insights
        ↓
Report is saved in MongoDB
        ↓
Report can be emailed to the user
```

---

## Database Models

### User

Stores user account details.

Main fields:

* name
* email
* password
* timestamps

### Transaction

Stores income and expense records.

Main fields:

* user
* type
* amountInPaise
* category
* description
* date
* paymentMethod
* receiptUrl
* isRecurring
* recurringInterval
* nextRecurringDate
* recurringParent

### MonthlyReport

Stores generated monthly AI reports.

Main fields:

* user
* month
* year
* periodStart
* periodEnd
* totalIncomeInPaise
* totalExpenseInPaise
* balanceInPaise
* transactionCount
* topExpenseCategories
* aiSummary
* aiInsights
* emailSent
* emailSentAt
* status

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

RESEND_API_KEY=my_resend_api_key
RESEND_FROM_EMAIL=FinSentry AI <onboarding@resend.dev>
```

Used `.env.example` for safe placeholders.

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/anupam-devcodes/finsentry.git
cd finsentry
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create:

```text
server/.env
```

Add the required environment variables listed above.

### 4. Run backend server

```bash
npm run dev
```

Expected output:

```text
MongoDB connected
[Recurring Cron] Scheduled successfully.
[Monthly Report Cron] Scheduled successfully.
FinSentry server is running on http://localhost:5000
```

---

## Sample CSV Format

A sample CSV can contain:

```csv
type,amount,category,description,date,paymentMethod
income,50000,Salary,Monthly salary,2026-06-01,bank_transfer
expense,8500,Food,Food expenses,2026-06-05,upi
expense,3000,Travel,Travel expenses,2026-06-10,card
```

---

## Security and Production Notes

The backend already includes:

* JWT protected routes
* Password hashing
* Request validation using Zod
* Centralized error handling
* File type validation for uploads
* Environment variable separation
* API key protection using `.env`

Planned production polish:

* CORS configuration
* Security headers with Helmet
* Rate limiting
* Deployment configuration
* Final API documentation
* Frontend integration

---

## What I Learned / Demonstrated

This project demonstrates:

* REST API design
* Authentication and authorization
* MongoDB data modeling
* Mongoose schema design
* Error handling architecture
* Request validation with Zod
* File uploads with Multer
* CSV parsing and validation
* Cloudinary integration
* Gemini AI integration
* AI JSON validation
* Background jobs with cron
* Email automation with Resend
* Analytics using MongoDB aggregation
* Clean controller-service-model architecture
* Production-minded backend development

---

## Roadmap

### Completed

* Backend setup
* Authentication
* Transactions
* Analytics
* CSV import
* Receipt upload
* AI receipt scanning
* Multi-category receipt extraction
* Recurring transactions
* Monthly AI reports
* Email automation

### In Progress / Upcoming

* Security middleware
* Production CORS setup
* API documentation
* Backend deployment
* React frontend
* Dashboard UI
* Charts and analytics UI
* Frontend authentication flow
* Full-stack deployment

---

## Author

Built by **Anupam Choubey** as a MERN AI SaaS project.

GitHub: [anupam-devcodes](https://github.com/anupam-devcodes)
