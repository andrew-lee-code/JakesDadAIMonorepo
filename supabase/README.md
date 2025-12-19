# Supabase Backend

Backend infrastructure for the Jakes Dad fantasy football league, managed as code.

## Structure

```
supabase/
├── functions/         # Edge Functions (Deno)
│   └── hello/        # Example function
├── migrations/       # Database migrations (SQL)
│   └── 20250101000000_initial_schema.sql
├── seed.sql          # Seed data for development
└── config.toml       # Supabase configuration
```

## Prerequisites

Install the Supabase CLI:
```bash
brew install supabase/tap/supabase
# or
npm install -g supabase
```

## Local Development

### Start Local Supabase

```bash
supabase start
```

This starts:
- PostgreSQL database
- Studio UI (http://localhost:54323)
- API Gateway
- Edge Functions runtime
- Storage
- Auth

### Stop Local Supabase

```bash
supabase stop
```

### Reset Database

```bash
supabase db reset
```

## Database Migrations

### Create a New Migration

```bash
supabase migration new <migration_name>
```

This creates a new migration file in `supabase/migrations/`

### Apply Migrations Locally

```bash
supabase db reset  # Resets and applies all migrations
```

### Apply Migrations to Remote

```bash
supabase db push
```

## Edge Functions

### Create a New Function

```bash
supabase functions new <function_name>
```

### Test Locally

```bash
supabase functions serve <function_name>
```

### Deploy Function

```bash
supabase functions deploy <function_name>
```

## Deployment

### Link to Remote Project

```bash
supabase link --project-ref <project-ref>
```

### Push Database Changes

```bash
supabase db push
```

### Deploy All Functions

```bash
supabase functions deploy
```

## Environment Variables

For local development, create a `.env` file in the supabase directory:

```env
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_KEY=<your-service-key>
```

Get these from `supabase status` after running `supabase start`.

## Helpful Commands

```bash
# Get local Supabase status and connection info
supabase status

# View database schema
supabase db dump --schema public

# Generate TypeScript types from database
supabase gen types typescript --local > types/database.ts

# View logs
supabase functions logs <function_name>
```

## Integration with Apps

Both apps (web and mcp-server) connect to the same Supabase backend:

- **Local**: Connect to `http://localhost:54321`
- **Production**: Connect to your Supabase project URL

Use environment variables in each app to configure the connection.
