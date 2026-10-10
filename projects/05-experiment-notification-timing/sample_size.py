"""Sample size for a two-arm test on a proportion (reel opened within 72h).
Baseline 70% open rate is the figure from the case-study brief (source, not re-checked).
Run: python3 sample_size.py   (needs scipy)
"""
from math import ceil, sqrt
from scipy.stats import norm

def n_per_arm(p1, delta, alpha=0.05, power=0.80):
    p2 = p1 + delta
    za, zb = norm.ppf(1 - alpha / 2), norm.ppf(power)
    pbar = (p1 + p2) / 2
    num = (za * sqrt(2 * pbar * (1 - pbar)) + zb * sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2
    return ceil(num / delta ** 2)

print("| Minimum detectable lift | Guardians per arm (independent) | with design effect 1.5 (assumed clustering) |")
print("|---|---|---|")
for d in (0.02, 0.03, 0.05, 0.10, 0.15):
    n = n_per_arm(0.70, d)
    print(f"| +{d*100:.0f} points (70% to {70+d*100:.0f}%) | {n:,} | {ceil(n*1.5):,} |")
