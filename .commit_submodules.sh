#!/bin/zsh

# Step 1: Commit changes in each submodule
echo "Committing changes in submodules..."
git submodule foreach --quiet '
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "Processing $sm_path"
    git add .
    git commit -m "Commit changes in submodule $sm_path"
  else
    echo "No changes to commit in $sm_path"
  fi
'

# Step 2: Stage and commit updates in parent repository
echo "Staging and committing submodule updates in parent repository..."
git add .
git commit -m "Update submodule references"

# Step 3: Verify the state
echo "Final status:"
git status