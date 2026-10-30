---
title: "NCCM V4 — Cross-Domain QA Report 2026-10-30"
description: "Consolidated numeric and narrative QA findings, source limitations and release criteria."
author: "Reltroner Studio"
date: "2026-10-30"
lastUpdated: "2026-10-30"
published: false
canonStatus: "development material, with creator-ratified values identified"
category: "Worldbuilding · Statistics · Demography"
tags: ["Asthortera", "Phantomkind", "Spiritual Hybrid", "NCCM"]
---

# NCCM V4 — Cross-Domain QA Findings

**Scope and integrity statement:** The inspected `main` baseline at commit `114db591f1e62d85c84da59b5e1b39d11fb9a5ee` listed **431 Markdown files in `content/`**. The pre-existing V3 audit records manual checks of all **21 faction** files, **19 then-existing statistics** files, and selected historical and philosophical sources; it did **not** conduct full line-by-line semantic review of all content. The [GitHub Actions run 41032754901](https://github.com/Reltroner/reltroner-studio/actions/runs/41032754901) confirmed passing regression tests and completed diagnostic scans but **failed strict QA** on a known 23-country census gap. A fresh run after this V4 modification must validate the revised scripts. Source values below are anchored to the directly inspected ledger/model and relevant country documents.

## Ratified / invariant facts

- Planet Year 0 **4,412 billion** sentients, **37** sovereign nations; **14** quantified countries total **3,288 billion**; remaining **23** countries total **1,124 billion**. No fabricated per-country allocations.
- Planet SDI **0.947**, all 14 national SDIs fixed; the 60% individual / 40% institution decomposition and population-weighted aggregation remain model proposals, not independent measurements.
- **Beluftner** new six-way primary ancestry **0.2 + 0.5 + 2 + 90.3 + 6 + 1 = 100%** (Depeisit, Cistheta, Cosmeilian, Native, Phantomkind, Other). Confirmed Phantomkind-primary **5.460B**.
- Fourteen-country Cosmeilian primary source subtotal **535.200B**, native primary **378.753B**, confirmed Phantomkind-primary minimum **5.460B**. Global former five-category population reporting is not a harmonized six-category register.

## Findings requiring correction or source-backed decisions

| Severity | ID | Verified condition / contradiction | Resolution needed |
|---|---|---|---|
| **P0** | AST-CENSUS-037 | 23 states containing 1.124T citizens have no individual national population, SDI and ancestry records | Complete 37-country national dataset |
| **P0** | AST-PHANTOM-013 | Only Beluftner's 6% Phantomkind registration is ratified; 13 other national rates remain unknown, **not zero** | Primary-category crosswalk by country |
| **P0** | AST-PRIMARY-GLOBAL | Planetary five-way primary 10% Cosmeilian (**441.200B**) is less than 14-country primary source (**535.200B**); 7% Native (**308.840B**) is less than 14-country primary source (**378.753B**) | Ratify compatible planetary taxonomy and clarify primary versus inclusive values |
| **P1** | AST-KAL-099 | [Kalgered](../factions/kalgered.md) historical spending category percentages total **99%** | Approve a normalized 100% category scheme and currency-to-GNI constraints |
| **P1** | AST-SDI-COMP | [SDI V3](./asthortera-sdi-methodology-v3.md) candidate components reverse-calibrated to existing scores; remaining 23-country SDI **0.912955516** conditional on arithmetic population aggregation | Establish common measurement basis, weights and species accessibility |
| **P1** | AST-MACRO-001 | AUC/USD GDP comparison estimates, local-currency GNI, FX/PPP, GDP-deflators and trade balances are not independently reconciled | Ratify accounting bridge; label simulations |
| **P1** | AST-COHORT-001 | Planetary 1010 BAC life expectancy ~80 to Year 0 ~475 requires long-run cohort series, especially for noncorporeal Phantomkind | Define survival/fertility/age methods by biological species |
| **P1** | AST-CARBON-SCOPE | Reltronland's offset-adjusted emissions are not directly comparable with unadjusted national emissions | Define production/consumption/net carbon scope |
| **P1** | AST-QUAL-431 | Whole-content automated scan is not exhaustive qualitative review of every chronology, society, institution and character arc | Manual narrative causal and cross-source reconciliation |
| **P2** | AST-EMPTY-001 | Two empty files: `content/statistics/sdi-character.md` and `content/blog/how-i-built-249k-startup-idea.md` | Confirm intentional stubs versus missing content |

## Verified post-patch GitHub Actions result

[Run 41037470554](https://github.com/Reltroner/reltroner-studio/actions/runs/41037470554) at commit `1ade4c3376e0d22d90e07794f111946dcc78eaa2` completed with **19 / 19 regression tests passed**, **433 Markdown files scanned**, all 14-country model GDP/SDI numeric invariants consistent, and **strict QA RED by design** because 23 national censuses remain missing. Additional strict warnings: the unreconciled five-way/six-way planet origin mapping, the Kalgered 99% spending bands, and **two empty Markdown files**: `content/blog/how-i-built-249k-startup-idea.md` and `content/statistics/sdi-character.md`. The separate metric-mentions diagnostic produced **6 candidate sightings**, all found to be contextual false positives rather than demonstrated canon contradictions: subpopulation 5.46B mistaken for total Beluftner population (2), planet SDI 0.947 mistaken for Cenrestier/Reltronland national SDI (2), and 4,412B planet population mistaken for Kalgered/Beluftner population (2). These heuristics require subject/scope awareness; do not classify their six hits as genuine contradictions.

## Numerical acceptance tests

`Σ 14 populations = 3,288B`; `4,412B − 3,288B = 1,124B`; `Beluftner six percentages = 100`; `91B × 0.06 = 5.460B`; `Cosmeilian 14-state primary = 535.200B`; `Native = 378.753B`; known 14 weighted SDI **0.958638077858881**, 23-state required SDI **0.912955516014234** under proposed arithmetic aggregation to yield planetary **0.947**. The 14 GDP model plus 23-state GDP residual must reconcile to the pre-existing planetary scenario; model GDP must not be presented as official national accounts.

**Audit disposition: RED / UNRESOLVED P0.** Passing tests must not be misrepresented as a full narrative consistency sign-off. The prior [V3 audit snapshot](./asthortera-cross-domain-qa-audit-2026-10-30.md) retains historically superseded Beluftner and Cosmeilian totals; use the [V4 demographic record](./asthortera-phantomkind-demography-v4.md) for the latest approved values. Public publication should wait for explicit mapping or visible uncertainty labels.
