---
title: "Full Stack Developer Interview Simulation – Project Walkthrough & Security Readiness"
description: "A simulated technical interview showcasing project understanding, structure, logic flow, deployment, and error handling of a full stack attendance management system."
slug: "fullstack-interview-summary"
image: "/images/fullstack-interview-summary.png"
author: "Rei Reltroner"
published: true
date: "2025-04-03"
---

## Q1: Project Folder Structure

This screenshot represents the structure of my own full-stack employee management system project:

- **controllers/**: For business logic (e.g., attendance, users).
- **routes/**: Defines the endpoints that redirect to corresponding views or actions.
- **models/**: Contains MongoDB schema structures (user, employee, manager, QRCode).
- **public/**: For static files like images.
- **seeds/**: Scripts to insert and reset dummy data.
- **utils/**: Utilities like `wrapAsync`, global error middleware, and custom validators.
- **views/**: The EJS-based UI templates (frontend visuals).
- **app.js**: Server-side app configuration and route mounting.
- **package.json**: Contains dependencies and CLI commands like `nodemon app.js`.

## Q2: How the Attendance Flow Works

It starts from `controllers/attendance.js` where both Admin and Manager can use the `viewLog` module to view and approve employee attendance. It connects to the `models/attendance.js` to retrieve attendance schemas, then continues through `routes/attendance.js`, and finally renders in `attendance/log.ejs`. Both Admin and Manager can insert check-in/check-out times, and confirm pending attendance entries.

## Q3: QR Code Flow

The logic begins in `controllers/attendance.js` → `scanQR` function. Admin/Manager generates and prints QR codes stored in `models/QRCode.js`. Routing is handled by `routes/attendance.js` and then rendered in `attendance/scan.ejs`. Each QR has a 24-hour expiration logic, preventing reuse or outdated attempts.

## Q4: Role-Based Access Security

Access to the log page (`attendance/log`) is restricted by `isAuth.js` and `checkRole.js` middlewares. If any unauthorized users attempt to bypass, I’ll temporarily shut down the server and investigate. For stronger future protection, I plan to implement 2FA login and email verification.

## Q5: Deployment Readiness

I have previously pushed and deployed frontend projects successfully using GitHub + Vercel with a `.com` domain. While backend/full stack deployment failed earlier due to no cloud-hosted DB, I plan to allocate budget for scalable DB services like MongoDB Atlas or Supabase for smooth deployment.

## Q6 & Q7: Error Handling & Security Strategy

I implemented a global error handler (`errorHandler.js`) and `ExpressError` utility in `utils/`. In production environments, I plan to invest in security upgrades, scalable infrastructure, and proper alert systems. For extreme threats like DDoS attacks, I will shut down the server and audit everything from database, middleware logic, to access controls.

---

🛡️ This simulation represents my real project navigation, done while having the source code opened live during the interview-style practice. Every answer was formed based on my understanding and hands-on implementation.

---

🔙 Back to [Blog](https://www.reltroner.com/blog)
<div style="margin-top: 3rem; display: flex; gap: 1rem; flex-wrap: wrap;">

<a href="/files/fullstack-interview-summary.pdf" style="padding: 0.75rem 1.5rem; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 8px;" target="_blank">
📄 Download PDF Version
</a>

</div>

➡️ To [For Recruiters & Collaborators](https://www.reltroner.com/blog/for-recruiters)