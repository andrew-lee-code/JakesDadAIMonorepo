# AI Development Workflow

AI-driven development workflow for production-grade features with quality controls.

## Quick Reference

See **[CLAUDE.md](../CLAUDE.md)** for full project context (auto-loaded in every conversation).

## Three Workflows

### 1. Feature Flow (Full AI)

**Use for**: New features, UI work, unclear requirements

**Command**: `/feature-flow [feature description]`

**Phases**:

1. **Plan** → Create specification
2. **Architect + Design** → Technical design + UI mockup (parallel)
3. **Build** → Implement with tests
4. **Review** → Code review + PR

**Details**: [.claude/skills/feature-flow/SKILL.md](.claude/skills/feature-flow/SKILL.md)

### 2. Quick Fix

**Use for**: Bug fixes, small features, minor tweaks

**Command**: `/quick-fix [description]`

**Flow**: Understand → Implement → Test → Commit

**Details**: [.claude/skills/quick-fix/SKILL.md](.claude/skills/quick-fix/SKILL.md)

### 3. PR Review Only

**Use for**: Review already-implemented code

**Command**: `/pr-review [feature description]`

**Flow**: Review quality → Test → Create professional PR

**Details**: [.claude/skills/pr-review/SKILL.md](.claude/skills/pr-review/SKILL.md)

## Agent Reference

**When to use agents directly** (instead of skills):

Read agent file and work in that role:

### Plan

```
Please read .claude/agents/plan.md and create a spec for [feature].
```

Creates requirements, success criteria. Use EnterPlanMode for complex features.

### Architect

```
Please read .claude/agents/architect.md and design the architecture for [feature].
```

Technical design, data models, API contracts, implementation steps.

### Design

```
Please read .claude/agents/design.md and design the UI for [feature].
```

Creates mockups in `apps/mockups/`, documents design decisions.

### Build

```
Please read .claude/agents/build.md and implement [feature].
```

Writes production code with tests, following specifications.

### Review

```
Please read .claude/agents/review.md and review [feature].
```

Code quality review, testing, professional PR creation.

### Debug

```
Please read .claude/agents/debug.md and investigate [issue].
```

Systematic debugging, root cause analysis, diagnosis (not implementation).

## Resources

**Auto-loaded** (available in every conversation):

- [CLAUDE.md](../CLAUDE.md) - Project overview, tech stack, design system, commands

**Agent-specific** (loaded when agent is used):

- [.claude/resources/league-info.md](.claude/resources/league-info.md) - Domain context
- [.claude/resources/database-schema.md](.claude/resources/database-schema.md) - Schema reference
- [.claude/resources/design-tokens.md](.claude/resources/design-tokens.md) - Design system
- [.claude/resources/ui-ux-guidelines.md](.claude/resources/ui-ux-guidelines.md) - Full design specs
- [.claude/resources/technical-standards.md](.claude/resources/technical-standards.md) - Code standards

## How This Workflow Provides Quality Control

**Separation of concerns**:

- Planning phase defines requirements clearly
- Design/architecture phase creates specifications
- Build phase implements to spec
- Review phase verifies quality

**Quality gates** (between phases):

- User approves requirements before design
- User approves design before implementation
- Tests must pass before review
- Code review before merge

**Audit trail**:

- Professional PRs document all changes
- Commit history shows progression
- Specifications preserved for future reference

**Production standards**:

- 70% test coverage minimum
- WCAG 2.1 AA accessibility
- TypeScript strict mode
- Performance budgets (<500KB bundle)

## Tips

**Token efficiency**:

- Use `/quick-fix` for simple tasks (skips planning/design phases)
- Use skills for automation (fewer manual steps)
- CLAUDE.md is auto-loaded (don't repeat project context)
- Design tokens file is condensed (940 → 300 lines)

**Speed optimization**:

- Run architect + design in parallel (Phase 2)
- Use `/quick-fix` for 90% of bug fixes
- Skills automate multi-step workflows
- Direct agent usage for specific tasks

**When to use what**:

- New feature with UI → `/feature-flow`
- Bug fix → `/quick-fix`
- Code already written → `/pr-review`
- Investigate issue → Debug agent
- Specific phase only → Direct agent usage
