# AI Development Workflow

AI-driven development with quality controls. See **CLAUDE.md** for full project context.

## Workflows

| Workflow | Use For | Command |
|----------|---------|---------|
| **Feature Flow** | New features, UI, unclear requirements | `/feature-flow` |
| **Quick Fix** | Bug fixes, small features, tweaks | `/quick-fix` |
| **PR Review** | Review completed code | `/pr-review` |

## Feature Flow Phases
1. **Plan** → Spec (wait for approval)
2. **Architect + Design** → Technical + UI (parallel, wait for approval)
3. **Build** → Implement with tests (wait for approval)
4. **Review** → Quality check + PR

## Direct Agent Usage

For specific phases:
```
Read .claude/agents/[agent].md and [task]
```

| Agent | Purpose |
|-------|---------|
| plan | Requirements, success criteria |
| architect | Technical design, data models |
| design | UI mockups in `apps/mockups/` |
| build | Production implementation |
| review | Code review + PR creation |
| debug | Root cause investigation |

## Resources

**Auto-loaded**: CLAUDE.md

**On demand**:
- `.claude/resources/design-system.md` - Design tokens
- `.claude/resources/league-info.md` - Domain context
- `.claude/resources/technical-standards.md` - Code standards

## Tips

- Use `/quick-fix` for 90% of bug fixes (skips planning/design)
- Architect + design run in parallel
- CLAUDE.md is auto-loaded—don't repeat context
