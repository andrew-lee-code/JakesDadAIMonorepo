# Jake's Dad Fantasy Football - Design System

> Jacksonville Jaguars-themed design system. See [design-tokens.md](design-tokens.md) for quick reference.

## Brand Identity

- **Tone**: Fun, overly serious in a sarcastic way
- **Voice**: Bold, confident, slightly irreverent
- **Audience**: Close friends, ages 25-45, mobile-first

## Color System

### Primary Colors

**Teal** (Primary Brand):
- Primary UI: `#155263` (teal-600)
- Gradients: `#2798b7` (teal-500)
- Dark hover: `#006778` (teal-700)

**Gold** (Accent):
- Standard: `#daa520` (gold-500)
- Dark (for charts): `#c5901c` (gold-700)

### Semantic Colors
- Success: `#10b981` (championship green)
- Warning: `#f59e0b` (caution amber)
- Error: `#dc143c` (loser red)
- Info: `#2563eb` (stat blue)

### Neutrals
- Text: `#0a0a0a` (gray-900)
- Muted text: `#666666` (gray-500)
- Borders: `#e0e0e0` (gray-200)
- Background: `#f5f5f5` (gray-100)

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #155263 0%, #2798b7 100%);
--gradient-gold: linear-gradient(135deg, #c5901c 0%, #ffd700 100%);
```

## Typography

**Fonts**:
- Headings: `'Jags'` (custom font) → system fallback
- Body: System font stack

**Scale**: Display 72px → H1 56px → H2 40px → H3 32px → H4 24px → Body 16px → Small 14px

**Responsive**: Reduce headings 20-30% on mobile. Body minimum 16px.

## Spacing (4px Grid)

`4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px`

- Component padding: Mobile 16px, Tablet 24px, Desktop 32px
- Section gaps: 24-48px

## Components

### Buttons
- **Primary**: Teal background, white text
- **Secondary**: Teal outline, teal text
- **Ghost**: Transparent, teal text

Padding: `12px 24px`, border-radius: `8px`, hover: darker shade + shadow

### Cards
- Standard: White, `box-shadow: 0 4px 12px rgba(0,0,0,0.1)`, border-radius: `12px`
- Champion: Gold border (`#daa520`)
- Loser: Red border (`#dc143c`)
- Hover: `translateY(-4px)` + increased shadow

### Forms
- Border: `1px solid #cccccc`
- Focus: Teal border + `0 0 0 3px rgba(21,82,99,0.1)` shadow
- Error: Red border

### Tables
- Header: Teal background, white text
- Rows: Alternate subtle striping
- Hover: Light teal background

### Badges
- Rank: Teal background
- Champion: Gold background
- Status: Semantic colors

## Effects

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
--shadow-md: 0 4px 12px rgba(0,0,0,0.1);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.15);
```

### Transitions
- Fast: `150ms ease`
- Normal: `300ms ease`

All interactive elements: hover state with `transform` + `box-shadow`

## Accessibility

**WCAG 2.1 AA Requirements**:
- Text contrast: ≥4.5:1
- Large text (≥18px): ≥3:1
- Touch targets: ≥44x44px

**Focus**: 2px teal outline, 2px offset

**Semantic HTML**: Use proper elements (`<button>`, `<a>`, `<nav>`, `<main>`), ARIA labels for icon buttons

## Responsive Design

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥1024px

**Approach**: Mobile-first. Stack columns on mobile, expand on larger screens.

## Reference Implementations

See these files for production-quality patterns:
- **Home page**: `apps/web/src/pages/Home/Home.tsx`
- **Hardware Store**: `apps/web/src/pages/HardwareStore/HardwareStore.tsx`

These demonstrate: hero sections, card grids, avatars, responsive layouts, hover effects.

---

**Quick reference**: [design-tokens.md](design-tokens.md)
