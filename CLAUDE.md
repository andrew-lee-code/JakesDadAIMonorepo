# Jake's Dad Fantasy Football Platform

> A Jacksonville Jaguars-themed fantasy football platform built for production-grade quality and rapid iteration.

## Project Overview

**Type**: Turborepo monorepo with React frontend and Supabase backend
**Design**: Jacksonville Jaguars branding (teal #155263, gold #daa520)
**Tone**: Fun, overly serious in a sarcastic way
**Standards**: Production-grade code, 70% test coverage, WCAG 2.1 AA accessibility

## Monorepo Structure

```
apps/
├── web/              # Main React app (Vite + TypeScript)
├── mockups/          # UI/UX iteration environment (designer workflow)
└── mcp-server/       # MCP server for domain knowledge

packages/
├── shared/           # Shared types, utilities
└── database/         # Supabase schema, migrations

.claude/
├── agents/           # Specialized workflow agents
├── skills/           # Automated workflows (/feature-flow, /pr-review)
└── resources/        # Design system, tech standards, domain knowledge
```

## Development Commands

```bash
# Development
npm run dev                    # Start all apps
npm run dev --filter=web       # Start web app only

# Database
npm run db:start               # Start local Supabase
npm run db:reset               # Reset local database
npm run db:types               # Generate TypeScript types

# Testing & Quality
npm run test                   # Run all tests
npm run test:coverage          # Coverage report
npm run lint                   # Lint all packages
npm run build                  # Production build

# Git Workflow
git checkout -b feat/feature-name
# ... make changes ...
npm run test && npm run build  # Verify before commit
```

## Tech Stack

**Frontend**: React 18, TypeScript, Vite, TanStack Query, Tailwind CSS
**Backend**: Supabase (PostgreSQL, Edge Functions, Auth, RLS)
**Testing**: Vitest, React Testing Library
**Deployment**: Vercel (web), Supabase (backend)

## Design System Quick Reference

**Colors**:

- Primary: `#155263` (teal-600), `#2798b7` (teal-500)
- Accent: `#daa520` (gold-500), `#ffd700` (gold-bright)
- Semantic: Success `#10b981`, Warning `#f59e0b`, Error `#dc143c`
- Neutrals: Gray scale from `#0a0a0a` to `#f5f5f5`

**Typography**:

- Headings: 'Jags' font (custom Jacksonville Jaguars font)
- Body: System font stack
- Scale: Display 72px → H1 56px → H2 36px → H3 28px → Body 16px

**Spacing** (4px grid):

- `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px`
- Mobile padding: 16px, Desktop padding: 32px

**Components**:

- Buttons: Primary (teal), Secondary (outline), Ghost (text)
- Cards: Elevated, Outlined, Champion (gold border), Loser (red border)
- Forms: Inputs, selects, checkboxes with validation states
- Tables: Sortable headers, hover states, striped rows

📖 **Full design system**: See [.claude/resources/design-tokens.md](.claude/resources/design-tokens.md)

## Code Standards

**TypeScript/React**:

- Functional components with hooks
- Keep components <200 lines
- Strict TypeScript (no `any`)
- Prefer composition over inheritance
- **CRITICAL**: Remove unused parameters (e.g., `index` in `.map((item, index) =>` if not used)
- **CRITICAL**: Run `npm run build` before committing to catch TypeScript errors
- **CRITICAL**: Check for proper color contrast (#c5901c for charts, not #daa520)

**Database**:

- Row Level Security (RLS) on all tables
- Migrations for all schema changes
- Index foreign keys and frequent queries
- Types auto-generated in `packages/shared/types.ts`

**Testing**:

- Unit tests for business logic
- Integration tests for API endpoints
- Minimum 70% coverage
- Test happy path + edge cases

**Security**:

- Never commit secrets
- Environment variables for config
- Validate all user input
- HTTPS in production

**Performance**:

- Initial bundle <500KB
- Lazy load images and components
- Optimize database queries
- Cache when appropriate

## Available Workflows

### Agents (for phase-specific work)

- **plan** - Create PRDs and specifications
- **architect** - Design technical architecture
- **design** - Create UI/UX mockups in apps/mockups
- **build** - Implement features with tests
- **review** - Code review and PR creation
- **debug** - Systematic bug investigation

### Skills (automated workflows)

- `/feature-flow` - Complete AI workflow (plan → design → build → review)
- `/pr-review` - Automated code review and PR creation
- `/quick-fix` - Fast bug fixes and minor features

## Domain Context

**League**: 10-team PPR fantasy football league
**Users**: Close friends, ages 25-45, mobile-first
**Season**: 2025-2026
**Features**: Real-time scoring, team management, stats, standings, matchups, analytics

📖 **Full league details**: See [.claude/resources/league-info.md](.claude/resources/league-info.md)

## Workflow Philosophy

**For new features**: Use full AI workflow (plan → architect/design → build → review)
**For bug fixes**: Use quick-fix or debug agent directly
**For exploration**: Let Claude naturally explore and ask questions
**For quality**: Always run tests and build before committing

## Pro Tips

- Design mockups go in `apps/mockups/` (runnable React app, not deployed)
- Database schema is auto-generated - see `packages/shared/types.ts`
- Use design tokens consistently (see resources/design-tokens.md)
- Mobile-first, then enhance for desktop
- Fun sarcastic tone in UI copy (overly serious about fantasy football)
