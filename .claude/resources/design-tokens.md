# Design Tokens - Jake's Dad Fantasy Football

> Quick reference for design system. See [ui-ux-guidelines.md](ui-ux-guidelines.md) for full specifications.

## Brand

**Theme**: Jacksonville Jaguars
**Tone**: Fun, overly serious (sarcastic)
**Users**: Close friends, ages 25-45, mobile-first

## Colors

### Primary (Teal)
```css
--teal-900: #003f4c;
--teal-700: #006778;
--teal-600: #155263;    /* Primary brand */
--teal-500: #2798b7;    /* Gradients */
--teal-300: #7fcce3;
--teal-100: #e6f4f8;
```

### Accent (Gold)
```css
--gold-700: #c5901c;
--gold-600: #d7a22a;
--gold-500: #daa520;    /* Primary gold */
--gold-300: #ecd17a;
--gold-100: #faf3d4;
```

### Semantic
```css
--success: #10b981;     /* Championship green */
--warning: #f59e0b;     /* Caution amber */
--error: #dc143c;       /* Loser red */
--info: #2563eb;        /* Stat blue */
```

### Neutrals
```css
--gray-900: #0a0a0a;
--gray-700: #2d2d2d;
--gray-500: #666666;
--gray-300: #cccccc;
--gray-100: #f5f5f5;
--white: #ffffff;
--black: #000000;
```

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #155263 0%, #2798b7 100%);
--gradient-gold: linear-gradient(135deg, #c5901c 0%, #ffd700 100%);
```

## Typography

**Fonts**:
- Headings: `'Jags', system-ui, sans-serif`
- Body: `system-ui, -apple-system, 'Segoe UI', sans-serif`
- Code: `'JetBrains Mono', monospace`

**Scale**:
```css
--text-display: 72px;   /* Hero text */
--text-h1: 56px;
--text-h2: 36px;
--text-h3: 28px;
--text-h4: 24px;
--text-h5: 20px;
--text-h6: 18px;
--text-body: 16px;
--text-small: 14px;
--text-xs: 12px;
```

**Weights**:
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

**Line Heights**:
- Headings: `1.2`
- Body: `1.5`
- Code: `1.6`

## Spacing (4px Grid)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

**Component Padding**:
- Mobile: `16px`
- Tablet: `24px`
- Desktop: `32px`

## Components

### Buttons

**Primary** (Teal):
```css
background: var(--teal-600);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;

hover: background: var(--teal-700);
active: background: var(--teal-800);
```

**Secondary** (Outline):
```css
background: transparent;
border: 2px solid var(--teal-600);
color: var(--teal-600);
```

**Ghost** (Text only):
```css
background: transparent;
color: var(--teal-600);
```

### Cards

**Elevated**:
```css
background: white;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
border-radius: 12px;
padding: 24px;
```

**Champion** (Gold border):
```css
border: 2px solid var(--gold-500);
background: linear-gradient(white, #faf3d4);
```

**Loser** (Red border):
```css
border: 2px solid var(--error);
background: linear-gradient(white, #fee2e2);
```

### Forms

**Input**:
```css
border: 1px solid var(--gray-300);
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;

focus: border-color: var(--teal-600);
       box-shadow: 0 0 0 3px rgba(21,82,99,0.1);
```

**Validation States**:
```css
error: border-color: var(--error);
success: border-color: var(--success);
```

### Tables

```css
border: 1px solid var(--gray-200);
border-radius: 8px;

th: background: var(--gray-100);
    font-weight: 600;
    padding: 12px 16px;

tr: hover: background: var(--teal-100);
    border-bottom: 1px solid var(--gray-200);
```

### Badges

**Rank Badge**:
```css
background: var(--teal-600);
color: white;
padding: 4px 12px;
border-radius: 12px;
font-size: 14px;
font-weight: 600;
```

**Champion Badge**:
```css
background: var(--gold-500);
color: var(--gray-900);
```

**Status Badge**:
```css
success: background: var(--success); color: white;
warning: background: var(--warning); color: var(--gray-900);
error: background: var(--error); color: white;
```

## Accessibility

**Contrast Requirements** (WCAG 2.1 AA):
- Normal text: ≥4.5:1
- Large text (≥18px): ≥3:1
- UI components: ≥3:1

**Touch Targets**: ≥44x44px

**Focus States**:
```css
outline: 2px solid var(--teal-600);
outline-offset: 2px;
```

**Keyboard Navigation**:
- All interactive elements must be keyboard accessible
- Logical tab order
- Skip links for navigation

## Responsive Breakpoints

```css
--mobile: 320px - 767px;
--tablet: 768px - 1023px;
--desktop: 1024px+;
```

**Mobile-first approach**:
- Design for mobile (320px)
- Enhance for tablet (768px+)
- Enhance for desktop (1024px+)

**Responsive Type**:
- Reduce heading sizes 20-30% on mobile
- Body text stays 16px minimum (readability)

## Animations

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;

--easing: cubic-bezier(0.4, 0.0, 0.2, 1);
```

**Common Animations**:
- Button hover: `transition: all 150ms ease`
- Card hover: `transition: transform 250ms ease, box-shadow 250ms ease`
- Modal: `transition: opacity 250ms ease`

## Icons

**Size Scale**:
```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

**Usage**: Use system icons or Heroicons for consistency

## Layout

**Container Max Width**: `1280px`
**Content Max Width**: `800px` (for readable text)

**Grid**:
```css
display: grid;
gap: var(--space-6);
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

---

**Full design system**: See [ui-ux-guidelines.md](ui-ux-guidelines.md) for complete component specifications, interaction states, and detailed guidelines.
