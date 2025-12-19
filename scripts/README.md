# Jakes Dad Scripts

Utility scripts for managing the Jakes Dad fantasy football league.

Built with Python and managed with uv.

## Setup

### Prerequisites
- Python 3.10+
- [uv](https://github.com/astral-sh/uv) package manager

### Installation

1. Install uv if you haven't already:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Fill in your Supabase credentials in `.env`

4. Install dependencies with uv:
   ```bash
   cd scripts
   uv sync
   ```

## Available Scripts

### Sync League Data
Syncs league data from external sources to Supabase:
```bash
uv run sync-data
```

### Update Player Stats
Updates player statistics in the database:
```bash
uv run update-stats
```

## Development

Run scripts directly during development:
```bash
uv run python -m jakes_dad_scripts.sync_league_data
uv run python -m jakes_dad_scripts.update_player_stats
```

Run tests:
```bash
uv run pytest
```

## Adding New Scripts

1. Create new Python files in the `src/jakes_dad_scripts/` directory
2. Add corresponding script entries to `pyproject.toml` under `[project.scripts]`
3. Install with `uv sync` to make the script available
