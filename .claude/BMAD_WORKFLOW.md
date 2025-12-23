# BMAD Workflow for Jakes Dad Project

This project follows the **BMAD (Build More, Architect Dreams)** methodology - a lightweight AI-driven agile development framework using Claude Code subagents.

## What is BMAD?

BMAD is an AI-driven development framework that uses specialized agents to rapidly build high-quality features. This implementation uses Claude Code's subagent system for maximum flexibility.

## The Four Phases

### 1. Planning Phase
**Subagent**: `plan`
**Output**: PRD or technical specification

Define what you're building, why, and success criteria.

### 2. Solutioning Phase
**Subagents**: `design` + `architect`
**Output**: UI mockups + technical architecture

Design the user experience and technical implementation approach (can be done in parallel).

### 3. Implementation Phase
**Subagent**: `build`
**Output**: Working, tested code

Build the feature with tests.

### 4. Review Phase
**Subagent**: `review`
**Output**: Merge request with documentation

Review code, test functionality, and create MR.

## The Six Subagents

All subagents are defined in `.claude/agents/` and have access to domain knowledge in `.claude/resources/`.

### PM (`plan`)
**Role**: Creates requirements and specifications

**How to use**:
```
Please read .claude/agents/plan.md and act as the PM.
Create a specification for [feature name].
```

**Resources**: League info, database schema, technical standards

### UX Designer (`design`)
**Role**: Designs user interfaces and flows

**How to use**:
```
Please read .claude/agents/design.md and act as the UX Designer.
Design the UI for [feature name].
```

**Resources**: UI/UX guidelines, league info, technical standards

### Architect (`architect`)
**Role**: Designs technical architecture

**How to use**:
```
Please read .claude/agents/architect.md and act as the Architect.
Design the technical architecture for [feature name].
```

**Resources**: Technical standards, database schema, BMAD workflow

### Developer (`build`)
**Role**: Implements features with tests

**How to use**:
```
Please read .claude/agents/build.md and act as the Developer.
Implement [feature name] following the plan and design.
```

**Resources**: All resource files

### Debugger (`debug`)
**Role**: Investigates issues and determines root causes

**How to use**:
```
Please read .claude/agents/debug.md and act as the Debugger.
Investigate [issue description or error].
```

**Resources**: Technical standards, database schema, UI/UX guidelines, BMAD workflow

### Reviewer (`review`)
**Role**: Reviews code and creates merge requests

**How to use**:
```
Please read .claude/agents/review.md and act as the Reviewer.
Review the implementation of [feature name] and create a merge request.
```

**Resources**: Technical standards, UI/UX guidelines, database schema, BMAD workflow

## Workflow Tracks

### Quick Flow (< 5 minutes)
For bug fixes and minor features - just use the Developer subagent:

```
Please read .claude/agents/build.md and act as the Developer.
Fix [bug description].
```

### BMAD Method (< 20 minutes)
For new features - use all phases:

```
# Phase 1: Planning
Please read .claude/agents/plan.md and act as the PM.
Create a specification for [feature].

# Phase 2: Solutioning (can be parallel)
Please read .claude/agents/design.md and act as the UX Designer.
Design the UI for [feature].

Please read .claude/agents/architect.md and act as the Architect.
Design the technical architecture for [feature].

# Phase 3: Implementation
Please read .claude/agents/build.md and act as the Developer.
Implement [feature] following the approved plan and design.

# Phase 4: Review
Please read .claude/agents/review.md and act as the Reviewer.
Review the [feature] implementation and create a merge request.
```

## Domain Knowledge Resources

All subagents can read these files in `.claude/resources/`:

- **league-info.md** - Fantasy football league details, rules, and user roles
- **database-schema.md** - Supabase database schema with RLS policies
- **technical-standards.md** - Architecture principles, code standards, testing, security
- **ui-ux-guidelines.md** - Design system (colors, typography, spacing, accessibility)

Subagents will automatically read these files when they need domain context.

## Example Workflow

### Example 1: Quick Bug Fix

```
You: Please read .claude/agents/build.md and act as the Developer.
Fix the scoring calculation bug in week 12 matchups.

Claude (as Developer): I'll investigate and fix the scoring bug.
First, let me read the technical standards and database schema...
[Reads .claude/resources/technical-standards.md]
[Reads .claude/resources/database-schema.md]
[Reproduces bug, identifies issue, implements fix, adds regression test]
```

### Example 2: New Feature

```
# Step 1: Planning
You: Please read .claude/agents/plan.md and act as the PM.
Create a specification for a player comparison feature.

Claude (as PM): I'll create a spec for the player comparison feature.
[Reads league-info.md, database-schema.md, technical-standards.md]
[Creates detailed PRD with requirements and success criteria]

---

# Step 2a: Design
You: Please read .claude/agents/design.md and act as the UX Designer.
Design the player comparison UI based on the approved plan.

Claude (as Designer): I'll design the comparison interface.
[Reads ui-ux-guidelines.md, league-info.md]
[Creates wireframes and mockup following design system]

---

# Step 2b: Architecture (parallel with design)
You: Please read .claude/agents/architect.md and act as the Architect.
Design the technical architecture for player comparison.

Claude (as Architect): I'll design the architecture.
[Reads technical-standards.md, database-schema.md]
[Proposes API endpoints, data models, caching strategy]

---

# Step 3: Implementation
You: Please read .claude/agents/build.md and act as the Developer.
Implement the player comparison feature following the approved design and architecture.

Claude (as Developer): I'll implement the feature.
[Reads all resource files]
[Builds feature with tests following the plan]

---

# Step 4: Review
You: Please read .claude/agents/review.md and act as the Reviewer.
Review the player comparison implementation and create a merge request.

Claude (as Reviewer): I'll review the code and test the feature.
[Reads technical-standards.md, ui-ux-guidelines.md, database-schema.md]
[Reviews code, tests functionality, creates detailed MR]
```

## Best Practices

### When to Use Which Track

**Use Quick Flow** when:
- Fixing bugs
- Making small UI tweaks
- Adding simple functionality
- You already know exactly what to build

**Use BMAD Method** when:
- Adding new features
- Making architectural changes
- Unclear implementation approach
- Multiple valid solutions exist

### Subagent Guidelines

**For Users**:
1. Always reference the agent file (e.g., "read .claude/agents/plan.md")
2. Be specific about what you want the agent to do
3. Approve deliverables before moving to the next phase
4. Subagents can run in parallel (e.g., design + architect)

**For Subagents**:
1. Read the agent definition file to understand your role
2. Read relevant resource files for domain knowledge
3. Follow the standards and guidelines
4. Stay focused on your specific responsibilities
5. Produce deliverables in the specified format

## Quick Reference

### Subagent Prompts

- **PM**: `Please read .claude/agents/plan.md and act as the PM. [task]`
- **Designer**: `Please read .claude/agents/design.md and act as the UX Designer. [task]`
- **Architect**: `Please read .claude/agents/architect.md and act as the Architect. [task]`
- **Developer**: `Please read .claude/agents/build.md and act as the Developer. [task]`
- **Debugger**: `Please read .claude/agents/debug.md and act as the Debugger. [task]`
- **Reviewer**: `Please read .claude/agents/review.md and act as the Reviewer. [task]`

### Design System
- **Colors**: Primary #2563eb, Secondary #10b981, Accent #f59e0b
- **Spacing**: 4px grid (4, 8, 12, 16, 24, 32, 48, 64px)
- **Typography**: Inter (headings/body), JetBrains Mono (code)

### Standards
- **Testing**: 70% minimum coverage
- **Accessibility**: WCAG 2.1 Level AA
- **Bundle**: <500KB initial load
- **Components**: <200 lines ideal

### Development Commands
```bash
npm run dev          # Start development
npm run db:start     # Start local Supabase
npm run test         # Run tests
npm run build        # Build for production
```

## Migration to MCP (Future)

The MCP server in `apps/mcp-server/` is available for future use. It provides the same domain knowledge via the MCP protocol, which can be useful for:
- Persistent agent sessions
- Shared context across different tools
- Remote access to domain knowledge

To enable MCP:
1. Set environment variables (SUPABASE_URL, SUPABASE_SERVICE_KEY)
2. Run: `cd apps/mcp-server && uv sync`
3. Configure `.claude/mcp.json` to use the server

For now, the local subagent approach is simpler and more flexible.