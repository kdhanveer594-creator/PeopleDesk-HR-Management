# PeopleDesk HR Management System

PeopleDesk is a polished full-stack HR operations platform built with React, Express, MongoDB, and Mongoose. It includes separate HR admin and employee portals, operational reporting, leave and payroll workflows, and an executive-style live dashboard designed to feel demo-ready for competitions and product showcases.

## Why this project stands out

This version is designed to impress judges and stakeholders by combining:

- a premium HR dashboard with KPI storytelling and executive summaries
- role-based access for HR and employees with secure JWT protection
- real operational workflows for leave, payroll, attendance, recruitment, and staff reviews
- analytics and reporting features for workforce visibility
- a clean, polished UI that feels like a production-ready HR product

## Requirements

- Node.js 20.19+ or 22.12+
- MongoDB Community Server or MongoDB Atlas
- Modern browser for the React app

## Quick start

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create your environment file:

   ```sh
   cp .env.example .env
   ```

   Fill in the required values for:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
   - optional `HR_NAME`, `HR_EMAIL`, `HR_PASSWORD`

3. Seed the first admin account:

   ```sh
   npm run seed:admin
   ```

4. Optional: upload the competition demo team and sample records:

   ```sh
   npm run seed:demo
   ```

   This safely creates or updates the demo HR account, four employee records and their portal logins, attendance, leave and balance records, payroll, performance reviews, job openings, candidates, and HR notifications. It does not delete other organization data. Existing account passwords are preserved; newly created employee accounts use `DEMO_EMPLOYEE_PASSWORD` if set, otherwise `Demo-Employee-123`.

5. Optional: create a separate HR account manually:

   ```sh
   npm run create:hr-user
   ```

6. To add 50 more employee profiles with portal logins and sample attendance, leave, payroll, and review data, add `DEMO_EMPLOYEE_01_EMAIL` / `DEMO_EMPLOYEE_01_PASSWORD` through `DEMO_EMPLOYEE_50_EMAIL` / `DEMO_EMPLOYEE_50_PASSWORD` to your ignored local `.env`, then run:

   ```sh
   npm run seed:employees
   ```

   Use unique passwords of at least 12 characters. The seed command adds missing records only; it does not delete employees, overwrite existing profile data, or reset existing account passwords. Keep `.env` private and change demo passwords before using these accounts outside a local demonstration.

7. Start the app:

   ```sh
   npm run dev
   ```

8. Visit:

   - HR portal: `http://localhost:5173/login`
   - Employee portal: `http://localhost:5173/employee-login`

## Demo credentials

After `npm run seed:demo`, the HR account uses the configured `HR_EMAIL` (default `hr@peopledesk.local`) and is displayed as **Mihika Sharma**. Its password is the existing HR password from `.env` (or `Demo-HR-123456` for a new account).

Employee demo accounts:

| Name | Login email |
| --- | --- |
| Dhanveer | `dhanveer@peopledesk.local` |
| Shahjil islam | `shahjil.islam@peopledesk.local` |
| Teerath | `teerath@peopledesk.local` |
| Udit panday | `udit.panday@peopledesk.local` |

Newly created employee accounts use `DEMO_EMPLOYEE_PASSWORD` from `.env` (default: `Demo-Employee-123`); reseeding does not reset existing account passwords. Share credentials individually and change demo passwords before using these accounts outside a local demonstration.

## Key features

- Executive dashboard with people insights and recommendation cards
- Employee and team management
- Attendance tracking and hours calculations
- Leave approval and balance monitoring
- Payroll creation and status processing
- Recruitment pipeline and candidate management
- Performance review workflows
- Notifications and audit tracking
- CSV-style reporting exports for operations and HR review
- Employee self-service profile requests and portal access
- Support chatbot built directly into the app

## Demo-ready enhancements included

- Interactive analytics hero panel
- Executive insight cards summarizing HR health
- Updated dashboard storytelling for judgment-ready presentation
- Cleaner UX states for empty, loading, and action flows
- Professional README and product positioning

## Project structure

- `client/` — React frontend
- `server/` — Express API and business logic
- `postman/` — API collection for manual testing
- `README.md` — setup and product overview

## API overview

The app exposes HR, employee, auth, and operations endpoints through the Express backend. Import the Postman collection from `postman/PeopleDesk.postman_collection.json` to test the app manually.

## Recommended next upgrades for a prize-winning submission

To go from a strong project to a competition winner, focus on:

1. More realistic seeded demo data
2. Bulk imports and smart data filters
3. Better deployment documentation and live URL
4. More polished dark mode and UI micro-interactions
5. Extra operational reports and management summaries

## License

This project is created for educational and demo purposes.
 create payroll records || `PATCH` | `/api/payroll/:id/status` | Mark a pending payroll record processed |
| `GET`, `POST` | `/api/candidates` | List or add candidates |
| `PATCH` | `/api/candidates/:id/stage` | Advance or update a candidate's hiring stage |
| `GET`, `POST` | `/api/performance` | List or create performance reviews |

### Operations endpoints

These authenticated endpoints use the `/api/operations` prefix. Notifications are available to both portals and scoped to the signed-in account; leave balances, calendar, profile-request review, reports, audit history, and recruitment job management are HR/admin-only.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/operations/notifications` | List the signed-in account's latest notifications |
| `PATCH` | `/api/operations/notifications/:id/read` | Mark one owned notification as read |
| `GET` | `/api/operations/leave-balances?year=2026&department=Engineering` | Review allowance, used, and remaining leave days |
| `PUT` | `/api/operations/leave-balances/:employeeId/:type` | Set a yearly allowance (`year`, `entitlement`) |
| `GET` | `/api/operations/leave-calendar?startDate=2026-01-01&endDate=2026-12-31&department=Engineering` | List approved leave that overlaps the selected range |
| `GET` | `/api/operations/profile-changes` | Review employee contact update requests |
| `PATCH` | `/api/operations/profile-changes/:id/status` | Approve or decline a profile update |
| `GET` | `/api/operations/audit-logs?startDate=2026-01-01&endDate=2026-12-31` | Browse successful authenticated data changes |
| `GET` | `/api/operations/reports?module=attendance&startDate=2026-01-01&endDate=2026-01-31&department=Engineering` | Retrieve a filtered report (`employees`, `attendance`, `leaves`, or `payroll`) |
| `GET` | `/api/operations/reports/export?module=payroll&startDate=2026-01-01&endDate=2026-01-31` | Download a filtered CSV (payroll data is HR-only) |
| `GET`, `POST` | `/api/operations/jobs` | List or create recruitment job openings |
| `PATCH` | `/api/operations/jobs/:id/status` | Open or close a job |
| `PATCH` | `/api/operations/candidates/:id/interview` | Schedule or clear an interview time |
| `PATCH` | `/api/operations/candidates/:id/notes` | Save recruiter notes |

Leave allowances count inclusive calendar days (including weekends); unpaid leave does not consume an allowance. Payroll CSV files contain compensation amounts and must be handled as confidential data. Employee payslips are rendered for printing in the employee's authenticated browser session.

HR creates employee records before an employee login can be provisioned. The employee portal never accepts an employee ID for personal requests; the API takes the employee ID from the authenticated account.

### Password reset email configuration

The **Forgot password?** link is available on both sign-in portals. Configure these variables in `.env` and restart the API before requesting a reset:

| Variable | Description |
| --- | --- |
| `APP_URL` | Public base URL used in reset links, e.g. `http://localhost:5173` locally or the deployed HTTPS origin |
| `DEV_PASSWORD_RESET` | Set to `true` only for local development to show a one-time reset link in the browser when SMTP is not configured. This is disabled in production and only works for requests from the local machine. |
| `SMTP_HOST` | Hostname of your SMTP email provider |
| `SMTP_PORT` | SMTP port, commonly `587` for STARTTLS or `465` for implicit TLS |
| `SMTP_SECURE` | Set to `true` for implicit TLS on port 465; otherwise `false` |
| `SMTP_USER` | SMTP account username |
| `SMTP_PASSWORD` | SMTP password or provider-issued app password |
| `MAIL_FROM` | Verified sender address, e.g. `PeopleDesk <no-reply@example.com>` |

Use credentials from an email provider that permits application SMTP sending, and keep the SMTP password in your environment file or hosting provider secrets. Reset links are single-use, expire after 30 minutes, and are stored only as SHA-256 hashes. Requests are rate-limited and use a generic response to avoid confirming whether an email belongs to an account. For local development without SMTP, set `DEV_PASSWORD_RESET=true`, restart the API, and submit the reset request from `localhost`; the browser will show a local one-time link only when the email and portal match an account. Never enable this option in a deployed environment. In production, configure SMTP instead. A successful password reset invalidates that account's existing sessions; signing out revokes the current JWT.

## Production deployment

This project can be deployed as one Node.js web service: Express serves both the built React app and `/api`. The instructions below use **MongoDB Atlas** for the database and **Render** for hosting. Equivalent Node.js hosting providers can use the same build command, start command, and environment variables. Postman is for API testing; it is not a hosting or deployment service.

### 1. Prepare the source repository

1. Push the project, including `package.json` and `package-lock.json`, to a private GitHub repository.
2. Confirm `.env` is ignored by `.gitignore`. Do not commit passwords, database URIs, JWT secrets, real employee records, or Postman tokens.
3. Use a supported Node version (20.19+ or 22.12+). The Render service can set `NODE_VERSION` to a supported version, for example `22.12.0`.

### 2. Create and secure the MongoDB database

1. Create a MongoDB Atlas project and cluster.
2. In **Database Access**, create a dedicated database user for this application. Give it only the `readWrite` role on the `peopledesk` database. This database user is separate from individual HR and employee application logins.
3. In **Network Access**, allow connections from your hosting provider. Prefer the provider's documented outbound IP addresses or static egress IPs. Only use Atlas's `0.0.0.0/0` rule if the hosting provider offers no stable egress IP, and then use a strong, unique database password and the least-privilege database role.
4. Copy the Atlas driver connection string and replace the placeholders:

   ```text
   mongodb+srv://<database-user>:<url-encoded-database-password>@<cluster-host>/peopledesk?retryWrites=true&w=major
   ity
   ```

   URL-encode special characters in the database username or password. Keep this URI private; it is a server-side secret, not a browser/Vite variable.

### 3. Deploy the web service

1. In Render, use **New > Blueprint** and select this repository to apply `render.yaml`. The Blueprint generates `JWT_SECRET` and prompts for the other service values. Set `CLIENT_ORIGIN` and `APP_URL` to the final service origin. Alternatively, create a **Web Service** manually, connect the GitHub repository, and select the production branch.
2. Configure:

   | Setting | Value |
   | --- | --- |
   | Runtime | Node |
   | Build command | `npm ci --include=dev && npm run build` |
   | Start command | `npm start` |
   | Health-check path | `/api/health` |

   The build generates the React app in `dist`. The Express server serves that build and handles the API in the same service.
3. Add these environment variables in the hosting service's environment settings:

   | Variable | Production value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `NODE_VERSION` | `22.12.0` or another supported Node version |
   | `MONGODB_URI` | The private Atlas URI from step 2 |
   | `JWT_SECRET` | A new, randomly generated secret with at least 32 characters |
   | `JWT_EXPIRES_IN` | `8h`, or your chosen session lifetime |
   | `CLIENT_ORIGIN` | The exact deployed site origin, e.g. `https://your-service.onrender.com` |
   | `APP_URL` | The exact deployed site origin, e.g. `https://your-service.onrender.com` |
   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | Your SMTP provider's connection settings |
   | `SMTP_USER`, `SMTP_PASSWORD` | Private SMTP credentials stored as host secrets |
   | `MAIL_FROM` | A sender address verified by your email provider |

   Generate a JWT secret locally with:

   ```sh
   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```

   Do not add a `VITE_` prefix to database credentials or JWT secrets; these values must remain on the server. Render provides `PORT` automatically, so do not hard-code it.
4. Deploy the service and wait for the build and startup to finish. Visit `https://your-service.onrender.com/api/health`; a successful deployment returns HTTP `200` with `{"status":"ok","database":"connected"}`. If it returns `503`, check the Render service logs, `MONGODB_URI`, and the Atlas network access rules.

### 4. Provision individual HR and employee accounts

There is no public account-registration endpoint. Provision accounts only after the deployed service can connect to MongoDB.

1. Open the deployed service's private shell/console. Add `ADMIN_NAME`, `ADMIN_EMAIL`, and a unique `ADMIN_PASSWORD` (at least 12 characters) as temporary service environment variables, then run:

   ```sh
   npm run seed:admin
   ```

   This creates the initial administrator; its password is hashed with bcrypt. Remove the temporary password variable after provisioning. The seed command intentionally stops if an account with that email already exists.
2. If you need a separate HR account, set temporary `HR_NAME`, `HR_EMAIL`, and `HR_PASSWORD` service variables and run:

   ```sh
   npm run create:hr-user
   ```

   Remove the temporary password variable afterward. HR users sign in at `https://your-service.onrender.com/login`.
3. Sign in as HR and create an employee record. For each employee who needs individual portal access, set temporary `EMPLOYEE_EMAIL` to the employee record's email and `EMPLOYEE_PASSWORD` to a unique password of at least 12 characters. In the service shell, run:

   ```sh
   npm run create:employee-user
   ```

   Repeat for each employee, changing the temporary email and password each time, then remove the temporary password variable. Give credentials to the employee through a secure channel, not a source file, public issue, or chat room. Employees sign in at `https://your-service.onrender.com/employee-login`.
4. Record the service URL and share it with users. The same URL serves the HR portal, the employee portal, and the API.

### 5. Verify the deployed application

1. Sign in using the administrator credentials and confirm the HR dashboard loads.
2. Create an employee record, then provision and test its individual employee login.
3. Confirm the employee portal shows only the signed-in employee's own records. Check that the HR account cannot sign in through the employee portal and that the employee account cannot access HR routes.
4. Import [`postman/PeopleDesk.postman_collection.json`](./postman/PeopleDesk.postman_collection.json) into Postman. Set `baseUrl` to the deployed service URL. Sign in using the HR login request (`portal: "hr"`) to test HR endpoints; use the employee login request (`portal: "employee"`) to test the employee portal endpoints.
5. Review the hosting logs and Atlas metrics for connection errors. Do not copy tokens or passwords into shared Postman workspaces.
6. Test **Forgot password?** on both portal sign-in screens and verify the reset email link uses the deployed `APP_URL`.

### Ongoing security and operations

- Keep the Atlas database password, `JWT_SECRET`, and account passwords in the hosting provider's secret environment settings, not in Git or frontend configuration.
- Serve production access over HTTPS. Restrict Atlas network access and keep the application database user limited to the `peopledesk` database.
- Use a unique password for every account. Never share HR or employee credentials.
- Back up the Atlas database and test restoring a backup before relying on it for business records.
- Rotate credentials if they are exposed. Rotating `JWT_SECRET` invalidates existing login tokens, so users must sign in again.
- When changing the application, push to the connected branch and verify the new deployment and `/api/health` response before sharing it.
