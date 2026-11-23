#!/usr/bin/env python3
"""Turns raw captures (out/raw) into the docs images (public/images).

    python3 postprocess.py [--force]

- Dialog and panel crops (CROPS) get a thin border; narrow ones are halved so
  they don't display with oversized text (the captures are at 2x).
- The visualization-types montage is assembled from four panels.
- An image is only written when it differs from the one already in
  public/images by more than THRESHOLD of its pixels (or its size changed), so
  rendering noise doesn't produce churn. --force writes everything.
Writes out/changed.txt listing the images that were replaced.
Requires Pillow.
"""
import json, os, sys
from PIL import Image, ImageChops, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "out", "raw")
DEST = os.path.join(HERE, "..", "public", "images")
MANIFEST = json.load(open(os.path.join(HERE, "manifest.json")))
THRESHOLD = 0.0001  # share of pixels that must differ (same-machine renders are pixel-identical)
FORCE = "--force" in sys.argv


def finish(name, im):
    if name in MANIFEST["crops"]:
        if im.width <= 1700:
            im = im.resize((im.width // 2, im.height // 2), Image.LANCZOS)
        im = ImageOps.expand(im, border=1, fill="#d1d5db")
    return im


def montage(lang):
    rows = MANIFEST["montage"]["rows"]
    W, gap = 1400, 24
    def load(n):
        im = Image.open(os.path.join(RAW, f"{n}-{lang}.png")).convert("RGB")
        return im.resize((W, int(im.height * W / im.width)))
    R = [[load(n) for n in r] for r in rows]
    hs = [max(im.height for im in r) for r in R]
    out = Image.new("RGB", (2 * W + 3 * gap, sum(hs) + (len(R) + 1) * gap), "#e5e7eb")
    y = gap
    for r, h in zip(R, hs):
        for i, im in enumerate(r):
            tile = Image.new("RGB", (W, h), "white"); tile.paste(im, (0, 0))
            out.paste(tile, (gap + i * (W + gap), y))
        y += h + gap
    return out


def differs(new, path):
    if FORCE or not os.path.exists(path):
        return True
    old = Image.open(path).convert("RGB")
    if old.size != new.size:
        return True
    diff = ImageChops.difference(old, new).convert("L").point(lambda v: 255 if v > 24 else 0)
    changed = sum(diff.histogram()[255:])
    return changed / (new.width * new.height) > THRESHOLD


changed, missing = [], []
for lang in MANIFEST["languages"]:
    for name in MANIFEST["images"]:
        try:
            if name == MANIFEST["montage"]["name"]:
                im = montage(lang)
            else:
                im = finish(name, Image.open(os.path.join(RAW, f"{name}-{lang}.png")).convert("RGB"))
        except FileNotFoundError:
            missing.append(f"{name}-{lang}")
            continue
        path = os.path.join(DEST, f"{name}-{lang}.png")
        if differs(im, path):
            im.save(path, optimize=True)
            changed.append(f"{name}-{lang}.png")

open(os.path.join(HERE, "out", "changed.txt"), "w").write("\n".join(changed) + ("\n" if changed else ""))
print(f"{len(changed)} image(s) changed" + (f"; not captured: {', '.join(missing)}" if missing else ""))
for c in changed:
    print("  " + c)
