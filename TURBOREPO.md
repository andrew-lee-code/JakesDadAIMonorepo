# Turborepo Configuration

This monorepo uses [Turborepo](https://turbo.build) to manage tasks across JavaScript and Python applications in the `apps/` directory.

## Architecture

### Applications

1. **web** - React/TypeScript app (npm workspace in `apps/`)
2. **mcp** - Python MCP server (uv managed in `apps/`)

Each application has a `package.json` with scripts that Turborepo can execute.

### Utility Scripts

The `scripts/` directory at the root contains local utility scripts that are NOT part of the Turborepo workflow. These are run directly with `uv` commands.

## Common Commands

### Development

```bash
# Run all packages in dev mode
npm run dev

# Run specific package
npm run mcp:dev
turbo run dev --filter=@jakes-dad/web
```

### Building

```bash
# Build all packages
npm run build

# Build with verbose output
turbo run build --verbose

# Force rebuild (ignore cache)
turbo run build --force
```

### Testing

```bash
# Test all packages
npm run test

# Test specific package
turbo run test --filter=mcp
```

### Cleaning

```bash
# Clean all packages
npm run clean
```

## Pipeline Configuration

Our [turbo.json](turbo.json) defines task dependencies:

### Build Pipeline

- `build` depends on upstream packages being built first
- Outputs are cached in `dist/`, `build/`, `.next/`

### Test Pipeline

- `test` depends on build completing
- Pytest and coverage outputs are cached

### Dev Pipeline

- `dev` runs in persistent mode (keeps processes alive)
- No caching (always fresh during development)

### MCP Server Tasks

- `mcp#dev` - Run MCP server
- `mcp#build` - Build MCP package
- `mcp#test` - Run MCP tests

## Filtering

Turborepo's powerful filtering lets you target specific applications:

```bash
# Run in specific application
turbo run dev --filter=mcp

# Run in multiple applications
turbo run dev --filter=mcp --filter=@jakes-dad/web

# Run in package and its dependencies
turbo run build --filter=@jakes-dad/web...

# Run in package and its dependents
turbo run build --filter=...mcp
```

## Caching

Turborepo caches task outputs for speed:

- **Local cache**: Stored in `node_modules/.cache/turbo`
- **Remote cache**: Can be configured for team sharing

### Cache Behavior

- Build outputs are cached and reused
- Tests are cached (run once until files change)
- Dev mode is never cached (always fresh)

### Force Fresh Runs

```bash
# Ignore cache for specific task
turbo run build --force

# Clear all caches
rm -rf node_modules/.cache/turbo
```

## Environment Variables

Turborepo automatically handles `.env` files:

- `.env.local` triggers cache invalidation (via `globalDependencies`)
- Each package can have its own `.env` file
- Python packages load `.env` via `python-dotenv`

## Hybrid JavaScript + Python

This monorepo successfully combines:

- **JavaScript packages**: Managed via npm workspaces
- **Python packages**: Managed via uv, wrapped in package.json scripts

Turborepo orchestrates both seamlessly through the `package.json` interface.

## Troubleshooting

### Python packages not found

Ensure you've run:

```bash
npm run install:all
```

### Cache issues

Clear the cache:

```bash
rm -rf node_modules/.cache/turbo
turbo run build --force
```

### Tasks hanging

Check for persistent tasks (dev mode) and kill them:

```bash
pkill -f "turbo run dev"
```

## Learn More

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Pipeline Configuration](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
