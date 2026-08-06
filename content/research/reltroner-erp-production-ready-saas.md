---
title: "Reltroner ERP — Production-Ready Business Operations SaaS for Growing SMEs"
description: "An evidence-informed, product-first engineering archive documenting the business direction, end-to-end architecture, implementation scope, production roadmap, and reference base of Reltroner ERP."
image: "/images/reltroner-erp-production-ready-saas.webp"
author: "Rei Reltroner"
date: "2026-08-05"
published: true
category: "Engineering"
tags: ["erp", "saas", "sme", "msme", "business-operations", "procurement", "inventory", "finance", "multi-tenancy", "rbac", "keycloak", "cloudflare", "laravel", "nextjs", "production-ready", "evidence-informed", "product-engineering"]
---

# Reltroner ERP — Production-Ready Business Operations SaaS for Growing SMEs

This engineering archive documents the product direction, system boundaries, implementation scope, and locked end-to-end architecture of **Reltroner ERP**.

Reltroner ERP is being developed as a real production-oriented SaaS product for growing MSMEs, SMEs, and future mid-market organizations.

The current objective is not to produce an academic research system.

The immediate objective is to build a product that can:

- Solve real business-operation problems.
- Be deployed and operated in production.
- Be presented as a strong end-to-end engineering portfolio.
- Be offered to prospective customers as a subscription SaaS.
- Demonstrate business understanding, system design, delivery ownership, security awareness, and production engineering.

Formal academic research and journal-based evaluation are intentionally deferred until the product-owned v1 scope reaches 100%.

> **Evidence boundary:** The references in this archive support the business problem, product rationale, security controls, SaaS design principles, and infrastructure decisions. They do not prove that Reltroner ERP has already produced the same outcomes reported by other studies. Reltroner ERP outcomes must be measured from its own tests, pilots, and production usage before they are presented as product results.

---

## 🎯 Key Objectives

* Build a production-oriented ERP SaaS for growing businesses.
* Integrate procurement, inventory, warehouse, sales, finance, accounting, approval, and reporting workflows.
* Preserve strong transactional integrity across critical ERP operations.
* Establish secure multi-tenancy, tenant isolation, RBAC, platform administration, subscription entitlement, usage metering, and auditability.
* Use the infrastructure currently available without delaying product delivery for unnecessary infrastructure sophistication.
* Create a product that can be demonstrated to recruiters, HR, engineering managers, founders, and prospective customers.
* Prepare Reltroner ERP for future SaaS monetization through subscription, onboarding, migration, configuration, integration, and support services.
* Maintain a clear migration path toward stronger infrastructure when real customers, revenue, workload, or compliance requirements justify it.

---

## 📚 Evidence and Product Reference Background

Reltroner ERP is a product-first engineering project whose decisions are informed by external evidence rather than personal assumption alone.

The reference base is divided into three categories:

```text
Business and organizational evidence
-> why the product problem matters

Product and implementation evidence
-> which workflows, risks, and adoption factors deserve priority

Technical standards and official documentation
-> how controllable parts of the system should be implemented safely
```

References provide context and design justification. They do not replace customer discovery, user testing, production monitoring, or Reltroner ERP's own measurable results.

### Primary Organizational Reference

**Paper:**

```text
ERP Adoption and Strengthening of Management Accounting and Controls
at a Pakistani Manufacturing SME: A Case Study Approach
```

**Authors:**

```text
Shahid Latif, Safrul Izani Mohd Salleh, Bilal Ahmad, and Faseeha Saif
```

**Publication:**

```text
South Asian Journal of Business and Management Cases, 2025
```

**Link:**

[Journal article and DOI](https://doi.org/10.1177/22779779251349974)

The study uses a manufacturing-SME case and examines ERP adoption through interviews, observations, and organizational documents. It supports Reltroner ERP's focus on:

- Internal manual-process frustration.
- Customer pressure for traceable information.
- Coordination between financial, production, and technical interests.
- Management accounting and control.
- SOP-supported adoption.
- Team learning.
- Operational resilience.

This paper supports the **organizational and management-control rationale** of the product. It does not prescribe Reltroner ERP's exact module structure or guarantee equivalent outcomes. [R1]

### Measurable Logistics Implementation Reference

**Paper:**

```text
Implementation of an ERP System for the Improvement
of the Logistics Process in an SME
```

**Publication:**

```text
Proceedings of the Eighth International Congress
on Information and Communication Technology, 2023
```

**Link:**

[Springer chapter and DOI](https://doi.org/10.1007/978-981-99-3043-2_30)

The study evaluates an SME logistics and procurement implementation using 20 procurement operations. It reports a reduction in mean purchasing time from 163.4 to 90.55 and an increase in procurement-staff satisfaction from 1.80 to 4.55 after its own ERP implementation.

Reltroner ERP uses this work to justify measuring:

- Procurement cycle time.
- Approval waiting time.
- Purchase-order preparation time.
- Receiving and posting time.
- Manual handoffs.
- User task satisfaction.

The published numbers belong to the referenced study and must never be presented as Reltroner ERP results. [R2]

### Cloud ERP Adoption and Success Factors

**Paper:**

```text
Critical Success Factors for Implementing Cloud ERP in SMEs:
A Systematic Review
```

**Authors:**

```text
Leonardo Moro Barbieri, Michele Kremer Sott,
and Jefferson Marlon Monticelli
```

**Publication:**

```text
International Journal of Innovation and Technology Management, 2024
```

**Link:**

[DOI and publication record](https://doi.org/10.1142/S0219877024300039)

The review highlights organizational fit, data security, and senior-management commitment among the most prominent cloud-ERP success factors. This supports Reltroner ERP's product emphasis on:

- Fit with real workflows.
- Security and tenant isolation.
- Incremental onboarding.
- Clear implementation ownership.
- Training and adoption support.
- Avoiding feature-first delivery without organizational context. [R3]

### Indonesian SME Cloud-Accounting Context

**Paper:**

```text
The Adoption of Cloud Accounting in Indonesian Small and Medium
Enterprises (SMEs): Exploring Drivers, Challenges and Implications
for Performance
```

**Authors:**

```text
Wuryan Andayani, Noval Adib, Moh Erfan Arif, Indrayani,
Sri Wahyuni, Sri Luna Murdianingrum, and Rika Widiastutik
```

**Publication:**

```text
Cogent Business & Management, Volume 13, Issue 1, 2026
```

**Links:**

- [DOI](https://doi.org/10.1080/23311975.2025.2603023)
- [Universitas Brawijaya publication record](https://scholar.ub.ac.id/en/publications/the-adoption-of-cloud-accounting-in-indonesian-small-and-medium-e/)

The study reports that Indonesian SMEs adopt cloud accounting for efficiency, transparency, real-time reporting, and operational flexibility, while facing barriers including digital literacy, limited resources, training cost, security concerns, and weak ecosystem support.

This directly supports the product requirement for:

- Low-friction onboarding.
- Guided setup.
- Practical training.
- Transparent pricing.
- Secure defaults.
- Migration assistance.
- Real-time operational and financial visibility. [R4]

### Cloud Accounting and Organizational Performance

**Paper:**

```text
Accounting Information Systems and Organizational Performance
in the Cloud Computing Era: Evidence from SMEs
```

**Publication:**

```text
Sustainability Accounting, Management and Policy Journal
```

**Link:**

[DOI](https://doi.org/10.1108/SAMPJ-01-2024-0044)

Based on responses from SME chief accountants, the study associates cloud-based accounting-information-system usage with AIS effectiveness and organizational performance. It supports the decision to integrate operational events with accounting and management information instead of treating finance as an isolated bookkeeping screen. [R5]

### Cloud ERP Business-Value Realization

**Paper:**

```text
Creating Business Value from Cloud-Based ERP Systems
in Small and Medium-Sized Enterprises
```

**Publication:**

```text
Lecture Notes in Computer Science, 2019
```

**Links:**

- [Springer DOI](https://doi.org/10.1007/978-3-030-29374-1_56)
- [Open-access HAL record](https://hal.science/hal-02510110/)

The study reports that SMEs can realize value through process automation, access to critical business data, and system improvements, but that organizational change and employee adoption remain necessary. This supports Reltroner ERP's decision to include onboarding, workflow guidance, and measurable business outcomes in the product scope. [R6]

### Future Operational-Intelligence Reference

**Paper:**

```text
ERP System Based on Process Mining for Improving Logistic
Management Efficiency in Small and Medium-Sized Enterprises
in the Industrial Sector
```

**Publication:**

```text
Communications in Computer and Information Science, 2024
```

**Link:**

[Springer DOI](https://doi.org/10.1007/978-3-031-64359-0_29)

The study addresses information loss, redundant activity, waiting time, and delivery failure by analyzing ERP event records through process mining. It supports Process Mining as a future Reltroner ERP intelligence layer after sufficient operational event data exists. It is not a justification to build heavy analytics before the transactional core is reliable. [R7]

### Wider SME Digitalization Context

The OECD reports that SMEs can gain from digital technologies but often lag in digital transformation and face adoption barriers. Indonesian evidence from ADB likewise shows that digitalization alone does not guarantee business success and must be combined with capability building and appropriate support.

**Links:**

- [OECD — The Digital Transformation of SMEs](https://www.oecd.org/en/publications/the-digital-transformation-of-smes_bdb9256a-en/full-report.html)
- [ADB — Informal MSMEs and Digitalization: Evidence from Indonesia](https://www.adb.org/publications/informal-micro-small-and-medium-sized-enterprises-and-digitalization-evidence-from-surveys-in-indonesia)

These sources support a product strategy centered on operational usefulness, training, trust, and business capability rather than software adoption as an end in itself. [R8] [R9]

### Current Product Rule

```text
Scientific publications and institutional reports
-> support the problem framing and product rationale

Official technical standards and vendor documentation
-> support implementation decisions

Reltroner ERP engineering
-> production delivery first

Reltroner ERP tests, pilots, and production metrics
-> the only valid source for Reltroner ERP result claims

Formal academic evaluation
-> a separate future layer after v1 completion
```

---

## 🧩 Business Problem

Growing businesses often operate through fragmented systems and informal workflows.

Common conditions include:

1. Purchase needs are communicated through chat or verbal instructions.
2. Purchase approval is unclear or difficult to trace.
3. Supplier information is separated from purchasing records.
4. Purchase orders, goods receipts, inventory updates, and supplier invoices are not synchronized.
5. Stock balances are manually corrected without a reliable movement history.
6. Accounts payable and payment status are discovered too late.
7. Sales, inventory, and finance maintain different versions of the same business reality.
8. Owners lack timely visibility into operational performance.
9. Employees rely on spreadsheets, messaging applications, and physical documents.
10. Growth increases process friction, operational errors, and financial uncertainty.

The core problem is not merely:

```text
The business does not have ERP software.
```

The deeper problem is:

```text
The organization lacks one controlled and traceable operating system
that connects business decisions, physical operations,
financial consequences, user authority, and management visibility.
```

This problem framing is supported by the organizational-control, logistics, cloud-ERP, and SME digitalization references above. It remains a generalized product hypothesis until validated with Reltroner ERP customer discovery and pilot evidence. [R1] [R2] [R3] [R4] [R6] [R8]

---

## 🧠 Business Case Interpretation

Reltroner ERP is not positioned as a collection of isolated CRUD modules.

Its business value comes from connecting end-to-end workflows.

The product must help answer questions such as:

```text
Who requested this purchase?
Who approved it?
Which supplier received the order?
What quantity was actually received?
When did inventory officially increase?
How much liability was created?
Has the supplier been paid?
Which journal entry represents the transaction?
Can management trace the complete process?
```

The system therefore combines:

```text
business request
-> approval
-> commercial document
-> physical operation
-> inventory movement
-> financial obligation
-> settlement
-> accounting record
-> management visibility
```

---

## 🧱 Existing Project Reuse Mapping

The current Reltroner ERP repositories already provide the foundation for the final product.

| Existing Repository or Component | Role in Reltroner ERP |
| --- | --- |
| `erp-reltroner-fe` | Tenant-facing ERP application |
| `erp-reltroner-admin` | Platform administration and SaaS control plane |
| `erp-reltroner-be` | Central Laravel modular-monolith backend |
| Keycloak OIDC clients | External authentication integration |
| `EnsureKeycloakBearerToken` | Backend access-token validation |
| `ResolveTenantContext` | Active tenant resolution |
| `EnsurePermission` | Application permission enforcement |
| `EnsureAdminZoneAccess` | Platform administration boundary |
| `IdempotencyMiddleware` | Protection for sensitive write operations |
| `AuditContextMiddleware` | Auditable request context |
| `Tenant` and `TenantMembership` | Multi-tenant organization foundation |
| `Permission` and `RolePermission` | Application RBAC foundation |
| `UserPermissionOverride` | Per-user permission customization |
| `Plan` and `PlanLimit` | Subscription plan foundation |
| `FeatureEntitlement` | Feature-access control |
| `UsageCounter` and `UsageEvent` | SaaS usage metering |
| Cloudflare Workers deployment | Frontend edge runtime |
| Hostinger shared hosting | Initial backend and database infrastructure |
| MariaDB/MySQL | Initial transactional database |

---

## 🧭 Final Product Direction

### Rejected Direction

```text
Academic ERP prototype
or
Microservices demonstration project
```

### Locked Direction

```text
Reltroner ERP
=
Production-Ready Business Operations SaaS for Growing SMEs
```

The product is designed to become:

- A real operational ERP platform.
- A monetizable SaaS.
- A strong recruiter-facing engineering portfolio.
- A proof of full-cycle product ownership.
- A foundation for future customer pilots.
- A future object of academic study after product completion.

---

## ❗ Updated Product Problem Statement

Growing MSMEs and SMEs frequently struggle to maintain operational control as transaction volume, employee count, supplier relationships, inventory complexity, and financial obligations increase.

Fragmented tools create:

- Slow procurement.
- Duplicate data entry.
- Approval ambiguity.
- Inventory discrepancies.
- Unmatched supplier invoices.
- Late accounts-payable visibility.
- Weak auditability.
- Inconsistent reporting.
- Low confidence in management information.
- Higher dependence on individual employees and informal knowledge.

These problems reduce operational clarity and make business growth harder to sustain.

---

## ✅ Updated Product Solution Statement

**Reltroner ERP** is a multi-tenant business operations SaaS that connects:

- Company and tenant administration.
- Employee and user management.
- Roles, permissions, and approval authority.
- Supplier and product master data.
- Procurement.
- Goods receiving.
- Inventory posting.
- Inventory ledger.
- Warehouse operations.
- Sales.
- Accounts payable and receivable.
- Payments.
- Accounting journals.
- Reports.
- Subscription entitlements.
- Usage metering.
- Platform administration.
- Audit and operational controls.

The product is designed to convert fragmented business operations into an integrated, controlled, traceable, and measurable workflow.

---

## 🎯 Product Result Goal

The first complete production workflow must demonstrate:

```text
purchase need
-> purchase requisition
-> approval
-> purchase order
-> supplier coordination
-> goods receipt
-> inventory GRN
-> inventory ledger
-> account payable
-> payment
-> journal entry
-> management report
```

The result is not simply a working interface.

The result is:

```text
an end-to-end business transaction
with verified authority,
transactional integrity,
tenant isolation,
financial traceability,
and management visibility
```

---

## 🧬 Product-to-System Mapping

| Business Need | Reltroner ERP Capability |
| --- | --- |
| Separate customer organizations | Multi-tenancy |
| Secure login | External Keycloak OIDC |
| Tenant access control | Tenant membership and tenant context |
| Employee authority | RBAC and permission overrides |
| Approval limits | Approval authority |
| Supplier coordination | Supplier and procurement modules |
| Controlled purchasing | PR and PO workflow |
| Physical receiving | Goods Receipt |
| Official stock posting | Inventory GRN |
| Historical stock truth | Inventory Ledger |
| Supplier obligation | Account Payable |
| Settlement tracking | Payment module |
| Financial truth | Posted Journal Entries |
| Management visibility | Reports and dashboard |
| SaaS packaging | Plans and subscriptions |
| Feature restrictions | Feature entitlements |
| Quota enforcement | Usage counters and events |
| Platform operation | Admin Console |
| Accountability | Audit logs |
| Safe repeated requests | Idempotency controls |

---

## 📐 Technical Decision Evidence

The locked architecture is a project decision constrained by current ownership, budget, runtime availability, and the need to preserve transactional consistency.

It is not a claim that one architecture is universally superior.

The technical baseline is supported by:

- The AWS SaaS Lens and AWS multi-tenant guidance for tenant-aware identity, isolation, cost, and operational trade-offs. [T1] [T2]
- OWASP multi-tenant guidance for tenant-context validation, data-layer authorization, file isolation, logging, and prevention of cross-tenant access. [T3]
- OAuth 2.0 Security Best Current Practice and PKCE standards for browser-based authorization flows. [T4] [T5]
- Official Keycloak documentation for OIDC client security, exact redirect URIs, and PKCE behavior. [T6]
- Official Cloudflare documentation for deploying Next.js through OpenNext on Workers. [T7]
- Official Hostinger documentation confirming MariaDB/MySQL availability on Web Hosting and that PostgreSQL and Redis require VPS-level infrastructure. [T8]
- Official Laravel documentation for relational transactions and database-backed queues. [T9] [T10]

---

## 🏗️ Locked End-to-End Architecture

```text
User Browser
     |
     +---------------- OIDC ----------------+
     |                                      |
     v                                      v
Reltroner ERP FE                    External Keycloak
Tenant Application                 Authentication Provider
Cloudflare Worker
     |
     | Same-Origin API Proxy
     v
Laravel Modular Monolith
Hostinger Shared Hosting
     |
     v
Hostinger MariaDB/MySQL
```

Platform administration uses a separate frontend:

```text
Reltroner ERP Admin
Cloudflare Worker
     |
     v
Laravel Admin API
     |
     v
Shared Platform and Tenant Database
```

---

## 🗺️ Architecture Diagram

```text
                                  [Internet]
                                      |
                                      v
                           [Cloudflare DNS & Edge]
                                      |
                  +-------------------+-------------------+
                  |                                       |
                  v                                       v
      [erp.reltroner.com]                    [admin.erp.reltroner.com]
      Tenant ERP Frontend                    Platform Admin Frontend
      Next.js + OpenNext                     Next.js + OpenNext
      Cloudflare Worker                      Cloudflare Worker
                  |                                       |
                  +-------------------+-------------------+
                                      |
                                      v
                           [api.reltroner.com]
                       Laravel Modular Monolith
                         Hostinger Shared Hosting
                                      |
                                      v
                         [MariaDB / MySQL Database]
                                      |
            +-------------------------+--------------------------+
            |                         |                          |
            v                         v                          v
    [Tenant Business Data]   [Platform Control Data]    [Audit & Usage Data]

External identity flow:

[Tenant FE / Admin FE]
          |
          v
[Externally Managed Keycloak]
          |
          v
[OIDC Access Token]
          |
          v
[Laravel Token Validation]
```

---

# Core Product Modules

---

## 1. Identity Integration

**Purpose:**

```text
Authenticate users through the externally managed Keycloak deployment.
```

Keycloak handles:

- Login.
- Logout.
- Identity session.
- Password.
- Access-token issuance.
- Refresh-token issuance where used.
- Coarse platform identity roles.

Reltroner ERP handles:

- Internal user mapping.
- Platform administrator mapping.
- Tenant membership.
- Application RBAC.
- Approval authority.
- Feature entitlement.
- Usage limits.
- Audit context.

### External Infrastructure Boundary

The following are explicitly excluded from the Reltroner ERP v1 completion target:

```text
Keycloak theme customization
Keycloak Server Super Admin configuration
Keycloak server ownership
Keycloak server backup and patching
```

The project does not own or control those areas.

The application-controlled OIDC flow follows PKCE and current OAuth security guidance within the capabilities exposed by the external identity provider. [T4] [T5] [T6]

---

## 2. Tenant Application

**Repository:**

```text
erp-reltroner-fe
```

**Purpose:**

```text
Provide the operational workspace used by tenant employees and administrators.
```

Core areas:

- Dashboard.
- Inventory.
- Procurement.
- Sales.
- Finance.
- Reports.
- Company settings.
- Operator profile.
- Workspace context.
- Tenant-aware navigation.

---

## 3. Platform Administration Console

**Repository:**

```text
erp-reltroner-admin
```

**Purpose:**

```text
Operate the Reltroner ERP SaaS platform.
```

Core areas:

- Platform dashboard.
- Tenants.
- Platform users.
- Usage.
- Audit logs.
- Feature flags.
- System health.
- Subscription operations.
- Support-access governance.

Tenant users cannot access the platform administration console.

---

## 4. Laravel Modular-Monolith Backend

**Repository:**

```text
erp-reltroner-be
```

**Purpose:**

```text
Serve as the central business, authorization, and transactional source of truth.
```

Target module boundaries:

```text
IdentityAccess
PlatformAdministration
Tenancy
Organization
HumanResources
Suppliers
Products
Procurement
Inventory
Warehouse
Sales
Finance
Accounting
Subscription
UsageMetering
Notifications
Reporting
Audit
```

Critical modules remain in one backend deployment to preserve transactional integrity.

---

## 5. Multi-Tenancy Layer

**Purpose:**

```text
Safely isolate each customer organization inside a shared SaaS platform.
```

Model:

```text
shared application
+ shared database
+ tenant-scoped rows
```

Rules:

- Every tenant-owned table includes `tenant_id`.
- Every tenant query is tenant-scoped.
- Tenant identifiers from the frontend are never trusted without membership validation.
- Tenant-aware uniqueness includes `tenant_id`.
- Workspace switching is always revalidated by the backend.

These controls align with OWASP guidance to validate tenant context, verify resource ownership, use tenant-aware lookup keys, and enforce authorization at the data-access layer. [T3]

---

## 6. RBAC and Approval Authority

**Purpose:**

```text
Ensure that each user can only perform actions allowed by their role,
permission, tenant membership, and approval authority.
```

Examples:

```text
procurement.requisition.create
procurement.requisition.approve
procurement.purchase_order.create
inventory.grn.post
finance.payment.approve
accounting.journal.post
platform.tenants.manage
platform.audit.view
```

Frontend permission checks improve usability.

Backend permission checks provide actual security.

---

## 7. Procurement

**Purpose:**

```text
Control purchasing from business need to approved supplier order.
```

Core workflow:

```text
Purchase Requisition
-> Approval
-> Purchase Order
-> Supplier Coordination
```

Important controls:

- Requester identity.
- Approval status.
- Approval limit.
- Supplier selection.
- Ordered quantity.
- Ordered price.
- Expected delivery date.
- Document history.

---

## 8. Goods Receipt and Inventory GRN

**Purpose:**

```text
Separate physical receiving from official inventory and financial posting.
```

Rules:

```text
Purchase Order
does not increase inventory.

Goods Receipt
records physical receipt.

Inventory GRN
officially posts stock and financial consequences.
```

This prevents inventory from increasing before goods have been received and verified.

---

## 9. Inventory Ledger

**Purpose:**

```text
Provide the historical source of truth for inventory movement.
```

The ledger is append-only or reversal-based after posting.

Examples:

```text
+100 from Inventory GRN
-15 from Sales
-2 from Damage
+1 from Sales Return
```

Current stock may be stored as a projection, but movement history remains authoritative.

---

## 10. Finance and Accounting

**Purpose:**

```text
Translate business operations into controlled financial records.
```

Core areas:

- Accounts payable.
- Accounts receivable.
- Payments.
- Bank and cash records.
- Operational expenses.
- Chart of accounts.
- Journal entries.
- Financial reporting.

Posted journal entries are immutable.

Corrections require reversal or adjustment.

---

## 11. Subscription and Entitlement

**Purpose:**

```text
Enable SaaS packaging, feature access, quota enforcement, and monetization.
```

Core entities:

- Plans.
- Plan limits.
- Tenant subscriptions.
- Feature entitlements.
- Usage counters.
- Usage events.

Rule:

```text
Frontend gate
= UX

Backend entitlement and quota validation
= source of truth
```

---

## 12. Audit and Operational Control

**Purpose:**

```text
Provide accountability for security-sensitive and business-critical actions.
```

Audit records may include:

- Actor.
- Tenant.
- Platform-admin context.
- Action.
- Entity.
- Entity ID.
- Request ID.
- Timestamp.
- Relevant changes.
- Support-access reason.

Tokens, passwords, and secrets must never be stored in audit logs.

---

## 13. Platform Support Access

**Purpose:**

```text
Allow authorized Reltroner platform administrators
to support a tenant without silently accessing customer data.
```

Target workflow:

```text
admin chooses tenant
-> enters support reason
-> receives time-limited access
-> read-only by default
-> every action is audited
-> access expires automatically
```

---

## 14. Infrastructure Layer

**Current infrastructure:**

```text
Cloudflare Workers Free
Cloudflare DNS
Hostinger Shared Hosting
Hostinger MariaDB/MySQL
Externally Managed Keycloak
```

Current constraints are accepted.

Reltroner ERP v1 does not require:

- Kubernetes.
- Production microservices.
- Self-hosted Redis.
- RabbitMQ.
- Kafka.
- Permanent queue daemons.
- Self-hosted Keycloak.
- PostgreSQL on the current shared-hosting plan.
- Full enterprise observability infrastructure.

---

## 15. Queue and Scheduler

**Purpose:**

```text
Process lightweight asynchronous work within shared-hosting limitations.
```

Current strategy:

```text
Database queue
+ short-lived cron execution
+ Laravel Scheduler
```

Laravel officially supports relational databases as queue backends. The short-lived execution pattern is a project adaptation to shared-hosting process constraints, not a universal Laravel requirement. [T10]

Suitable tasks:

- Email attempts.
- Notification generation.
- Subscription reminders.
- Usage aggregation.
- Expiration checks.
- Lightweight report generation.

Heavy long-running workloads are deferred until infrastructure migration.

---

## 16. Production Security

**Purpose:**

```text
Protect tenant data, financial operations, platform administration,
and product availability.
```

Required baseline:

- Valid JWT signature.
- Valid issuer.
- Valid audience.
- Token expiration checks.
- Tenant isolation.
- Backend permission enforcement.
- Platform-admin validation.
- Rate limiting.
- Input validation.
- Secure file validation.
- Idempotency.
- Security headers.
- Production-safe errors.
- `APP_DEBUG=false`.
- Secret isolation.
- Database backup.
- Recovery documentation.

---

## 17. Product Operations

**Purpose:**

```text
Operate the product safely using the available zero-budget infrastructure.
```

Current operational signals:

- Cloudflare Worker metrics.
- Cloudflare Worker logs.
- Laravel logs.
- Application audit logs.
- Request identifiers.
- System-health endpoints.
- Hostinger resource usage.
- Database backup status.
- Queue failure tracking.

---

## 🧪 Final Engineering Snapshot Target

The final Reltroner ERP v1 engineering snapshot must prove:

1. A user can authenticate through Keycloak.
2. The backend validates the access token.
3. The authenticated identity maps to an internal user.
4. Tenant context is resolved securely.
5. Tenant users cannot access the admin control plane.
6. Platform administrators are validated separately.
7. Application permissions are backend-enforced.
8. Tenant data remains isolated.
9. Subscription entitlements are enforced.
10. Usage limits are enforced.
11. Procurement can proceed from request to purchase order.
12. Goods can be physically received.
13. Inventory can be officially posted through GRN.
14. Inventory movement is traceable through the ledger.
15. Supplier liability can be created.
16. Payment can be recorded.
17. Journal entries can be posted.
18. Management reports can be generated.
19. Critical actions are audited.
20. Production deployment, backup, and recovery procedures are documented.

---

## 📁 Repository Direction

```text
erp-reltroner-fe/
  tenant-facing Next.js application

erp-reltroner-admin/
  platform administration Next.js application

erp-reltroner-be/
  Laravel modular-monolith backend
```

Future optional repository:

```text
erp-reltroner-infrastructure/
```

This repository should only be created when dedicated infrastructure configuration becomes substantial enough to justify separate ownership.

---

## 🛣️ Product Roadmap

### Phase 1 — Architecture and Product Boundary

```text
Lock architecture
Define product scope
Define repository responsibility
Define external infrastructure boundary
```

### Phase 2 — Production Infrastructure Foundation

```text
Deploy Laravel backend
Configure MariaDB/MySQL
Configure API domain
Configure health endpoints
Configure production environment
```

### Phase 3 — Authentication and Tenant Context

```text
Complete OIDC handshake
Validate token issuer and audience
Map user identity
Resolve tenant
Remove Unknown Workspace state
Implement workspace selection
```

### Phase 4 — Platform Administration

```text
Deploy Admin Console
Protect admin routes
Manage tenants
Manage platform users
Monitor usage
Review audit logs
Monitor system health
```

### Phase 5 — Organization and Access Control

```text
Company profile
Employees
Tenant users
Roles
Permissions
Permission overrides
Approval authority
```

### Phase 6 — Procurement Foundation

```text
Suppliers
Products
Purchase Requisition
Approval
Purchase Order
```

### Phase 7 — Receiving and Inventory

```text
Goods Receipt
Inventory GRN
Inventory Ledger
Inventory Balance
Stock Reports
```

### Phase 8 — Finance and Accounting

```text
Account Payable
Payments
Bank and Cash
Chart of Accounts
Journal Entries
Financial Reports
```

### Phase 9 — SaaS Monetization

```text
Plans
Subscriptions
Feature entitlements
Usage limits
Trial
Upgrade flow
Pricing
Onboarding
```

### Phase 10 — Production Hardening

```text
Automated tests
Tenant isolation tests
Security review
Idempotency
Rate limiting
Backup
Recovery test
Deployment procedure
Operational documentation
```

### Phase 11 — Customer-Ready Launch

```text
Landing page
Product demo
Pricing
Trial registration
Guided onboarding
Sample workspace
Help documentation
Support channel
Commercial readiness
```

### Phase 12 — Future Intelligence

Only after reliable operational data exists:

```text
Process bottleneck detection
Supplier performance analytics
Demand forecasting
Inventory replenishment recommendations
Cash-flow projection
AI business assistant
```

### Phase 13 — Future Academic Layer

Only after the product-owned v1 scope reaches 100%:

```text
Formal research design
Academic evaluation
Before-and-after analysis
Research publication
```

---

## 🔎 Evidence, Claim, and Validation Policy

Reltroner ERP uses four distinct evidence classes.

### 1. External Business Evidence

Used to support:

- The existence of SME operational and adoption problems.
- The relevance of procurement integration.
- The importance of management accounting and control.
- The need for onboarding, training, security, and organizational fit.
- The possible value of cloud ERP and accounting information systems.

External studies do not prove Reltroner ERP's own product performance.

### 2. Official Technical Evidence

Used to support:

- OIDC and PKCE security.
- Multi-tenant isolation controls.
- Cloudflare deployment compatibility.
- Hostinger infrastructure constraints.
- Laravel transaction and queue capabilities.
- SaaS identity and tenant-context principles.

Official documentation supports implementation feasibility and security rationale, but it does not replace testing in the actual Reltroner environment.

### 3. Project-Owned Facts

Examples:

- Existing repository structure.
- Existing middleware and models.
- Current Cloudflare deployment.
- Current Hostinger plan.
- Keycloak client settings available to the project.
- Features that have actually been implemented and tested.

These claims must be traceable to source code, configuration, deployment output, or test evidence.

### 4. Reltroner ERP Result Claims

Claims such as:

```text
reduced procurement time
improved inventory accuracy
increased user satisfaction
lowered operational cost
improved customer retention
```

may only be published as Reltroner ERP results after they are measured through:

- Automated tests.
- Controlled workflow comparisons.
- Usability tests.
- Pilot deployments.
- Production telemetry.
- Customer-approved case studies.

Until then, they must be labeled as:

```text
target outcome
expected benefit
external-study result
or
unvalidated product hypothesis
```

---

## 🧾 Evidence-to-Decision Matrix

| Product Decision | Supporting Evidence | Current Status |
| --- | --- | --- |
| Focus on integrated management control | ERP adoption and management-control case [R1] | Product rationale |
| Begin with procurement-to-finance workflow | Logistics ERP implementation [R2] | Locked v1 workflow |
| Prioritize organizational fit and security | Cloud ERP systematic review [R3] | Product and security requirement |
| Provide guided onboarding and training | Indonesian cloud-accounting study [R4] | Product requirement |
| Integrate operations with accounting information | Cloud AIS performance study [R5] | Product architecture requirement |
| Include adoption and benefits realization | Cloud ERP business-value study [R6] | Customer-success requirement |
| Defer Process Mining until event data exists | Process Mining ERP study [R7] | Future roadmap |
| Treat software as capability support, not automatic success | OECD and ADB evidence [R8] [R9] | Product strategy |
| Use tenant-aware identity and isolation | AWS SaaS guidance and OWASP [T1] [T2] [T3] | Architecture requirement |
| Use Authorization Code Flow with PKCE | IETF and Keycloak documentation [T4] [T5] [T6] | Identity requirement |
| Deploy Next.js through OpenNext on Workers | Cloudflare documentation [T7] | Current deployment |
| Use MariaDB/MySQL on existing Web Hosting | Hostinger documentation [T8] | Current infrastructure |
| Use transactional backend workflows | Laravel transaction documentation [T9] | Engineering requirement |
| Use database-backed lightweight queues | Laravel queue documentation [T10] | Current infrastructure adaptation |

---

## 🧭 Strategic Decision

Reltroner ERP will not delay product delivery to pursue infrastructure sophistication without business evidence.

Final strategic framing:

```text
Reltroner ERP is a production-first ERP SaaS.

The modular-monolith backend protects transactional integrity.

The separate tenant and admin frontends protect product boundaries.

The external Keycloak integration provides authentication.

Laravel remains the source of truth for authorization,
tenancy, entitlements, business rules, and auditability.

Infrastructure will evolve only when customers,
revenue, workload, security, or compliance justify it.
```

---

## ✅ Definition of Done

Reltroner ERP v1 is complete when:

1. Tenant frontend is production-ready.
2. Platform Admin Console is production-ready.
3. Laravel backend is production-ready.
4. MariaDB/MySQL persistence is production-ready.
5. OIDC integration works within the project's controllable boundary.
6. Tenant isolation is verified.
7. Application RBAC is verified.
8. Platform-admin authorization is verified.
9. The first procurement-to-finance workflow is complete.
10. Subscription and entitlement controls are complete.
11. Usage metering and quota enforcement are complete.
12. Critical actions are audited.
13. Production errors are safe.
14. Backup and recovery procedures are documented and tested.
15. Customer onboarding and product documentation exist.
16. Pricing and commercial packaging exist.
17. The product can be demonstrated to recruiters and prospective customers.
18. Keycloak theme customization is not required.
19. Keycloak Server Super Admin configuration is not required.
20. Formal academic research is not required for v1 completion.

---

## 🔗 References and Supporting Sources

### Business, ERP, and SME Evidence

1. **Latif, S., Mohd Salleh, S. I., Ahmad, B., & Saif, F.**  
   *ERP Adoption and Strengthening of Management Accounting and Controls at a Pakistani Manufacturing SME: A Case Study Approach.*  
   [https://doi.org/10.1177/22779779251349974](https://doi.org/10.1177/22779779251349974)

2. **Reyes-Abanto et al.**  
   *Implementation of an ERP System for the Improvement of the Logistics Process in an SME.*  
   [https://doi.org/10.1007/978-981-99-3043-2_30](https://doi.org/10.1007/978-981-99-3043-2_30)

3. **Barbieri, L. M., Sott, M. K., & Monticelli, J. M.**  
   *Critical Success Factors for Implementing Cloud ERP in SMEs: A Systematic Review.*  
   [https://doi.org/10.1142/S0219877024300039](https://doi.org/10.1142/S0219877024300039)

4. **Andayani, W., Adib, N., Arif, M. E., Indrayani, Wahyuni, S., Murdianingrum, S. L., & Widiastutik, R.**  
   *The Adoption of Cloud Accounting in Indonesian Small and Medium Enterprises (SMEs): Exploring Drivers, Challenges and Implications for Performance.*  
   [https://doi.org/10.1080/23311975.2025.2603023](https://doi.org/10.1080/23311975.2025.2603023)

5. **Vo Van, H., Abu Afifa, M., & Saleh, I.**  
   *Accounting Information Systems and Organizational Performance in the Cloud Computing Era: Evidence from SMEs.*  
   [https://doi.org/10.1108/SAMPJ-01-2024-0044](https://doi.org/10.1108/SAMPJ-01-2024-0044)

6. **Hustad, E., Olsen, D. H., Jørgensen, E. H., & Sørheller, V. U.**  
   *Creating Business Value from Cloud-Based ERP Systems in Small and Medium-Sized Enterprises.*  
   [https://doi.org/10.1007/978-3-030-29374-1_56](https://doi.org/10.1007/978-3-030-29374-1_56)

7. **Rojas, K. J., Dávila, E. M., & Castañeda, P.**  
   *ERP System Based on Process Mining for Improving Logistic Management Efficiency in Small and Medium-Sized Enterprises in the Industrial Sector.*  
   [https://doi.org/10.1007/978-3-031-64359-0_29](https://doi.org/10.1007/978-3-031-64359-0_29)

8. **OECD.**  
   *The Digital Transformation of SMEs.*  
   [https://www.oecd.org/en/publications/the-digital-transformation-of-smes_bdb9256a-en/full-report.html](https://www.oecd.org/en/publications/the-digital-transformation-of-smes_bdb9256a-en/full-report.html)

9. **Asian Development Bank Institute.**  
   *Informal Micro, Small, and Medium-Sized Enterprises and Digitalization: Evidence from Surveys in Indonesia.*  
   [https://www.adb.org/publications/informal-micro-small-and-medium-sized-enterprises-and-digitalization-evidence-from-surveys-in-indonesia](https://www.adb.org/publications/informal-micro-small-and-medium-sized-enterprises-and-digitalization-evidence-from-surveys-in-indonesia)

### SaaS Architecture and Multi-Tenant Security

10. **AWS Well-Architected Framework — SaaS Lens.**  
    [https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html](https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html)

11. **AWS Guidance for Multi-Tenant Architectures.**  
    [https://docs.aws.amazon.com/solutions/latest/multi-tenant-architectures-on-aws/welcome.html](https://docs.aws.amazon.com/solutions/latest/multi-tenant-architectures-on-aws/welcome.html)

12. **OWASP Multi-Tenant Application Security Cheat Sheet.**  
    [https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html)

13. **OWASP Authorization Cheat Sheet.**  
    [https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

14. **OWASP Business Logic Security Cheat Sheet.**  
    [https://cheatsheetseries.owasp.org/cheatsheets/Business_Logic_Security_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Business_Logic_Security_Cheat_Sheet.html)

### Identity and OAuth Standards

15. **IETF RFC 9700 — Best Current Practice for OAuth 2.0 Security.**  
    [https://www.rfc-editor.org/rfc/rfc9700.html](https://www.rfc-editor.org/rfc/rfc9700.html)

16. **IETF RFC 7636 — Proof Key for Code Exchange by OAuth Public Clients.**  
    [https://www.rfc-editor.org/rfc/rfc7636.html](https://www.rfc-editor.org/rfc/rfc7636.html)

17. **Keycloak — Securing Applications and Services.**  
    [https://www.keycloak.org/securing-apps/overview](https://www.keycloak.org/securing-apps/overview)

18. **Keycloak JavaScript Adapter Documentation.**  
    [https://www.keycloak.org/securing-apps/javascript-adapter](https://www.keycloak.org/securing-apps/javascript-adapter)

19. **Keycloak Server Administration Guide.**  
    [https://www.keycloak.org/docs/latest/server_admin/](https://www.keycloak.org/docs/latest/server_admin/)

### Runtime and Infrastructure Documentation

20. **Cloudflare Workers — Next.js with OpenNext.**  
    [https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)

21. **Hostinger — Supported Databases and Data Tools.**  
    [https://www.hostinger.com/support/which-databases-and-data-tools-are-supported-at-hostinger/](https://www.hostinger.com/support/which-databases-and-data-tools-are-supported-at-hostinger/)

22. **Hostinger — Database Management System Used on Web and Cloud Hosting.**  
    [https://www.hostinger.com/support/1583226-which-database-management-system-is-used-at-hostinger/](https://www.hostinger.com/support/1583226-which-database-management-system-is-used-at-hostinger/)

23. **Hostinger — Hosting Plan Parameters and Limits.**  
    [https://www.hostinger.com/support/6976044-parameters-and-limits-of-hosting-plans-in-hostinger/](https://www.hostinger.com/support/6976044-parameters-and-limits-of-hosting-plans-in-hostinger/)

24. **Laravel — Database Transactions.**  
    [https://laravel.com/docs/12.x/database#database-transactions](https://laravel.com/docs/12.x/database#database-transactions)

25. **Laravel — Queues.**  
    [https://laravel.com/docs/12.x/queues](https://laravel.com/docs/12.x/queues)

26. **Laravel — Task Scheduling.**  
    [https://laravel.com/docs/12.x/scheduling](https://laravel.com/docs/12.x/scheduling)

### Reference Labels Used in This Archive

```text
[R1] Primary ERP organizational case
[R2] Logistics ERP implementation case
[R3] Cloud ERP critical-success-factor review
[R4] Indonesian SME cloud-accounting adoption
[R5] Cloud AIS and organizational performance
[R6] Cloud ERP business-value realization
[R7] ERP Process Mining
[R8] OECD SME digital transformation
[R9] ADB Indonesian MSME digitalization

[T1] AWS SaaS Lens
[T2] AWS multi-tenant architecture guidance
[T3] OWASP multi-tenant security
[T4] OAuth 2.0 Security BCP
[T5] PKCE standard
[T6] Keycloak official documentation
[T7] Cloudflare Next.js/OpenNext documentation
[T8] Hostinger database and hosting constraints
[T9] Laravel database transactions
[T10] Laravel queues and scheduler
```

---

## Final Product Archive Summary

This archive confirms the locked direction of:

```text
Reltroner ERP
```

Reltroner ERP is not being built as an academic prototype or an architecture showcase.

It is being built as:

```text
a production-ready,
multi-tenant,
business operations SaaS
for growing MSMEs and SMEs
```

The product connects:

```text
people
-> authority
-> procurement
-> suppliers
-> goods receiving
-> inventory
-> finance
-> accounting
-> reports
-> platform control
```

The product strategy prioritizes:

```text
customer value
-> business correctness
-> transactional integrity
-> security
-> maintainability
-> operational realism
-> monetization
-> career and portfolio value
```

The final objective is to create a SaaS product that can be trusted, demonstrated, deployed, operated, sold, and continuously improved.

[R1]: https://doi.org/10.1177/22779779251349974
[R2]: https://doi.org/10.1007/978-981-99-3043-2_30
[R3]: https://doi.org/10.1142/S0219877024300039
[R4]: https://doi.org/10.1080/23311975.2025.2603023
[R5]: https://doi.org/10.1108/SAMPJ-01-2024-0044
[R6]: https://doi.org/10.1007/978-3-030-29374-1_56
[R7]: https://doi.org/10.1007/978-3-031-64359-0_29
[R8]: https://www.oecd.org/en/publications/the-digital-transformation-of-smes_bdb9256a-en/full-report.html
[R9]: https://www.adb.org/publications/informal-micro-small-and-medium-sized-enterprises-and-digitalization-evidence-from-surveys-in-indonesia
[T1]: https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html
[T2]: https://docs.aws.amazon.com/solutions/latest/multi-tenant-architectures-on-aws/welcome.html
[T3]: https://cheatsheetseries.owasp.org/cheatsheets/Multi_Tenant_Security_Cheat_Sheet.html
[T4]: https://www.rfc-editor.org/rfc/rfc9700.html
[T5]: https://www.rfc-editor.org/rfc/rfc7636.html
[T6]: https://www.keycloak.org/securing-apps/overview
[T7]: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
[T8]: https://www.hostinger.com/support/which-databases-and-data-tools-are-supported-at-hostinger/
[T9]: https://laravel.com/docs/12.x/database#database-transactions
[T10]: https://laravel.com/docs/12.x/queues

