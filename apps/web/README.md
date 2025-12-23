# Jake's Dad Website 2.0

Supabase implementation of Jake's Dad league website built with React, TypeScript, Material-UI, and React Router.

## Features

- ⚛️ React 19 with TypeScript
- 🎨 Material-UI for modern, responsive design
- 🧭 React Router for client-side routing
- ⚡ Vite for fast development and building
- 🎯 ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd JakesDadWebsite2.0
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx   # Navigation bar component
├── pages/              # Page components
│   ├── Home/           # Home page
│   └── About/          # About page
├── assets/             # Static assets
├── App.tsx             # Main app component with routing
└── main.tsx            # Application entry point
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI** - Component library and design system
- **React Router** - Client-side routing
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## Deployment

This app is deployed to Vercel with automatic deployments on every push to `main`.

### Vercel Project Configuration

This app uses **Vercel's native Turborepo integration** with automatic build skipping. Vercel automatically detects changes to this app or its dependencies and skips unnecessary deployments.

Configure your Vercel project with these settings:

1. **General Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/web`
   - **Node Version**: 18.x or higher

2. **Build & Development Settings**:
   - **Build Command**: `turbo run build`
   - **Output Directory**: `dist`
   - **Install Command**: (leave default - auto-detected)

3. **Environment Variables**:
   Add these in your Vercel project settings:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### How Automatic Build Skipping Works

Vercel uses Turborepo's dependency graph to determine if this app needs rebuilding:

**✅ Triggers Deployment:**
- Changes to `apps/web/src/**`
- Changes to `apps/web/package.json`
- Changes to `packages/shared/**` (dependency)
- First commit on new branch
- Environment variable changes

**❌ Skips Deployment:**
- Changes to other apps (`apps/future-app/**`)
- Changes to `supabase/**` (handled by GitHub Actions)
- Changes to documentation only
- No changes to this app or dependencies

### How it Works

- **Turborepo**: Handles build orchestration and dependency management
- **Automatic Filtering**: Vercel adds `--filter=jakesdadwebsite` based on root directory
- **Smart Caching**: Turborepo caches build outputs for faster deployments
- **Dependency Tracking**: Automatically rebuilds when `packages/shared` changes

### Manual Deployment

To deploy manually using Vercel CLI:

```bash
# From the monorepo root
turbo run build --filter=jakesdadwebsite

# From apps/web
cd apps/web
vercel --prod
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request
