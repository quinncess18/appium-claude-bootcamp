#!/usr/bin/env bash
# PostToolUse hook — enforces the project's #1 rule: no fixed pauses in tests.
# Claude Code runs this after every Edit/Write. It reads the tool-call JSON from
# stdin, finds the file that was just written, and BLOCKS (exit 2) if the file
# introduces a hard sleep instead of an explicit, condition-based wait.
# See .claude/rules/test-style.md. No prompting — it just happens, every time.

input=$(cat)

# Pull the edited file path out of the hook payload (python3 ships on macOS).
file=$(printf '%s' "$input" | python3 -c \
  "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" \
  2>/dev/null)

# Nothing to check (no path, file gone, or not a test file) → allow.
[ -n "$file" ] && [ -f "$file" ] || exit 0
case "$file" in
  *.js|*.ts|*.py) ;;
  *) exit 0 ;;
esac

# The forbidden patterns from the style rule.
if grep -nE 'browser\.pause\(|time\.sleep\(|setTimeout\(' "$file" >/dev/null 2>&1; then
  echo "⛔ no-sleep hook: $file uses a fixed pause. Replace it with an explicit, " \
       "condition-based wait — see .claude/rules/test-style.md." >&2
  exit 2   # exit 2 feeds this message back to Claude so it fixes the edit
fi

exit 0
