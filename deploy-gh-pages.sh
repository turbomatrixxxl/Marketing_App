#!/bin/bash

# Asigură-te că ai gh CLI instalat și ești logat: gh auth login
REPO="turbomatrixxxl/Marketing_App"
WORKFLOW="Deploy to GitHub Pages"
BRANCH="main"

echo "=== Reset local gh-pages branch ==="
git branch -D gh-pages 2>/dev/null || echo "No local gh-pages branch"

echo "=== Delete remote gh-pages branch ==="
git push origin --delete gh-pages 2>/dev/null || echo "No remote gh-pages branch"

echo "=== Checkout main and pull latest ==="
git checkout $BRANCH
git pull origin $BRANCH

echo "=== Commit gol pentru trigger GH Pages workflow ==="
git commit --allow-empty -m "Trigger GH Pages workflow" 
git push origin $BRANCH

echo "=== Trigger workflow și aștept rezultatul... ==="

# Obține ID-ul ultimei rulări a workflow-ului
RUN_ID=$(gh workflow run "$WORKFLOW" -b $BRANCH --repo $REPO --json databaseId -q '.[0].databaseId')

if [ -z "$RUN_ID" ]; then
  echo "❌ Nu s-a putut porni workflow-ul."
  exit 1
fi

echo "Workflow ID: $RUN_ID"

# Monitorizare până se termină
STATUS="in_progress"
while [[ "$STATUS" == "in_progress" || "$STATUS" == "queued" ]]; do
    sleep 5
    STATUS=$(gh run view $RUN_ID --repo $REPO --json status,conclusion -q '.status')
    echo "Status workflow: $STATUS"
done

CONCLUSION=$(gh run view $RUN_ID --repo $REPO --json conclusion -q '.conclusion')

if [ "$CONCLUSION" == "success" ]; then
    echo "✅ Deploy complet: GH Pages a fost actualizat cu succes!"
else
    echo "❌ Deploy eșuat: verifica GitHub Actions pentru detalii."
fi
