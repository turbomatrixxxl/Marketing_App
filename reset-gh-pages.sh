#!/bin/bash

# 1. Șterge branch-ul gh-pages local dacă există
git branch -D gh-pages 2>/dev/null || echo "No local gh-pages branch"

# 2. Șterge branch-ul gh-pages remote dacă există
git push origin --delete gh-pages 2>/dev/null || echo "No remote gh-pages branch"

# 3. Asigură-te că suntem pe main și avem ultimele modificări
git checkout main
git pull origin main

# 4. Commit gol pentru a declanșa workflow-ul dacă este nevoie
git commit --allow-empty -m "Trigger GH Pages workflow" 

# 5. Push către main pentru a rula workflow-ul GitHub Actions
git push origin main

echo "Workflow-ul GitHub Pages a fost declanșat. Verifică Actions pe GitHub."
