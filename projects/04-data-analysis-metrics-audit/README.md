# Data analysis: a metrics audit of the TouchlineAI scenario

**What this is.** A reproducible analysis that re-derives and stress-tests the numbers behind the case study: the 92% share rate, the 58% editor demand, the proposed pilot gate, and the North Star metric (CCDR).

**What this is not.** Real product data. Inputs are the figures stated in the assessment brief (not re-verified) plus clearly labelled synthetic simulation. The synthetic parts show *mechanisms*, not findings about a real product.

**Run it:** `pip install numpy scipy matplotlib && python3 analysis.py` writes `charts/` and `results.md`. The random seed is fixed.

## The five findings

| # | Finding | Evidence type | Chart |
|---|---|---|---|
| 1 | The "92% share rate" is about **64%** of all generated reels (0.92 x 0.70), under the assumption that unopened reels are never shared. The "35.6% of reach to unlock" framing is wrong: about 5.6 points are reels that were opened and still not shared. | Source numbers + 1 assumption | `01_share_rate_decomposition.png` |
| 2 | The 64.4% headline has false precision. Over plausible input ranges (20-40% unopened, 0-10% sharing without opening) it spans **55% to 76%**. Say "about 64%". | Sensitivity analysis | `02_share_rate_sensitivity.png` |
| 3 | Editor: 6% opened, under 1% of those finished, so **under 0.06%** finished. 58% said they wanted editing. Different populations, so suggestive, not exact. | Source bounds | `03_editor_funnel.png` |
| 4 | The proposed pilot gate (Wilson lower bound >= 0.95 at 500 audited clips) needs **485 of 500 correct (97.0%)**. | Computed | `04_wilson_gate.png` |
| 5 | A system that is *truly* 97% accurate passes that gate only **57%** of the time at n = 500. Truly 98% passes 95% of the time. Truly 96% passes 15% of the time. So the audit size is a real product decision. | Exact binomial | `05_gate_power.png` |
| 6 | Whether an honest zero-highlight week counts as success changes CCDR by about **10 points** in a synthetic cohort. A quiet-playing child is not a product failure, so the current rule can punish honest behaviour. | Synthetic, invented rates | `06_ccdr_rules.png` |

Full numbers: [`results.md`](results.md).

## Why this matters for the product
- Finding 1 and 2 change how you should *talk* about the data. They also show the attribution priority does not depend on a causal claim the data cannot support.
- Findings 4 and 5 turn a vague "high accuracy" gate into a concrete audit-size decision: more audited clips means a fairer test of a good system.
- Finding 6 is a pending product decision (see `docs/CLAIMS_AND_EVIDENCE.md`, item D2).

## Limits
- All source numbers are as stated in the brief and were not re-verified.
- Section 6 invents outcome rates (12% zero, 3% wrong child, 6% held, 4% failed) purely to show the counting-rule mechanism.
- The 64.4% assumes an unopened reel is never shared, and that exactly 30% were unopened.
- Survey and telemetry in finding 3 come from different groups and times.
