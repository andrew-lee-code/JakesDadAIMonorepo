---
name: quick-fix
description: Fast iteration for bug fixes and minor features without full workflow. Use for bug fixes, small UI tweaks, minor features, refactoring, or documentation updates where the solution is straightforward.
---

# Quick Fix Skill

Streamlined workflow for quick iterations without planning, design, or formal review phases.

## Workflow

### 1. Understand

For **bugs**:

- Reproduce the issue
- Identify root cause (use debug techniques if needed)
- Plan minimal fix

For **small features**:

- Clarify requirements (ask if unclear)
- Identify affected files
- Plan implementation

### 2. Implement

Read [.claude/agents/build.md](../../agents/build.md) for standards:

- Make minimal, focused changes
- Follow existing patterns
- Keep it simple

### 3. Test

```bash
npm run test           # Add/update tests
npm run lint           # No lint errors
npm run build          # Verify build
npm run dev            # Manual test
```

**Testing requirements**:

- Add test for bug fix (regression test)
- Update tests if behavior changed
- Test edge cases

### 4. Commit

```bash
git add [changed files]
git commit -m "fix: [clear description]

- What changed
- Why (if not obvious)

🤖 Generated with Claude Code"
```

**Commit message prefixes**:

- `fix:` - Bug fixes
- `feat:` - Small features
- `refactor:` - Code improvements
- `test:` - Test updates
- `docs:` - Documentation
- `style:` - UI tweaks

## When to Use

- Bug fixes
- Small UI tweaks
- Minor feature additions
- Refactoring
- Documentation updates
- You already know what to build

**Don't use for**: New features with UI, architectural changes, unclear requirements

## Examples

### Bug Fix

```
User: The scoring calculation is wrong for week 12

Claude: I'll use the quick-fix skill to investigate and fix this bug.

Investigating scoring bug for week 12...

Found issue: Decimal rounding in calculateScore()
apps/web/src/utils/scoring.ts:45

Implementing fix:
- Changed Math.floor to Math.round
- Added regression test
- Verified with week 12 data

Running tests... ✅ Pass
Building... ✅ Success

Committing fix:
"fix: correct scoring calculation rounding for week 12"
```

### Small Feature

```
User: Add sorting to the standings table

Claude: I'll use the quick-fix skill to add this feature.

Adding sorting to standings table...

Changes:
- Added sortBy state to StandingsTable component
- Added click handlers to table headers
- Added sort icons (↑↓)
- Follows existing table patterns

Testing:
- Sort by wins ✅
- Sort by points ✅
- Toggle ascending/descending ✅

Committing:
"feat: add sorting to standings table"
```

## Guidelines

**Keep it focused**:

- Fix one thing at a time
- Don't refactor while fixing bugs
- Don't add features while fixing bugs

**Maintain quality**:

- Still follow code standards (see CLAUDE.md)
- Still write tests
- Still verify it works

**When to upgrade to full flow**:

- If fix requires architecture changes → use feature-flow skill
- If unclear what to build → use feature-flow skill
- If requires new UI design → use feature-flow skill

## Speed vs Quality

Quick Fix prioritizes speed while maintaining quality:

**Fast** ⚡:

- Skip planning docs
- Skip design mockups
- Skip formal review phase
- Direct implementation

**Quality** ✅:

- Follow code standards
- Write tests
- Verify functionality
- Clear commit messages
