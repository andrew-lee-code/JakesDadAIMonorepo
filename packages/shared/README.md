# @jakes-dad/shared

Shared package containing MUI theme and Supabase database types for the Jakes Dad monorepo.

## What's Inside

- **Theme**: Material-UI theme configuration with league-specific colors and typography
- **Types**: Auto-generated TypeScript types from Supabase database schema

## Installation

This package is internal to the monorepo. Add it to your app's dependencies:

```json
{
  "dependencies": {
    "@jakes-dad/shared": "workspace:*"
  }
}
```

## Usage

### Theme

Import and use the MUI theme in your React app:

```typescript
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@jakes-dad/shared';
import '@jakes-dad/shared/fonts.css'; // Load custom Jags font

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

**Important**: Make sure to import `@jakes-dad/shared/fonts.css` to load the custom "Jags" font used in headings. Without this import, headings will fall back to the "Inter" font.

#### Theme Colors

The theme includes league-specific colors:

- **Primary**: Dark teal (#155263)
- **Secondary**: Bright blue (#2798b7)
- **Background**: White (#ffffff) / Light gray (#e6e6e6)
- **Text**: Darkest teal (#0c2f39) / Dark teal (#155263)

#### Typography

- **Headings**: Custom "Jags" font family
- **Body**: Inter font family
- **Font weights**: 400 (regular), 500 (medium)

### Database Types

Import Supabase database types for type-safe queries:

```typescript
import type { Database } from '@jakes-dad/shared';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(url, key);

// Now your queries are fully typed
const { data, error } = await supabase
  .from('owners')
  .select('*');
// data is typed as Database['public']['Tables']['owners']['Row'][]
```

#### Available Types

- `Database` - Complete database schema type
- `Tables` - All table types
- `Views` - All view types
- `Functions` - All function types
- `Enums` - All enum types

## Development

### Regenerate Supabase Types

After making database schema changes, regenerate types:

```bash
cd packages/shared
npm run types:generate
```

This runs `supabase gen types typescript --local` which connects to your local Supabase instance and generates types from the current schema.

**Note**: Make sure your local Supabase is running (`npm run db:start` from repo root).

### Build the Package

Compile TypeScript to JavaScript:

```bash
npm run build
```

This creates the `dist/` directory with compiled JS and type declarations.

### Watch Mode

For development, run TypeScript in watch mode:

```bash
npm run dev
```

## Package Structure

```
packages/shared/
├── dist/              # Compiled output (gitignored)
├── fonts/             # Custom fonts
├── index.ts           # Main entry point
├── theme.ts           # MUI theme configuration
├── types.ts           # Auto-generated Supabase types
├── package.json       # Package configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## Notes

- **Theme values**: The theme.ts file contains the source of truth for league colors and typography. Update it there, not in individual apps.
- **Types are auto-generated**: Never manually edit `types.ts` - it will be overwritten. Always regenerate from Supabase.
- **Peer dependencies**: This package expects `@mui/material` and `react` to be installed in the consuming app.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run dev` | Run TypeScript compiler in watch mode |
| `npm run clean` | Remove compiled files |
| `npm run types:generate` | Regenerate Supabase database types |
