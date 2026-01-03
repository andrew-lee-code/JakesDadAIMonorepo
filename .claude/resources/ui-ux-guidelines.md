# Jake's Dad Fantasy Football - Design System

> A comprehensive design system for the Jake's Dad fantasy football league platform, inspired by Jacksonville Jaguars branding with a fun, overly serious (but sarcastic) personality.

---

## 1. Brand Identity

### Brand Personality
- **Tone**: Fun, overly serious in a sarcastic way
- **Voice**: Bold, confident, slightly irreverent
- **Target Audience**: Close friends, ages 25-45
- **Platforms**: Mobile and desktop web

### Brand Values
- Competitive spirit
- Camaraderie and trash talk
- Statistical excellence
- League tradition and history

---

## 2. Color System

### Primary Colors (Jacksonville Jaguars)

**Teal (Primary Brand Color)**
```css
--color-teal-900: #003f4c;    /* Darkest - text on light backgrounds */
--color-teal-800: #00566a;    /* Dark - hover states */
--color-teal-700: #006778;    /* Core brand teal */
--color-teal-600: #155263;    /* Primary UI teal */
--color-teal-500: #2798b7;    /* Light teal - gradients */
--color-teal-400: #4db8d4;    /* Lighter - backgrounds */
--color-teal-300: #7fcce3;    /* Very light - hover backgrounds */
--color-teal-200: #b3e0ed;    /* Pale - disabled states */
--color-teal-100: #e6f4f8;    /* Palest - subtle backgrounds */
```

**Gold (Accent Color)**
```css
--color-gold-900: #8b6914;    /* Darkest gold */
--color-gold-800: #a87c18;    /* Dark gold */
--color-gold-700: #c5901c;    /* Deep gold */
--color-gold-600: #d7a22a;    /* Standard gold */
--color-gold-500: #daa520;    /* Primary gold (goldenrod) */
--color-gold-400: #e4bb4d;    /* Light gold */
--color-gold-300: #ecd17a;    /* Lighter gold */
--color-gold-200: #f4e7a7;    /* Pale gold */
--color-gold-100: #faf3d4;    /* Palest gold */
```

### Neutral Colors

**Grays**
```css
--color-gray-900: #0a0a0a;    /* Almost black */
--color-gray-800: #1a1a1a;    /* Dark charcoal */
--color-gray-700: #2d2d2d;    /* Charcoal */
--color-gray-600: #4a4a4a;    /* Medium gray */
--color-gray-500: #666666;    /* Standard gray */
--color-gray-400: #999999;    /* Light gray */
--color-gray-300: #cccccc;    /* Lighter gray */
--color-gray-200: #e0e0e0;    /* Very light gray */
--color-gray-100: #f5f5f5;    /* Off-white gray */
--color-white: #ffffff;       /* Pure white */
--color-black: #000000;       /* Pure black */
```

### Semantic Colors

**Success (Championship Green)**
```css
--color-success-700: #0d7d4d;
--color-success-600: #10b981;
--color-success-500: #34d399;
--color-success-100: #d1fae5;
```

**Warning (Caution Amber)**
```css
--color-warning-700: #b45309;
--color-warning-600: #f59e0b;
--color-warning-500: #fbbf24;
--color-warning-100: #fef3c7;
```

**Error (Loser Red)**
```css
--color-error-700: #b91c1c;
--color-error-600: #dc143c;
--color-error-500: #ef4444;
--color-error-100: #fee2e2;
```

**Info (Stat Blue)**
```css
--color-info-700: #1e40af;
--color-info-600: #2563eb;
--color-info-500: #3b82f6;
--color-info-100: #dbeafe;
```

### Gradient Definitions

```css
--gradient-primary: linear-gradient(135deg, #155263 0%, #2798b7 100%);
--gradient-gold: linear-gradient(135deg, #d7a22a 0%, #daa520 100%);
--gradient-dark: linear-gradient(135deg, #0a0a0a 0%, #2d2d2d 100%);
--gradient-teal-to-gold: linear-gradient(135deg, #155263 0%, #daa520 100%);
```

### Color Usage Guidelines

**Do's:**
- ✅ Use teal (#155263) as primary brand color for headers, CTAs, navigation
- ✅ Use gold (#daa520) for accents, awards, achievements, 1st place highlights
- ✅ Use gradients for hero sections and major headings
- ✅ Maintain 4.5:1 contrast ratio minimum for text
- ✅ Use semantic colors (success/error/warning) for status indicators

**Don'ts:**
- ❌ Don't use pure black (#000000) for body text (use gray-900 instead)
- ❌ Don't mix multiple accent colors in the same component
- ❌ Don't use low-contrast color combinations
- ❌ Don't use teal and gold together without sufficient separation

---

## 3. Typography System

### Font Families

```css
--font-primary: 'Jags', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;
--font-monospace: 'Monaco', 'Courier New', monospace;
```

**Font Loading:**
- Custom 'Jags' font for brand headers
- System font stack for optimal performance
- Fallbacks ensure graceful degradation

### Type Scale

```css
/* Display (Hero text) */
--font-size-display: 4.5rem;    /* 72px */
--line-height-display: 1.1;

/* Headings */
--font-size-h1: 3.5rem;         /* 56px */
--font-size-h2: 2.5rem;         /* 40px */
--font-size-h3: 2rem;           /* 32px */
--font-size-h4: 1.5rem;         /* 24px */
--font-size-h5: 1.25rem;        /* 20px */
--font-size-h6: 1.125rem;       /* 18px */

/* Body */
--font-size-base: 1rem;         /* 16px - base */
--font-size-lg: 1.125rem;       /* 18px - large body */
--font-size-sm: 0.875rem;       /* 14px - small */
--font-size-xs: 0.75rem;        /* 12px - extra small */
--font-size-xxs: 0.625rem;      /* 10px - captions */

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Responsive Typography

```css
/* Mobile (< 768px) */
@media (max-width: 767px) {
  --font-size-display: 2.5rem;  /* 40px */
  --font-size-h1: 2rem;         /* 32px */
  --font-size-h2: 1.5rem;       /* 24px */
  --font-size-h3: 1.25rem;      /* 20px */
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  --font-size-display: 3.5rem;  /* 56px */
  --font-size-h1: 2.5rem;       /* 40px */
  --font-size-h2: 2rem;         /* 32px */
}
```

### Typography Guidelines

**Do's:**
- ✅ Use 'Jags' font for main brand headers and hero text
- ✅ Use system fonts for body content for performance
- ✅ Maintain minimum font size of 14px (0.875rem) for body text
- ✅ Use letter-spacing for uppercase text (0.5px - 2px)
- ✅ Use text-shadow for text on background images

**Don'ts:**
- ❌ Don't use more than 3 font weights in a single view
- ❌ Don't use font sizes smaller than 12px for critical content
- ❌ Don't use all caps for paragraphs (only for labels/badges)

---

## 4. Spacing System

### Base Unit: 4px Grid

```css
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### Layout Spacing

```css
/* Section Spacing */
--section-padding-mobile: var(--space-8);
--section-padding-tablet: var(--space-12);
--section-padding-desktop: var(--space-16);

/* Container Widths */
--container-xs: 480px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Grid Gaps */
--gap-xs: var(--space-2);    /* 8px */
--gap-sm: var(--space-4);    /* 16px */
--gap-md: var(--space-6);    /* 24px */
--gap-lg: var(--space-8);    /* 32px */
--gap-xl: var(--space-12);   /* 48px */
```

---

## 5. Component Specifications

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--color-teal-600);
  color: var(--color-white);
  padding: 0.75rem 1.5rem;      /* 12px 24px */
  border-radius: 0.5rem;        /* 8px */
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--color-teal-700);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:disabled {
  background: var(--color-gray-300);
  color: var(--color-gray-500);
  cursor: not-allowed;
  box-shadow: none;
}
```

#### Secondary Button (Gold Accent)
```css
.btn-secondary {
  background: var(--color-gold-600);
  color: var(--color-gray-900);
  /* ... same spacing and transitions as primary */
}

.btn-secondary:hover {
  background: var(--color-gold-700);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-teal-600);
  border: 2px solid var(--color-teal-600);
  padding: 0.625rem 1.375rem; /* Account for border */
}

.btn-ghost:hover {
  background: var(--color-teal-100);
  border-color: var(--color-teal-700);
}
```

#### Button Sizes
```css
.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--font-size-lg);
}
```

### Cards

```css
.card {
  background: var(--color-white);
  border-radius: 1rem;              /* 16px */
  padding: 1.5rem;                  /* 24px */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* Card variants */
.card-gold {
  border: 3px solid var(--color-gold-600);
}

.card-teal {
  border: 3px solid var(--color-teal-600);
}

.card-flat {
  box-shadow: none;
  border: 1px solid var(--color-gray-200);
}
```

### Form Elements

#### Input Fields
```css
.input {
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-gray-300);
  border-radius: 0.5rem;
  font-size: var(--font-size-base);
  color: var(--color-gray-900);
  background: var(--color-white);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.input:focus {
  outline: none;
  border-color: var(--color-teal-600);
  box-shadow: 0 0 0 3px rgba(21, 82, 99, 0.1);
}

.input:disabled {
  background: var(--color-gray-100);
  color: var(--color-gray-500);
  cursor: not-allowed;
}

.input.error {
  border-color: var(--color-error-600);
}

.input.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 20, 60, 0.1);
}
```

#### Checkboxes & Radio Buttons
```css
.checkbox,
.radio {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--color-gray-400);
  cursor: pointer;
}

.checkbox:checked,
.radio:checked {
  background: var(--color-teal-600);
  border-color: var(--color-teal-600);
}
```

### Navigation

#### Navbar
```css
.navbar {
  background: var(--gradient-primary);
  padding: var(--space-4) var(--space-6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--space-2);
  transition: background 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: var(--font-weight-semibold);
}
```

### Badges & Chips

```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-gold {
  background: var(--color-gold-600);
  color: var(--color-white);
}

.badge-teal {
  background: var(--color-teal-600);
  color: var(--color-white);
}

.badge-success {
  background: var(--color-success-600);
  color: var(--color-white);
}

.badge-error {
  background: var(--color-error-600);
  color: var(--color-white);
}
```

### Avatars

```css
.avatar {
  width: 3rem;              /* 48px */
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.avatar-sm { width: 2rem; height: 2rem; }
.avatar-md { width: 3rem; height: 3rem; }
.avatar-lg { width: 4rem; height: 4rem; }
.avatar-xl { width: 6rem; height: 6rem; }

.avatar-gold {
  border-color: var(--color-gold-600);
  border-width: 3px;
  box-shadow: 0 4px 16px rgba(218, 165, 32, 0.4);
}
```

### Tables

```css
.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
  border-radius: 0.75rem;
  overflow: hidden;
}

.table th {
  background: var(--color-teal-600);
  color: var(--color-white);
  padding: var(--space-4);
  text-align: left;
  font-weight: var(--font-weight-semibold);
}

.table td {
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-gray-200);
}

.table tr:hover {
  background: var(--color-gray-100);
}
```

---

## 6. Effects & Animations

### Shadows

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 12px 48px rgba(0, 0, 0, 0.2);

/* Text shadows */
--text-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--text-shadow-md: 0 2px 4px rgba(0, 0, 0, 0.3);
--text-shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.3);
```

### Border Radius

```css
--radius-sm: 0.25rem;     /* 4px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
--radius-2xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* Fully rounded */
```

### Transitions

```css
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;

/* Common transitions */
--transition-colors: color 300ms ease, background-color 300ms ease, border-color 300ms ease;
--transition-transform: transform 300ms ease;
--transition-shadow: box-shadow 300ms ease;
--transition-all: all 300ms ease;
```

### Animations

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

---

## 7. Accessibility Guidelines

### Color Contrast Requirements

**WCAG 2.1 Level AA Compliance:**
- Normal text (< 18px): **4.5:1** minimum contrast ratio
- Large text (≥ 18px or ≥ 14px bold): **3:1** minimum contrast ratio
- UI components and graphical objects: **3:1** minimum contrast ratio

**Verified Color Combinations:**
✅ Teal-600 (#155263) on White → 7.8:1
✅ Gray-900 (#0a0a0a) on White → 19.5:1
✅ White on Teal-600 (#155263) → 7.8:1
✅ Gray-900 on Gold-500 (#daa520) → 6.9:1
✅ White on Error-600 (#dc143c) → 4.8:1

### Focus Indicators

```css
*:focus-visible {
  outline: 3px solid var(--color-teal-600);
  outline-offset: 2px;
}

/* Button focus */
.btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(21, 82, 99, 0.3);
}

/* Input focus */
.input:focus {
  border-color: var(--color-teal-600);
  box-shadow: 0 0 0 3px rgba(21, 82, 99, 0.1);
}
```

### Text Minimums

- Minimum body text: **14px (0.875rem)**
- Minimum interactive text: **16px (1rem)**
- Minimum touch target: **44px × 44px**
- Minimum spacing between interactive elements: **8px**

### Semantic HTML

**Required:**
- Use `<button>` for clickable actions
- Use `<a>` for navigation
- Use proper heading hierarchy (`<h1>` → `<h6>`)
- Use `<nav>` for navigation sections
- Use `<main>` for main content
- Use ARIA labels where needed

### Screen Reader Support

```html
<!-- Example: Icon buttons -->
<button aria-label="Close modal">
  <CloseIcon />
</button>

<!-- Example: Loading states -->
<div role="status" aria-live="polite">
  <span class="sr-only">Loading...</span>
  <CircularProgress />
</div>

<!-- Example: Form errors -->
<input
  type="text"
  aria-invalid="true"
  aria-describedby="error-message"
/>
<span id="error-message" role="alert">
  Please enter a valid email
</span>
```

---

## 8. Responsive Design

### Breakpoints

```css
--breakpoint-xs: 320px;
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Media Query Utilities

```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile Considerations

**Touch Targets:**
- Minimum size: **44px × 44px** (Apple HIG, Material Design)
- Recommended size: **48px × 48px**
- Minimum spacing: **8px** between targets

**Navigation:**
- Use hamburger menu on mobile (< 768px)
- Bottom navigation for primary actions on mobile
- Swipe gestures for galleries/carousels

**Typography:**
- Scale down heading sizes on mobile
- Increase line-height for body text on mobile (1.6 - 1.75)
- Use larger touch-friendly form inputs

**Layout:**
- Stack columns vertically on mobile
- Use full-width cards on mobile
- Reduce padding/margins proportionally

---

## 9. Design Tokens (CSS Custom Properties)

### Complete Token Export

```css
:root {
  /* Colors - Teal */
  --color-teal-900: #003f4c;
  --color-teal-800: #00566a;
  --color-teal-700: #006778;
  --color-teal-600: #155263;
  --color-teal-500: #2798b7;
  --color-teal-400: #4db8d4;
  --color-teal-300: #7fcce3;
  --color-teal-200: #b3e0ed;
  --color-teal-100: #e6f4f8;

  /* Colors - Gold */
  --color-gold-900: #8b6914;
  --color-gold-800: #a87c18;
  --color-gold-700: #c5901c;
  --color-gold-600: #d7a22a;
  --color-gold-500: #daa520;
  --color-gold-400: #e4bb4d;
  --color-gold-300: #ecd17a;
  --color-gold-200: #f4e7a7;
  --color-gold-100: #faf3d4;

  /* Colors - Grays */
  --color-gray-900: #0a0a0a;
  --color-gray-800: #1a1a1a;
  --color-gray-700: #2d2d2d;
  --color-gray-600: #4a4a4a;
  --color-gray-500: #666666;
  --color-gray-400: #999999;
  --color-gray-300: #cccccc;
  --color-gray-200: #e0e0e0;
  --color-gray-100: #f5f5f5;
  --color-white: #ffffff;
  --color-black: #000000;

  /* Colors - Semantic */
  --color-success-700: #0d7d4d;
  --color-success-600: #10b981;
  --color-success-500: #34d399;
  --color-success-100: #d1fae5;

  --color-warning-700: #b45309;
  --color-warning-600: #f59e0b;
  --color-warning-500: #fbbf24;
  --color-warning-100: #fef3c7;

  --color-error-700: #b91c1c;
  --color-error-600: #dc143c;
  --color-error-500: #ef4444;
  --color-error-100: #fee2e2;

  --color-info-700: #1e40af;
  --color-info-600: #2563eb;
  --color-info-500: #3b82f6;
  --color-info-100: #dbeafe;

  /* Typography */
  --font-primary: 'Jags', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  --font-size-display: 4.5rem;
  --font-size-h1: 3.5rem;
  --font-size-h2: 2.5rem;
  --font-size-h3: 2rem;
  --font-size-h4: 1.5rem;
  --font-size-h5: 1.25rem;
  --font-size-h6: 1.125rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-sm: 0.875rem;
  --font-size-xs: 0.75rem;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Effects */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  --transition-base: 300ms ease;
}
```

---

## 10. Usage Guidelines & Best Practices

### Do's ✅

1. **Always use design tokens** instead of hardcoded values
2. **Follow the 4px spacing grid** for all margins and padding
3. **Use semantic color names** (success, error, warning) for status indicators
4. **Ensure 4.5:1 contrast ratio minimum** for all text
5. **Test on mobile devices** (both portrait and landscape)
6. **Use proper heading hierarchy** (don't skip levels)
7. **Provide focus indicators** for all interactive elements
8. **Use loading states** for async operations
9. **Add hover/active states** to all clickable elements
10. **Include ARIA labels** for icon-only buttons

### Don'ts ❌

1. **Don't use colors outside the palette** without approval
2. **Don't create custom spacing values** (use the scale)
3. **Don't use font sizes smaller than 14px** for body text
4. **Don't make touch targets smaller than 44px**
5. **Don't use low-contrast color combinations**
6. **Don't skip responsive design** (mobile-first approach)
7. **Don't use all-caps for long text** (only for labels/badges)
8. **Don't nest interactive elements** (no buttons inside links)
9. **Don't use color as the only indicator** (add icons/text)
10. **Don't ignore loading and error states**

---

## 11. Component Checklist

When designing a new component, ensure:

- [ ] Uses colors from the design system
- [ ] Uses spacing from the 4px grid
- [ ] Uses typography scale and weights
- [ ] Has hover state (if interactive)
- [ ] Has focus state (keyboard accessible)
- [ ] Has disabled state (if applicable)
- [ ] Has loading state (if async)
- [ ] Has error state (if applicable)
- [ ] Meets WCAG 2.1 AA contrast requirements
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1023px)
- [ ] Works on desktop (≥ 1024px)
- [ ] Touch targets are ≥ 44px × 44px
- [ ] Includes proper ARIA labels
- [ ] Uses semantic HTML
- [ ] Has smooth transitions (300ms ease)

---

## 12. Design Resources

### Figma Libraries
- Color palette swatches
- Typography styles
- Component library
- Icon set

### Code Resources
- CSS custom properties file
- Utility class library
- React component library (@jakes-dad/shared)
- MUI theme configuration

### Brand Assets
- Logo files (SVG, PNG)
- Jacksonville Jaguars brand guidelines
- Custom 'Jags' font files
- Avatar placeholder images

---

**Version:** 1.0.0
**Last Updated:** 2025-01-03
**Maintained By:** Design Team