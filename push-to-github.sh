#!/bin/bash
# This script initializes a new Git repository, commits all files,
# and pushes them to the specified GitHub repository.

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
GITHUB_REPO_URL="https://github.com/Arindevops/Sentinel.git"
COMMIT_MESSAGE="Initial commit of Data Centre Sentinel project"

# --- Git Commands ---

# 1. Initialize a new Git repository.
# The `-b main` flag sets the default branch name to 'main'.
echo "Initializing Git repository..."
git init -b main

# 2. Add all files to the staging area.
echo "Adding all files to the staging area..."
git add .

# 3. Commit the staged files with a message.
echo "Committing files..."
git commit -m "$COMMIT_MESSAGE"

# 4. Add the remote GitHub repository URL.
# We check if 'origin' already exists to avoid an error.
if git remote | grep -q "origin"; then
  echo "Remote 'origin' already exists. Updating URL..."
  git remote set-url origin "$GITHUB_REPO_URL"
else
  echo "Adding remote 'origin'..."
  git remote add origin "$GITHUB_REPO_URL"
fi

# 5. Push the code to the 'main' branch on GitHub.
# The `-u` flag sets the upstream branch, so you can use `git push` in the future.
echo "Pushing code to GitHub..."
git push -u origin main

echo "✅ Code successfully pushed to GitHub!"
echo "You can view your repository at: $GITHUB_REPO_URL"
