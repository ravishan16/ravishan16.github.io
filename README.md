# Portfolio Website - Ravishankar Sivasubramaniam

This repository contains the source code for my personal portfolio website. The site is built with HTML, CSS, and vanilla JavaScript, with a focus on performance, accessibility, and responsive design.

Visit live site: [https://ravishankars.com](https://ravishankars.com)

## Features

- Responsive design that adapts to all screen sizes
- Custom-built navigation with smooth mobile menu transitions
- JSON-driven dynamic content for projects and speaking engagements
- Image optimization with WebP format support
- Accessibility features including proper ARIA labels and keyboard navigation
- Performance optimized with minimal dependencies

## Design System

This section outlines the design system used throughout the portfolio website, ensuring consistency and maintainability.

### Color Palette

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

### Typography

#### Font Family
- Primary: 'Inter' with system font fallbacks
- Scale is based on a 1.25 type ratio

#### Text Styles
- Headings: `--color-text-primary`, bold weight (700)
- Body Text: `--color-text-secondary`, regular weight (400)
- Links: `--color-accent-primary` with hover state using `--color-accent-primary-darker`

### Components

#### Cards
- Background: `--color-card-bg`
- Border: 1px solid `--color-border-light`
- Border Radius: 0.5rem
- Hover Effect: Subtle elevation with transform and shadow

#### Buttons
- Primary (CTA): `--color-accent-primary` background
- Hover State: `--color-accent-primary-darker`
- Border Radius: 0.375rem
- Padding: 0.75rem 1.5rem

#### Tags
- Background: `--color-tag-bg`
- Text: `--color-tag-text`
- Border Radius: 2rem
- Font Size: 0.75rem

#### Social Icons
- Size: 40x40px
- Border Radius: 50%
- Default: `--color-text-secondary`
- Hover: `--color-accent-primary` with white text

#### Mobile Menu
- Animated transitions for smooth open/close
- Touch-friendly target sizes
- Consistent active states for current page

### Layout

#### Spacing
- Base Unit: 0.25rem (4px)
- Section Padding: 5rem (desktop) / 4rem (tablet) / 3rem (mobile)
- Container Max Width: 64rem
- Consistent padding across containers: 1.25rem (mobile) / 1.5rem (tablet) / 2rem (desktop)

#### Breakpoints
- Mobile: Up to 639px
- Tablet: 640px to 767px
- Desktop: 768px and above
- Large Desktop: 1024px and above

#### Grid System
- Projects/Services: 1 column (mobile) / 2 columns (desktop)
- Skills: 2 columns (mobile) / 3 columns (tablet) / 4 columns (desktop)
- Recommendations: 1 column (mobile) / 3 columns (desktop)

### Accessibility

#### Color Contrast
- All text colors meet WCAG 2.1 AA standards
- Interactive elements have distinct hover states
- Focus states are clearly visible

#### Navigation
- Skip to main content link available
- Mobile menu supports keyboard navigation
- ARIA labels on interactive elements

### Effects & Transitions

#### Shadows
- Small: `--shadow-sm` for subtle elevation
- Medium: `--shadow-md` for hover states

#### Transitions
- Duration: 0.2s
- Timing: ease
- Applied to: hover states, mobile menu, lazy-loaded images

## Project Structure

```
/
├── css/                  # Stylesheets
│   └── style.css         # Main stylesheet with design system implementation
├── data/                 # JSON data files for dynamic content
│   ├── projects.json     # Projects data 
│   └── speaking.json     # Speaking engagements data
├── images/               # Image assets (JPG, PNG, WebP formats)
├── js/                   # JavaScript files
│   └── main.js           # Main JavaScript functionality
├── 404.html              # Custom 404 error page
├── about.html            # About page
├── index.html            # Homepage
├── projects.html         # Projects page
├── services.html         # Services page
├── speaking.html         # Speaking engagements page
├── robots.txt            # Search engine crawling instructions
├── sitemap.xml           # XML sitemap for search engines
├── manifest.json         # Web app manifest for PWA functionality
├── webp_convert.sh       # Shell script to convert images to WebP format
└── README.md             # This documentation file
```

## Development

### Prerequisites

- A modern web browser
- Basic understanding of HTML, CSS, and JavaScript

### Running Locally

1. Clone this repository
   ```
   git clone https://github.com/ravishan16/ravishan16.github.io.git
   ```
2. Open any HTML file in your browser or use a local server

### Image Optimization

The `webp_convert.sh` script can be used to convert JPG/PNG images to WebP format:

```bash
chmod +x webp_convert.sh
./webp_convert.sh
```

## Contributing

When making changes:
1. Use existing CSS variables for consistency
2. Follow mobile-first approach in media queries
3. Test across all breakpoints
4. Validate accessibility
5. Update this documentation for significant changes

## License

All rights reserved. The content and design of this website are the property of Ravishankar Sivasubramaniam.

## Contact

For any questions or feedback, please reach out to me at [contact@ravishankars.com](mailto:contact@ravishankars.com)