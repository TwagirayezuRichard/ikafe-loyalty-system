# Ikafé Loyalty System User Guide

## Overview

The Ikafé Loyalty System is a digital loyalty and rewards platform for a café or retail business. It helps customers register for a membership, earn cashback on purchases, track their loyalty level, and redeem accumulated wallet credit. Staff can use the system to process bills and apply customer wallet balances, while administrators manage staff accounts and monitor the program.

The system is designed to be easy to use for three types of users:

- Customers: join the program, view balances, and track rewards
- Staff: look up members, process purchases, and apply wallet payments
- Admins: manage staff accounts and monitor customer activity

---

## How the System Works

### 1. Customer registration

A new customer creates an account by entering:

- Full name
- Phone number
- Email (optional)
- Date of birth (optional)

When the form is submitted, the backend creates a unique customer ID such as:

- IKH-000001

The system also generates a QR code tied to that customer ID. This QR can be used later to identify the customer quickly during checkout or lookups.

After registration:

- The customer becomes a member of the loyalty program
- Their profile is stored in the database
- A new wallet balance begins at 0
- Their visit count starts at 0

---

### 2. Customer dashboard

Once a customer enters their customer ID, the system loads their loyalty dashboard. The dashboard shows:

- Customer ID
- Current loyalty level
- Number of visits
- Total money spent
- Wallet balance
- Transaction history
- QR card

This helps the customer clearly see how much they have earned and how far they are from the next loyalty level.

---

### 3. Loyalty levels and cashback

The loyalty program is based on visits. Each time a customer makes a purchase, their visit count increases and their level is recalculated.

| Level | Visit Range | Cashback Rate |
| --- | --- | --- |
| Level 1 | 1–5 visits | 1% |
| Level 2 | 6–15 visits | 2% |
| Level 3 | 16–25 visits | 3% |
| Level 4 | 26–35 visits | 4% |
| Level 5 | 36+ visits | 5% |

Each purchase generates cashback based on the customer’s current level. Example:

- A customer at Level 3 spends 20,000 RWF
- Their cashback rate is 3%
- Cashback earned = 600 RWF

That cashback is added to the customer wallet balance and can be used on future purchases.

---

### 4. Wallet balance and spending

The wallet acts like a stored reward balance.

How it works:

- Every purchase earns cashback
- Cashback is added to the wallet
- Staff can choose to use wallet balance during checkout
- If wallet balance is applied, that amount reduces the amount the customer must pay cash

Example:

- Bill amount: 15,000 RWF
- Wallet balance available: 4,000 RWF
- Customer pays only 11,000 RWF
- Wallet balance reduces by 4,000 RWF

This makes loyalty rewards feel immediate and useful.

---

### 5. Purchase processing by staff

Staff log in to their dashboard and then search for a customer by ID. Once the customer is loaded, they can process a purchase.

The checkout flow is:

1. Staff enters the customer ID
2. Staff enters the bill amount
3. The system checks the customer’s wallet balance
4. The system calculates cashback based on the current level
5. The wallet may be used to cover part of the bill
6. The amount paid and wallet usage are recorded
7. A loyalty transaction is created

The system stores the purchase details, including:

- Customer ID
- Bill amount
- Amount paid by cash
- Wallet amount used
- Cashback earned
- Date and time

---

### 6. Staff dashboard

The staff dashboard provides quick customer lookup and purchase processing. It is useful for daily operations in the café or store.

Staff can:

- Search for a customer by ID
- View member information
- Process a new purchase
- View current wallet balance and visits
- Track customer lists and loyalty levels

This helps staff serve customers quickly without needing manual tracking.

---

### 7. Admin dashboard

Admins have access to more advanced tools than staff.

Admin functions include:

- Creating new staff or admin accounts
- Editing user information
- Deleting user accounts
- Viewing all customer records
- Monitoring wallet balances and total spending
- Reviewing top wallet holders

Admin access is controlled by login credentials and the backend verifies permissions before allowing user management actions.

---

## Security and access control

The system uses authentication and role-based access control:

- Staff accounts can process purchases and look up members
- Admin accounts can create and manage other users
- Customer data is retrieved through secure API routes
- Login credentials are stored in a hashed format for security

This ensures that only authorized people can access sensitive parts of the system.

---

## Typical user journey

### Customer flow

1. Customer joins the loyalty program
2. They receive a customer ID and QR code
3. They make purchases at the café
4. Cashback is added to their wallet automatically
5. Their level increases as visits increase
6. They can check their profile anytime to see rewards and spending

### Staff flow

1. Staff logs in
2. They look up a customer by ID
3. They process the bill
4. The wallet is applied if enabled
5. Cashback is calculated and saved
6. The customer’s record is updated immediately

### Admin flow

1. Admin logs in
2. They create or manage staff users
3. They monitor customer performance
4. They review program-wide loyalty data

---

## Main idea in one sentence

This system turns every café purchase into a loyalty-building experience, where customers are rewarded for repeat visits, staff can process sales faster, and admins can manage the entire rewards ecosystem efficiently.

---

## Summary

The Ikafé Loyalty System is a complete rewards management platform designed to:

- attract repeat customers
- reward loyalty automatically
- simplify checkout for staff
- track customer engagement
- provide a clear view of sales and wallet performance

It combines customer membership, transaction tracking, cashback calculation, wallet redemption, and administration in one system.
