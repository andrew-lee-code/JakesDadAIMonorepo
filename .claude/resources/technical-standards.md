# Technical Standards

## Architecture Principles

1. **Separation of Concerns**: Apps are independent, sharing only database
2. **Type Safety**: Use TypeScript/Python typing throughout
3. **Edge-First**: Use Supabase Edge Functions for server-side logic
4. **Mobile-First**: Responsive design for all screen sizes
5. **Logical Organization**: Code organized by responsibility (queries/, utils/, etc.)

## Code Standards

### TypeScript/React

- Functional components with hooks
- Components <200 lines
- TypeScript strict mode (no `any`)
- Follow React best practices
- Remove unused variables and parameters
- Run `npm run build` to catch errors

### Python

- Follow PEP 8
- Type hints for all functions
- Prefer dataclasses
- Use async/await for I/O

### Database

- Row Level Security on all tables
- Indexes for foreign keys and frequent queries
- Migrations for all schema changes
- Never store sensitive data in plain text

## Testing

- Unit tests for business logic
- Integration tests for API endpoints
- Minimum 70% coverage
- Test happy path + edge cases

## Security

- Never commit secrets
- Environment variables for config
- Proper auth and authorization
- Validate all user input
- HTTPS in production

## Performance

- Optimize database queries
- Implement caching where appropriate
- Lazy load images and components
- Bundle size <500KB initial load

## Principles

- Follow SOLID
- Minimize duplicate code
- Don't hardcode repeated values
