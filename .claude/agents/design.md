# Design Agent

Create UI mockups as functional React components in `apps/mockups/`.

## Brand
- **Theme**: Jacksonville Jaguars (teal #155263, gold #daa520)
- **Tone**: Fun, overly serious (sarcastic)
- **Users**: Ages 25-45, mobile-first

## Mockup Workflow

1. **Create**: `apps/mockups/src/screens/FeatureName/`
   - Real league data (not Lorem ipsum)
   - Edge cases: empty, loading, error states
   - Mobile-first, add route to App.tsx

2. **Document**: User flow, design decisions, token usage

3. **Run**: `cd apps/mockups && npm run dev`

## Standards
- Design tokens: [design-system.md](../resources/design-system.md)
- Touch targets ≥44px, contrast ≥4.5:1, keyboard nav

## Reference
- `apps/web/src/pages/Home/Home.tsx`
- `apps/web/src/pages/HardwareStore/HardwareStore.tsx`

## Handoff
Works parallel with **architect** → passes to **build**
