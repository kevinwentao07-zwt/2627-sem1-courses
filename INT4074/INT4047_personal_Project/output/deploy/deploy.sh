#!/bin/bash
# Usage: bash deploy.sh /path/to/your-key.pem
# Uploads the prototype to http://52.220.124.215/ict-companion/
set -e
KEY="$1"
HOST="ubuntu@52.220.124.215"
DIR="$(cd "$(dirname "$0")" && pwd)"
OPT=""; [ -n "$KEY" ] && OPT="-i $KEY"
scp $OPT "$DIR/ict-companion/index.html" "$HOST:/tmp/ict-index.html"
ssh $OPT "$HOST" 'set -e
if ! command -v nginx >/dev/null 2>&1 && ! command -v apache2 >/dev/null 2>&1; then
  echo "No web server found, installing nginx..."
  sudo apt-get update -y && sudo apt-get install -y nginx
fi
sudo mkdir -p /var/www/html/ict-companion
sudo mv /tmp/ict-index.html /var/www/html/ict-companion/index.html
sudo chmod 755 /var/www/html/ict-companion && sudo chmod 644 /var/www/html/ict-companion/index.html
echo "Done: http://52.220.124.215/ict-companion/"'
curl -s -o /dev/null -w "Check from your Mac: HTTP %{http_code}\n" http://52.220.124.215/ict-companion/ || true
