# Jakes Dad Fantasy Football Monorepo

A monorepo for the Jakes Dad fantasy football league, featuring agent-centric development with BMAD workflow.

## Project Structure

```
JakesDadAIMonorepo/
├── apps/
│   ├── web/              # React web application
│   └── mcp-server/       # MCP server with domain knowledge
├── supabase/             # Backend infrastructure (managed as code)
│   ├── functions/        # Edge Functions
│   ├── migrations/       # Database migrations
│   ├── seed.sql          # Seed data
│   └── config.toml       # Supabase config
├── scripts/              # Local utility scripts
├── .claude/              # Claude Code configuration
│   ├── commands/         # Slash commands for AI agents
│   ├── mcp.json          # MCP server configuration
│   └── BMAD_WORKFLOW.md  # Agent-centric workflow guide
└── package.json          # Monorepo root configuration
```

## Applications

### Web App ([apps/web/](apps/web/))
React-based web application for the fantasy football league.
- **Tech Stack**: React, TypeScript, Vite, Supabase
- **Features**: League dashboard, team management, player statistics
- **Run**: `turbo run dev --filter=@jakes-dad/web`

### MCP Server ([apps/mcp-server/](apps/mcp-server/))
Model Context Protocol server containing shared domain knowledge.
- **Tech Stack**: Python, MCP Python SDK, Supabase
- **Features**: League information, database schema, data query tools
- **Deployment**: AWS Lambda (serverless)
- **Run**: `npm run mcp:dev`

## Backend Infrastructure

### Supabase ([supabase/](supabase/))
Backend infrastructure managed as code. Includes database schema, migrations, and edge functions.
- **Tech Stack**: PostgreSQL, Edge Functions (Deno), Supabase CLI
- **Features**: Database schema as code, migrations, edge functions, row-level security
- **Local Dev**: `npm run db:start`
- **Deploy**: `npm run db:push`
- See [supabase/README.md](supabase/README.md) for detailed documentation

## Utility Scripts

### Scripts ([scripts/](scripts/))
Local utility scripts for managing league data (not part of the monorepo workspace).
- **Tech Stack**: Python, Supabase
- **Features**: Data sync, stats updates, maintenance scripts
- **Run**: `cd scripts && uv run <script-name>`

## Getting Started

### Prerequisites
- Node.js >= 18.0.0 (for web app)
- npm >= 9.0.0 (for web app)
- Python 3.10+ (for MCP server and scripts)
- [uv](https://github.com/astral-sh/uv) package manager (for Python packages)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for database management)
- Supabase account (for production deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd JakesDadAIMonorepo
   ```

2. Install uv (for Python packages):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

3. Install web app dependencies:
   ```bash
   npm install
   ```

4. Install Python package dependencies:
   ```bash
   # MCP server
   cd apps/mcp-server && uv sync && cd ../..

   # Scripts
   cd scripts && uv sync && cd ..
   ```

5. Set up environment variables:
   ```bash
   # For web app
   cp apps/web/.env.example apps/web/.env

   # For MCP server
   cp apps/mcp-server/.env.example apps/mcp-server/.env

   # For scripts
   cp scripts/.env.example scripts/.env
   ```

6. Start local Supabase (first time):
   ```bash
   npm run db:start
   ```
   This starts a local Supabase instance with PostgreSQL, Studio, and Edge Functions

7. Fill in your Supabase credentials in each `.env` file
   - For local development, get credentials from `npm run db:status`

### Development

This monorepo uses [Turborepo](https://turbo.build) for task orchestration and caching. See [TURBOREPO.md](TURBOREPO.md) for detailed usage guide.

**Start the database:**
```bash
npm run db:start          # Start local Supabase
npm run db:studio         # Open Supabase Studio UI
```

**Run all apps in dev mode:**
```bash
npm run dev               # Runs web + mcp-server
```

**Run specific apps:**
```bash
npm run mcp:dev           # Run MCP server
turbo run dev --filter=@jakes-dad/web  # Run web app only
```

**Run utility scripts:**
```bash
cd scripts
uv run sync-data          # Sync league data
uv run update-stats       # Update player stats
```

### Database Management

**Local database operations:**
```bash
npm run db:start          # Start local Supabase
npm run db:stop           # Stop local Supabase
npm run db:reset          # Reset database (apply all migrations)
npm run db:status         # View connection info
npm run db:studio         # Open Supabase Studio UI
```

**Create and apply migrations:**
```bash
supabase migration new <name>  # Create new migration
npm run db:reset               # Apply migrations locally
npm run db:push                # Push to production
```

**Edge Functions:**
```bash
npm run functions:serve        # Serve functions locally
npm run functions:deploy       # Deploy to production
```

See [supabase/README.md](supabase/README.md) for detailed documentation.

### CI/CD Deployment

The project uses GitHub Actions to automatically deploy changes when code is pushed to the `main` branch.

**What gets deployed automatically:**
- Database migrations (when `supabase/` changes)
- Web app (when `apps/web/` changes) - _Coming soon_

**Required GitHub Secrets:**

To enable automated deployments, add these secrets to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:

| Secret Name | Description | Where to find it |
|------------|-------------|------------------|
| `SUPABASE_ACCESS_TOKEN` | Your Supabase personal access token | [Supabase Dashboard](https://supabase.com/dashboard/account/tokens) → Account → Access Tokens |
| `SUPABASE_PROJECT_REF` | Your production project reference ID | Supabase Dashboard → Project Settings → General → Reference ID |

**How it works:**

The deployment workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) runs when you push to `main`:

1. **Detect Changes**: Checks which parts of the monorepo changed
2. **Deploy Database** (if `supabase/` changed):
   - Links to production Supabase project
   - Pushes database migrations
   - Verifies deployment
3. **Deploy Web App** (if `apps/web/` changed):
   - _Placeholder for future implementation_

**Manual deployment:**

You can still deploy manually:
```bash
# Deploy database migrations
npm run db:push

# Deploy edge functions
npm run functions:deploy
```

**Other Turborepo commands:**
```bash
npm run build             # Build all packages
npm run test              # Test all packages
npm run lint              # Lint all packages
npm run clean             # Clean all packages
```

**Advanced Turborepo usage:**
```bash
# Run dev only for web app
turbo run dev --filter=@jakes-dad/web

# Run tests with cache disabled
turbo run test --force

# Run in parallel with concurrency limit
turbo run build --concurrency=2
```

## BMAD Workflow

This project follows a **Build, Measure, Analyze, Decide** workflow with agent-centric development. See [.claude/BMAD_WORKFLOW.md](.claude/BMAD_WORKFLOW.md) for details.

### Working with AI Agents

Use Claude Code slash commands:
- `/overview` - Project structure overview
- `/setup` - Environment setup help
- `/supabase` - Database schema assistance

### MCP Server Integration

Configure your Claude client to use the MCP server for domain knowledge:
```json
{
  "mcpServers": {
    "jakes-dad": {
      "command": "uv",
      "args": [
        "--directory",
        "packages/mcp-server",
        "run",
        "jakes-dad-mcp"
      ]
    }
  }
}
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **MCP Server**: Python 3.11, MCP Python SDK
- **Scripts**: Python 3.11, uv package manager
- **Monorepo**: Turborepo for task orchestration and caching

## Contributing

This project is designed for agent-centric development. Use AI agents to:
- Explore the codebase
- Implement new features
- Review and optimize code
- Manage database schema
- Update documentation

## License

Private project for the Jakes Dad fantasy football league.