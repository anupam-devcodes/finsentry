# FinSentry AI

### AI-Powered Personal Finance Analytics Platform

LedgerLens AI is a full-stack personal finance management platform being built with the MERN stack. It is designed to help users track income and expenses, understand spending behaviour through interactive analytics, manage recurring transactions, import financial records, and receive AI-generated financial insights.

This project is being developed from scratch as a major full-stack placement project, with a strong focus on scalable backend architecture, secure authentication, meaningful analytics, AI integration, deployment readiness, and clear engineering documentation.

---

## Project Status

> **Under Active Development**

The project is currently in the initial planning and architecture phase. Features will be implemented incrementally with proper testing, documentation, and version-controlled development.

---

## Problem Statement

Managing personal finances becomes difficult when income, daily expenses, bills, subscriptions, and receipts are spread across multiple places. Many users can record transactions, but they still struggle to answer important questions such as:

* Where is most of my money going?
* How much did I save this month?
* Which categories are affecting my budget the most?
* Are my recurring expenses increasing?
* Can my receipts be converted into transactions automatically?
* Can I receive useful monthly insights without manually calculating everything?

FinSentry AI aims to solve this by bringing transaction tracking, analytics, automation, and AI-powered financial insights into one organised platform.

---

## Planned Core Features

### Authentication and User Management

* Secure user registration and login
* JWT-based authentication
* Protected user dashboard
* User profile management

### Transaction Management

* Add, view, update and delete income or expense transactions
* Categorise transactions such as food, rent, travel, salary and entertainment
* Filter transactions by date, type and category
* Bulk transaction actions

### Financial Analytics Dashboard

* Total income, total expenses and current balance
* Monthly income-versus-expense visualisation
* Category-wise expense breakdown
* Top spending category analysis
* Date-range based financial summaries

### AI Receipt Scanning

* Upload a receipt image
* Store uploaded files securely using Cloudinary
* Extract transaction information using Gemini AI
* Convert scanned receipt details into an expense transaction

### CSV Import

* Upload transaction history using CSV files
* Validate imported data before saving
* Add multiple transactions efficiently

### Recurring Transactions

* Support recurring expenses and incomes such as rent, subscriptions or salary
* Automatically generate due transactions using scheduled cron jobs

### AI-Generated Monthly Reports

* Analyse the user's monthly financial activity
* Generate intelligent spending insights using Gemini AI
* Deliver monthly financial reports through email using Resend

---

## Planned Technology Stack

| Layer           | Technology                                   |
| --------------- | -------------------------------------------- |
| Frontend        | React.js, JavaScript, Tailwind CSS, Recharts |
| Backend         | Node.js, Express.js, JavaScript              |
| Database        | MongoDB with Mongoose                        |
| Authentication  | JWT and Passport.js                          |
| AI Integration  | Google Gemini AI                             |
| File Storage    | Cloudinary                                   |
| Email Service   | Resend                                       |
| Scheduled Jobs  | Node Cron                                    |
| CSV Processing  | CSV parsing and validation tools             |
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
 ├── Generates analytics
 ├── Processes CSV imports
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

## Planned Backend Architecture

The backend will follow a layered architecture so that each part of the application has a clear responsibility.

```text
backend/
└── src/
    ├── config/          # Database and external service configuration
    ├── routes/          # API endpoint definitions
    ├── controllers/     # Request and response handling
    ├── services/        # Main business logic
    ├── models/          # MongoDB schemas and database structure
    ├── middleware/      # Authentication and error-handling checks
    ├── validators/      # Incoming data validation rules
    ├── utils/           # Reusable helper functions
    ├── mailers/         # Email generation and delivery logic
    ├── cron/            # Scheduled jobs for automation
    └── index.js         # Backend application entry point
```

### Backend Request Flow

```text
Frontend Request
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
Response returned to Frontend
```

This architecture keeps the codebase organised, maintainable and easier to scale as new features are added.

---

## Development Roadmap

### Phase 0: Planning and Architecture

* [x] Finalise product idea and project direction
* [x] Choose JavaScript-based implementation approach
* [ ] Create GitHub repository and connect local development environment
* [ ] Define complete application architecture

### Phase 1: Backend Foundation

* [ ] Initialise Node.js backend
* [ ] Configure Express server
* [ ] Set up environment variables
* [ ] Connect MongoDB database
* [ ] Establish error-handling structure

### Phase 2: Authentication

* [ ] Create user model
* [ ] Implement registration
* [ ] Implement login
* [ ] Add password hashing
* [ ] Add JWT authentication
* [ ] Build protected routes

### Phase 3: Transaction Management

* [ ] Design transaction model
* [ ] Implement transaction CRUD APIs
* [ ] Add filtering and categorisation
* [ ] Add bulk actions

### Phase 4: Analytics

* [ ] Build financial summary APIs
* [ ] Create MongoDB aggregation pipelines
* [ ] Prepare dashboard chart data

### Phase 5: Automation and AI

* [ ] Integrate Cloudinary receipt upload
* [ ] Integrate Gemini AI receipt scanning
* [ ] Implement CSV imports
* [ ] Implement recurring transactions
* [ ] Implement monthly AI financial reports
* [ ] Integrate email delivery

### Phase 6: Frontend Development

* [ ] Set up React application
* [ ] Build authentication screens
* [ ] Build dashboard
* [ ] Build transaction management screens
* [ ] Build analytics charts
* [ ] Build reports and settings pages

### Phase 7: Production Readiness

* [ ] Testing and debugging
* [ ] Security improvements
* [ ] Deployment
* [ ] Project documentation
* [ ] Resume and interview preparation

---

## Engineering Goals

This project is being developed with the following goals:

* Build a complete full-stack MERN application from scratch
* Understand and implement clean backend architecture
* Work with real-world authentication and protected APIs
* Use MongoDB aggregation pipelines for meaningful analytics
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

## Local Development Setup

Local installation and environment setup instructions will be added after the initial backend and frontend project structures are created.

---

## Author
Built by **Anupam Choubey** as a full-stack project with a focus on practical engineering, learning, and real-world financial problem solving.

---

## Note

This repository documents the complete development journey of FinSentry AI. Features marked as planned will be implemented, tested and documented step by step during development.
