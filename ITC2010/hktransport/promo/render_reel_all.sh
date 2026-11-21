#!/bin/zsh
# Renders the 9:16 reel in all three languages, next to this script.
cd "${0:A:h}"
node reel_music.mjs
for l in hans hant en; do LANG_CODE=$l node render_reel.mjs > render_reel_$l.log 2>&1 || { echo "FAILED $l"; exit 1; }; sleep 2; done
mv hktransport_reel_hans.mp4 hktransport_reel_简中.mp4; mv hktransport_reel_hant.mp4 hktransport_reel_繁中.mp4; mv hktransport_reel_en.mp4 hktransport_reel_EN.mp4
echo DONE
