#!/usr/bin/env sh
set -eu

# Keep Markdown limited to the root README and the shared cross-repository handover.
tracked_markdown="$(git ls-files '*.md' | awk '$0 != "README.md" && $0 != "docs/CROSS_REPO_REFERENCE.md"')"
if [ -n "$tracked_markdown" ]; then
  echo "ERROR: Non-README markdown files are tracked in git:"
  echo "$tracked_markdown"
  echo "Only README.md and docs/CROSS_REPO_REFERENCE.md are allowed to be tracked."
  exit 1
fi

# Block any staged markdown file other than the approved reference documents.
staged_markdown="$(
  git diff --cached --name-only --diff-filter=ACMR | awk '/\.md$/ && $0 != "README.md" && $0 != "docs/CROSS_REPO_REFERENCE.md"'
)"
if [ -n "$staged_markdown" ]; then
  echo "ERROR: Non-README markdown files are staged:"
  echo "$staged_markdown"
  echo "Only README.md and docs/CROSS_REPO_REFERENCE.md are allowed to be committed/pushed."
  exit 1
fi

exit 0
