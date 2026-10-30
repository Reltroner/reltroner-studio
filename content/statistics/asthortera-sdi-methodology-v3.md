---
title: "Asthortera SDI V3 — Individual Capability and Institutional Quality"
description: "Creator-ratified two-pillar SDI definition, 0.947 planetary anchor and narrative-constrained 37-state aggregation methodology."
author: "Reltroner Studio"
date: "2026-10-30"
lastUpdated: "2026-10-30"
published: false
canonStatus: "development material"
category: "Worldbuilding · SDI · Statistical Methodology"
tags: ["Asthortera", "SDI", "human development", "institutions", "NCCM"]
---

# SDI V3 — Capacity of Sentients + Quality of Institutions

## 1. Ratified definition and fixed historical anchors

**Creator-ratified (2026-10-30):** the **Sentient Development Index (SDI)** measures the **combined mean capacity of individuals and quality of the institutions and environments that enable them**. It is **not merely an IQ/obedience score, an economic-rank proxy, an ideological purity test, or an index of visible science-fiction aesthetics**. A person capable of diverse Cosmeilian manifestations is counted once; different national ancestry compositions are not SDI multipliers.

**Fixed Year 0:** planet **4.412 trillion sentients, 37 sovereign countries, SDI 0.947**. Fourteen documented countries total **3.288 trillion** with population-weighted **composite national SDI 0.958638077858881**; the remaining 23 countries total **1.124 trillion**, requiring **0.912955516014234** population-weighted composite SDI **if and only if** the proposed arithmetic aggregation operator is adopted. **No SDI score of the 14 countries is modified**. Historical **1010 BAC planetary SDI 0.707** remains fixed.

## 2. Level separation and primary data model

### A. Individual capability score, `I_j`

For each sentient `j`, use the existing [six-factor individual SDI score matrix](./sdi-score-matrix.md) as **an inherited Reltronland-origin instrument**, with proper cross-species and cross-national accessibility review:

| Factor | Existing instrument weight | Operational meaning |
|---|---:|---|
| Cognitive clarity | 25% | Reasoning, evidence interpretation, learning, epistemic competence |
| Emotional stability | 20% | Emotion regulation, resilience, self-awareness |
| Ethical integrity | 20% | Noncoercion, reciprocity, accountability; **not** compulsory membership in Astralis |
| Time discipline | 15% | Self-directed planning and reliable follow-through, with disability accommodations |
| Social contribution | 10% | Cultural, caregiving, scientific, civic or economic participation, paid or unpaid |
| Innovation quotient | 10% | Creation, experimentation, problem-solving across different civilizations |
| **Total** | **100%** | **Local instrument, not yet planet-wide psychometrically validated** |

This individual instrument must not be used to automatically revoke fundamental civil rights, living standards, healthcare or citizenship. Societal SDI refers to **opportunity and average capability**, not the moral worth of a person. **Raw individual score distribution, accessibility adjustments, life stage and species-standardization are not yet measured**.

### B. Institutional quality score, `Q_i`

For every sovereign country `i`, propose six nation-neutral institutional components (provisional weights, not independently verified):

| Institutional dimension | Candidate weight | Evidence required |
|---|---:|---|
| Rule of law, procedural integrity and anti-capture governance | 25% | Audited due process, transparency, fiscal accountability |
| Health and functional life-course infrastructure | 20% | Healthcare and longevity accessibility |
| Learning, research and skills interoperability | 20% | Quality, access, professional recognition and scientific continuity |
| Material floor and equal access to civic infrastructure | 15% | Housing, nutrition, transit, energy, safety by population subgroup |
| Ecological and intergenerational resilience | 10% | Habitat restoration, emissions consistency, risk mitigation |
| Agency, participation and protected civil liberties | 10% | Effective participation, accommodations, remedies and local sovereignty |
| **Total** | **100%** | Public methodology and independently supported subindicators required |

Kalgered's procedural neutrality, Depcutland's archival integrity, Aurastelia's emotional and cosmic culture, Reltronland's technical systems, Taramistry's medicine, Pencilfania's arts and Beluftner's arcane education can each raise development by **different mechanisms** without being forced into one aesthetic or ideology.

### C. Candidate composite national SDI

Let `I_i = mean(I_j)` over unique residents in country `i`, and `Q_i` be country institutional quality. The **user-ratified requirement is that both matter**. The **precise relative weights are not ratified**. For a reproducible NCCM V3 sensitivity model only, propose:

```text
SDI_national_i = 0.60 × I_i + 0.40 × Q_i
SDI_planet = Σ(population_i × SDI_national_i) / 4,412,000,000,000
```

For illustration, a country with SDI 0.979 and `I = 0.9698`, `Q = 0.9928` (Kalgered candidate decomposition) satisfies the published score exactly. **These two components are reverse-calibrated synthetic examples, not independently collected survey and institutional measurements.**

The [14-country machine-readable simulation](../../data/asthortera/nccm-v3-14-country-comparative-model.json) includes an explicit `sdi_decomposition_candidate` for all 14 countries so no modeled cell is blank. The decomposition **does not** add new canon scores or supersede existing country SDI.

### D. Planetary aggregation

For Year 0, resident population is the proposed statistical weight, and all 37 sovereign national composite scores use the **same reference year, species coverage and index scaling**. Population-weighted arithmetic aggregation is **proposed** for a transparent, reproducible central model; institutional spillovers and unequal within-country outcomes can be handled in separate validated satellite indicators, not as unreported arbitrary discounts.

The 14-country numerator is **3,152.002 billion × SDI units**; the 37-country planet numerator for SDI 0.947 is **4,178.164 billion × SDI units**. Thus the remaining 23 countries require **1,026.162 / 1,124 = 0.912955516014234** composite SDI, when treated as one population-weighted residual group. They need not individually share that value. A weighted 23-country average of 0.90 would instead yield planet SDI **~0.943699**, and 0.93 would yield **~0.951342**; the creator's 0.947 remains the fixed endpoint.

**Do not** average the fourteen country SDIs without weighting by population; their unweighted mean is **0.9480714**, while the weighted mean is **0.9586381**. And do not treat the 23-country residual as one new sovereign country.

## 3. History and life-course compatibility

- **1010 BAC:** postwar reconstruction, Troncut Treaty, SDI **0.707**; high annual GDP growth does not imply equivalent SDI advancement in one year.
- **950 BAC:** Great Acceleration baby boom and 15% real GDP growth peak can change schooling, birth cohort composition and institutions over generations. A historical SDI figure such as 0.775, unless explicitly ratified, remains a model candidate.
- **844–825 BAC:** global coordination and educational interoperability gradually improve skills access and institutions without abolishing national sovereign systems.
- **197–29 BAC:** orbital governance innovations and ASC/RSC boundaries expand capability but also introduce trust, coordination and ethical risks.
- **Year 0:** modern materially secure civilization, median age ~252, life expectancy ~475 and SDI **0.947**; the 14 source national scores remain as published. Existing high-SDI disparity reflects institutions and society, not a claim that everyone has identical personal capabilities.

The **1010 BAC 80-year life expectancy** and **Year 0 475-year life expectancy** must be reconciled using survival by age and biological group, not substituted as the SDI value itself. Current low private spending is not equal to poverty under a high material floor. Individual SDI assessments cannot function as retroactive ancestry/citizenship exclusion.

### NCCM V4 — Species-appropriate Phantomkind inclusion

Phantomkind and Spiritual Hybrid citizens are included as unique sentients. **SDI is not a score for preferred physical embodiment or species identity.** Cognitive capability evaluation must allow noncorporeal modes of memory, sensory perception, communication and learning. Institutional quality should assess equal legal personhood, representation, education, health and accessible public services for spiritual sentients. Lifespan, fertility and mortality must use meaningful **species-specific** denominators rather than copying biological human assumptions. A Phantomkind individual with Cosmeilian lineage is counted once in the population denominator and can be tagged in multiple inclusive lineage registers. See [NCCM V4 ancestry](./asthortera-phantomkind-demography-v4.md).

## 4. Validation, audience-facing controls and future ratification

1. Show only **one Year 0 planetary SDI: 0.947** in all public-facing docs and the 37-state source ledger.
2. Show the **fourteen existing national scores unchanged**.
3. Explicitly mark **60% individual / 40% institutional** as a **candidate weighting**, until approved or independently validated.
4. Distinguish modeled subcomponent values from independently observed national data; do not assign precision unsupported by real or fictional census evidence.
5. Validate `sum(37-country population)=4.412T` and `sum(P_i SDI_i)/4.412T=.947` only when 23 country profiles exist; until then report the **0.912955516** residual requirement.
6. SDI is a composite capability and institutions metric; income Gini, GDP, ancestry, emissions, urbanization, health and governance are distinct inputs/outcomes with their own denominators.
7. Maintain one versioned source for historical snapshots and calculation code; no alternative Year 0 SDI can remain as an unqualified active canon statement.

**Release status:** creator definition, planet SDI 0.947, and preservation of the 14 national SDIs are fixed. Precise component weighting, calibrated individual/institutional microdata and all other 23 sovereign-country records remain **development material**.
