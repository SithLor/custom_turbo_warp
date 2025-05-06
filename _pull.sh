#!/bin/bash

cd ./packages 

# Clone all repositories listed in repo_list.txt
while read -r repo; do
  if [[ $repo == https://github.com/* ]]; then
    repo_name=$(basename "$repo" .git)
    if [ ! -d "$repo_name" ]; then
      echo "Cloning $repo..."
      git clone "$repo"
    else
      echo "$repo_name already exists, pulling latest changes..."
      cd "$repo_name"
      git pull origin main
      cd ..
    fi
  fi
done < ../repo_list.txt

# Commit and push changes in all cloned repositories
for dir in */; do
  if [ -d "$dir/.git" ]; then
    echo "Checking for changes in $dir..."
    cd "$dir"
    if [ -n "$(git status --porcelain)" ]; then
      echo "Changes detected in $dir. Committing and pushing..."
      git add .
      git commit -m "Update from custom_turbo_warp"
      git push origin main
    else
      echo "No changes in $dir."
    fi
    cd ..
  fi
done