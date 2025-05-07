#!/bin/bash

cd ./packages 

# Clone all repositories listed in README.md
while read -r repo; do
  if [[ $repo == https://github.com/* ]]; then
    git clone "$repo"
  fi
done < ../repo_list.txt


# i fuck hate git