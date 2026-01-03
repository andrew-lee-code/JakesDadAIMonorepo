# Jakes Dad Fantasy Football Monorepo

A monorepo for the Jakes Dad fantasy football league, featuring agent-centric development with AI workflow.

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
│   └── AI_WORKFLOW.md  # Agent-centric workflow guide
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

The project uses a hybrid deployment strategy:

- **GitHub Actions** for database migrations (infrastructure)
- **Vercel** for web applications (frontend)

This separation ensures database changes are controlled via CI/CD while web apps benefit from Vercel's edge network and optimizations.

---

## Vercel Deployment (Web Apps)

This monorepo uses **Vercel's native Turborepo integration** with automatic build skipping. Each app in `/apps/*` gets its own Vercel project, and Vercel intelligently skips builds when apps haven't changed.

### Initial Setup (One-Time Per App)

1. **Create Vercel Project**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the app to deploy (e.g., `apps/web`)

2. **Configure Project Settings**:

   **General:**

   - **Framework Preset**: Vite (or framework for your app)
   - **Root Directory**: `apps/web` (or path to your app)
   - **Node Version**: 18.x or higher

   **Build & Development:**

   - **Build Command**: `turbo run build`
   - **Output Directory**: `dist` (or your app's output)
   - **Install Command**: (leave default - auto-detected)

3. **Set Environment Variables**:

   - Go to Project Settings → Environment Variables
   - Add your app's environment variables:
     ```
     VITE_SUPABASE_URL = <your-supabase-url>
     VITE_SUPABASE_ANON_KEY = <your-supabase-anon-key>
     ```
   - Set for: Production, Preview, Development

4. **Deploy**:
   - Vercel will deploy automatically
   - Future pushes to `main` trigger automatic deployments

### How Automatic Build Skipping Works

Vercel analyzes your Turborepo dependency graph on every push:

**✅ Builds When:**

- App code changes (`apps/web/src/**`)
- App dependencies change (`packages/shared/**` if app uses it)
- `package.json` changes
- Environment variables change
- First commit on new branch

**❌ Skips When:**

- Other apps change (`apps/admin/**`)
- Database migrations (`supabase/**`)
- Documentation only (`README.md`, `*.md`)
- No relevant changes detected

**Example Scenarios:**

| Change                             | `apps/web` Vercel Project | `apps/admin` Vercel Project      |
| ---------------------------------- | ------------------------- | -------------------------------- |
| Edit `apps/web/src/App.tsx`        | ✅ Builds                 | ❌ Skips                         |
| Edit `packages/shared/theme.ts`    | ✅ Builds                 | ✅ Builds (if depends on shared) |
| Edit `supabase/migrations/003.sql` | ❌ Skips                  | ❌ Skips                         |
| Edit `apps/admin/index.html`       | ❌ Skips                  | ✅ Builds                        |
| Edit `README.md`                   | ❌ Skips                  | ❌ Skips                         |

### Scaling to Multiple Apps

To add more apps to Vercel:

1. **Create New App** in `/apps/` directory
2. **Create Vercel Project**:
   - Import same GitHub repo
   - Set root directory to `apps/new-app`
   - Build command: `turbo run build`
3. **Configure Environment Variables**
4. **Deploy**

Each app:

- Has its own Vercel project
- Deploys independently
- Shares Turborepo cache
- Only builds when needed

**No limit on apps** - easily scale to 10+ projects.

### Vercel Deployment Status

After setup, every push to `main`:

- Vercel checks each project for changes
- Builds only affected apps
- Provides deployment preview URLs for PRs

View deployment status:

- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- GitHub PR checks: Vercel bot comments with preview URLs

### Manual Deployment to Vercel

```bash
# Build specific app
turbo run build --filter=jakesdadwebsite

# Deploy from app directory
cd apps/web
vercel --prod
```

---

## GitHub Actions Deployment (Database)

Database migrations are deployed via GitHub Actions for better control and auditability.

### Required GitHub Secrets

To enable automated database deployments, add these secrets to your GitHub repository:

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:

| Secret Name             | Description                     | Where to find it                                                                              |
| ----------------------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| `SUPABASE_ACCESS_TOKEN` | Supabase personal access token  | [Supabase Dashboard](https://supabase.com/dashboard/account/tokens) → Account → Access Tokens |
| `SUPABASE_PROJECT_REF`  | Production project reference ID | Supabase Dashboard → Project Settings → General → Reference ID                                |

### How It Works

The deployment workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) runs when you push to `main`:

1. **Detect Changes**: Checks if `supabase/**` directory changed
2. **Deploy Database** (only if migrations changed):
   - Links to production Supabase project
   - Pushes database migrations
   - Verifies deployment

**Smart Detection**: If only web app code changes, database deployment is skipped.

### Manual Database Deployment

```bash
# Deploy database migrations
npm run db:push

# Deploy edge functions
npm run functions:deploy
```

---

## Deployment Architecture Summary

```
Push to main
     │
     ├─> GitHub Actions (runs immediately)
     │   └─> Detects `supabase/**` changes
     │       └─> Deploys migrations to Supabase
     │
     └─> Vercel (runs in parallel)
         ├─> Checks `apps/web` + `packages/shared`
         │   └─> Builds & deploys if changed
         │
         ├─> Checks `apps/admin` + dependencies
         │   └─> Builds & deploys if changed
         │
         └─> Checks `apps/...` (future apps)
             └─> Builds & deploys if changed
```

**Benefits:**

- **Separation of Concerns**: Infrastructure (DB) vs Application (frontend)
- **Intelligent Skipping**: Only build what changed
- **Scalable**: Add apps without configuration overhead
- **Fast**: Turborepo caching + Vercel edge network

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

## AI Workflow

This project follows a **Build, Measure, Analyze, Decide** workflow with agent-centric development. See [.claude/AI_WORKFLOW.md](.claude/AI_WORKFLOW.md) for details.

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
      "args": ["--directory", "packages/mcp-server", "run", "jakes-dad-mcp"]
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
