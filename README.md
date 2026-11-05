# Nexus — SaaS Landing Page

A premium, dark-mode, fully responsive landing page for **Nexus**, an all-in-one intelligent workspace.
Tagline: *Build faster. Ship smarter.*

## Tech stack

- React 19 + TypeScript (strict)
- Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/styles/index.css`)
- Framer Motion 12
- Lucide React icons
- Inter (Google Fonts)

## Sections

Sticky header with mobile menu → Hero with scroll-driven dashboard preview → Logo marquee → Bento features grid → Testimonials → Pricing (monthly/annual) → FAQ accordion → Final CTA → Footer.

## Folder structure

```
public/            favicon.svg, logo.svg (also the Open Graph image)
src/
  animations/      motionVariants, transitions, animationConfig (shared motion system)
  components/
    layout/        Header, MenuIcon, MobileMenu, Footer
    hero/          Hero, AnimatedBadge, AnimatedHeadline, MagneticButton, ProductPreview
    logos/         LogoCloud, LogoItem
    features/      FeaturesGrid, FeatureCard, MetricChart, CodeTyping, DragInteraction
    pricing/       PricingSection, PricingCard, BillingToggle, AnimatedPrice
    testimonials/  Testimonials, TestimonialCard
    faq/           FAQSection, FAQItem
    cta/           CTASection
    ui/            Button, Container, SectionHeading, Badge, SectionDivider, Logo
  data/            navigation, logos, features, pricing, testimonials, faqs (edit content here)
  hooks/           useScrolled, useLockBodyScroll
  lib/             cn, accents
  types/           shared TypeScript interfaces
```

## Getting started

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
```

## Customizing

- **Pricing:** edit `src/data/pricing.ts` (prices, features, discount %).
- **Copy and links:** edit files in `src/data/`. Signup/sales URLs live in `src/data/navigation.ts`.
- **Motion:** tune easing, duration and stagger in `src/animations/animationConfig.ts`.
- **Colors:** design tokens are in the `@theme` block of `src/styles/index.css`.

## Deployment

### Vercel
1. Push the project to a Git repository and import it at vercel.com/new.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Deploy. (Or use the CLI: `npx vercel --prod`.)

### Render
1. Create a new **Static Site** from your repository.
2. Build command: `npm install && npm run build`.
3. Publish directory: `dist`.
4. Deploy. No rewrites are needed — this is a single-page, anchor-navigated site.

## Notes

- Logo cloud uses text-based wordmarks because official brand SVGs are trademarked. Replace `src/data/logos.ts` and `LogoItem.tsx` with licensed assets if you have permission.
- Testimonials are illustrative sample content, not real customer endorsements.
- Placeholder links (`#`, `mailto:sales@nexus.example`) should be replaced before launch.
- Reduced-motion preferences are respected via `MotionConfig` and a CSS media query.
