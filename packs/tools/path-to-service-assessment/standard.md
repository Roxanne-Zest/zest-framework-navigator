---
id: path-to-service-assessment.standard
pack: path-to-service-assessment
pack_type: tool
part: standard
title: "Assessment standard — the scoring model"
version: 0.1.0
owner: roxanne
trust: draft
gate: review
---

# Standard — what is measured and how it scores

## Unit of measurement
The grid: 9 classes × bands 1–5. Each class is assessed per band against the indicator sets in build.md.

## Cell scoring scale
| Score | Meaning | Evidence bar |
|---|---|---|
| 0 | Absent | No evidence it exists |
| 1 | Claimed or partial | Stated in interview, or exists but incomplete, stale or unowned |
| 2 | Operating | Seen in the instance; populated; owned; sampled data passes |
| 3 | Embedded | Operating, plus maintained by process — survives leavers, stays true over time |

## Band attainment
A class sits at band N when every indicator set for bands 1..N scores ≥2. A single score-1 cell caps the class below that band; partial credit is recorded but does not count. Deliberate: "nearly accounted for" is not accounted for.

## Evidence rules
- Interview claims cap at 1. Only instance inspection or data sampling can award 2 or above.
- Sampling floor: 20 records per class, or 100% when fewer exist. Sample ids are recorded — every score must be re-derivable.
- Score what is, not the roadmap. Aspiration is a finding, never a score.

## Fixed output formats
- Scored grid: one row per class, cells 0–3, band attained highlighted
- Findings log: id · class · band · what was seen · evidence ref · what it blocks
- Benefit baseline sheet: outcome id · metric · unit · current value · source · date
