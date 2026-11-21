#!/bin/zsh
cd ~/Desktop/hktransport/promo
for l in hans hant en; do LANG_CODE=$l node render.mjs > render_$l.log 2>&1 || { echo FAILED $l >> render_all.log; exit 1; }; sleep 2; done
mv hktransport_promo_hans.mp4 hktransport_promo_v2_简中.mp4; mv hktransport_promo_hant.mp4 hktransport_promo_v2_繁中.mp4; mv hktransport_promo_en.mp4 hktransport_promo_v2_EN.mp4
cp hktransport_promo_v2_*.mp4 ~/Downloads/hktransport-route-planner/
echo DONE >> render_all.log
