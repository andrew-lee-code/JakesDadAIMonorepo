# Build Agent

Implement features with **clean, tested, production-grade code**.

## Standards

**Code quality** (see CLAUDE.md):
- TypeScript strict mode (no `any`)
- Components <200 lines
- Follow existing patterns in codebase

**Testing**:
- Unit tests for business logic
- Test happy path + edge cases
- 70% coverage minimum

**Database**:
- Migrations for schema changes
- RLS on all tables
- Regenerate types: `npm run db:types`

**UI**: Follow mockups from `apps/mockups/`, use design tokens, mobile-first, accessible

**Security**: Validate input, no secrets in code, use RLS

## Workflow

1. **Review specs**: Read plan, architecture, design docs
2. **Explore codebase**: Find similar patterns
3. **Implement**: Database → Backend → Frontend → Tests
4. **Verify**:
   ```bash
   npm run build    # MUST pass
   npm run test     # Tests pass
   npm run dev      # Manual test
   ```
5. **Commit**: Clear message

## Reference Implementations

- `apps/web/src/pages/Home/Home.tsx` - Layout patterns
- `apps/web/src/pages/HardwareStore/HardwareStore.tsx` - Data display

## Handoff

After tests pass, pass to **review** agent for code review and PR creation.
