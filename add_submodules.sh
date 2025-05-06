#!/bin/bash

# File containing the list of repository URLs
REPO_LIST="repo_list.txt"

# Directory where submodules will be added
SUBMODULE_DIR="./packages"

# Ensure the submodule directory exists
mkdir -p "$SUBMODULE_DIR"

# Add each repository as a submodule
while read -r repo; do
  if [[ $repo == https://github.com/* ]]; then
    repo_name=$(basename "$repo" .git)
    echo "Adding submodule: $repo_name"
    git submodule add "$repo" "$SUBMODULE_DIR/$repo_name"
  else
    echo "Skipping invalid URL: $repo"
  fi
done < "$REPO_LIST"

# Initialize and update all submodules
git submodule update --init --recursive

echo "All submodules added and updated."