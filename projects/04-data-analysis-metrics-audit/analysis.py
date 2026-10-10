"""Metrics audit for the TouchlineAI case study.

Inputs are ONLY the numbers stated in the assessment brief (92% share among opened
reels, ~30% unopened, 6% editor open rate, <1% finish rate) plus clearly labelled
SYNTHETIC simulations. Nothing here is real product data.

Run:  python3 analysis.py      (needs numpy, scipy, matplotlib)
Writes charts/*.png and results.md next to this file.
"""
from pathlib import Path
import numpy as np
from scipy.stats import binom
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = Path(__file__).parent
CH = HERE / "charts"
CH.mkdir(exist_ok=True)
rng = np.random.default_rng(42)  # fixed seed so results reproduce
out = []  # lines for results.md
plt.rcParams.update({"font.size": 11, "axes.spines.top": False, "axes.spines.right": False})
BLUE, AMBER, RED, GREY = "#2563EB", "#B45309", "#DC2626", "#6B7280"


def wilson(k, n, z=1.96):
    p = k / n
    d = 1 + z * z / n
    c = p + z * z / (2 * n)
    r = z * np.sqrt(p * (1 - p) / n + z * z / (4 * n * n))
    return (c - r) / d, (c + r) / d


# ---------------------------------------------------------------- 1. share-rate decomposition
share_open, unopened = 0.92, 0.30
opened = 1 - unopened
shared = share_open * opened          # assumes unopened reels are never shared
opened_not_shared = opened - shared
out += ["## 1. Share-rate decomposition (source numbers, one assumption)", "",
        f"- Reported share rate, among opened reels only: **{share_open:.0%}**",
        f"- Unopened reels: **~{unopened:.0%}** (source says 'roughly')",
        f"- Shared / all generated reels = {share_open} x {opened:.2f} = **{shared:.1%}** *(assumes an unopened reel is never shared)*",
        f"- Opened but not shared = {opened_not_shared:.1%}; unopened = {unopened:.0%}",
        f"- So the 'unlocked reach' from fixing everything is NOT 35.6%: about {opened_not_shared*100:.1f} points are reels that were opened and still not shared.", ""]

fig, ax = plt.subplots(figsize=(7.5, 3.2))
ax.barh(["All generated reels"], [shared], color=BLUE, label=f"Opened and shared ({shared:.1%})")
ax.barh(["All generated reels"], [opened_not_shared], left=[shared], color=AMBER, label=f"Opened, not shared ({opened_not_shared:.1%})")
ax.barh(["All generated reels"], [unopened], left=[shared + opened_not_shared], color=GREY, label=f"Never opened ({unopened:.0%})")
ax.set_xlim(0, 1); ax.set_xlabel("Share of all generated reels"); ax.xaxis.set_major_formatter(lambda v, _: f"{v:.0%}")
ax.set_title("Where the 92% went: 64.4% of reels were shared, not 92%", loc="left", fontsize=12)
ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.45), ncol=3, frameon=False, fontsize=9)
fig.subplots_adjust(bottom=0.48, top=0.86, left=0.2, right=0.97)
fig.savefig(CH / "01_share_rate_decomposition.png", dpi=160); plt.close(fig)

# ---------------------------------------------------------------- 2. sensitivity of the 64.4%
un = np.linspace(0.20, 0.40, 5)
leak = np.linspace(0.0, 0.10, 6)   # P(shared | unopened): share without opening (e.g. link forwarded)
grid = np.array([[share_open * (1 - u) + l * u for l in leak] for u in un])
fig, ax = plt.subplots(figsize=(7.5, 3.8))
im = ax.imshow(grid, cmap="Blues", vmin=0.55, vmax=0.80, aspect="auto", origin="lower")
ax.set_xticks(range(len(leak)), [f"{l:.0%}" for l in leak]); ax.set_yticks(range(len(un)), [f"{u:.0%}" for u in un])
ax.set_xlabel("Assumed share rate among UNOPENED reels"); ax.set_ylabel("Unopened fraction")
for i in range(len(un)):
    for j in range(len(leak)):
        ax.text(j, i, f"{grid[i, j]:.1%}", ha="center", va="center", fontsize=9, color="white" if grid[i, j] > 0.7 else "black")
ax.set_title("Effective share rate depends on two inputs the source does not pin down", loc="left", fontsize=11)
fig.tight_layout(); fig.savefig(CH / "02_share_rate_sensitivity.png", dpi=160); plt.close(fig)
out += ["## 2. Sensitivity of the 64.4% headline", "",
        f"- Range over unopened 20-40% and 0-10% leak: **{grid.min():.1%} to {grid.max():.1%}**.",
        "- Takeaway: 'about 64%' is fair; '64.4%' implies precision the inputs do not have.", ""]

# ---------------------------------------------------------------- 3. editor funnel bounds
open_rate, finish_cond = 0.06, 0.01
bound = open_rate * finish_cond
out += ["## 3. Editor funnel (source bounds)", "",
        f"- Opened editor: **{open_rate:.0%}**; finished among openers: **< {finish_cond:.0%}**; so finished overall **< {bound:.2%}**.",
        "- Stated survey demand was 58% (n = 210, 40 clubs). Survey and telemetry cover different groups, so the gap is suggestive, not exact.",
        "- Illustration (SYNTHETIC cohort): per 100,000 accounts, at most 6,000 open the editor and fewer than 60 finish an edit.", ""]
fig, ax = plt.subplots(figsize=(7.5, 3.2))
stages = ["Said they want editing\n(survey, 58%)", "Opened the editor\n(telemetry, 6%)", "Finished an edit\n(telemetry, < 0.06%)"]
vals = [58, 6, 0.06]
bars = ax.bar(stages, vals, color=[GREY, BLUE, RED])
for b, v in zip(bars, vals):
    ax.text(b.get_x() + b.get_width() / 2, v + 1, f"{v:g}%" if v >= 1 else "< 0.06%", ha="center")
ax.set_ylim(0, 70); ax.set_ylabel("% of respondents / accounts")
ax.set_title("Stated demand vs revealed behaviour (different populations; suggestive)", loc="left", fontsize=11)
fig.tight_layout(); fig.savefig(CH / "03_editor_funnel.png", dpi=160); plt.close(fig)

# ---------------------------------------------------------------- 4. Wilson gate: what 500 audited clips can show
n = 500
ks = np.arange(440, 501)
lows = np.array([wilson(k, n)[0] for k in ks])
need = int(ks[np.argmax(lows >= 0.95)])
out += ["## 4. The proposed pilot gate (Wilson lower bound >= 0.95 at n = 500 audited clips)", "",
        f"- Smallest passing count at n = 500: **{need} correct** ({need / n:.1%} observed) -> lower bound {wilson(need, n)[0]:.4f}.",
        f"- 500/500 correct -> lower bound {wilson(500, n)[0]:.4f}; 480/500 -> {wilson(480, n)[0]:.4f} (fails).", ""]
fig, ax = plt.subplots(figsize=(7.5, 3.6))
ax.plot(ks / n, lows, color=BLUE, lw=2)
ax.axhline(0.95, color=RED, ls="--"); ax.text(0.885, 0.953, "gate: lower bound 0.95", color=RED)
ax.axvline(need / n, color=GREY, ls=":"); ax.text(need / n + 0.002, 0.90, f"needs {need}/500\n= {need / n:.1%} observed", color=GREY)
ax.set_xlabel("Observed accuracy among 500 audited clips"); ax.set_ylabel("Wilson 95% lower bound")
ax.set_title("A 95% gate needs ~97% observed accuracy at n = 500", loc="left", fontsize=12)
fig.tight_layout(); fig.savefig(CH / "04_wilson_gate.png", dpi=160); plt.close(fig)

# ---------------------------------------------------------------- 5. power: chance a system of true accuracy p passes the gate
def pass_prob(p, n):
    k = np.arange(0, n + 1)
    ok = np.array([wilson(int(x), n)[0] >= 0.95 for x in k])
    return float(binom.pmf(k, n, p)[ok].sum())

ns = [200, 500, 1000, 2000]
ps = [0.96, 0.97, 0.98, 0.99]
tab = {(p, n_): pass_prob(p, n_) for p in ps for n_ in ns}
out += ["## 5. Chance that a system with a given TRUE accuracy passes the gate (exact binomial)", "",
        "| true accuracy | n=200 | n=500 | n=1000 | n=2000 |", "|---|---|---|---|---|"]
for p in ps:
    out.append(f"| {p:.0%} | " + " | ".join(f"{tab[(p, n_)]:.0%}" for n_ in ns) + " |")
out += ["", "- Reading: at n = 500 a system that is truly 97% accurate passes only about half the time; 98% passes almost always.",
        "- Implication: choosing n is a product decision about how much wrongly-delivered content the pilot will tolerate.", ""]
fig, ax = plt.subplots(figsize=(7.5, 3.8))
for p, c in zip(ps, [RED, AMBER, BLUE, "#047857"]):
    ax.plot(ns, [tab[(p, n_)] for n_ in ns], marker="o", color=c, label=f"true accuracy {p:.0%}")
ax.set_xscale("log"); ax.set_xticks(ns, [str(x) for x in ns]); ax.minorticks_off(); ax.set_ylim(-0.02, 1.02)
ax.yaxis.set_major_formatter(lambda v, _: f"{v:.0%}"); ax.set_xlabel("Audited clips (n)"); ax.set_ylabel("Probability the gate passes")
ax.legend(frameon=False, loc="lower right"); ax.set_title("How many audited clips does the gate need?", loc="left", fontsize=12)
fig.tight_layout(); fig.savefig(CH / "05_gate_power.png", dpi=160); plt.close(fig)

# ---------------------------------------------------------------- 6. CCDR counting rule (SYNTHETIC cohort)
cohort = 12 * 10      # 12 children x 10 game weeks (synthetic)
p_zero, p_wrong, p_held, p_fail = 0.12, 0.03, 0.06, 0.04  # invented, for illustration only
u = rng.random(cohort)
zero = u < p_zero
wrong = (u >= p_zero) & (u < p_zero + p_wrong)
held = (u >= p_zero + p_wrong) & (u < p_zero + p_wrong + p_held)
fail = (u >= p_zero + p_wrong + p_held) & (u < p_zero + p_wrong + p_held + p_fail)
good = ~(zero | wrong | held | fail)
ccdr_a = good.sum() / cohort                       # zero-highlight week counts as a miss (current rule)
ccdr_b = (good.sum() + zero.sum()) / cohort        # honest zero counts as success
out += ["## 6. CCDR under two counting rules (SYNTHETIC cohort, invented rates)", "",
        f"- Cohort: {cohort} child-weeks. Invented outcome rates: zero-highlight {p_zero:.0%}, wrong child {p_wrong:.0%}, held {p_held:.0%}, delivery failure {p_fail:.0%}.",
        f"- Rule A (honest zero = miss, the current choice): CCDR = **{ccdr_a:.1%}**",
        f"- Rule B (honest zero = success): CCDR = **{ccdr_b:.1%}**",
        f"- Difference: {100 * (ccdr_b - ccdr_a):.1f} points, driven entirely by how common zero-highlight weeks are. A quiet-playing child is not a product failure, so Rule A can punish honest behaviour.",
        "- This is the product decision flagged in docs/CLAIMS_AND_EVIDENCE.md (item D2). The rates are made up; only the mechanism is the finding.", ""]
fig, ax = plt.subplots(figsize=(7.5, 3.4))
labs = ["Rule A\n(zero = miss)", "Rule B\n(zero = success)"]
ax.bar(labs, [ccdr_a, ccdr_b], color=[BLUE, AMBER])
for i, v in enumerate([ccdr_a, ccdr_b]):
    ax.text(i, v + 0.01, f"{v:.1%}", ha="center")
ax.set_ylim(0, 1); ax.yaxis.set_major_formatter(lambda v, _: f"{v:.0%}")
ax.set_title("Same synthetic cohort, two counting rules (illustrative)", loc="left", fontsize=12)
fig.tight_layout(); fig.savefig(CH / "06_ccdr_rules.png", dpi=160); plt.close(fig)

head = ["# Results (generated by analysis.py)", "",
        "> Source numbers come from the assessment brief and were not re-verified. Sections 5 and 6 use synthetic or invented inputs and show mechanisms, not findings about a real product.", ""]
(HERE / "results.md").write_text("\n".join(head + out) + "\n", encoding="utf-8")
print("ok")
