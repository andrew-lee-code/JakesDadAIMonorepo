# @jakes-dad/shared

Shared package containing types, theme, and MUI component re-exports for the Jakes Dad monorepo.

## Purpose

This package serves as the **single source of truth** for MUI components and theme across all apps in the monorepo. This ensures:
- Single MUI version across the entire monorepo
- No version conflicts or duplicate packages
- Centralized theme and design system
- Type-safe database schema

## What's Exported

### Theme
```typescript
import { theme } from '@jakes-dad/shared';
```

The theme is built on MUI v7 with custom colors:
- Primary: `#155263` (Dark teal)
- Light: `#2798b7` (Medium teal)
- Dark: `#0c2f39` (Darkest teal)

### Database Types
```typescript
import type { Database } from '@jakes-dad/shared/types';
```

TypeScript types generated from Supabase schema.

### MUI Components
All MUI components are re-exported from this package:

```typescript
import {
  Box,
  Typography,
  Button,
  ThemeProvider,
  // ... all MUI components
} from '@jakes-dad/shared';
```

**Never import directly from `@mui/*`** - always import from `@jakes-dad/shared` instead.

## Dependencies

### MUI v7
This package uses MUI v7 which supports:
- React 17, 18, and 19
- Modern Material Design 3
- Improved performance and smaller bundle sizes

### Peer Dependencies
- `react`: ^18.0.0 || ^19.0.0
- `react-dom`: ^18.0.0 || ^19.0.0

Apps can use either React 18 or 19 - MUI v7 supports both.

## Development

### Build
```bash
npm run build --workspace=@jakes-dad/shared
```

### Generate Database Types
```bash
npm run types:generate --workspace=@jakes-dad/shared
```

## Adding New Components

If you need a MUI component not currently exported:

1. Add it to `index.ts`:
```typescript
export {
  // ... existing exports
  YourNewComponent,
} from '@mui/material';
```

2. Rebuild the package:
```bash
npm run build --workspace=@jakes-dad/shared
```

3. Use it in your app:
```typescript
import { YourNewComponent } from '@jakes-dad/shared';
```

## Version Compatibility

| Package | Version | Note |
|---------|---------|------|
| @mui/material | ^7.3.6 | Core MUI components |
| @mui/system | ^7.3.6 | Styling system |
| @mui/icons-material | ^7.3.6 | Material icons |
| @mui/lab | ^7.0.0-beta.17 | Experimental components |
| React | 18 or 19 | Both supported |

## Benefits of Re-Export Pattern

✅ **Single Version**: Only one MUI version installed across monorepo
✅ **Prevents Conflicts**: Apps can't accidentally install different MUI versions
✅ **Easy Upgrades**: Update MUI once, all apps get it
✅ **Type Safety**: Full TypeScript support
✅ **Smaller Bundles**: No duplicate packages
✅ **Centralized Theme**: Consistent design across all apps