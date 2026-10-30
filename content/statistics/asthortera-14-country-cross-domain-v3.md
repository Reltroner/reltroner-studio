---
title: "Asthortera NCCM V3 — 14-Country Cross-Domain Comparison"
description: "Population, SDI, ancestry, narrative specialization and scenario-complete economic statistics for 14 Asthorteran states; reconciled to planet SDI 0.947."
author: "Reltroner Studio"
date: "2026-10-30"
lastUpdated: "2026-10-30"
published: false
canonStatus: "development material"
category: "Worldbuilding · Statistics · Comparisons"
tags: ["Asthortera", "NCCM", "countries", "SDI", "economic modeling"]
---

# Asthortera NCCM V3 — 14 Countries, One Statistical Denominator

**Creator decisions:** Year 0 Asthortera contains **4.412 trillion** unique sentients in **37 sovereign countries** and has a composite **planetary SDI 0.947**. The **14 countries' SDI scores remain unchanged**. National origins for Taramistry, Pencilfania, Beluftner and Hargenbor were updated on **2026-10-30**. SDI now means **average individual capability combined with institutional quality**. See the [SDI methodology V3](./asthortera-sdi-methodology-v3.md).

**Provenance:** All source-derived figures below are read from [14-country census ledger](../../data/asthortera/national-cross-domain-audit-2026-10-30.json) and existing country profiles. Numbers with an **asterisk (*) are calibrated scenario values, NOT measurements or newly ratified national canon**. Calculations from verified inputs (e.g., density, GDP/inhabitant) are derived, but only as reliable as their GDP input. The full source, factors and machine-readable status for **every single field** are in [V3 14-country model data](../../data/asthortera/nccm-v3-14-country-comparative-model.json).

## 1. Population, geography, national SDI and provisional component split

| Country | Pop. (billion) | Land (million km²) | SDI fixed | Individual capability I* | Institutional quality Q* |
|---|---:|---:|---:|---:|---:|
| [Reltronland](../factions/reltronland.md) | 855 | 104 | **0,984** | 0,9780* | 0,9930* |
| [Depcutland](../factions/depcutland.md) | 343 | 52 | **0,981** | 0,9730* | 0,9930* |
| [Kalgered](../factions/kalgered.md) | 108 | 108 | **0,979** | 0,9698* | 0,9928* |
| [Aurastelia](../factions/aurastelia.md) | 164 | 433 | **0,970** | 0,9760* | 0,9610* |
| [Astrostelia](../factions/astrostelia.md) | 220 | 216 | **0,957** | 0,9534* | 0,9624* |
| [Lenternow](../factions/lenternow.md) | 214 | 117 | **0,935** | 0,9334* | 0,9374* |
| [Taramistry](../factions/taramistry.md) | 242 | 125 | **0,954** | 0,9496* | 0,9606* |
| [Moreg](../factions/moreg.md) | 205 | 79 | **0,931** | 0,9286* | 0,9346* |
| [Pencilfania](../factions/pencilfania.md) | 182 | 166 | **0,940** | 0,9444* | 0,9334* |
| [Stelpadland](../factions/stelpadland.md) | 141 | 200 | **0,961** | 0,9638* | 0,9568* |
| [Pasgerflit](../factions/pasgerflit.md) | 279 | 72 | **0,949** | 0,9462* | 0,9532* |
| [Hargenbor](../factions/hargenbor.md) | 133 | 39 | **0,925** | 0,9298* | 0,9178* |
| [Beluftner](../factions/beluftner.md) | 91 | 88 | **0,896** | 0,9020* | 0,8870* |
| [Cenrestier](../factions/cenrestier.md) | 111 | 102 | **0,911** | 0,9070* | 0,9170* |
| **14-country total / mean** | **3,288** | **1,901** | **0,958638 population-weighted** | See model* | See model* |

The **60% individual / 40% institutional** relationship is a **proposed calibration weight**, not a creator-ratified ratio. Each candidate `0.60 × I + 0.40 × Q` equals the **existing fixed national SDI** exactly. Synthetic I/Q estimates are a tool for testing institutional strengths, not pretend survey measurements.

**Planetary reconciliation:**

```text
SDI_planet,Year0 = 0.947
population_planet = 4,412 billion
Σ(pop_i × national_SDI_i), 14 profiled nations = 3,152.002 billion · SDI
Required remaining 23-country composite SDI sum = 1,026.162 billion · SDI
Required 23-country weighted SDI = 1,026.162 / 1,124
                                 = 0.912955516014234
```

The combined 23-country SDI is a **conditional implied mean**, not a claim that all 23 nations have identical capabilities. Its country-level decomposition remains outstanding.

## 2. Economic production, nominal currency and distribution

**Reporting units:** *AUC* is a comparative reporting benchmark with **1 AUC = USD 2.73**, not each country's transaction currency. **GDP in the table is in 10^18 AUC/year**, **GDP per capita is in 10^9 USD/person/year**, and **scenario GNI per capita in 10^6 AUC/person/year**. GDP shares sum to planet 100% **including the explicit 23-country residual**.

| Country | % planetary GDP | GDP (10^18 AUC) | GDP/head (10^9 USD) | GNI/head (10^6 AUC)* | Income Gini | Debt/GDP |
|---|---:|---:|---:|---:|---:|---:|
| [Reltronland](../factions/reltronland.md) | 42,000% | 1.738,059* | 5,550 | 2.032,82* | 0,390 | 85% |
| [Depcutland](../factions/depcutland.md) | 9,983%* | 413,138* | 3,288* | 1.204,49* | 0,250* | 61%* |
| [Kalgered](../factions/kalgered.md) | 2,801%* | 115,917* | 2,930* | 1.073,30* | 0,210 | 45% |
| [Aurastelia](../factions/aurastelia.md) | 3,628%* | 150,147* | 2,499* | 915,53* | 0,230* | 48%* |
| [Astrostelia](../factions/astrostelia.md) | 4,655%* | 192,655* | 2,391* | 875,70* | 0,280* | 56%* |
| [Lenternow](../factions/lenternow.md) | 3,336%* | 138,065* | 1,761* | 645,16* | 0,310* | 57%* |
| [Taramistry](../factions/taramistry.md) | 4,807%* | 198,914* | 2,244* | 821,96* | 0,320 | 68% |
| [Moreg](../factions/moreg.md) | 2,851%* | 117,996* | 1,571* | 575,59* | 0,330* | 65%* |
| [Pencilfania](../factions/pencilfania.md) | 2,770%* | 114,623* | 1,719* | 629,80* | 0,290* | 53%* |
| [Stelpadland](../factions/stelpadland.md) | 2,545%* | 105,339* | 2,040* | 747,08* | 0,240* | 42%* |
| [Pasgerflit](../factions/pasgerflit.md) | 5,629%* | 232,931* | 2,279* | 834,88* | 0,320* | 63%* |
| [Hargenbor](../factions/hargenbor.md) | 1,558%* | 64,470* | 1,323* | 484,74* | 0,370* | 74%* |
| [Beluftner](../factions/beluftner.md) | 0,746%* | 30,877* | 0,926* | 339,31* | 0,280* | 44%* |
| [Cenrestier](../factions/cenrestier.md) | 1,143%* | 47,279* | 1,163* | 425,94* | 0,300* | 59%* |
| **Other 23 states — aggregate scenario** | **11,547%*** | **477,824*** | **1,161*** | **425,11*** | Not derived | Not derived |

**Fixed GDP facts:** Reltronland holds **42%** of Year 0 planet core GDP, **REL 4.1527217475 × 10^19 / USD 4.7448998686935 × 10^21**. At that share, core planet GDP **USD 1.129738063975e+22** or **AUC 4.138234666574e+21**. **All other GDP allocations are model candidates**, based on population, country SDI and transparent sector multipliers; they are not inferred from a measured exchange rate, tax ledger or national production census.

**Existing national-currency facts, not overwritten:** Reltronland **REL 48,569,845 GNI/head/year**, Kalgered **KAL 17,956,408 GNI/head/year**, Taramistry **TAR 2,256,740 GNI/head/year**, and Lenternow **LNR 182 quadrillion GDP/year**. Their local-currency amounts **cannot be equated to AUC/USD values without national exchange rates and the GDP-to-GNI bridge**. Scenario GNI/AUC uses an explicitly hypothetical zero-net-primary-income bridge and is **not** a replacement for independently stated local-currency GNI.

## 3. Growth, inflation, employment, emissions, urbanization, lifespan, fertility

| Country | Year 0 real GDP growth | CPI inflation | Unemployment | CO₂ t/head | Urban share | Life exp. yrs | Median age yrs | TFR |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| [Reltronland](../factions/reltronland.md) | 7,50%* | 0,30% | 1,50% | 4,3 | 97,5%* | 498 | 225 | 1,13* |
| [Depcutland](../factions/depcutland.md) | 7,50%* | 0,28%* | 1,70%* | 3,2* | 96,0%* | 490* | 254* | 1,29* |
| [Kalgered](../factions/kalgered.md) | 6,90%* | 0,26%* | 1,80%* | 1,3 | 86,0%* | 489* | 254* | 1,60* |
| [Aurastelia](../factions/aurastelia.md) | 7,00%* | 0,24%* | 1,60%* | 1,7* | 82,0%* | 485* | 254* | 1,91* |
| [Astrostelia](../factions/astrostelia.md) | 7,80%* | 0,37%* | 1,90%* | 2,6* | 88,0%* | 480* | 253* | 1,64* |
| [Lenternow](../factions/lenternow.md) | 7,30%* | 0,35%* | 2,20%* | 2,1* | 92,0%* | 470* | 251* | 1,67* |
| [Taramistry](../factions/taramistry.md) | 8,20%* | 0,41%* | 2,10%* | 4,9 | 90,0%* | 478* | 252* | 1,72* |
| [Moreg](../factions/moreg.md) | 8,30%* | 0,37%* | 2,30%* | 5,4* | 93,0%* | 468* | 251* | 1,47* |
| [Pencilfania](../factions/pencilfania.md) | 7,10%* | 0,32%* | 2,00%* | 2,2* | 84,0%* | 472* | 252* | 1,84* |
| [Stelpadland](../factions/stelpadland.md) | 6,80%* | 0,27%* | 1,80%* | 1,2* | 73,0%* | 481* | 253* | 1,60* |
| [Pasgerflit](../factions/pasgerflit.md) | 8,20%* | 0,36%* | 2,00%* | 3,7* | 94,5%* | 476* | 252* | 1,78* |
| [Hargenbor](../factions/hargenbor.md) | 6,70%* | 0,45%* | 2,90%* | 3,1* | 87,5%* | 465* | 251* | 1,82* |
| [Beluftner](../factions/beluftner.md) | 6,20%* | 0,48%* | 3,30%* | 1,6* | 72,0%* | 452* | 249* | 1,76* |
| [Cenrestier](../factions/cenrestier.md) | 6,70%* | 0,34%* | 2,70%* | 2,6* | 81,0%* | 459* | 250* | 1,69* |

**Asterisks mean scenario, not canon.** In particular, age, median, TFR, emissions and urban rates for most countries are not supported by independent cohort/environment observations. Emissions for **Reltronland are offset-adjusted**; raw-versus-offset emission differences currently block an official comparative rank. Planet **89.5% urbanization** and **0.33% current price inflation** are narrative anchors: the derived residual scenario implies **86,145%** urbanization and **0,3261%** price inflation across the 23-country block (arithmetic population-CPI proxy only). The Year 0 planet **7.5% real growth** requirement implies **7,431%** residual real GDP growth (GDP-weighted illustrative proxy, not a measured trade-adjusted real aggregation).

**Historic-growth restructuring:** Kalgered's former **7% average per year over the last century** and Taramistry's **8% average** are not maintained as permanent 100-year national CAGRs. **Kalgered 3.0% and Taramistry 3.5% last-100-year real CAGR** are modeling proposals; **7%/8% specific-year exceptional booms** preserve their innovation narratives. See [Kalgered](../factions/kalgered.md) and [Taramistry](../factions/taramistry.md). These national 100-year scenario rates are different from Year 0 single-year growth and the 1010-year **nominal USD GDP** α/ρ endpoints.

## 4. NCCM V4 — Phantomkind / Spiritual Hybrid six-category ancestry overlay

The creator recognizes **Phantomkind / Spiritual Hybrid** as a distinct, global primary registration category. Beluftner's **6% Phantomkind, 2% Cosmeilian, 1% Other** values are ratified. The other thirteen countries have **unknown, not zero** Phantomkind primary proportions: their inherited five-category tables already sum to 100%. [Detailed V4 crosswalk](./asthortera-phantomkind-demography-v4.md).

| Country | Depeisit | Cistheta | Cosmeilian | Native | Phantomkind / Spiritual Hybrid | Other |
|---|---:|---:|---:|---:|---:|---:|
| [Reltronland](../factions/reltronland.md) | 66,0% | 22,0% | 4,0% | 5,0% | Unknown† | 3,0% |
| [Depcutland](../factions/depcutland.md) | 81,0% | 10,0% | 3,0% | 4,0% | Unknown† | 2,0% |
| [Kalgered](../factions/kalgered.md) | 40,0% | 10,0% | 13,0% | 35,0% | Unknown† | 2,0% |
| [Aurastelia](../factions/aurastelia.md) | 5,0% | 7,0% | 80,0% | 4,0% | Unknown† | 4,0% |
| [Astrostelia](../factions/astrostelia.md) | 9,0% | 16,0% | 65,0% | 6,0% | Unknown† | 4,0% |
| [Lenternow](../factions/lenternow.md) | 26,0% | 29,0% | 38,0% | 5,0% | Unknown† | 2,0% |
| [Taramistry](../factions/taramistry.md) | 54,0% | 25,0% | 12,0% | 5,0% | Unknown† | 4,0% |
| [Moreg](../factions/moreg.md) | 45,0% | 30,0% | 13,0% | 10,0% | Unknown† | 2,0% |
| [Pencilfania](../factions/pencilfania.md) | 56,0% | 23,0% | 14,0% | 3,0% | Unknown† | 4,0% |
| [Stelpadland](../factions/stelpadland.md) | 52,0% | 22,0% | 6,0% | 18,0% | Unknown† | 2,0% |
| [Pasgerflit](../factions/pasgerflit.md) | 62,0% | 21,0% | 5,0% | 6,0% | Unknown† | 6,0% |
| [Hargenbor](../factions/hargenbor.md) | 44,0% | 40,0% | 6,0% | 8,0% | Unknown† | 2,0% |
| [Beluftner](../factions/beluftner.md) | 0,2% | 0,5% | 2,0% | 90,3% | 6,0% | 1,0% |
| [Cenrestier](../factions/cenrestier.md) | 7,0% | 8,0% | 7,0% | 73,0% | Unknown† | 5,0% |

† **Unknown, not 0%.** No country may receive a new positive primary demographic share without reducing some previous assigned category. These rows remain mixed five-way legacy / six-way new census until harmonized. Derived source primary totals across all fourteen: **535.200 billion Cosmeilian**, **378.753 billion Native**, and **at least 5.460 billion Phantomkind** (Beluftner). The global old **58/22/10/7/3** partition is not a harmonized six-way planetary primary taxonomy; reconcile before claiming precise global Phantomkind percentages.

## 5. Qualitative economy, currencies and education

| Country | Narrative specialization (source-derived) | National currency in source | Education/access proxy |
|---|---|---|---:|
| [Reltronland](../factions/reltronland.md) | Aerospace, AI, high-rise infrastructure, knowledge systems | REL | 0,992* |
| [Depcutland](../factions/depcutland.md) | Archives, libraries, law, epistemic and financial systems | DEL | 0,989* |
| [Kalgered](../factions/kalgered.md) | Diplomacy, neutral law, finance, data security, medicine | KAL | 0,987* |
| [Aurastelia](../factions/aurastelia.md) | Cosmeilian culture, wellness, aurora and resonance systems | ALC | 0,978* |
| [Astrostelia](../factions/astrostelia.md) | Cosmology, orbital engineering, interstellar research | Belum terverifikasi | 0,965* |
| [Lenternow](../factions/lenternow.md) | Light engineering, phosphor resources, luminance exports | LNR | 0,943* |
| [Taramistry](../factions/taramistry.md) | Biotechnology, medicine, chemistry, applied research | TAR | 0,962* |
| [Moreg](../factions/moreg.md) | Automotive engineering, roads, transport mobility | Belum terverifikasi | 0,939* |
| [Pencilfania](../factions/pencilfania.md) | Creative education, animation, design, visual literacy | PNL | 0,948* |
| [Stelpadland](../factions/stelpadland.md) | Scouting, forestry, experiential learning, timber | ST | 0,969* |
| [Pasgerflit](../factions/pasgerflit.md) | Aviation, airports, airspace, interstellar transit | PAS | 0,957* |
| [Hargenbor](../factions/hargenbor.md) | Maritime trade, ports, aquaculture, undersea engineering | HB | 0,933* |
| [Beluftner](../factions/beluftner.md) | Arcane education, magical agriculture, spiritual heritage | BLF | 0,904* |
| [Cenrestier](../factions/cenrestier.md) | Fortress maintenance, constitutional law, history, archives | Belum terverifikasi | 0,919* |

The education-access proxy is deliberately marked with an asterisk: it is **not a measured child literacy, credential success, attendance or accessibility rate**. It is a synthetic input for testing the individual/institutional SDI framework. Country-specific production systems remain distinct and sovereign; no shared planet GDP allocation implies annexation, unitary currency or identical aesthetic.

## 6. Fixed vs candidate vs missing (definition of done)

| Type | Treatment |
|---|---|
| **Ratified canon** | 4.412 trillion unique residents; 37 countries; planet SDI 0.947; national 14 SDI anchors unchanged; four ancestry revisions |
| **Established national facts** | Local GDP/GNI, selected Gini/debt/CO₂, known currencies, population, land, institutional specialization |
| **Derived mathematical constraints** | 14 countries 3.288T; 23 states 1.124T; 23-country SDI residual 0.912955516; GDP planet/REL identities |
| **Explicit modeling, NOT canon** | 60/40 SDI decomposition, unmeasured national GDP, income Gini, debt, CPI, TFR, longevity, annual growth, education access, urbanization and employment |
| **Still missing actual records** | 23 separate national populations/SDIs, national annual GDP accounts, standard FX/PPP, individual microdata, institutional component measurements, age-specific cohorts, real GDP deflators |

### Statistical integrity policy

**One number per metric × location × period × unit × status × accounting scope.** A model estimate can fill a comparison column *without* being promoted to a historical observation; its source and scenario label must travel with it. The [NCCM V3 JSON](../../data/asthortera/nccm-v3-14-country-comparative-model.json) is the single source of calculated comparison values; individual country files reference it rather than independently maintaining conflicting scenario formulas.

**Approval boundary:** this document and its modeled rows remain **unpublished development material** pending approval and the rest of the 37-country historical model. Never present the marked synthetic statistics as independently established canon to fans.
