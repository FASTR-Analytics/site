"""Generates the synthetic HMIS dataset for the demo fixture.

Input:  facs.txt (facility_id|admin_area_2|facility_type) and inds.txt
        (indicator_id|data_id|definition_type), exported from the demo database.
Output: dataset.csv (facility_id,data_id,period_id,count,version_id) plus
        fmap.csv / dmap.csv (old -> new random facility and DHIS2 data IDs).
Volumes depend on facility type and region, with growth, seasonality, noise,
occasional outliers and missing reports. Completeness is lowest for postnatal
care (newborns) and in Southern and Eastern, matching the demo deck and report.
"""
import random, math, csv
random.seed(2025)
ALNUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
def uid(): return random.choice(ALNUM[:52]) + "".join(random.choice(ALNUM) for _ in range(10))
facs = [l.strip().split("|") for l in open("facs.txt") if l.strip()]
inds = [l.strip().split("|") for l in open("inds.txt") if l.strip()]
fmap = {f[0]: uid() for f in facs}
dmap = {i[1]: (uid() if i[2] == "dhis2_element" else i[1]) for i in inds}
with open("fmap.csv", "w") as fh:
    for k, v in fmap.items(): fh.write(f"{k},{v}\n")
with open("dmap.csv", "w") as fh:
    for k, v in dmap.items(): fh.write(f"{k},{v}\n")
base = {  # monthly volume by type: (Health post, Health centre, Hospital)
 "opd": (280, 1100, 3800), "anc1": (22, 75, 190), "anc4": (9, 36, 105), "delivery": (3, 38, 240),
 "sba": (2, 34, 225), "pnc1_mother": (2, 30, 190), "pnc1_newborn": (2, 24, 160), "bcg": (6, 45, 230),
 "penta1": (20, 70, 170), "penta3": (17, 60, 150), "measles1": (15, 55, 135), "measles2": (10, 40, 100),
 "ipd": (0, 18, 320), "new_fp": (14, 48, 115)}
tidx = {"Health post": 0, "Health centre": 1, "Hospital": 2}
region_vol = {"Northern": 1.35, "Highlands": 1.2, "Central": 1.0, "Eastern": 0.95, "Southern": 0.9, "Western": 0.7}
region_rep = {"Northern": 0.95, "Highlands": 0.975, "Central": 0.95, "Eastern": 0.91, "Southern": 0.89, "Western": 0.97}
periods = [y * 100 + m for y in (2022, 2023, 2024, 2025) for m in range(1, 13) if y * 100 + m <= 202504]
rows = 0
with open("dataset.csv", "w", newline="") as fh:
    w = csv.writer(fh)
    for fid, region, ftype in facs:
        t = tidx.get(ftype, 0); fmult = math.exp(random.gauss(0, 0.35)); frep = min(0.995, region_rep[region] + random.gauss(0, 0.03))
        for ind_id, data_id, _ in inds:
            b = base[ind_id][t]
            if b == 0: continue
            if ind_id in ("delivery", "sba", "pnc1_mother", "pnc1_newborn", "ipd") and t == 0 and random.random() < 0.7: continue
            rep = frep * (0.82 if ind_id == "pnc1_newborn" else 1.0)
            if ind_id == "pnc1_newborn" and region in ("Southern", "Eastern"): rep *= 0.86
            for k, p in enumerate(periods):
                if random.random() > rep: continue
                y = (p // 100) - 2022; m = p % 100
                trend = 1 + 0.045 * (y + (m - 1) / 12)
                season = 1 + 0.08 * math.sin(2 * math.pi * (m - 3) / 12)
                v = b * fmult * region_vol[region] * trend * season * random.gauss(1, 0.12)
                if random.random() < 0.004: v *= random.uniform(4, 8)  # occasional outlier
                c = max(0, int(round(v)))
                if c == 0 and random.random() < 0.5: continue
                w.writerow([fmap[fid], dmap[data_id], p, c, 1]); rows += 1
print("rows", rows, "facilities", len(fmap))
