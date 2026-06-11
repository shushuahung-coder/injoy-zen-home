#!/usr/bin/env bash
# Subset large self-hosted CJK fonts down to only the glyphs the site actually
# renders, then output compact woff2. This is the main lever for mobile LCP
# (the full Iansui TTF is ~9MB; the subset is a few hundred KB).
#
# Originals live in fonts-source/ (NOT in public/, so they are never deployed).
# Subsetted woff2 files are written to public/fonts/ and referenced from
# src/index.css. Missing glyphs fall back to Noto Sans TC, so adding new text
# never breaks rendering — re-run this script to restyle new glyphs in Iansui.
#
# Requirements: python3 with fonttools + brotli
#   python3 -m venv .venv && .venv/bin/pip install fonttools brotli
#
# Usage: npm run build  (to produce dist/ with the current text), then:
#   PYTHON=.venv/bin/python bash scripts/subset-fonts.sh
set -euo pipefail

PYTHON="${PYTHON:-python3}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -d dist ]; then
  echo "dist/ not found — run 'npm run build' first so the charset reflects current text." >&2
  exit 1
fi

# 1. Collect every visible character from the prerendered HTML (+ ASCII/punct).
#    Also scan the JS bundles for CJK characters: text inside popovers, dialogs
#    and other conditionally-rendered UI never appears in the prerendered HTML
#    (e.g. the 電話預約 popover), but its string literals do live in the JS.
CHARSET=$(mktemp)
"$PYTHON" - "$CHARSET" <<'PY'
import re, glob, html, sys
chars=set()
for f in glob.glob("dist/**/*.html", recursive=True):
    t=open(f, encoding="utf-8").read()
    t=re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", t, flags=re.S|re.I)
    t=html.unescape(re.sub(r"<[^>]+>", " ", t))
    chars.update(c for c in t if c.strip())
for f in glob.glob("dist/assets/*.js"):
    t=open(f, encoding="utf-8").read()
    chars.update(re.findall(r"[　-〿一-鿿＀-￯]", t))
chars.update(chr(c) for c in range(0x20, 0x7f))           # ASCII printable
chars.update("　、。，！？：；「」『』（）—…·／｜0123456789")  # common CJK punctuation
open(sys.argv[1], "w", encoding="utf-8").write("".join(sorted(chars)))
print(f"charset: {len(chars)} unique characters")
PY

# 2. Subset Iansui (heading font).
"$PYTHON" -m fontTools.subset fonts-source/Iansui-Regular.ttf \
  --text-file="$CHARSET" \
  --output-file=public/fonts/Iansui-subset.woff2 \
  --flavor=woff2 --layout-features='*' --no-hinting --desubroutinize

# 3. Subset GenSenRounded (body font). Full OTF is ~15MB; subset is a few
# hundred KB, small enough to serve on mobile (font-display: swap in CSS).
"$PYTHON" -m fontTools.subset fonts-source/GenSenRounded2TW-R.otf \
  --text-file="$CHARSET" \
  --output-file=public/fonts/GenSenRounded-subset.woff2 \
  --flavor=woff2 --layout-features='*' --no-hinting --desubroutinize

rm -f "$CHARSET"
ls -lh public/fonts/Iansui-subset.woff2 | awk '{print "Iansui subset:", $5}'
ls -lh public/fonts/GenSenRounded-subset.woff2 | awk '{print "GenSenRounded subset:", $5}'
