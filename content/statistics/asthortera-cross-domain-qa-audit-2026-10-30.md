---
title: "Asthortera Cross-Domain Statistical QA Audit — 2026-10-30"
description: "Narrative-first data integrity findings for the content tree, Asthorteran sovereign countries, and dependent planetary statistics."
author: "Reltroner Studio"
date: "2026-10-30"
lastUpdated: "2026-10-30"
published: false
canonStatus: "development material"
category: "Worldbuilding · QA · Statistics"
tags:
  - Asthortera
  - data audit
  - national accounts
  - demography
  - narrative continuity
---

# Asthortera Cross-Domain Statistical QA Audit

**Audit scope:** repository `Reltroner/reltroner-studio`, branch `main`, **2026-10-30**. At inventory time, **427 Markdown files in `content/`**, **21 files in `content/factions/`**, and **19 in `content/statistics/`** (before adding this report). **All 21 faction files and all 19 then-existing statistics files were read for relevant quantitative facts**. Additional planetary, timeline, philosophical, and infrastructure references were searched and selectively verified. This is **not** a false claim of manually performing a line-by-line semantic review of all 427 articles: a separate automated scan is supplied for full content-tree coverage, while deeper narrative causality across all article types remains work to do.

## Authority and classification

The [Master Source of Truth](../principles/reltroner-studio-master-source-of-truth.md), [Civilizational Systems](../principles/civilizational-systems-worldbuilding-asthortera.md), creator-ratified [NCCM V2](./asthortera-nccm-remodeling.md) and dated [timeline](../events/history-timeline.md) govern contextual reading. Country-specific statistics take precedence over incidental summaries for a given country **unless** they conflict with a newer explicit creator ratification. This report records observed source discrepancies, does not invent national census values, and maintains the existing **58/22/10/7/3 primary-reporting partition** while distinguishing larger inclusive Cosmeilian/native lineage totals under the new **37-country** scope.

**Statuses:** FIXED = source discrepancy repaired; OPEN = genuinely incomplete or inconsistent; CONDITIONAL = depends on denominator/period/classification; VERIFIED = checked against cited published parameters.

## P0 — 37-nation lineage census remains incomplete (creator correction)

**Fixed planetary population: 4.412 trillion sentients across exactly 37 sovereign states.** Fourteen available national profiles account for **3.288 trillion**, i.e. **74.524%** of the population. The **other 23 nations contain the remaining 1.124 trillion sentients** (25.476%) — this is an explained coverage gap, not missing people and not permission to invent per-country values.

| Scope | Sovereign countries | Population |
|---|---:|---:|
| Profiles with quantified demographics | 14 | **3,288 billion** |
| Other sovereign countries requiring national census data | 23 | **1,124 billion** |
| **Asthortera** | **37** | **4,412 billion** |

### Source-category counts: inclusive lineage, not primary-partition caps

The creator directs **one Cosmeilian ancestry variable encompassing both Cosmeilia Cosmic Races and Cosmeilia-Human mixed**, irrespective of humanoid, fairy, luminous star, comet, cosmic light or aurora manifestation. One person capable of several shapes remains **one sentient**, and forms do not create additional headcounts. **Native Asthorteran lineage** also must include native-descended mixed-heritage individuals.

The profiled 14 states report **377.423 billion native-lineage** sentients and **478.160 billion Cosmeilian-all-manifestation-lineage** sentients, subject to source-category comparability. The planet's **7% primary native reporting class** and **10% primary Cosmeilian class** are **not maxima** for the inclusive lineage variables. Earlier claims that these nation-level counts exceed a binding global native or Cosmeilian cap were **measurement-category errors**, not proven demographic contradictions.

The **full planet-wide inclusive counts must be significantly above 377.423 billion native and 478.160 billion Cosmeilian**, as more countries exist. No exact total has yet been creator-ratified. A sensitivity example of **12% inclusive native incidence (529.440 billion)** and **15% inclusive Cosmeilian incidence (661.800 billion)** is mathematically feasible, implying respectively **152.017** and **183.640 billion** in the remaining 23 countries. These are **noncanonical scenarios**, not official census statistics.

**Canonical accounting rule:** primary administrative ancestry is an *exclusive partition*; lineage incidence is *nonexclusive*. The same individual can appear once in the planetary unique-person denominator and in multiple lineage flags. A true global-inclusive lineage cap must not be inferred from primary registration categories.

### Country census: existing quantified nation profiles

| Sovereign country | Population (billion) | Native national-label share | Native national-label headcount (billion) | SDI |
|---|---:|---:|---:|---:|
| Reltronland | 855 | 5% | 42.750 | 0.984 |
| Depcutland | 343 | 4% | 13.720 | 0.981 |
| Kalgered | 108 | 35% | 37.800 | 0.979 |
| Aurastelia | 164 | 4% | 6.560 | 0.970 |
| Astrostelia | 220 | 6% | 13.200 | 0.957 |
| Lenternow | 214 | 5% | 10.700 | 0.935 |
| Taramistry | 242 | 5% | 12.100 | 0.954 |
| Moreg | 205 | 10% | 20.500 | 0.931 |
| Pencilfania | 182 | 3% | 5.460 | 0.940 |
| Stelpadland | 141 | 18% | 25.380 | 0.961 |
| Pasgerflit | 279 | 6% | 16.740 | 0.949 |
| Hargenbor | 133 | 7% | 9.310 | 0.925 |
| Beluftner | 91 | 90.3% | 82.173 | 0.896 |
| Cenrestier | 111 | 73% | 81.030 | 0.911 |
| **14-country subtotal** | **3,288** | — | **377.423** | — |

The source reports different forms of ancestry, lineage and nationality. The national-to-planet crosswalk is not yet finalized. See [37-Country Lineage and Kalgered Remodeling](./asthortera-37-country-lineage-and-kalgered-remodeling.md) and [audit data](../../data/asthortera/national-cross-domain-audit-2026-10-30.json).

### SDI consistency under a conditional population-weighted example

The profiled countries' population-weighted SDI is **~0.958638**. If planetary SDI **0.938** were an ordinary population-weighted arithmetic average, the other **1.124 trillion** would need **~0.877628** average. The index aggregation rule has **not** been ratified, so this is a sensitivity result, not a national contradiction or mandated average.

## Confirmed P0 corrections completed

| ID | Problem and source | Action |
|---|---|---|
| FIX-001 | Obsolete planetary ancestry supersession prose in identity, Earth comparison, galaxy-world, sentient-population, immigration philosophy, timeline and NCCM ledger | **Deleted all explicitly identified legacy narrative references**; retain only current **58/22/10/7/3**; Git history remains historical |
| FIX-002 | [Lenternow](../factions/lenternow.md): LNR182 quadrillion GDP / 214 billion sentients incorrectly described as LNR1.11 million per capita | **Corrected GDP per capita to ~LNR850,467.29/year**, preserving GDP and population. Counterfactual 214B × 1.11M = **LNR237.54 quadrillion** |
| FIX-003 | [Sentient population](./sentient-population.md) Cosmeilia census contradicted [planet-specific Cosmeilia identity](./cosmeilia_identity.md) | Updated summary to **85% Cosmeilia-Human / 5% other Cosmeilian sentients / 4% Asthortera / 3% Depeisit / 2% Cistheta / 1% others** |
| FIX-004 | [The Galaxy](../places/the-galaxy.md) listed Depeisit median 288 and SDI 0.811, Cosmeilia median 246, Cistheta median 240, inconsistent with planet-specific identities | Aligned to **Depeisit median 307, SDI 0.852; Cosmeilia median 249; Cistheta median 215**; recalibrated regional ranges |
| FIX-005 | [PAIA](../places/paia-aeropolis-hub.md) compared Depcutland SDI 0.983 against another national baseline | Updated to **0.981**, following [Depcutland](../factions/depcutland.md) and [planetary SDI report](./sdi-report-asthortera.md) |
| PREVIOUS | Reltronland's 12%-for-250-years, toy compounding and GDP/GNI identity | Already documented and corrected in [NCCM V2](./asthortera-nccm-remodeling.md) and [Reltronland](../factions/reltronland.md) |

## Open QA issues (do not auto-rewrite into invented facts)

| Severity | ID | Source and impact | Required evidence |
|---|---|---|---|
| **P0** | AST-LINEAGE-001 | No completed inclusive ancestry census across 37 sovereign countries | The 23 additional national populations and consistent all-manifestation Cosmeilian/native lineage registry |
| **P0** | AST-COUNTRY-002 | 1.124T residents belong to 23 other countries but have no verified country-level allocations | Complete the 37-nation census without equal-allocation fabrication |
| **P1** | AST-COS-003 | Cosmeilian Cosmic Races and Cosmeilia-Human mixed must be unified | Use one inclusive all-manifestation variable; each individual counted once; keep form as descriptive metadata |
| **P1** | AST-KAL-004 | [Kalgered](../factions/kalgered.md) expenditure classes total **99%**, and minimum bracket spending consumes ~96.6% of daily GNI | [Kalgered remodeling candidate](../../data/asthortera/kalgered-remodeling-candidate-v1.json) (100% bands) requires ratification |
| **P1** | AST-SDI-005 | SDI planet vs national scores requires aggregation operator | Component weights, unit of analysis, period and microdistribution |
| **P1** | AST-MONEY-006 | Incomplete FX, PPP, price index and national GDP/GNI bridge | Per-currency reporting rates and harmonized GDP value-added perimeter |
| **P1** | AST-AGE-007 | Year 0 median age 252 and life expectancy 475 not cohort-reconciled with 1010 BAC longevity 80 | Age-specific survival, fertility and migration time series |
| **P1** | AST-SDI-008 | [Individual SDI score matrix](./sdi-score-matrix.md) uses sanctions/exile language; [Civilizational Systems](../principles/civilizational-systems-worldbuilding-asthortera.md) affirms dignified material floor and agency | Differentiate assessment for individuals from planet SDI; constitutional due process, non-discrimination and access rules |
| **P2** | AST-EMPTY-009 | [sdi-character.md](./sdi-character.md) is zero bytes | Intentional stub vs missing article; do not fabricate content |
| **P2** | AST-CONTENT-010 | Numeric summary copies can drift across hundreds of Markdown files | Machine-readable source references, validation in CI, provenance and dated snapshots |

## Statistical dependency rules

1. **Planet census = all 37 sovereign countries' mutually exclusive population residency accounts**, plus separately justified offworld resident scope. The other 23 nations' combined **1.124T** is not a missing population. One sentient is not double-counted under different manifestations.
2. **Primary ancestry reporting is an exclusive partition; inclusive Cosmeilian and native lineage incidence is multi-label**. A shape-changing Cosmeilian is one person; cosmic races and Cosmeilia-Human mixed use a unified lineage variable.
3. **GDP is value added per unit of time; GNI adds net primary income; stock market capitalization is an asset stock**. Report 42% GDP and 47% market-cap as different denominators.
4. **CPI ≠ GDP deflator ≠ PPP ≠ nominal REL/USD appreciation**. Historical 1010 BAC USD-to-AUC conversion is retrospective.
5. **Longevity and TFR require age-based cohort models**, not back-solving births from TFR or translating contemporary age thresholds into 1010 BAC.
6. **SDI component-level scoring and weights must be published** before treating its population-weighted arithmetic average as mandatory.
7. **Historical narrative remains prior to simulation**: preserve 1057 crisis, 1048–1030 war, 1030 recovery, 1010 Troncut Treaty, 950 real GDP growth peak, and the modern differentiated, materially secure per-country civilizations.

## Validation and verification boundary

The accompanying [national audit snapshot](../../data/asthortera/national-cross-domain-audit-2026-10-30.json) gives verifiable numbers and source paths for the 14 sovereign states. The [full-content scanning CLI](../../tools/audit-asthortera-cross-domain.mjs) is designed to enumerate every `content/**/*.md` file on a local checkout, reject obsolete planetary ancestry prose and flag missing files, and stop with **non-zero exit status while the confirmed national-native aggregation remains impossible**. That failing result is **intended and must not be hidden**.

**Evidence actually inspected in this audit session:** all `content/factions/` documents, all statistics documents then present, selected planet identity, SDI report, historical timeline, galaxy, PAIA, and first-party governing principles. The Git tree was enumerated to establish the full scope. **A complete semantic audit of all other narrative articles has not been individually executed**, and neither the local audit CLI nor full CI has been executed against a checked-out repository in this session. Avoid declaring a green, complete QA sign-off before those checks are run and the open P0 population contradiction is resolved.

**Audit conclusion: RED / OPEN P0 for 37-country coverage, not because inclusive lineage counts exceed primary ancestry shares.** The fixed planet remains **4.412 trillion**, and the *primary-reporting partition* is still maintained separately from the all-manifestation inclusive lineage census. Exact Cosmeilian/native inclusive global shares and Kalgered expenditure reforms remain unratified.
