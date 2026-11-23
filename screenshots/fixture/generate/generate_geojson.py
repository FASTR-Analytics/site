"""Generates demo_regions.geojson: six made-up regions (a Central core and five
surrounding regions) for the fictional Demo Republic. "Highlands" is written as
"Highland" on purpose, so the GeoJSON import's matching step shows an unmatched row.
"""
import math, random, json
random.seed(11)
cx, cy = 3.0, 2.5
def smooth(th, amps): return sum(a*math.sin(k*th+p) for k,a,p in amps)
outer_amps=[(k, random.uniform(0.02,0.08)/k**0.5, random.uniform(0,6.28)) for k in range(2,14)]
inner_amps=[(k, random.uniform(0.02,0.07)/k**0.4, random.uniform(0,6.28)) for k in range(2,9)]
def R(th): return 2.4*(1+smooth(th,outer_amps))*(1.0+0.12*math.cos(th))
def r(th): return 0.95*(1+smooth(th,inner_amps))
def pt(th, rad): return [round(cx+rad*math.cos(th)*1.15,5), round(cy+rad*math.sin(th),5)]
sectors=[("Eastern",-50,25),("Highlands",25,80),("Northern",80,150),("Western",150,235),("Southern",235,310)]
def radial(a, steps=8):
    a=a%(2*math.pi); rnd=random.Random(round(a*1000)); pts=[]
    for i in range(steps+1):
        t=i/steps; rad=r(a)+(R(a)-r(a))*t
        da=0 if i in (0,steps) else rnd.uniform(-0.05,0.05)
        pts.append(pt(a+da, rad))
    return pts
feats=[]
for name,a0,a1 in sectors:
    A0=math.radians(a0); A1=math.radians(a1); n=max(8,a1-a0)
    outer=[pt(A0+(A1-A0)*i/n, R(A0+(A1-A0)*i/n)) for i in range(n+1)]
    inner=[pt(A1-(A1-A0)*i/n, r(A1-(A1-A0)*i/n)) for i in range(n+1)]
    ring=radial(A0)[:-1]+outer+list(reversed(radial(A1)))[1:-1]+inner; ring.append(ring[0])
    feats.append({"type":"Feature","properties":{"name":"Highland" if name=="Highlands" else name},"geometry":{"type":"Polygon","coordinates":[ring]}})
n=180
inner=[pt(math.radians(-50)+2*math.pi*i/n, r(math.radians(-50)+2*math.pi*i/n)) for i in range(n)]; inner.append(inner[0])
feats.append({"type":"Feature","properties":{"name":"Central"},"geometry":{"type":"Polygon","coordinates":[inner]}})
json.dump({"type":"FeatureCollection","features":feats},open("demo_regions.geojson","w"))
