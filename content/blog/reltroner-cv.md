---
title: "For Recruiters & Collaborators – Professional Profile"
description: "System Architect–oriented backend engineer focused on authentication, modular ERP, and long-term system stability."
date: "2026-01-12"
published: true
image: "/images/reltroner-cv-banner.webp"
---

# 🧑‍💻 Rei Reltroner (Raidan)

**Backend / System Architect Engineer**  
Authentication Systems · Modular ERP · Long-Term Maintainability  

Founder of **Reltroner Studio** — an independent engineering practice focused on building **production-style internal systems** with clear boundaries, strong guarantees, and disciplined scope control.

---

## 🧭 Professional Orientation

I focus on **systems that must not fail silently**.

My work emphasizes:
- centralized authentication (SSO, OIDC, trust delegation),
- modular ERP-style architectures,
- failure isolation,
- and long-term sustainability over feature velocity.

I do not optimize for demos or short-term novelty.  
I optimize for **architectural correctness, auditability, and future-proof decisions**.

---

## 🧠 Core Principles

- **Boundary Discipline**  
  Every system has explicit responsibilities. Auth is centralized once — never duplicated again.

- **Correctness Over Speed**  
  A system that is slow to build but hard to break is preferable to a fast system that leaks complexity.

- **Freeze What Must Not Change**  
  Critical layers (authentication, trust boundaries) are frozen once validated to prevent regressions.

- **Documentation Is Part of the System**  
  Decisions, trade-offs, and failure modes are written — not assumed.

---

## 🔧 Technical Focus

### Backend & Architecture
- PHP 8+, **Laravel 12**
- RESTful APIs
- Multi-repository modular architecture
- ERP-style domain modeling

### Authentication & Security
- **Keycloak** (OIDC, Authorization Code Flow)
- Centralized Identity Provider
- Short-lived JWT delegation
- Zero-trust service boundaries
- Session isolation (no shared cookies, no re-auth)

### Data & Reliability
- MySQL
- Schema design & migrations
- Audit logging
- Transaction integrity

### Testing & Delivery
- PHPUnit (feature & unit tests)
- GitHub Actions (CI)
- Production-style debugging & root cause analysis

### Documentation
- Markdown-driven architecture docs
- Phase freeze & audit reports
- Explicit “what was not done — and why”

---

## 📁 Selected Work

### **Reltroner ERP (Ongoing)**
A modular ERP platform built **entirely solo**, designed to mirror real enterprise constraints.

**Highlights:**
- Centralized SSO Gateway using Keycloak
- Finance module integrated as a passive SSO consumer
- No shared sessions, no duplicated auth logic
- Explicit trust delegation via short-lived tokens
- Public audit reports & frozen authentication phases

This project is intentionally **minimal in features** but **high in systemic complexity**, focusing on long-term maintainability rather than surface polish.

---

## 📄 Curriculum Vitae (Notion)

For a structured, up-to-date CV with detailed experience and artifacts:

👉 **Notion CV:**  
https://immense-corn-a5c.notion.site/Raidan-Rei-CV-2f786ce37ade8083a9a5d0bfee103913?pvs=143

---

## 🤝 Collaboration & Roles

I am open to:
- Backend / Platform / System Architect roles
- Authentication / IAM-focused work
- Internal tools & ERP platforms
- Remote or async-first collaboration

I work best in environments that value:
clarity, trust boundaries, written communication, and long-term thinking.

---

## ✉️ Contact

- **Email:** studio@reltroner.com  
- **Website:** https://www.reltroner.com/blog/for-recruiters  
- **GitHub:** https://github.com/Reltroner  

> _“I don’t optimize for visibility.  
I optimize for systems that remain correct long after the excitement fades.”_

---

🔙 Back to [Blog](https://www.reltroner.com/blog)
