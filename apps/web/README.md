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

This app is deployed to Vercel with automatic deployments on push to `main`.

### Vercel Project Configuration

To deploy this monorepo app to Vercel, configure your Vercel project with these settings:

1. **General Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/web`
   - **Node Version**: 18.x or higher

2. **Build & Development Settings**:
   - **Build Command**: `cd ../.. && npm run build --workspace=@jakes-dad/shared && npm run build --workspace=jakesdadwebsite`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`

3. **Environment Variables**:
   Add these in your Vercel project settings:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### How it Works

- Vercel's GitHub integration automatically deploys on every push to `main`
- The build command ensures the shared package (`@jakes-dad/shared`) builds first
- Dependencies are installed from the monorepo root to include workspace packages
- Environment variables are injected at build time

### Manual Deployment

To deploy manually using Vercel CLI:

```bash
# From the monorepo root
npm run build --workspace=@jakes-dad/shared
npm run build --workspace=jakesdadwebsite

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
