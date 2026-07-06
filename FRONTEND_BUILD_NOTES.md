# FinSentry Frontend Build Notes

This document provides a detailed overview of the files created, files modified, API routes utilized, and functional logic for Phases 1 through 6 of the FinSentry personal finance SaaS frontend build.

---

## 1. Summary of Changes

### New Files Created
1. **[Modal.jsx](file:///D:/finsentry/client/src/components/common/Modal.jsx)**
   - **Purpose**: Generic modal component styled for dark workspace visual aesthetics (backdrop-blur, responsive scaling).
2. **[ConfirmDialog.jsx](file:///D:/finsentry/client/src/components/common/ConfirmDialog.jsx)**
   - **Purpose**: Action confirmation modal used for ledger deletes, bulk deletes, and discarding drafts.
3. **[TransactionFormModal.jsx](file:///D:/finsentry/client/src/components/transactions/TransactionFormModal.jsx)**
   - **Purpose**: Controlled form orchestrating transaction creations and edits. Shows recurring parameters conditionally.
4. **[ReceiptUploadBox.jsx](file:///D:/finsentry/client/src/components/receipts/ReceiptUploadBox.jsx)**
   - **Purpose**: Drag-and-drop or select area for scanning receipt image files with in-app previews.
5. **[ReceiptSummaryCard.jsx](file:///D:/finsentry/client/src/components/receipts/ReceiptSummaryCard.jsx)**
   - **Purpose**: Displays the AI extraction summary text returned by the Gemini pipeline.
6. **[ExtractedTransactionTable.jsx](file:///D:/finsentry/client/src/components/receipts/ExtractedTransactionTable.jsx)**
   - **Purpose**: In-place editable grid displaying split transaction drafts with row validation.
7. **[CSVUploadBox.jsx](file:///D:/finsentry/client/src/components/import/CSVUploadBox.jsx)**
   - **Purpose**: File upload area for bulk CSV spreadsheets.
8. **[CSVFormatGuide.jsx](file:///D:/finsentry/client/src/components/import/CSVFormatGuide.jsx)**
   - **Purpose**: Specifications guide explaining spreadsheet formatting (headers, types) with a copyable template.
9. **[ImportResultCard.jsx](file:///D:/finsentry/client/src/components/import/ImportResultCard.jsx)**
   - **Purpose**: Displays the count of successfully imported rows vs. total parsed rows from the CSV upload.
10. **[reportApi.js](file:///D:/finsentry/client/src/api/reportApi.js)**
    - **Purpose**: Front-end client wrapper for calling generation and email dispatch endpoints.
11. **[ReportGenerator.jsx](file:///D:/finsentry/client/src/components/reports/ReportGenerator.jsx)**
    - **Purpose**: Dropdowns to select statement billing months and years. Defaults to the previous calendar month.
12. **[ReportPreview.jsx](file:///D:/finsentry/client/src/components/reports/ReportPreview.jsx)**
    - **Purpose**: Renders monthly income/expense metrics, top categories bar chart, and AI summary text/insights list.
13. **[EmailReportCard.jsx](file:///D:/finsentry/client/src/components/reports/EmailReportCard.jsx)**
    - **Purpose**: Dispatcher card triggering report deliveries to registered email accounts.

### Existing Files Modified
1. **[TransactionFilters.jsx](file:///D:/finsentry/client/src/components/transactions/TransactionFilters.jsx)**
   - **Changes**: Added payment method select, start/end date inputs, and fixed uppercase type enums (`INCOME`/`EXPENSE`) to lowercase (`income`/`expense`) to match backend validations.
2. **[TransactionTable.jsx](file:///D:/finsentry/client/src/components/transactions/TransactionTable.jsx)**
   - **Changes**: Added row selection checkboxes, formatted types/payment methods for display, and created the actions column supporting Edit and Delete.
3. **[TransactionsPage.jsx](file:///D:/finsentry/client/src/pages/TransactionsPage.jsx)**
   - **Changes**: Integrated modals, selection checkboxes, and React Hot Toasts for CRUD and bulk deletions.
4. **[ScanReceiptPage.jsx](file:///D:/finsentry/client/src/pages/ScanReceiptPage.jsx)**
   - **Changes**: Built the upload, AI scanning status, editable results grid, and bulk save logic.
5. **[ImportCsvPage.jsx](file:///D:/finsentry/client/src/pages/ImportCsvPage.jsx)**
   - **Changes**: Coordinated CSV uploads, guide displays, results, and row-by-row backend validation error rendering.
6. **[ReportsPage.jsx](file:///D:/finsentry/client/src/pages/ReportsPage.jsx)**
   - **Changes**: Structured query layouts, generation spinners, email integrations, and report views.

---

## 2. API Routes Used

| Phase | Action | Route | Method | Payload / Response |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | Load Dashboard | `/api/analytics/dashboard` | `GET` | Response: `{ summary: {...}, recentTransactions: [...], categoryBreakdown: [...] }` |
| **Phase 2** | Load Ledger | `/api/transactions` | `GET` | Params: `search, type, category, paymentMethod, startDate, endDate, page, limit, sortBy, sortOrder` |
| **Phase 3** | Create Transaction | `/api/transactions` | `POST` | Body: `{ title, description, type, amount, category, date, paymentMethod, isRecurring, recurringInterval }` |
| **Phase 3** | Update Transaction | `/api/transactions/:id` | `PATCH` | Body: `{ ...partialFields }` |
| **Phase 3** | Delete Transaction | `/api/transactions/:id` | `DELETE` | Path parameter ID |
| **Phase 3** | Bulk Delete | `/api/transactions/bulk` | `DELETE` | Body: `{ transactionIds: [...] }` |
| **Phase 4** | Scan Receipt | `/api/transactions/scan-receipt` | `POST` | Multi-part Form Data: `receipt: File`. Response: `{ receiptSummary, extractedTransactions: [...] }` |
| **Phase 4** | Bulk Save Drafts | `/api/transactions/bulk-create` | `POST` | Body: `{ transactions: [...] }` |
| **Phase 5** | Bulk Import CSV | `/api/transactions/import` | `POST` | Multi-part Form Data: `file: File`. Response: `{ totalRows, importedCount }` |
| **Phase 6** | Generate AI Report | `/api/reports/monthly/generate` | `POST` | Body: `{ month, year }`. Response: `{ report: { id, totalIncome, totalExpense, balance, aiSummary, aiInsights, topExpenseCategories: [...] } }` |
| **Phase 6** | Email AI Report | `/api/reports/monthly/send` | `POST` | Body: `{ month, year }`. Response: `{ report, email: { messageId, ... } }` |

---

## 3. Detailed Walkthrough of Development Phases

### Phase 1: Dashboard Overview
- Renders key financial markers: Income, Expenses, Balance, and Savings Rate.
- Renders charts for monthly cashflow trends and categorical splits.
- Displays the latest ledger additions and a CTA route to the AI receipt scanning environment.

### Phase 2: Ledger Ledger
- Dynamic query synchronizer mapping filter states (`type`, `category`, `paymentMethod`, `search`, date intervals, page, sorting fields) to API requests.
- Renders row enums properly (formatting uppercase displays while communicating using lowercase strings required by Zod validators).
- Fully responsive, horizontally scrollable layout.

### Phase 3: Transaction CRUD Modals
- **Form Validation**: Checks numbers, inputs, and requires `recurringInterval` only if `isRecurring` is checked.
- **Bulk Delete**: Toggles checkboxes across rows to dispatch a single `bulkDeleteTransactions` request. Opens a confirm dialog box to prevent accident triggers.
- **Hot Toasts**: Dispatches clean popups indicating action status (creating, updating, deleting).

### Phase 4: Receipt Intelligence ( Gemini AI )
- User drops/browses a receipt file.
- Clicking "Analyze Receipt" streams it via Multi-part Form Data to Gemini.
- Gemini returns a receipt summary along with split drafts.
- Draft fields (date, category, title, payment method, amount) render inside editable rows.
- Checks inputs for errors, then dispatches `bulk-create` for selected rows.

### Phase 5: CSV Bulking
- Uploads CSV spreadsheets to `/transactions/import`.
- **Backend Failures**: Catches validation errors (e.g. Zod row parsing failures) and prints a structured warning detailing exactly which row numbers had invalid data and why.

### Phase 6: Monthly AI Reports
- Selects month/year (defaults to the prior calendar month).
- Triggers AI generation, returning summary paragraphs, bulleted advice items, and top category bars.
- Clicking "Send to Email" forwards a copy to the user's inbox and updates status records.

---

## 4. Key Assumptions & Mismatches Solved

1. **Lowercase Mismatch**: The backend models and validators reject uppercase type inputs (`INCOME`/`EXPENSE`). The frontend has been standardized to use and submit lowercase type parameters (`income`/`expense`) and payment methods (`card`, `cash`, `upi`, `bank_transfer`, `wallet`, `other`).
2. **Amounts**: The backend saves values in Paise (`amountInPaise`) but exposes standard Float values for transaction `amount` attributes (Rupees) in the controllers. We submit standard float inputs (e.g. `245.50`) and read the returned `amount` key directly.
3. **No Styling Libraries**: Used tailwind utility classes and vanilla DOM inputs (type select/date/file) without additional weight, keeping the app lightweight and load times swift.

---

## 5. Dashboard Charts, Branding, and Public Page Polish

### Files Created
1. **[BrandLogo.jsx](file:///D:/finsentry/client/src/components/common/BrandLogo.jsx)**
   - **Purpose**: A clean and minimal reusable inline-SVG-based branding logo component. Features a refined "FS" monogram and provides size, showText, subtitle, and light/dark variant styling options.
2. **[CashflowChart.jsx](file:///D:/finsentry/client/src/components/dashboard/CashflowChart.jsx)**
   - **Purpose**: Renders monthly Income vs Expense area/line chart visuals using Recharts. Formats large rupee amounts, features an interactive custom tooltip, and includes a clean empty state for a workspace with no transaction data.
3. **[ExpenseDonutChart.jsx](file:///D:/finsentry/client/src/components/dashboard/ExpenseDonutChart.jsx)**
   - **Purpose**: Donut chart visualizing category expense breakdown using Recharts. Dynamically calculates percentages, totals, and features a clean custom legend alongside progress indicators.

### Files Modified
1. **[DashboardPage.jsx](file:///D:/finsentry/client/src/pages/DashboardPage.jsx)**
   - **Changes**: Replaced the plain mockup visuals with `CashflowChart` and `ExpenseDonutChart`.
2. **[DashboardLayout.jsx](file:///D:/finsentry/client/src/layouts/DashboardLayout.jsx)**
   - **Changes**: Integrated the new `BrandLogo` in the sidebar panel.
3. **[LandingPage.jsx](file:///D:/finsentry/client/src/pages/LandingPage.jsx)**
   - **Changes**: Integrated `BrandLogo` in the navbar and footer. Adjusted clamp ranges, typography sizes, tracking, and spacing to prevent clipping of text (e.g. g, y, p descenders) and overflow on mobile viewports.
4. **[LoginPage.jsx](file:///D:/finsentry/client/src/pages/LoginPage.jsx)**
   - **Changes**: Integrated `BrandLogo` and polished the login card. Uses light editorial styling that matches the landing page with focus-state transitions, soft rounded borders, and clear email/password fields.
5. **[RegisterPage.jsx](file:///D:/finsentry/client/src/pages/RegisterPage.jsx)**
   - **Changes**: Integrated `BrandLogo` and restructured the register card, layout, steps, and forms to match the LoginPage's light editorial styling.

### What Changed in Dashboard Charts
- Replaced the mockup CSS bar graphics with high-performance responsive SVG charts powered by `recharts`.
- Curated cohesive non-rainbow styling palettes matching professional fintech interfaces (emerald for income, coral/red for expense).
- Standardized custom tooltips displaying Indian Rupee values with proper k/L abbreviation scales (e.g., ₹1.2k, ₹1.5L) depending on value size.
- Integrated empty states that handle cases where backend monthly trends or categorical summaries are empty.

### What Changed in Logo/Branding
- Built a vector SVG monogram "FS" that scales perfectly down to mobile/small navbars.
- Provides a `"dark"` mode variant (for the workspace app view) and a `"light"` mode variant (for landing page / login / register editorial views).

### What Changed in Landing Page
- Formatted the hero section to align with product features and copy requirements ("Know where every rupee actually goes.").
- Promoted honest receipt intelligence copywriting (AI receipt scanning splitting mixed-category receipts into drafts for review).
- Improved mobile responsiveness by scaling font sizes cleanly via standard responsive clamps.
- Included links to GitHub and documentation in the footer rather than the top navbar.
- Maintained contact links (`mailto:hariomgaaergy@gmail.com`) and disabled terms/privacy links.

### What Changed in Login/Register Pages
- Styled the authentication screens in matching light editorial fintech visual language.
- Improved input boxes with responsive borders, color transitions on focus, and clean spacing.
- Preserved existing `useAuth` backend hook integrity, controlled states, register-auto-login mechanisms, and React Hot Toasts.

### Installed Dependencies
- `recharts` — used for cashflow area and expense category donut charts.

### Assumptions Made
- Chart data respects backend shapes (e.g., `totalAmount` in category aggregator matches frontend expectations).
- Empty states are shown if no transactions exist in the database.

