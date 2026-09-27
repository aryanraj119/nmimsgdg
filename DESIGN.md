# IKEA Website Design System

## Theme

Clean, functional, Scandinavian-minimal. High-contrast blue and yellow accents on a light, uncluttered background. Use generous white space, flat product cards, and no heavy shadows or gradients.

## Color Palette

| Role | Name | Hex |
| --- | --- | --- |
| Primary | IKEA Blue | `#0058A3` |
| Accent / CTA | IKEA Yellow | `#FFDB00` |
| Background | Off-white | `#FBFBFB` |
| Surface / Cards | White | `#FFFFFF` |
| Text - primary | Near Black | `#111111` |
| Text - secondary | Gray | `#767676` |
| Border / Divider | Light Gray | `#DBDBDB` |
| Error / Sale tag | Red | `#E00751` |
| Success | Green | `#0A8A00` |

```css
:root {
	--color-primary: #0058A3;
	--color-accent: #FFDB00;
	--color-bg: #FBFBFB;
	--color-surface: #FFFFFF;
	--color-text: #111111;
	--color-text-secondary: #767676;
	--color-border: #DBDBDB;
	--color-error: #E00751;
	--color-success: #0A8A00;
}
```

## Fonts

- **Primary**: `Noto IKEA` (IKEA's proprietary sans-serif) is not publicly licensed, so use a close web-safe alternative for a clone or project.
- **Web-safe fallback stack**: `"Noto Sans", Verdana, Arial, Helvetica, sans-serif`
- **Weights**: Regular (400) for body text; Bold (700) for headings and prices.
- **Sizing**: Headings 24-48px, body 14-16px, line-height approximately 1.5.

## Notes

- Use only the colors defined in the palette; do not introduce additional colors or shades.
- Make IKEA Blue the dominant brand accent and use the secondary Gray frequently for supporting text and UI details, alongside the listed neutral backgrounds and text colors.
- Use yellow sparingly for CTAs, sale tags, and the logo mark; do not use it for large backgrounds or body text.
- Reserve red and green for occasional error, sale, or success states.
- Use blue for header and navigation chrome and links.
- Keep corners mostly square and flat; avoid rounded, app-like cards for an authentic IKEA feel.
