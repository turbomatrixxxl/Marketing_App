#!/bin/bash
set -e   # oprește scriptul la prima eroare
set -x   # afișează fiecare comandă înainte să ruleze

echo "=== 1. Verificăm branch-ul curent ==="
git branch

echo "=== 2. Checkout repository (simulat) ==="
git fetch --all
git checkout main

echo "=== 3. Verificăm Node.js ==="
node -v
npm -v

echo "=== 4. Instalare dependențe ==="
npm ci

echo "=== 5. Build proiect ==="
npm run build

echo "=== 6. Verificăm dacă build există ==="
if [ -d "./build" ]; then
    echo "Build-ul a fost creat cu succes!"
else
    echo "EROARE: Build-ul nu există!"
    exit 1
fi

echo "=== 7. Test deploy GH Pages local (simulat) ==="
echo "Simulăm deploy în folder ./build"
echo "Folderele din build:"
ls -l ./build

echo "=== 8. Script finalizat cu succes ==="
