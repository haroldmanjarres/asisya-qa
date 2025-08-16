#!/usr/bin/env bash
set -euo pipefail
COLLECTION="$(dirname "$0")/../collections/asisya.postman_collection.json"
ENV="$(dirname "$0")/../env/local.postman_environment.json"

npx newman run "$COLLECTION" -e "$ENV" \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export newman-report.html

echo "Reporte generado: $(pwd)/newman-report.html"