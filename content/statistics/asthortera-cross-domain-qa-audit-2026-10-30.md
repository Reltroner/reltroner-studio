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

The [Master Source of Truth](../principles/reltroner-studio-master-source-of-truth.md), [Civilizational Systems](../principles/civilizational-systems-worldbuilding-asthortera.md), creator-ratified [NCCM V2](./asthortera-nccm-remodeling.md) and dated [timeline](../events/history-timeline.md) govern contextual reading. Country-specific statistics take precedence over incidental summaries for a given country **unless** they conflict with a newer explicit creator ratification. This report records observed source discrepancies, does not invent national census values, and does not modify the planetary **58/22/10/7/3** ancestry distribution.

**Statuses:** FIXED = source discrepancy repaired; OPEN = genuinely incomplete or inconsistent; CONDITIONAL = depends on denominator/period/classification; VERIFIED = checked against cited published parameters.

## P0 — Open: national native ancestry exceeds the planetary limit

**Creator-ratified Year 0:** planet **4.412 trillion** with **7% native Asthorteran** = **308.840 billion native sentients**.

The following **14 country profiles alone** imply **377.423 billion** native sentients by population × self-reported native share. **Excess = 68.583 billion** beyond the *entire planet's* native category, before accounting for any additional sovereign state. This is a **hard aggregation contradiction if all national snapshots and definitions are contemporaneous and comparable**. Do **not** reduce the planet's 7% or rewrite Beluftner/Cenrestier history merely to make a chart sum correctly.

| Sovereign country | Population (billion) | Native share | Native count (billion) | SDI | Land area (million km²) |
|---|---:|---:|---:|---:|---:|
| Reltronland | 855 | 5% | 42.750 | 0.984 | 104 |
| Depcutland | 343 | 4% | 13.720 | 0.981 | 52 |
| Kalgered | 108 | 35% | 37.800 | 0.979 | 108 |
| Aurastelia | 164 | 4% | 6.560 | 0.970 | 433 |
| Astrostelia | 220 | 6% | 13.200 | 0.957 | 216 |
| Lenternow | 214 | 5% | 10.700 | 0.935 | 117 |
| Taramistry | 242 | 5% | 12.100 | 0.954 | 125 |
| Moreg | 205 | 10% | 20.500 | 0.931 | 79 |
| Pencilfania | 182 | 3% | 5.460 | 0.940 | 166 |
| Stelpadland | 141 | 18% | 25.380 | 0.961 | 200 |
| Pasgerflit | 279 | 6% | 16.740 | 0.949 | 72 |
| Hargenbor | 133 | 7% | 9.310 | 0.925 | 39 |
| Beluftner | 91 | 90.3% | 82.173 | 0.896 | 88 |
| Cenrestier | 111 | 73% | 81.030 | 0.911 | 102 |
| **Profiled subtotal** | **3,288** | — | **377.423** | — | **1,901** |
| **Planet target** | **4,412** | **7%** | **308.840** | **0.938** | **4,503** |

**Proof and assumptions:** numeric factors come from each `content/factions/<country>.md` national profile; the global cap comes from [planet identity](./asthortera_identity.md). Native reporting names vary slightly (native Human-Wizard-Witch, native witches, native species); this is precisely why a **cross-country ancestry taxonomy map and census-year registry** are required. A reclassification or noncontemporaneous snapshot may resolve part of the issue, but has **not** yet been established. Native totals above are a reported-category sum, not a verified species-genetic census.

**Do not publish planet ancestry as a nationally reconciled dataset until this P0 is resolved.**

## P0/P1 — Incomplete state coverage and taxonomy

The 14 profiled nations sum to **3.288 trillion**, or **74.524%** of planetary population. The remaining **1.124 trillion (25.476%)** is **not** assigned by this 14-country snapshot. It may span additional sovereign countries, territories, and other administratively defined residents, but none of these allocations should be invented.

Reported Cosmeilia-related population across these 14 states is **~478.160 billion** when the national **Cosmeilia Cosmic Races and mixed** categories are counted, versus **441.200 billion** for the planet's **Cosmeilia-Human mixed** category. **This is a taxonomy warning, not yet a valid contradiction:** unblended Cosmeilia Cosmic Races are not necessarily counted in the mixed category, and some national `Others` classes also conceal mixed ancestries. The crosswalk must distinguish **Cosmeilia-Human mixed / Cosmeilia pure / other Cosmeilia sentients / nationally unspecified** before computing compatible global totals.

National shares within each of the 14 sources total 100% under their original national reporting class definitions, but **that does not automatically establish cross-national category equivalence**.

### SDI consistency under an explicitly hypothetical population-weighted rule

The 14-state population-weighted SDI is **~0.958638**. For the planet to have **SDI 0.938** with **4.412 trillion**, the other **1.124 trillion** would require an SDI averaging **~0.877628**, **if** the planetary SDI were calculated as a population-weighted arithmetic mean of the national SDIs. The [SDI report](./sdi-report-asthortera.md) does not fully settle this aggregation operator and weights, so this is **CONDITIONAL, not a contradiction**. Other countries and component-level scoring must be reconciled.

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
| **P0** | AST-NATIVE-001 | Country native subtotal exceeds planet cap | Compatible definition of native, same census year, mixed-species crosswalk, official country breakdown |
| **P0** | AST-COUNTRY-002 | 1.124T residents not attributable to the 14 profiled country records | Full sovereign roster and country-level populations, jurisdictional accounting |
| **P1** | AST-COS-003 | National Cosmic Races vs planetary Cosmeilia-Human mixed | Ancestry ontology and mutually exclusive reporting rule |
| **P1** | AST-KAL-004 | [Kalgered](../factions/kalgered.md) expenditure classes total **99%** | National distribution source; 1% remains explicitly unresolved |
| **P1** | AST-SDI-005 | SDI planet vs national scores requires aggregation operator | Component weights, unit of analysis, period and microdistribution |
| **P1** | AST-MONEY-006 | Incomplete FX, PPP, price index and national GDP/GNI bridge | Per-currency reporting rates and harmonized GDP value-added perimeter |
| **P1** | AST-AGE-007 | Year 0 median age 252 and life expectancy 475 not cohort-reconciled with 1010 BAC longevity 80 | Age-specific survival, fertility and migration time series |
| **P1** | AST-SDI-008 | [Individual SDI score matrix](./sdi-score-matrix.md) uses sanctions/exile language; [Civilizational Systems](../principles/civilizational-systems-worldbuilding-asthortera.md) affirms dignified material floor and agency | Differentiate assessment for individuals from planet SDI; constitutional due process, non-discrimination and access rules |
| **P2** | AST-EMPTY-009 | [sdi-character.md](./sdi-character.md) is zero bytes | Intentional stub vs missing article; do not fabricate content |
| **P2** | AST-CONTENT-010 | Numeric summary copies can drift across hundreds of Markdown files | Machine-readable source references, validation in CI, provenance and dated snapshots |

## Statistical dependency rules

1. **Planet census = complete disjoint country/jurisdiction census**, plus separately justified offworld resident scope. One resident is not double-counted in two jurisdictions.
2. **Ancestry reporting is a partition**, with a cross-country category mapping and separately recorded multiple ancestry traits.
3. **GDP is value added per unit of time; GNI adds net primary income; stock market capitalization is an asset stock**. Report 42% GDP and 47% market-cap as different denominators.
4. **CPI ≠ GDP deflator ≠ PPP ≠ nominal REL/USD appreciation**. Historical 1010 BAC USD-to-AUC conversion is retrospective.
5. **Longevity and TFR require age-based cohort models**, not back-solving births from TFR or translating contemporary age thresholds into 1010 BAC.
6. **SDI component-level scoring and weights must be published** before treating its population-weighted arithmetic average as mandatory.
7. **Historical narrative remains prior to simulation**: preserve 1057 crisis, 1048–1030 war, 1030 recovery, 1010 Troncut Treaty, 950 real GDP growth peak, and the modern differentiated, materially secure per-country civilizations.

## Validation and verification boundary

The accompanying [national audit snapshot](../../data/asthortera/national-cross-domain-audit-2026-10-30.json) gives verifiable numbers and source paths for the 14 sovereign states. The [full-content scanning CLI](../../tools/audit-asthortera-cross-domain.mjs) is designed to enumerate every `content/**/*.md` file on a local checkout, reject obsolete planetary ancestry prose and flag missing files, and stop with **non-zero exit status while the confirmed national-native aggregation remains impossible**. That failing result is **intended and must not be hidden**.

**Evidence actually inspected in this audit session:** all `content/factions/` documents, all statistics documents then present, selected planet identity, SDI report, historical timeline, galaxy, PAIA, and first-party governing principles. The Git tree was enumerated to establish the full scope. **A complete semantic audit of all other narrative articles has not been individually executed**, and neither the local audit CLI nor full CI has been executed against a checked-out repository in this session. Avoid declaring a green, complete QA sign-off before those checks are run and the open P0 population contradiction is resolved.

**Audit conclusion: RED / OPEN P0.** The current published planetary proportions remain binding, but the national inputs are **not yet a mathematically reconciled global dataset**.
