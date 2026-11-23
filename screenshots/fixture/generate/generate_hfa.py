"""Generates the demo HFA files: demo_hfa_questionnaire.xlsx (XLSForm),
demo_hfa_round1.csv / demo_hfa_round2.csv (two survey rounds) and
demo_hfa_indicators.xlsx (indicator workbook for the HFA indicators manager).

Input: hfa_facs.txt, a sample of HMIS facilities exported from the demo database
(facility_id|region|district|subdistrict|facility_name|facility_type|ownership).
Round 2 changes the name or type of four facilities, so the import's Changes step
has Keep/Take decisions to show. Requires openpyxl.
"""
import csv, random, openpyxl
random.seed(5)
facs = [l.strip().split("|") for l in open("hfa_facs.txt") if l.strip()]

wb = openpyxl.Workbook(); ws = wb.active; ws.title = "survey"
ws.append(["type", "name", "label::English (en)"])
for r in [("text", "id_fac", "Facility ID"), ("text", "region", "Region"), ("text", "district", "District"), ("text", "subdistrict", "Sub-district"),
          ("text", "facility_name", "Facility name"), ("text", "facility_type", "Facility type"),
          ("select_one yesno", "sh_01", "Does the facility have a reliable source of electricity?"),
          ("select_one yesno", "sh_02", "Does the facility have an improved water source on site?"),
          ("select_one avail", "sh_03", "Is oxytocin available today?"),
          ("select_one avail", "sh_04", "Is amoxicillin available today?"),
          ("integer", "st_01", "Number of midwives currently working at the facility"),
          ("integer", "st_02", "Number of nurses currently working at the facility"),
          ("select_multiple services", "sv_01", "Which of these services does the facility offer?"),
          ("select_one yesno", "cc_01", "Is there a functional refrigerator for vaccines?")]:
    ws.append(list(r))
ch = wb.create_sheet("choices"); ch.append(["list_name", "name", "label::English (en)"])
for r in [("yesno", "1", "Yes"), ("yesno", "2", "No"), ("avail", "a", "Available, observed"), ("avail", "b", "Available, not observed"),
          ("avail", "c", "Not available"), ("services", "anc", "Antenatal care"), ("services", "del", "Delivery"),
          ("services", "fp", "Family planning"), ("services", "imm", "Immunization")]:
    ch.append(list(r))
st = wb.create_sheet("settings"); st.append(["form_title", "form_id"]); st.append(["Demo health facility assessment", "demo_hfa"])
wb.save("demo_hfa_questionnaire.xlsx")

def row(f, rnd):
    fid, r, d, s, name, typ, own = f
    good = {"Hospital": 0.95, "Health centre": 0.8, "Health post": 0.6}[typ] + (0.05 if rnd == 2 else 0)
    yn = lambda p: "1" if random.random() < p else "2"
    av = lambda p: random.choices(["a", "b", "c"], [p * 0.8, p * 0.2, 1 - p])[0]
    serv = ["anc", "fp"] + (["del"] if typ != "Health post" or random.random() < 0.3 else []) + (["imm"] if random.random() < 0.85 else [])
    mid = {"Hospital": random.randint(6, 20), "Health centre": random.randint(1, 5), "Health post": random.randint(0, 1)}[typ]
    nur = {"Hospital": random.randint(15, 40), "Health centre": random.randint(3, 10), "Health post": random.randint(1, 3)}[typ]
    return dict(id_fac=fid, region=r, district=d, subdistrict=s, facility_name=name, facility_type=typ,
                sh_01=yn(good), sh_02=yn(good - 0.1), sh_03=av(good - 0.15), sh_04=av(good - 0.05), st_01=mid, st_02=nur,
                sv_01=" ".join(serv), cc_01=yn(good - 0.05))
cols = ["id_fac", "region", "district", "subdistrict", "facility_name", "facility_type", "sh_01", "sh_02", "sh_03", "sh_04", "st_01", "st_02", "sv_01", "cc_01"]
r1 = facs[:110]
r2 = [list(f) for f in facs[5:120]]
for f in r2[:4]:
    if f[5] == "Health post": f[5] = "Health centre"; f[4] = f[4].replace("Health Post", "Health Centre")
    else: f[4] = f[4] + " (Annex)"
for name, rows, rnd in [("demo_hfa_round1.csv", r1, 1), ("demo_hfa_round2.csv", r2, 2)]:
    with open(name, "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=cols); w.writeheader()
        for f in rows: w.writerow(row(f, rnd))

wb = openpyxl.Workbook(); c = wb.active; c.title = "Categories"; c.append(["id", "label"])
for r in [("infra", "Infrastructure"), ("meds", "Medicines"), ("staff", "Staffing"), ("serv", "Services")]: c.append(list(r))
sc = wb.create_sheet("Sub-categories"); sc.append(["id", "categoryId", "label"])
for r in [("power_water", "infra", "Power and water"), ("cold_chain", "infra", "Cold chain"), ("tracer", "meds", "Tracer medicines"),
          ("hr", "staff", "Health workers"), ("offered", "serv", "Services offered")]: sc.append(list(r))
sv = wb.create_sheet("Service categories"); sv.append(["id", "label"])
for r in [("mnh", "Maternal and newborn health"), ("child", "Child health"), ("general", "General readiness")]: sv.append(list(r))
ind = wb.create_sheet("Indicators")
ind.append(["indicatorId", "categoryId", "subCategoryId", "serviceCategoryId", "shortLabel", "label", "type", "aggregation", "code__Round 1", "code__Round 2"])
for i in [("electricity", "infra", "power_water", "general", "Electricity", "Facility has a reliable source of electricity", "binary", "avg", 'sh_01 == "1"'),
          ("water", "infra", "power_water", "general", "Improved water", "Facility has an improved water source on site", "binary", "avg", 'sh_02 == "1"'),
          ("vaccine_fridge", "infra", "cold_chain", "child", "Vaccine fridge", "Facility has a functional vaccine refrigerator", "binary", "avg", 'cc_01 == "1"'),
          ("oxytocin", "meds", "tracer", "mnh", "Oxytocin", "Oxytocin available on the day of the visit", "binary", "avg", 'sh_03 IN ("a","b")'),
          ("amoxicillin", "meds", "tracer", "child", "Amoxicillin", "Amoxicillin available on the day of the visit", "binary", "avg", 'sh_04 IN ("a","b")'),
          ("midwives", "staff", "hr", "mnh", "Midwives", "Number of midwives working at the facility", "numeric", "sum", "st_01"),
          ("nurses", "staff", "hr", "general", "Nurses", "Number of nurses working at the facility", "numeric", "sum", "st_02"),
          ("offers_delivery", "serv", "offered", "mnh", "Delivery services", "Facility offers delivery services", "binary", "avg", "sv_01_del == 1"),
          ("offers_fp", "serv", "offered", "mnh", "Family planning", "Facility offers family planning services", "binary", "avg", "sv_01_fp == 1")]:
    ind.append(list(i[:8]) + [i[8], i[8]])
wb.save("demo_hfa_indicators.xlsx")
print("written")
