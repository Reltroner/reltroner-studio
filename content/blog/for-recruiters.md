---
title: "For Recruiters & Collaborators"
description: "Professional overview for recruiters and collaborators seeking a backend/platform engineer focused on deterministic systems, secure authentication, and production delivery"
date: "2026-06-17"
published: true
image: "/images/for-recruiters-banner.webp"
---

# For Recruiters & Collaborators

Hello —
I'm **Rei Reltroner** (Raidan Sandra), a backend/system engineer focused on **deterministic systems, modular architecture, secure authentication, and production-grade delivery**.

I build systems that are not only functional, but also **auditable, predictable, maintainable, and safe to operate in real production environments**.

My strongest engineering direction is:

> **Backend / Platform Engineer with hands-on experience in OIDC/SSO, Keycloak, Cloudflare, Laravel, Next.js, DNS, production debugging, and system architecture validation.**

---

## Fast Professional Overview

**Role Positioning**
Backend / Platform Engineer
Backend / System Engineer
Full-Cycle Software Engineer with infrastructure ownership

**Primary Focus**

* Backend engineering with Laravel, PHP, RESTful APIs, and service isolation
* Platform and identity infrastructure involving Keycloak, OIDC, SSO, JWT, OAuth2, and Cloudflare
* Modular system architecture for ERP, LMS, and production platform systems
* Deterministic system design with single source of truth, predictable output, and controlled state
* Production debugging across frontend, backend, authentication, DNS, tunnel routing, and deployment layers
* Auditability, system integrity, failure-mode analysis, and structured engineering documentation

---

## Professional Summary

I am a backend/system engineer with hands-on experience delivering end-to-end engineering solutions in real production environments.

My work combines:

* **Architecture reasoning**
* **Implementation discipline**
* **Debugging under uncertainty**
* **Production validation**
* **Risk-controlled execution**
* **Documentation and handoff clarity**

I do not approach engineering only as “writing code.”
I approach it as building a system that must remain understandable, verifiable, secure, and maintainable after deployment.

I have worked on production-facing systems involving:

* LMS authentication
* Keycloak OIDC/SSO
* Cloudflare DNS and Tunnel routing
* Cloudflare Pages deployment
* Laravel ERP modules
* Audit-grade financial transaction design
* Security incident remediation
* Modular course engine architecture
* Multi-layer debugging across SSR, UI state, configuration, and infrastructure

---

## Core Strengths

* Turning ambiguous requirements into structured, production-ready systems
* Designing modular and scalable architectures using layered design and service boundaries
* Building deterministic systems with single source of truth and predictable behavior
* Implementing secure authentication flows with Keycloak, OIDC, JWT RS256, and OAuth2
* Handling production SSO migration involving DNS, tunnels, OIDC issuer, frontend config, and deployment
* Debugging multi-layer failures across UI, SSR, reactive state, API, environment, DNS, and infrastructure
* Building audit-safe backend systems with immutable transaction models, audit logging, and deterministic reporting
* Writing clear documentation for incident reports, failure analysis, architecture constraints, and system handoff
* Working under time pressure while keeping production risk controlled

---

## Engineering Principles

I build systems with the following principles:

* **Deterministic over implicit behavior**
* **Auditability over hidden state**
* **System boundaries over tight coupling**
* **Immutability over mutation risk**
* **Clarity over cleverness**
* **Evidence over assumption**
* **Safe deployment over fast but risky changes**

My goal is to make systems that:

* Can be reasoned about clearly
* Can be debugged without guesswork
* Can evolve without breaking core integrity
* Can be validated through evidence, not only intention
* Can survive production edge cases with predictable behavior

---

# Selected Case Studies

---

## Case Study 1 — Emergency SSO Domain Isolation for Production LMS

**Project:** Reltroner Learning Academy / Reltroner Identity
**Role:** Backend / Platform Engineer
**Stack:** Cloudflare DNS, Cloudflare Tunnel, Keycloak, OIDC Authorization Code + PKCE, Cloudflare Pages, Next.js, Rancher/Kubernetes
**Production URLs:**
[lms.reltroner.com](https://lms.reltroner.com)
[sso.reltroner.com](https://sso.reltroner.com)

### Case

Reltroner Learning Academy previously used a shared Skill-Wanderer SSO domain:

```text
https://sso.skill-wanderer.com/realms/reltroner
```

This created a business and technical risk because Reltroner authentication traffic, OIDC issuer metadata, login redirects, and identity branding were mixed with another organization’s SSO domain.

The requirement was clear:

> Reltroner must stop using the shared Skill-Wanderer SSO domain and move to its own SSO identity boundary.

Target authority:

```text
https://sso.reltroner.com/realms/reltroner
```

The challenge was that multiple systems shared the same Keycloak backend:

```text
sso.skill-wanderer.com
sso.chanhdao.vn
sso.reltroner.com
```

So the migration had to isolate Reltroner without breaking Skill-Wanderer or Chanhdao.

### Solution

I handled the migration end-to-end:

* Migrated `reltroner.com` DNS authority from Hostinger to Cloudflare
* Preserved critical DNS records for LMS, HRM, email, SPF, DKIM, DMARC, and Resend
* Investigated Cloudflare Tunnel routing and identified the correct active tunnel
* Removed an incorrect inactive tunnel binding that caused Cloudflare Error 1033
* Recreated `sso.reltroner.com` under the correct active Cloudflare Tunnel
* Routed `sso.reltroner.com` to the existing Kubernetes-hosted Keycloak service:

```text
http://keycloak.keycloak:8080
```

* Updated the Next.js LMS OIDC fallback configuration
* Updated Cloudflare Pages production environment variables
* Redeployed the LMS frontend
* Verified OIDC issuer metadata through `.well-known/openid-configuration`
* Tested login, callback, authenticated state, logout, and cross-domain isolation end-to-end

Final architecture:

```text
https://lms.reltroner.com
        |
        | OIDC Authorization Code + PKCE
        v
https://sso.reltroner.com/realms/reltroner
        |
        v
Cloudflare Tunnel: blog-skill-wanderer
        |
        v
http://keycloak.keycloak:8080
        |
        v
Keycloak Realm: reltroner
```

### Result

Final validation:

```text
issuer: https://sso.reltroner.com/realms/reltroner
skill-wanderer match: False
```

The production LMS now redirects correctly:

```text
https://lms.reltroner.com
→ https://sso.reltroner.com/realms/reltroner/protocol/openid-connect/auth
→ login success
→ callback to https://lms.reltroner.com/auth/callback
→ authenticated LMS session
→ logout success
```

Cross-system isolation was also validated:

```text
Skill-Wanderer → sso.skill-wanderer.com
Chanhdao       → sso.chanhdao.vn
Reltroner      → sso.reltroner.com
```

**Impact:**

* Completed emergency SSO migration end-to-end
* Removed Reltroner dependency on shared Skill-Wanderer SSO domain
* Preserved existing Skill-Wanderer and Chanhdao production SSO flows
* Validated authentication through real user login/logout
* Improved identity boundary, production clarity, and operational ownership
* Demonstrated production-level debugging across DNS, Cloudflare Tunnel, Keycloak, OIDC, frontend config, and deployment layers

---

## Case Study 2 — Reltroner ERP Ecosystem

**Role:** Backend Engineer
**Stack:** Laravel 12, PHP 8.2+, MySQL, Keycloak OIDC, GitHub Actions
**Period:** March 2025 – Present
**Live Demo:** [hrm.reltroner.com](https://hrm.reltroner.com)

### Case

The system required a modular ERP foundation capable of supporting HRM, finance, authentication, auditability, and future service expansion.

The core challenge was not only building CRUD modules, but designing a backend structure that could support:

* Centralized authentication
* Service separation
* Audit-safe financial operations
* Immutable transaction history
* Deterministic reporting
* Long-term maintainability

### Solution

I designed and built a modular ERP platform with:

* Multi-service architecture: Gateway, HRM, Finance
* Centralized SSO using Keycloak OIDC
* RESTful APIs for inter-service communication
* Immutable financial transaction model using append-only + reversal pattern
* Audit logging for traceability
* Fiscal locking to preserve reporting integrity
* Snapshot-based deterministic financial reporting
* Structured documentation for onboarding and maintenance
* Automated tests covering unit, feature, and regression scenarios

### Result

**System Scale:**

* 3 independent repositories
* 150+ automated tests
* 100+ database migrations
* HRM and Finance modules delivered end-to-end

**Impact:**

* Built production-ready ERP modules
* Reduced onboarding time by approximately 20% through structured documentation
* Improved auditability and reporting reliability
* Created a foundation for scalable ERP service expansion

Repositories:

* [github.com/Reltroner/reltroner-app-main](https://github.com/Reltroner/reltroner-app-main)
* [github.com/Reltroner/finance-reltroner](https://github.com/Reltroner/finance-reltroner)

Documentation:

* [github.com/Reltroner/error-documentation](https://github.com/Reltroner/error-documentation)
* [github.com/Reltroner/progress-documentation](https://github.com/Reltroner/progress-documentation)
* [github.com/reltronersk/skill-wanderer-progress-documentation](https://github.com/reltronersk/skill-wanderer-progress-documentation)

---

## Case Study 3 — Modular Course Engine System

**Project Type:** LMS / Learning Platform Architecture
**Role:** Full-Cycle Solutions Associate / System Engineer
**Stack:** Next.js, TypeScript, modular content architecture

### Case

The course system needed to evolve from static or monolithic course data into a scalable architecture that could support multiple courses, modules, lessons, and future extensibility.

The previous structure risked:

* Duplication
* Manual synchronization errors
* Stale data
* Hardcoded sitemap maintenance
* Difficult course expansion

### Solution

I helped transform the system into a modular architecture:

```text
Course
→ Module
→ Lesson
```

Key improvements:

* Built reusable core engine patterns such as `createLesson`, `createModule`, and `createCourse`
* Enforced single source of truth
* Reduced duplication through factory-driven design
* Improved deterministic behavior across course data and UI rendering
* Supported future extensibility for LMS, dynamic content, and CLI integration
* Identified architectural vs environment-level bugs during debugging

### Result

* Eliminated an entire class of manual sync and stale data risks
* Improved scalability for multi-course and multi-lesson structures
* Increased maintainability and consistency
* Reduced future bug risk through deterministic lifecycle handling

---

## Case Study 4 — Security Incident Response: RSA Key Exposure

### Case

A repository contained an exposed RSA test key, creating a potential security risk.

Even though there was no production compromise, the incident required controlled remediation to prevent future exposure and preserve repository safety.

### Solution

I handled the incident with a structured remediation process:

* Rewrote Git history using `git filter-repo`
* Removed all secret traces from the repository
* Force-pushed sanitized history safely
* Implemented preventive controls:

  * `.gitignore`
  * pre-commit hooks
  * secret hygiene workflow

### Result

* No production impact
* No key compromise
* Repository history sanitized
* Security posture significantly improved
* Demonstrated controlled incident response without regression

---

# Work Experience

---

## Full-Cycle Solutions Associate — Skill-Wanderer

**Remote**
**March 2026 – Present**

Working in a distributed engineering team across Vietnam and Europe, contributing to full-cycle product delivery.

### Key Contributions

* Re-architected hardcoded systems into scalable, data-driven architecture
* Replaced static sitemap logic with dynamic system design
* Eliminated duplication and sync drift by enforcing single source of truth
* Debugged complex issues across SSR, reactive state, UI behavior, architecture, and environment
* Delivered production-ready PRs with structured Git workflows
* Applied clean branch rebuild, selective restore, and review-safe PR design
* Provided decision-level justification instead of trial-and-error fixes
* Supported production identity migration involving Cloudflare, Keycloak, OIDC, and LMS deployment

### Impact

* Reduced bug risk by approximately 25% through deterministic lifecycle handling
* Eliminated manual sync and stale data risk classes
* Improved system consistency, SEO integrity, scalability, and maintainability
* Strengthened production readiness through architecture validation and end-to-end verification

---

## Backend Engineer — Reltroner ERP Ecosystem

**Independent Project**
**March 2025 – Present**

Designed and built a modular ERP platform with centralized authentication and audit-grade financial infrastructure.

### Key Contributions

* Architected modular ERP backend with Gateway, HRM, and Finance services
* Integrated centralized SSO using Keycloak OIDC
* Built RESTful APIs with strong consistency requirements
* Designed immutable financial transaction system
* Implemented audit logging, fiscal locking, and deterministic reporting
* Delivered HRM and Finance modules with full lifecycle ownership

### Impact

* Built production-ready ERP modules
* Reduced onboarding time by approximately 20% through structured documentation
* Improved financial auditability and deterministic reporting reliability
* Created a maintainable foundation for long-term ERP platform growth

---

# System Engineering Capabilities

---

## Backend & API Development

* Laravel 12
* PHP 8.2+
* Node.js
* RESTful APIs
* Service isolation
* Inter-service communication
* API lifecycle design

## Frontend & Full-Stack Integration

* Next.js
* Nuxt.js
* Vue.js
* Blade
* Tailwind CSS
* JavaScript
* Static export and frontend deployment
* LMS frontend integration

## Architecture & System Design

* Modular architecture
* Layered architecture
* Dependency inversion
* Deterministic system design
* Single source of truth enforcement
* Immutable system modeling
* Service boundary design
* Architecture constraint documentation

## Authentication & Security

* Keycloak
* OIDC / SSO
* OAuth2
* JWT RS256
* Authorization Code + PKCE
* Token validation
* Session control
* Trust boundary enforcement
* Secret remediation
* Git history rewriting

## Cloud, DevOps & Infrastructure

* Cloudflare DNS
* Cloudflare Tunnel
* Cloudflare Pages
* GitHub Actions CI/CD
* Docker
* Git / GitHub
* SSH
* DNS / SSL configuration
* cPanel / Hostinger
* Environment configuration hardening
* Production deployment validation

## Databases

* MySQL
* PostgreSQL
* SQLite
* Schema design
* Database migrations
* Transaction handling
* Audit logging
* Financial data integrity

## Testing & Quality

* PHPUnit
* Unit testing
* Feature testing
* Regression testing
* Failure-mode analysis
* Deterministic output validation
* Production verification checklists

## Documentation

* Incident reports
* System documentation
* Architecture Decision Records
* Architecture constraint specifications
* Failure analysis
* Audit reports
* Engineering handoff documentation

---

# What I Bring to a Team

I bring a combination of backend implementation, system thinking, and production ownership.

I am especially useful in teams that need someone who can:

* Understand the system beyond one code file
* Trace bugs across multiple layers
* Convert vague problems into structured execution plans
* Keep production risk controlled
* Validate results with evidence
* Document decisions clearly
* Build systems that remain maintainable after deployment

I am interested in teams that value:

* Engineering clarity
* Strong ownership
* Secure systems
* Maintainable architecture
* High-quality documentation
* Production reliability
* Long-term system integrity

---

# Education

**Universitas Andalas — Information Systems Coursework**
Padang, West Sumatra

---

# Certifications

* [Codepolitan — Developing HRIS System with Laravel 12 (2025)](https://www.codepolitan.com/c/T250HUZ/)

---

# Availability

I am currently open to opportunities in:

* Backend Engineer roles
* Platform Engineer roles
* System Engineer roles
* Full-Stack Engineer roles with backend/platform ownership
* DevOps / Cloud-adjacent engineering roles
* SaaS and product-focused engineering teams
* Remote-first or distributed environments

Preferred focus areas:

* Backend systems
* Authentication and identity infrastructure
* LMS / SaaS platforms
* ERP systems
* Cloudflare / Keycloak / OIDC-based systems
* Production debugging and reliability work
* Modular system architecture

---

# Contact

📧 [studio@reltroner.com](mailto:studio@reltroner.com)
🌐 [reltroner.com](https://www.reltroner.com)
💻 [github.com/Reltroner](https://github.com/Reltroner)
💻 [github.com/reltronersk](https://github.com/reltronersk)
🔗 [linkedin.com/in/rei-reltroner](https://www.linkedin.com/in/rei-reltroner-a3a7b8173/)

---

# Portfolio Links

* [Reltroner HRM Demo](https://hrm.reltroner.com)
* [Reltroner LMS](https://lms.reltroner.com)
* [Skill-Wanderer Course Portfolio](https://dojo.skill-wanderer.com/courses/restful-api-mastery-greybox)
* [Codepolitan Certification](https://www.codepolitan.com/c/T250HUZ/)
* [Reltroner GitHub](https://github.com/Reltroner?tab=repositories)
* [ReltronerSK GitHub](https://github.com/reltronersk)

---

# Full CV

You can view my full CV here:

📄 [Rei's CV](https://www.canva.com/design/DAHARcoKtu0/aoc-QBZUfLPs-A2aRKcZMA/edit)

---

# Recruiter Summary

I am a backend/platform-oriented engineer who can work across code, architecture, authentication, infrastructure configuration, debugging, documentation, and production validation.

My strongest fit is a team that needs an engineer who can handle not only implementation, but also the full reasoning chain:

```text
case
→ root cause
→ architecture boundary
→ solution
→ production validation
→ documentation
```

I am especially interested in backend, platform, SaaS, LMS, ERP, and identity/authentication-related engineering roles.
