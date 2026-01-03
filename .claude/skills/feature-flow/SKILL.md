# Feature Flow Skill

**Usage**: `/feature-flow [feature description]`

**Purpose**: Complete AI workflow for new features (Plan → Architect/Design → Build → Review → PR)

## What This Skill Does

Automates the full feature development lifecycle:

1. **Plan**: Create feature specification (using EnterPlanMode if complex)
2. **Architect**: Design technical implementation
3. **Design**: Create UI/UX mockup in `apps/mockups/`
4. **Build**: Implement with tests
5. **Review**: Test and create professional PR

## When to Use

- New features requiring full workflow
- Features with UI components
- When you want structured approach with quality gates

**Don't use for**: Bug fixes (use `/quick-fix`), small tweaks, exploration

## Workflow Steps

### Phase 1: Planning

Read [.claude/agents/plan.md](.claude/agents/plan.md) and create:

- Feature specification
- Requirements
- Success criteria
- Out of scope

**Wait for user approval before proceeding.**

### Phase 2: Solutioning (Parallel)

**Architect** (read [.claude/agents/architect.md](.claude/agents/architect.md)):

- Technical approach
- Data model changes
- API design
- Implementation steps

**Designer** (read [.claude/agents/design.md](.claude/agents/design.md)):

- UI mockup in `apps/mockups/src/screens/`
- User flow
- Design decisions

**Wait for user approval before proceeding.**

### Phase 3: Implementation

Read [.claude/agents/build.md](.claude/agents/build.md) and implement:

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

Read [.claude/agents/review.md](.claude/agents/review.md) and:

1. Review code quality
2. Test functionality (mobile + desktop)
3. Verify accessibility
4. Create professional PR

## Example Usage

```
User: /feature-flow player comparison feature

Claude:
Phase 1: Planning
[Creates specification following plan.md format]
[Waits for approval]

User: Approved

Claude:
Phase 2: Solutioning
[Architect agent creates technical design]
[Design agent creates mockup in apps/mockups/]
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
