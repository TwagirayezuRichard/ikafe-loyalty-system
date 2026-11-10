# Ikafé Loyalty System

Ikafé Loyalty System is a simple loyalty rewards app for cafés and small retail businesses. It helps customers join a membership program, earn cashback on purchases, track their loyalty level, and spend their rewards wallet. Staff can process purchases quickly, and admins manage team access and customer data.

This project includes:

- Backend API built with Node.js and Express
- Database with MongoDB using Mongoose
- Frontend built with React and Vite
- Customer loyalty logic, wallet tracking, and role-based access

---

## How the system works

### For customers

A customer can:

- join the loyalty program by entering their name and phone number
- receive a unique customer ID like IKH-000001
- get a QR code linked to their account
- see their wallet balance, visit count, and reward level
- earn cashback automatically after each purchase
- use their wallet balance to pay part of future bills

### For staff

A staff member can:

- log in to the staff dashboard
- search for a customer using their ID
- process a bill amount
- apply the customer wallet balance to the payment
- view customer visits and loyalty level
- record the cashback earned for each purchase

### For admins

An admin can:

- log in to the admin dashboard
- create staff or admin accounts
- edit or delete users
- monitor customer activity and wallet balances
- view the top wallet holders and customer overview

---

## Loyalty levels

The loyalty system is based on visits. The more a customer visits, the higher their cashback rate becomes.

| Level | Visits | Cashback Rate |
| --- | --- | --- |
| Level 1 | 1–5 | 1% |
| Level 2 | 6–15 | 2% |
| Level 3 | 16–25 | 3% |
| Level 4 | 26–35 | 4% |
| Level 5 | 36+ | 5% |

Example:

- If a customer spends 20,000 RWF and is on Level 3,
- they earn 3% cashback,
- which equals 600 RWF in rewards.

That cashback is added to their wallet and can be used on a future purchase.

---

## Main workflow

### 1. Customer joins

A customer fills in:

- full name
- phone number
- email (optional)
- date of birth (optional)

The backend creates the customer ID and QR code automatically.

### 2. Customer shops

When a staff member processes the bill:

- the system checks the customer ID
- the bill amount is recorded
- the cashback is calculated from the current loyalty level
- any wallet balance may be used to reduce the payable amount
- both the cashback and purchase are saved in the system

### 3. Rewards are tracked

The customer’s profile updates with:

- total spending
- visit count
- current level
- wallet balance
- transaction history

---

## Role-based access

The application uses login roles:

- Staff: can process purchases and view customer data
- Admin: can manage users and monitor the whole system
- Customer: can view their own loyalty dashboard

This helps keep the system organized and secure.

---

## Project structure

- backend/: Express server, routes, controllers, and database models
- frontend/: React app for the web interface
- docs/: documentation and user guides

---

## Local setup

### 1. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 2. Configure environment

Create a `.env` file in the backend folder with your MongoDB connection string and JWT secret.

Example:

```env
MONGO_URI=mongodb://localhost:27017/ikafe
JWT_SECRET=your-secret-key
```

### 3. Start the app

#### Backend

```bash
cd backend
node server.js
```

#### Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available in the browser, and the backend will run on the configured port.

---

## Install on a phone

The frontend can be installed as a progressive web app (PWA), so customers can add Ikafé Loyalty to their phone's home screen without downloading a separate app from an app store. The frontend must be served over HTTPS (or localhost during development).

- **Android:** Open the site in Chrome and tap **Install Mobile App**. If the browser does not show an install prompt, open the browser menu and select **Install app** or **Add to Home screen**.
- **iPhone/iPad:** Open the site in Safari, tap **Install Mobile App**, then tap **Share** and choose **Add to Home Screen**.

The installed app uses the same website and requires an internet connection for loyalty accounts and transactions. Publishing a native Android or iOS app to an app store would be a separate project.

---

## Deployment notes

This project can be deployed using two services:

1. Backend service
   - Root directory: backend
   - Build command: npm install
   - Start command: node server.js
   - Environment variables:
     - MONGO_URI
     - JWT_SECRET

2. Frontend service
   - Root directory: frontend
   - Build command: npm install && npm run build
   - Publish directory: dist
   - Environment variable:
     - VITE_API_BASE = https://your-backend-url/api

---

## Why this system is useful

This loyalty platform helps businesses:

- keep customers engaged
- reward repeat visits automatically
- reduce manual tracking
- give staff a faster checkout workflow
- provide admins with clear data and controls

In short, it turns everyday purchases into a structured loyalty program that benefits both the business and its customers.

---

## Quick start summary

1. A customer joins the loyalty club.
2. A staff member processes a purchase.
3. Cashback is calculated automatically.
4. The customer wallet grows with rewards.
5. The customer can track their level and wallet anytime.
6. Admins manage access and monitor the program.

For a more detailed user guide, see [docs/USER_GUIDE.md](docs/USER_GUIDE.md).
