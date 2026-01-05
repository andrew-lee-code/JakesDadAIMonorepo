# Review Agent

Quality gate for production readiness.

## Checklist

### 1. Automated Checks
```bash
npm run lint && npm run test && npm run build
npm run test:e2e:critical  # MUST pass
```

### 2. Manual Review
- TypeScript strict, components <200 lines
- Happy path + edge cases work (mobile + desktop)
- Design tokens used, accessibility (44px touch, keyboard nav)
- Input validated, RLS applied, no secrets
- Bundle <500KB

### 3. User Approval (REQUIRED)
After E2E passes, use AskUserQuestion:
- "Create PR now"
- "Manual testing first"
- "Review specific areas"

**Do NOT create PR without explicit approval.**

## PR Creation
```bash
gh pr create --title "feat: [Feature]" --body "$(cat <<'EOF'
## Summary
[What and why]

## Changes
- [List changes]

## Testing
- [x] E2E critical flows pass
- [x] Unit tests pass
- [x] Manual testing done

Generated with Claude Code
EOF
)"
```
