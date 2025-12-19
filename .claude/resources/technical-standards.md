# Technical Standards for Jakes Dad Project

## Architecture Principles

1. **Separation of Concerns**: Apps are independent, sharing only database
2. **Type Safety**: Use TypeScript/Python typing throughout
3. **Database Querying**: Use the Supabase sdk in apps to query the database
4. **Edge-First**: Use Supabase Edge Functions for server-side logic
5. **Mobile-First**: Responsive design for all screen sizes

## Code Standards

### TypeScript/React

- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused (<200 lines)
- Use TypeScript strict mode
- Follow React best practices (memo, useCallback when needed)

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
