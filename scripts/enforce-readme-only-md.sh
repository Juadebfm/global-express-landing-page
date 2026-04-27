#!/usr/bin/env sh
set -eu

# Block any tracked markdown file other than root README.md.
tracked_markdown="$(git ls-files '*.md' | awk '$0 != "README.md"')"
if [ -n "$tracked_markdown" ]; then
  echo "ERROR: Non-README markdown files are tracked in git:"
  echo "$tracked_markdown"
  echo "Only README.md is allowed to be tracked."
  exit 1
fi

# Block any staged markdown file other than root README.md.
staged_markdown="$(
  git diff --cached --name-only --diff-filter=ACMR | awk '/\.md$/ && $0 != "README.md"'
)"
if [ -n "$staged_markdown" ]; then
  echo "ERROR: Non-README markdown files are staged:"
  echo "$staged_markdown"
  echo "Only README.md is allowed to be committed/pushed."
  exit 1
fi

exit 0
