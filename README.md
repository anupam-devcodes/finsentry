# FinSentry AI

### AI-Powered Personal Finance Analytics Platform

FinSentry AI is a full-stack personal finance management platform being built with the MERN stack. It helps users securely track income and expenses, manage financial transactions, understand spending behaviour through analytics, import transaction history using CSV files, and eventually receive AI-powered financial insights from receipts and monthly reports.

This project is being developed from scratch as a major full-stack placement project, with a strong focus on scalable backend architecture, secure authentication, meaningful analytics, AI integration, deployment readiness, and clear engineering documentation.

---

## Project Status

> **Under Active Development**

The backend foundation, authentication system, transaction management APIs, filtering, pagination, bulk delete, CSV import, and dashboard analytics APIs have been implemented and tested.

The project is currently focused on expanding backend capabilities before moving into frontend development, receipt upload, AI integrations, recurring transactions, and email-based reports.

---

## Problem Statement

Managing personal finances becomes difficult when income, daily expenses, bills, subscriptions, and receipts are spread across multiple places. Many users can record transactions, but they still struggle to answer important questions such as:

* Where is most of my money going?
* How much did I save this month?
* Which categories are affecting my budget the most?
* Are my recurring expenses increasing?
* Can my receipts be converted into transactions automatically?
* Can I receive useful monthly insights without manually calculating everything?

FinSentry AI aims to solve this by combining transaction tracking, analytics, CSV imports, automation, and AI-powered financial insights into one organised platform.

---

## Features Implemented So Far

### Backend Foundation

* Node.js and Express backend setup
* Environment variable configuration
* MongoDB Atlas connection using Mongoose
* Modular backend folder architecture
* Centralised error handling
* Reusable async error handler
* Request validation system using Zod

### Authentication and User Management

* User model with secure password storage
* User registration API
* User login API
* Password hashing using bcryptjs
* JWT token generation
* Protected routes using authentication middleware
* Current logged-in user API

### Transaction Management

* Transaction model with user ownership
* Create income or expense transaction
* Get all transactions of logged-in user
* Get single transaction by ID
* Update transaction
* Delete transaction
* Bulk delete selected transactions
* User-specific transaction access protection
* Amount storage in paise for better money precision

### Transaction Filtering and Pagination

* Filter transactions by type
* Filter by category
* Filter by payment method
* Search transactions by category or description
* Date-range filtering
* Pagination support
* Sorting by date, amount, or creation time

### CSV Transaction Import

* CSV file upload using Multer
* Temporary in-memory file handling
* CSV parsing using csv-parse
* UTF-8 BOM handling for CSV headers
* Row-level validation using Zod
* Import transaction history from CSV files
* Convert imported rupee amounts into paise before saving
* Attach logged-in user ownership to every imported transaction
* Bulk insertion using MongoDB `insertMany()`
* Import summary with total rows and imported count

### Analytics Dashboard APIs

* Total income calculation
* Total expense calculation
* Current balance calculation
* Income and expense transaction counts
* Category-wise expense breakdown
* Recent transactions
* Monthly income-versus-expense trend using MongoDB aggregation pipelines

---

## Planned Core Features

### Receipt Upload and AI Receipt Scanning

* Upload receipt images
* Store uploaded files securely using Cloudinary
* Extract transaction information using Gemini AI
* Convert scanned receipt details into expense transaction drafts

### Recurring Transactions

* Support recurring incomes and expenses such as rent, subscriptions, and salary
* Automatically generate due transactions using scheduled cron jobs
* Track next recurring transaction date

### AI-Generated Monthly Reports

* Analyse the user's monthly financial activity
* Generate intelligent spending insights using Gemini AI
* Deliver monthly financial reports through email using Resend

### Frontend Application

* React-based user interface
* Authentication screens
* Protected dashboard
* Transaction management screens
* CSV import interface
* Analytics charts
* Reports and settings pages

---

## Technology Stack

| Layer           | Technology                                   |
| --------------- | -------------------------------------------- |
| Frontend        | React.js, JavaScript, Tailwind CSS, Recharts |
| Backend         | Node.js, Express.js, JavaScript              |
| Database        | MongoDB with Mongoose                        |
| Authentication  | JWT, bcryptjs                                |
| Validation      | Zod                                          |
| File Upload     | Multer                                       |
| CSV Processing  | csv-parse                                    |
| AI Integration  | Google Gemini AI                             |
| File Storage    | Cloudinary                                   |
| Email Service   | Resend                                       |
| Scheduled Jobs  | Node Cron                                    |
| Version Control | Git and GitHub                               |

---

## High-Level Application Flow

```text
User
 │
 │ interacts with
 ▼
React Frontend
 │
 │ sends API requests
 ▼
Node.js + Express Backend
 │
 ├── Authenticates users
 ├── Handles transactions
 ├── Validates request data
 ├── Imports CSV transaction history
 ├── Generates analytics
 ├── Processes receipt uploads
 ├── Runs scheduled jobs
 └── Communicates with external services
 │
 ▼
MongoDB Database
 │
 ├── Users
 ├── Transactions
 ├── Reports
 └── Report Settings

External Integrations:
 ├── Gemini AI       → Receipt scanning and financial insights
 ├── Cloudinary      → Receipt/profile image storage
 └── Resend          → Monthly email reports
```

---

## Backend Architecture

The backend follows a layered architecture where each folder has a clear responsibility.

```text
server/
└── src/
    ├── config/          # Database and external service configuration
    ├── routes/          # API endpoint definitions
    ├── controllers/     # Request and response handling
    ├── services/        # Main business logic
    ├── models/          # MongoDB schemas and database structure
    ├── middleware/      # Authentication, validation, upload and error-handling middleware
    ├── validators/      # Incoming data and CSV row validation rules
    ├── utils/           # Reusable helper functions
    ├── mailers/         # Email generation and delivery logic
    ├── cron/            # Scheduled jobs for automation
    ├── app.js           # Express app configuration
    └── index.js         # Backend entry point
```

### Backend Request Flow

```text
Client Request
      ↓
Route
      ↓
Middleware / Validation
      ↓
Controller
      ↓
Service
      ↓
Model
      ↓
MongoDB
      ↓
Response returned to Client
```

This architecture keeps the codebase organised, maintainable, and easier to scale as new features are added.

---

## Current API Modules

### Authentication APIs

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/users/me
```

### Transaction APIs

```text
POST   /api/transactions
GET    /api/transactions
GET    /api/transactions/:id
PATCH  /api/transactions/:id
DELETE /api/transactions/:id
DELETE /api/transactions/bulk
```

### Transaction Filtering Examples

```text
GET /api/transactions?type=expense
GET /api/transactions?category=Food
GET /api/transactions?search=Lunch
GET /api/transactions?page=1&limit=10
GET /api/transactions?sortBy=amount&sortOrder=asc
```

### CSV Import API

```text
POST /api/transactions/import
```

The CSV import API accepts a CSV file using the form-data field name:

```text
file
```

Expected CSV columns:

```text
type,amount,category,description,date,paymentMethod
```

Example CSV:

```csv
type,amount,category,description,date,paymentMethod
income,50000,Salary,Monthly salary,2026-06-01,bank_transfer
expense,850,Food,Lunch,2026-06-02,upi
expense,12000,Rent,Monthly rent,2026-06-05,bank_transfer
```

### Analytics APIs

```text
GET /api/analytics/dashboard
```

The dashboard analytics API currently returns:

* Total income
* Total expense
* Balance
* Income and expense transaction counts
* Expense breakdown by category
* Recent transactions
* Monthly income-versus-expense trend

---

## Development Roadmap

### Phase 0: Planning and Architecture

* [x] Finalise product idea and project direction
* [x] Choose JavaScript-based implementation approach
* [x] Create GitHub repository and connect local development environment
* [x] Define backend architecture

### Phase 1: Backend Foundation

* [x] Initialise Node.js backend
* [x] Configure Express server
* [x] Set up environment variables
* [x] Connect MongoDB database
* [x] Establish error-handling structure
* [x] Add reusable validation middleware

### Phase 2: Authentication

* [x] Create user model
* [x] Implement registration
* [x] Implement login
* [x] Add password hashing
* [x] Add JWT authentication
* [x] Build protected routes

### Phase 3: Transaction Management

* [x] Design transaction model
* [x] Implement transaction CRUD APIs
* [x] Add filtering and categorisation
* [x] Add search, sorting and pagination
* [x] Add bulk delete action
* [x] Implement CSV transaction imports

### Phase 4: Analytics

* [x] Build financial summary APIs
* [x] Create MongoDB aggregation pipelines
* [x] Prepare dashboard chart data
* [x] Add monthly income-versus-expense trend
* [ ] Add advanced date-range analytics

### Phase 5: Automation, Files and AI

* [ ] Integrate Cloudinary receipt upload
* [ ] Integrate Gemini AI receipt scanning
* [ ] Implement recurring transactions
* [ ] Implement monthly AI financial reports
* [ ] Integrate email delivery using Resend

### Phase 6: Frontend Development

* [ ] Set up React application
* [ ] Build authentication screens
* [ ] Build dashboard
* [ ] Build transaction management screens
* [ ] Build CSV import screen
* [ ] Build analytics charts
* [ ] Build reports and settings pages

### Phase 7: Production Readiness

* [ ] Testing and debugging
* [ ] Security improvements
* [ ] Deployment
* [ ] Project documentation
* [ ] Resume and interview preparation

---

## Local Development Setup

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

### 3. Create environment file

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### 4. Run the backend server

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

---

## Engineering Goals

This project is being developed with the following goals:

* Build a complete full-stack MERN application from scratch
* Understand and implement clean backend architecture
* Work with real-world authentication and protected APIs
* Use MongoDB aggregation pipelines for meaningful analytics
* Store and process financial data carefully
* Handle CSV imports with validation and user ownership
* Integrate AI in a practical and user-focused manner
* Implement scheduled background automation
* Maintain clean Git commit history and documentation
* Deploy a production-ready application suitable for portfolio and placement discussion

---

## Future Enhancements

After the core version is completed, possible improvements may include:

* Budget planning and spending-limit alerts
* Savings goals and progress tracking
* Subscription management
* Advanced financial forecasting
* Exportable financial reports
* Multi-currency support
* Subscription-based premium plans

---

## Author

Built by **Anupam Choubey** as a full-stack project with a focus on practical engineering, learning, and real-world financial problem solving.

---

## Note

This repository documents the complete development journey of FinSentry AI. The project is being built incrementally with tested backend modules, clean architecture, and practical feature development.
