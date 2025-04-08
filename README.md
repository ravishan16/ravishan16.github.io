# Portfolio Design System

This document outlines the design system used throughout the portfolio website, ensuring consistency and maintainability.

## Color Palette

Our color palette draws inspiration from warm, natural tones that create a sophisticated and welcoming environment:

| Variable | Value | Description |
|----------|--------|-------------|
| `--color-background` | #FAF6F0 | Ivory Linen – Main background color. Creates a soft, natural canvas. |
| `--color-background-alt` | #FDFDFD | Porcelain – Used for cards and sections that need subtle elevation. |
| `--color-text-primary` | #3A3A3A | Charcoal Plum – For headings and bold text. Provides strong contrast without harshness. |
| `--color-text-secondary` | #7C6F64 | Warm Taupe – For body text. Offers excellent readability with a cozy feel. |
| `--color-accent-primary` | #DDBEA9 | Soft Clay – Signature accent color for buttons, links, and highlights. |
| `--color-accent-primary-darker` | #B45F4D | Deeper Terracotta – Used for hover states and emphasis. |
| `--color-border-light` | #E4C590 | Gold Sand – For subtle borders and dividers. |
| `--color-tag-bg` | #E4C590 | Gold Sand – Consistent with borders for badges and tags. |
| `--color-tag-text` | #3A3A3A | Charcoal Plum – Ensures tag text remains readable. |
| `--color-footer-bg` | #FAF6F0 | Ivory Linen – Matches main background for cohesion. |
| `--color-footer-text` | #7C6F64 | Warm Taupe – Maintains readability in footer. |
| `--color-footer-link-hover` | #DDBEA9 | Soft Clay – Consistent with site-wide accent. |

## Typography

### Font Family
- Primary: 'Inter' with system font fallbacks
- Scale is based on a 1.25 type ratio

### Text Styles
- Headings: `--color-text-primary`, bold weight (700)
- Body Text: `--color-text-secondary`, regular weight (400)
- Links: `--color-accent-primary` with hover state using `--color-accent-primary-darker`

## Components

### Cards
- Background: `--color-card-bg`
- Border: 1px solid `--color-border-light`
- Border Radius: 0.5rem
- Hover Effect: Subtle elevation with transform and shadow

### Buttons
- Primary (CTA): `--color-accent-primary` background
- Hover State: `--color-accent-primary-darker`
- Border Radius: 0.375rem
- Padding: 0.75rem 1.5rem

### Tags
- Background: `--color-tag-bg`
- Text: `--color-tag-text`
- Border Radius: 2rem
- Font Size: 0.75rem

### Social Icons
- Size: 40x40px
- Border Radius: 50%
- Default: `--color-text-secondary`
- Hover: `--color-accent-primary` with white text

## Layout

### Spacing
- Base Unit: 0.25rem (4px)
- Section Padding: 4rem (desktop) / 3rem (mobile)
- Container Max Width: 64rem

### Breakpoints
- Mobile: Up to 639px
- Tablet: 640px to 767px
- Desktop: 768px and above
- Large Desktop: 1024px and above

### Grid System
- Projects/Services: 1 column (mobile) / 2 columns (desktop)
- Skills: 2 columns (mobile) / 3 columns (tablet) / 4 columns (desktop)
- Recommendations: 1 column (mobile) / 3 columns (desktop)

## Accessibility

### Color Contrast
- All text colors meet WCAG 2.1 AA standards
- Interactive elements have distinct hover states
- Focus states are clearly visible

### Navigation
- Skip to main content link available
- Mobile menu supports keyboard navigation
- ARIA labels on interactive elements

## Effects & Transitions

### Shadows
- Small: `--shadow-sm` for subtle elevation
- Medium: `--shadow-md` for hover states

### Transitions
- Duration: 0.2s
- Timing: ease
- Applied to: hover states, mobile menu, lazy-loaded images

## Usage Guidelines

1. Always use CSS variables for colors and transitions
2. Maintain consistent spacing using the base unit
3. Follow mobile-first approach in media queries
4. Ensure proper contrast ratios for text
5. Keep animations subtle and purposeful

## File Structure

```
css/
  style.css        # Main stylesheet with design system implementation
images/           # Image assets
js/
  main.js         # JavaScript functionality
```

## Contributing

When making changes:
1. Use existing CSS variables for consistency
2. Follow BEM naming convention for new classes
3. Test across all breakpoints
4. Validate accessibility
5. Update this documentation for significant changes