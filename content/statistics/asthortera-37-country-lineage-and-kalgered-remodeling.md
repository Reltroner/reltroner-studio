---
title: "Asthortera 37-Country Census and Kalgered Statistical Remodeling — NCCM Development"
description: "Fixed 4.412 trillion sentients, 37 sovereign countries, unified all-manifestation Cosmeilian lineage, native ancestry reconciliation and proposed Kalgered expenditure model."
author: "Reltroner Studio"
date: "2026-10-30"
lastUpdated: "2026-10-30"
published: false
canonStatus: "development material"
category: "Worldbuilding · Demography · Economics"
tags:
  - Asthortera
  - Cosmeilia
  - Kalgered
  - NCCM
---

# Asthortera 37-Country Census and Kalgered Economic Remodeling

**NCCM V4 demographic update (2026-10-30):** Beluftner now has **2% Cosmeilian primary**, **6% Phantomkind / Spiritual Hybrid primary** and **1% Other primary**, with Native 90.3%, Cistheta 0.5%, and Depeisit 0.2% unchanged. The fourteen-state Cosmeilian source subtotal is now **535.200 billion**; known Phantomkind-primary minimum **5.460 billion**. Thirteen national Phantomkind primary rates and global six-way partition are **unknown, not zero**. See [V4 ancestry census](./asthortera-phantomkind-demography-v4.md). Older five-way Beluftner values are superseded.

**Creator directives (2026-10-30):** Asthortera population stays at **4.412 trillion**, distributed across **37 sovereign nations**. The current 14 profiled nations total **3.288 trillion** and are a **partial census**, not the entire planetary roster. The remaining **23 nations together contain 1.124 trillion sentients**; their individual national populations must not be fabricated or allocated uniformly without historical/national sources.

## 1. Two different census dimensions, never conflated

**Primary reporting assignment:** the existing five-way `58/22/10/7/3` national-origin reporting categories are a **single-choice administrative partition** of 4.412 trillion. A primary reporting category is not the maximum number of individuals who also possess other ancestral/sentient lineages. Its former `Cosmeilia-Human mixed` label should be understood as a **primary Cosmeilian-origin reporting label** and must not exclude nonhumanoid Cosmeilian manifestations.

**Inclusive lineage incidence:** this is a **multi-label** census. A person of mixed Depeisit–Cosmeilian ancestry can have a primary Depeisit assignment and **one** inclusive Cosmeilian lineage flag; the same person may have a native lineage flag. `SUM(inclusive_lineage_counts)` can exceed planetary population, but `COUNT(DISTINCT resident_id)` within each individual lineage cannot. A shape-changing sentient is **counted once**, not once for each transformation. Recording `primary_ancestry` and `has_lineage_cosmeilian` as the same variable would be a measurement error.

**Creator-defined unified lineage:** `COSMEILIAN_ALL_MANIFESTATIONS` combines `Cosmeilia Cosmic Races` and `Cosmeilia-Human mixed` into **one ancestry variable**, covering human/humanoid, fairy, small luminous star/luma-like form, stellar, cometary, cosmic light, aurora, and hybrid manifestations. Forms are characteristics of **one person**, not distinct populations. This classification preserves the naturally beautiful, fantasy-cosmic aesthetic without assuming a rigid phenotype. `NATIVE_ASTHORTERAN_LINEAGE` similarly includes native-descended sentients across hybrid lineages.

| Quantity | 14-country subtotal from profiles | Interpretation |
|---|---:|---|
| People residing in the 14 profiled nations | **3,288 billion** | 74.524% of the fixed planet |
| People of the other 23 nations | **1,124 billion** | 25.476%; not yet allocated by nation |
| Cosmeilian all-manifestation lineage (reported minimum) | **535.200 billion** | Not a final global count |
| Native Asthorteran lineage (reported minimum) | **378.753 billion** | Not a final global count |

**Country source labels are not yet all mapped into one standardized lineage ontology.** These lower bounds assume the 14 country population snapshots are contemporaneous, non-overlapping residents and the source ancestry terms are harmonized. Under those assumptions the final planet-wide Cosmeilian count must be **significantly above 535.200 billion** and the native lineage count **significantly above 378.753 billion**, as the creator explicitly requires.

### Non-canonical sensitivity scenario: 15% Cosmeilian, 12% native

For modeling feasibility only, use **15% Cosmeilian all-manifestation incidence = 661.800 billion**, and **12% native-lineage incidence = 529.440 billion**.

| Lineage | Existing 14-state headcount | Scenario planet headcount | Required in other 23 countries |
|---|---:|---:|---:|
| Cosmeilian all manifestations | 535.200 B | **661.800 B** | **126.600 B** |
| Native Asthorteran | 378.753 B | **529.440 B** | **150.687 B** |

Thus, among the other 1.124 trillion, required Cosmeilian inclusive incidence is **~11.26%**, and native incidence is **~13.41%**. Individuals with multiple lineages are counted in both incidence totals, **never twice in planetary population**.

**15% and 12% are candidates only, NOT ratified national or planetary headline figures.** The planet has exactly **4.412 trillion unique residents**. The 37-nation full census and ancestry taxonomy must be reconciled before any global-inclusive count is described as a verified historical observation. Other ancestral category shares must not be reverse-engineered from the inclusive figures by subtracting them from the old primary partition.

## 2. Kalgered — hard anchors versus open quantitative design

[Kalgered's country profile](../factions/kalgered.md) establishes **108 billion sentients**, **108 million km²** of land, **SDI 0.979**, **GNI per capita KAL 17,956,408 per year**, **income Gini 0.21**, **100-year average annual economic growth 7%** (growth concept not yet fully clarified), **45% debt/GDP**, **CO₂ 1.3 tons/person/year**, and historical ancestry **40% Depeisit, 35% native, 13% Cosmeilian, 10% Cistheta, 2% others**. Its **51/49 male/female** ratio is recorded only where relevant to its existing gender reporting conventions.

`KAL 17,956,408 / 365 = KAL 49,195.64` daily per capita **GNI capacity**. Aggregate national **GNI** is `108e9 × 17,956,408 = KAL 1.939292064e18 per year` (a flow). It is **NOT GDP** until the net-foreign-primary-income bridge and national GDP are separately defined.

The previously published daily spending categories **1% / 30% / 45% / 18% / 5% = 99%**, without a one-percentage-point allocation. Even worse, their **minimum** private expenditure under band lower bounds averages at least:

`0.30×100 + 0.45×10,000 + 0.18×100,000 + 0.05×500,000 = KAL 47,530 per person/day`.

That is **~96.61%** of the published daily GNI per capita, **even with every citizen spending at the minimum** in their band. This leaves insufficient headroom in a simple consumption-funded-by-current-income model for taxes, savings, public obligations, or higher within-band spending. The problem is **structural**, not merely a 1-percentage-point rounding residual. Income, consumption, asset draws, transfers and savings are distinct; this finding uses an explicit conservative simplification, not proof that rich households cannot spend above income.

### Proposed Kalgered private expenditure structure — NONCANONICAL SCENARIO

| Daily expenditure capacity in KAL | Role | Scenario share | Population |
|---|---|---:|---:|
| 0–999.99 | Protected low-private-spending | **2%** | 2.16 billion |
| 1,000–4,999.99 | Stabilized civic household | **18%** | 19.44 billion |
| 5,000–19,999.99 | Professional / institutional backbone | **45%** | 48.60 billion |
| 20,000–59,999.99 | Senior professional / capital-secure | **30%** | 32.40 billion |
| 60,000+ | Founders / institutional-capital elite | **5%** | 5.40 billion |
| **TOTAL** | | **100%** | **108.00 billion** |

This preserves Kalgered as a **mature neutral high-SDI state**, with administrative expertise, finance, healthcare, legal procedure and diplomacy as productive sectors. Its material-welfare floor means **low private expenditure does not automatically equal poverty**.

Illustrative within-band representative spending `500, 3,000, 12,000, 37,000, 120,000 KAL/day` produces **KAL 23,050** mean daily personal private expenditure, equivalent to **46.85% of per-capita GNI**. The **53.15% complement** is only an **illustrative gross capacity difference**, **not** an audited tax/savings rate, because GNI and personal private expenditure belong to different accounting sectors and consumption can involve savings, benefits or borrowing. The model is a defensible starting constraint, not proof of national consumption accounting.

These shares and boundaries remain [candidate data](../../data/asthortera/kalgered-remodeling-candidate-v1.json) until the creator explicitly ratifies. No silent historical overwrite has been made to the published Kalgered class table.

## 3. Kalgered SDI and institutional identity

**National SDI remains 0.979, not an invented recalculated value.** Any component model must account for transparent multilateral protocol, health and learning access, public-service integrity, neutral governance, ecological protection and professional mobility. Proposed dimensions can use the following baseline without assigning invented scores:

- **Protocol integrity and institutional neutrality** — compliance, dispute-resolution fairness, independent oversight.
- **Educational and professional capability** — multilingual credential interoperability, research competence, lifelong learning.
- **Health and biological security** — survival by age/species, medical access, functional healthspan.
- **Civic agency and economic resilience** — due process, material access, inclusion, transition/retraining.
- **Ecological and infrastructural continuity** — low-emissions energy, forests, disaster resilience, preserved environment.

Choose a common SDI aggregation method shared across **all 37 states**, then calibrate the documented subindices to the fixed **0.979** anchor. The global **0.947** planetary SDI is not necessarily a plain average of national SDIs; do not assume an arithmetic aggregator until approved.

## 4. Cross-domain acceptance rules

1. Fixed `planet_population = 4.412e12` and fixed `sovereign_country_count = 37`. The fourteen profiled countries and twenty-three remainder are a census coverage indicator, not two classes of political legitimacy.
2. Cosmeilian **one lineage variable across all manifestations**, each shape-changing sentient counted once. Include Cosmeilia-Human hybrids and Cosmic Races while preserving subordinate form/type metadata.
3. Distinguish **primary-exclusive report** from **inclusive ancestry incidence**; 10% primary Cosmeilian and 7% primary native are **not inclusive maximums**.
4. Disclose missing values for other 23 countries, rather than making equal allocations or assigning unobserved traits.
5. Kalgered model must reconcile `108e9` population, `GNI_per_capita = 17,956,408 KAL/year`, `SDI = 0.979`, known ancestry and original growth window; no direct inference of GDP or Gini from classes.
6. **QA must remain red for unfinished 37-country census and unratified statistical parameters**, not falsely red because it treats different census dimensions as the same quantity.

**Canon status:** fixed planet population, 37-country count, and unified Cosmeilian all-manifestation taxonomy are creator directives. Inclusive percentages **15%/12%**, Kalgered tier remodeling, and intermediate accounts are **development scenarios** until a further ratification.
