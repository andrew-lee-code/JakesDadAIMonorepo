# Design System - Jake's Dad Fantasy Football

Jacksonville Jaguars-themed design. **Tone**: Fun, overly serious (sarcastic). **Users**: Ages 25-45, mobile-first.

## Colors

### Primary (Teal)
| Token | Hex | Usage |
|-------|-----|-------|
| teal-600 | `#155263` | Primary brand, buttons, links |
| teal-700 | `#006778` | Hover states |
| teal-500 | `#2798b7` | Gradients |
| teal-100 | `#e6f4f8` | Light backgrounds |

### Accent (Gold)
| Token | Hex | Usage |
|-------|-----|-------|
| gold-500 | `#daa520` | Champion highlights |
| gold-700 | `#c5901c` | Charts (better contrast) |

### Semantic
- Success: `#10b981` (championship green)
- Warning: `#f59e0b` (caution amber)
- Error: `#dc143c` (loser red)
- Info: `#2563eb` (stat blue)

### Neutrals
- Text: `#0a0a0a` | Muted: `#666666` | Borders: `#cccccc` | Background: `#f5f5f5`

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #155263 0%, #2798b7 100%);
--gradient-gold: linear-gradient(135deg, #c5901c 0%, #ffd700 100%);
```

## Typography

**Fonts**: Headings: `'Jags'` (custom) → system fallback. Body: system font stack.

**Scale**: Display 72px → H1 56px → H2 36px → H3 28px → Body 16px → Small 14px

**Responsive**: Reduce headings 20-30% on mobile. Body minimum 16px.

## Spacing (4px Grid)

`4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px`

- Mobile padding: 16px | Tablet: 24px | Desktop: 32px

## Components

### Buttons
- **Primary**: `bg: teal-600, color: white, padding: 12px 24px, radius: 8px`
- **Secondary**: `border: 2px solid teal-600, color: teal-600`
- **Ghost**: `bg: transparent, color: teal-600`

### Cards
- **Standard**: `bg: white, shadow: 0 4px 12px rgba(0,0,0,0.1), radius: 12px`
- **Champion**: Gold border (`#daa520`)
- **Loser**: Red border (`#dc143c`)
- **Hover**: `translateY(-4px)` + increased shadow

### Forms
- Border: `1px solid #cccccc`, radius: 8px
- Focus: Teal border + `box-shadow: 0 0 0 3px rgba(21,82,99,0.1)`
- Error: Red border

### Tables
- Header: Teal background, white text
- Rows: Subtle striping, hover: light teal

### Badges
- Rank: Teal background | Champion: Gold | Status: Semantic colors

## Accessibility (WCAG 2.1 AA)

- **Contrast**: Text ≥4.5:1, large text ≥3:1
- **Touch targets**: ≥44x44px
- **Focus**: `outline: 2px solid teal-600, offset: 2px`
- **Keyboard**: All interactive elements accessible, logical tab order
- **Semantic HTML**: Use `<button>`, `<a>`, `<nav>`, `<main>`, ARIA labels for icons

## Responsive

| Breakpoint | Size |
|------------|------|
| Mobile | < 768px |
| Tablet | 768-1023px |
| Desktop | ≥1024px |

**Approach**: Mobile-first. Stack on mobile, expand on larger screens.

## Animations

- Fast: 150ms | Normal: 250ms | Slow: 400ms
- Easing: `cubic-bezier(0.4, 0.0, 0.2, 1)`

## Reference Implementations

Study before designing:
- `apps/web/src/pages/Home/Home.tsx` - Hero, cards, navigation
- `apps/web/src/pages/HardwareStore/HardwareStore.tsx` - Data display, avatars, responsive
