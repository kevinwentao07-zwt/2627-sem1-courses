# hktransport web

The web app: a static page, live at <https://hk.52-220-124-215.sslip.io/>.

Every data source allows direct browser calls, so only the AI goes through a server:
route data from hkbus.app, arrivals from the operators, maps from Google on your own server and OpenFreeMap elsewhere, place
search and walking routes from Google on your own server and otherwise the Government and OpenStreetMap's Photon, and AI
from DeepSeek. To plan a trip, the AI says which lines to ride, and the page checks them against the route data, picks the
stops and works out the times; Google's walking routes then replace the straight-line walking times.
To find shops, the AI works out what to search for, and Google finds them with their details, in its own order.
On your own server, `server/ai_proxy.py` holds the DeepSeek key and every visitor can use the AI.
Without it, as on GitHub Pages, the page uses its free map and search, with no AI.

| File | Purpose |
| --- | --- |
| `js/transit.js` | Route data, RAPTOR search, checking the AI's plans, journeys and navigation maths |
| `js/eta.js` | Per-operator arrival fetchers and parsers |
| `js/ai.js` | DeepSeek client, prompts and the rule parser used without a key |
| `js/places.js` | Place search and walking routes: Google through the server, then the free sources |
| `js/hans.js` | Traditional to Simplified Chinese |
| `js/planner.worker.js` | Runs the route search off the main thread |
| `js/app.js` | The page |

Run the tests with `node --test web/test/core.test.mjs`. To try it locally:

```bash
python3 -m http.server 8642 --directory web
```

For hosted deployment and configuration, see the [project repository](https://github.com/kevinwentao07-zwt/hktransport).
