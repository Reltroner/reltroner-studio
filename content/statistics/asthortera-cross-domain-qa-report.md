---
title: "Asthortera — Cross-Domain Statistical QA and Canon Consistency Report"
description: "Audited national census dependencies, numerical contradictions, canon release blockers, and reproducible checks across Reltroner Studio content."
author: "Reltroner Studio"
date: "2026-10-30"
lastUpdated: "2026-10-30"
published: false
canonStatus: "development material"
category: "Worldbuilding · Statistics · QA"
tags:
  - NCCM
  - consistency
  - Asthortera
  - statistics
---

# Asthortera — Cross-Domain Statistical QA Report

**Status: NOT PRODUCTION READY for a claim that every cross-domain number reconciles.** This unpublished development report explicitly distinguishes verified arithmetic corrections, unresolved semantic denominators, and future modeling work. It is an audit record, not a new source of competing fictional history. The [Master Source of Truth](../principles/reltroner-studio-master-source-of-truth.md) and [historical timeline](../events/history-timeline.md) control narrative chronology.

## 1. Inventory and audit scope

At the 2026-10-30 audit, the GitHub tree contains **427 Markdown files under `content/`**, including **21 `content/factions/` documents**. Fourteen documents contain the major **country populations** transcribed in [the audit data ledger](../../data/asthortera/nccm-national-audit-v1.json). Not every faction is a sovereign state, and many countries mentioned in the canon lack an independently inventoried faction profile. Thus **14 countries is a sampled audit denominator, not the total count of nations on Asthortera**.

The [automated repository scanner](../../tools/audit-asthortera-canon.mjs) is designed to recursively inspect **all active `content/**/*.md` files** for obsolete ancestry wording and to reconcile the currently registered nation-level values. It reports both blocking errors and unfinished statistical dependencies.

Run from repository root:

```sh
node tools/audit-asthortera-canon.mjs --report
node tools/audit-asthortera-canon.mjs --strict
```

The first invocation prints a machine-readable diagnostic report. The second returns a failing exit code if a **P0** issue remains. **A script existing in the repository is not evidence that the full scan or CI execution has completed.** The manual evidence below identifies the main blocker already visible in country profiles.

## 2. Binding planetary Year 0 reporting data

| Group | Share | Planet count |
|---|---:|---:|
| Depeisit descent | **58%** | **2,558.96 billion** |
| Cistheta descent | **22%** | **970.64 billion** |
| Cosmeilia-Human mixed | **10%** | **441.20 billion** |
| Native Asthorteran | **7%** | **308.84 billion** |
| Other sentients | **3%** | **132.36 billion** |
| **Total** | **100%** | **4,412 billion** |

**There is no valid alternative Year 0 planetary ancestry distribution.** Country-specific ancestry numbers are **not** supposed to equal the world-level percentages; however, nation populations and ancestry *headcounts* must be mappable and reconcilable to global totals under a documented census scope.

## 3. P0 — National-to-planet ancestry accounting cannot yet be certified

The fourteen national populations listed in faction profiles total **3,288 billion sentients**. Relative to the **4,412 billion** planetary population, **1,124 billion** remain outside this audited national sample. This is **not evidence of missing people**: more sovereign states exist in the history, and some orbital/national census definitions are still unspecified.

The sum of the **explicitly reported national native-Asthorteran groups** in these fourteen profiles is **377.423 billion**, against the planet's **308.84 billion native** allocation. There is a **68.583 billion overshoot** even *before* adding other nations. The discrepancy requires resolving at least one of these conditions: mismatched census years, offplanet national residents, national/native classification mapping, or incorrect nation-level percentages. **Do not silently reduce Beluftner or Cenrestier's culturally central native populations, and do not adjust the planet's creator-ratified 7% without a new creator decision.**

For Cosmeilia, the sum of explicitly reported country groups labeled **Cosmeilia Cosmic Races or mixed** is at least **478.16 billion**, exceeding the planetary **441.20 billion Cosmeilia-Human mixed** category by **36.96 billion** *if* all national Cosmeilia are mapped into the planetary category. **This is an unresolved classification crosswalk, not proof that “pure Cosmeilia Cosmic Races” are identical to Cosmeilia-Human mixed lineages.** Two national profiles also group possible Cosmeilia descendants under broader categories, so 478.16 billion is not an exhaustive unified Cosmeilian headcount.

| Cross-domain QA gate | National sample | Planet reference | Status |
|---|---:|---:|---|
| Country population coverage | 3,288 billion | 4,412 billion | **P1: incomplete national roster / census scope** |
| Native Asthorteran headcounts | 377.423 billion | 308.84 billion | **P0: 68.583 billion excess under shared definitions** |
| National Cosmeilia-labeled headcounts | ≥478.16 billion | 441.20 billion mixed | **P0: definition/crosswalk not established** |
| Kalgered's reported spending classes | 99% | 100% required for exhaustive partition | **P1: 1 point unallocated** |

### Country population ledger (profile snapshots)

| State | Population, billion | SDI |
|---|---:|---:|
| Reltronland | 855 | 0.984 |
| Depcutland | 343 | 0.981 |
| Kalgered | 108 | 0.979 |
| Aurastelia | 164 | 0.970 |
| Astrostelia | 220 | 0.957 |
| Lenternow | 214 | 0.935 |
| Moreg | 205 | 0.931 |
| Pasgerflit | 279 | 0.949 |
| Pencilfania | 182 | 0.940 |
| Taramistry | 242 | 0.954 |
| Stelpadland | 141 | 0.961 |
| Cenrestier | 111 | 0.911 |
| Hargenbor | 133 | 0.925 |
| Beluftner | 91 | 0.896 |
| **Audited sample total** | **3,288** | Not an official planetary SDI |

Country SDI arithmetic cannot establish the official **0.938 planetary SDI** until the index methodology and weights are specified and the unsampled countries are included. **A simple weighted average of reported national SDIs must not be presented as the official SDI definition.**

## 4. Verified repairs and macroeconomic invariants

- The [Lenternow profile](../factions/lenternow.md) now derives **LNR 850,467.2897/year per sentient** from **LNR 182 quadrillion GDP / 214 billion population**. The incompatible earlier per-capita value was corrected; do not change GDP or population merely to preserve an erroneous quotient.
- Historical Reltronland GDP at 1010 BAC is **REL 1.52 trillion** × **USD4.50/REL** = **USD6.84 trillion**. Planet GDP **USD195.67 trillion** implies **3.4956815%** share.
- At Year 0, Reltronland GDP is **REL 4.1527217475 × 10^19** × **USD114.26/REL** = **USD4.7448998686935 × 10^21**; **42% planetary GDP share** implies **USD1.1297380639746428 × 10^22** planetary GDP.
- For the same 1010-year nominal USD endpoints, **α = 1.7851937%** planet GDP CAGR and **ρ = 2.0360492%** Reltronland GDP CAGR. CPI inflation is not an automatically valid GDP deflator.
- The earlier assertion of **12% every year for 250 years** cannot be read as the sustained historical GDP trajectory. The **3% (Reltronland) / 2.5% (planet) nominal USD CAGR over the last 250 years** remains a **model candidate**, not fixed observational canon.
- **Reltronland 42% GDP** and **47% market capitalization snapshot** are separate accounting denominators. GDP is an annual flow; market capitalization is a valuation stock.
- **GDP ≠ GNI by definition**. The current Reltronland GDP = population × GNI/capita coincidence requires an explicit **provisional net-primary-income bridge**.
- The [galactic reference](../places/the-galaxy.md) now uses **Depeisit SDI 0.852** and **Asthortera median age ~252 years**, with distinct planet-level medians and the corresponding source/profile references.

## 5. Unresolved qualitative and quantitative dependency risks

**Census taxonomy:** nations report *Cosmeilia Cosmic Races*, *Cosmeilia-Human mixed*, and generalized immigrant groups differently. The planet-level five-category partition must be mapped without counting individuals twice.

**Period identity:** an annual rate, a 100-year average, a 1010-year CAGR, a story-season forecast, and a Year 0 value are different observations. Country documents must explicitly distinguish these, especially when a model implies older population totals.

**Perimeter:** core GDP excluding dimensional/void satellite accounts, nominal USD-equivalent GDP, PPP GDP, GNI, public non-market provision and asset valuations must each carry their own method and denominator.

**Biology:** the Year 0 life expectancy **475**, median age **252**, first visible-aging benchmark **261.25**, greying **356.25**, and female endpoint **281.25** do not themselves generate a valid annual demographic cohort curve. National longevity and fertility require consistent biological-category and census models.

**Distribution:** country income Gini, wealth Gini, and day-to-day expenditure bands use different microdata. Kalgered's national classes still leave one point unallocated, and planetary Gini cannot be averaged directly from national Ginis.

**Spatial accounts:** urban population share **89.5%** is not land coverage; infrastructure ownership, orbital census, and biological-zero occupancy need explicit boundaries.

**Narrative sovereignty:** a large GDP share must not be inferred to confer planetary political sovereignty. The external-threat story arcs focus on extraordinary events, not the everyday baseline of all residents.

## 6. Release gates for audience-facing numerical canon

1. **P0 ancestry wording:** only the valid Year 0 planetary split appears in public prose; no invalid rival split is repeated as a historical narrative.
2. **P0 denominator reconciliation:** national native headcounts no longer exceed the planetary allocation *under agreed crosswalk and census scope*, and Cosmeilia taxonomy is documented.
3. **P0 economic accounting:** GDP, GNI, FX and per-capita identities pass executable checks; figures have year, nominal/real basis, and currency.
4. **P1 complete national roster:** every country is represented or an explicit “unallocated/unspecified jurisdiction” category is established with matching population and no fabricated details.
5. **P1 quantitative methodologies:** inflation, income/wealth distribution, SDI and demographic life tables have documented methods, not merely manually adjusted endpoints.
6. **P1 regression automation:** the full-content scanner and numerical test suite run in a reproducible environment; baseline inconsistencies block certification until closed.

**Certification decision: NOT PRODUCTION READY for a claim of universal cross-domain quantitative consistency.** Narrative identity is preserved; verified errors are corrected; unresolved country-to-planet accounting remains visible to maintain editorial integrity.
