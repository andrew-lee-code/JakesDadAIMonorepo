# Technical Standards for Jakes Dad Project

## Architecture Principles

1. **Separation of Concerns**: Apps are independent, sharing only database
2. **Type Safety**: Use TypeScript/Python typing throughout
3. **Database Querying**: Use the Supabase sdk in apps to query the database
4. **Edge-First**: Use Supabase Edge Functions for server-side logic
5. **Mobile-First**: Responsive design for all screen sizes
6. **Logical Organization of Code**: Code with different responsibilities should be organized accordingly (queries in a queries/ directory, utils in a utils/ directory, etc.)

## Code Standards

### TypeScript/React

**Component Structure:**
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused (<200 lines)
- Use TypeScript strict mode
- Follow React best practices (memo, useCallback when needed)

**TypeScript Best Practices:**
- ✅ Remove unused variables and parameters
  ```tsx
  // ❌ WRONG - index is declared but never used
  {items.map((item, index) => <Card key={item.id}>...</Card>)}

  // ✅ CORRECT - remove unused index
  {items.map((item) => <Card key={item.id}>...</Card>)}
  ```
- ✅ Use proper types for props (define interfaces)
- ✅ Avoid `any` type - use specific types or `unknown`
- ✅ Check for null/undefined before accessing properties
- ✅ Run `npm run build` frequently to catch errors early

**Common Build Errors to Avoid:**
1. **Unused parameters**: TypeScript strict mode flags unused variables
   - Check all `.map()`, `.forEach()`, `.filter()` callbacks
   - Remove parameters you don't use (especially `index`)

2. **Type mismatches**: Ensure component props match interfaces
   - Pass required props to child components
   - Use optional chaining (`?.`) for optional properties

3. **Missing imports**: Import all components and utilities used
   - Don't rely on auto-imports without verification

4. **Incorrect JSX nesting**: Ensure proper opening/closing tags
   - Run build to catch JSX syntax errors early

**Before Committing Code:**
- [ ] Run `npm run build` to verify TypeScript compilation
- [ ] Check for unused variables (ESLint warnings)
- [ ] Verify all imports are used
- [ ] Test on mobile breakpoints (xs, md, lg)
- [ ] Check color contrast for accessibility

### Python

- Follow PEP 8 style guide
- Use type hints for all function signatures
- Prefer dataclasses for structured data
- Use async/await for I/O operations

### Database

- Use Row Level Security (RLS) for all tables
- Create indexes for foreign keys and frequent queries
- Use migrations for all schema changes
- Never store sensitive data in plain text

## Testing

- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Minimum 70% code coverage

## Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Implement proper authentication and authorization
- Validate all user input
- Use HTTPS in production

## Performance

- Optimize database queries (use explain analyze)
- Implement caching where appropriate
- Lazy load images and components
- Monitor bundle size (<500KB initial load)

## Frameworks

- Follow SOLID coding principles
- Always minimize duplicate code
- Don't hardcode values that will be used repeatedly
