---
name: feature-flow
description: Complete AI workflow for new features requiring plan, architecture, design, implementation, and review phases. Use when building new features with UI components or when a structured approach with quality gates is needed.
---

# Feature Flow Skill

Automates the full feature development lifecycle with quality gates at each phase.

## Workflow Phases

### Phase 1: Planning

Read [.claude/agents/plan.md](../../agents/plan.md) and create:

- Feature specification
- Requirements
- Success criteria
- Out of scope

**Wait for user approval before proceeding.**

### Phase 2: Solutioning (Parallel)

**Architect** (read [.claude/agents/architect.md](../../agents/architect.md)):

- Technical approach
- Data model changes
- API design
- Implementation steps

**Designer** (read [.claude/agents/design.md](../../agents/design.md)):

- UI mockup in `apps/mockups/src/screens/`
- User flow
- Design decisions

**Wait for user approval before proceeding.**

### Phase 3: Implementation

Read [.claude/agents/build.md](../../agents/build.md) and implement:

- Database migrations (if needed)
- Edge functions (if needed)
- Frontend components
- Tests (≥70% coverage)

Run verification:

```bash
npm run test
npm run lint
npm run build
npm run dev  # Manual test
```

**Wait for user approval before proceeding.**

### Phase 4: Review & PR

Read [.claude/agents/review.md](../../agents/review.md) and:

1. Review code quality
2. Test functionality (mobile + desktop)
3. Verify accessibility
4. Create professional PR

## When to Use

- New features requiring full workflow
- Features with UI components
- When you want structured approach with quality gates

**Don't use for**: Bug fixes (quick-fix skill handles those), small tweaks, exploration

## Example

```
User: I need a player comparison feature

Claude: I'll use the feature-flow skill to build this with the full workflow.

Phase 1: Planning
[Creates specification following plan.md format]
[Waits for approval]

User: Approved

Claude:
Phase 2: Solutioning
[Architect creates technical design]
[Designer creates mockup in apps/mockups/]
[Waits for approval]

User: Approved, but use caching for performance

Claude:
[Updates architecture with caching strategy]
Phase 3: Implementation
[Builds feature with tests]
[Runs verification]
[Waits for approval]

User: Looks good

Claude:
Phase 4: Review
[Reviews code, tests functionality]
[Creates PR]
```

## Quality Gates

Each phase requires explicit user approval before proceeding. This ensures:

- Requirements are clear before design
- Design is approved before implementation
- Implementation is verified before review
- Professional audit trail through PRs
