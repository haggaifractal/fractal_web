# Feature Walkthrough: Mobile Dual-Scroll Customers View

## What was built?
We transformed the static grid layout on the Customers mobile page into an interactive, continuously scrolling dual-column marquee, complete with a call-to-action conversion block.

## Key Changes Made
1. **DRY CSS Refactoring:** Moved all the `@keyframes` (marquee-up, marquee-down, etc.) and hardware acceleration classes from `ClientsMarquee.astro` into the global CSS of `Layout.astro`. This eliminated duplication and ensured maximum performance globally.
2. **Translation Updates:** Added `ctaBoxText` and `ctaBoxLink` keys to both `he.json` and `en.json` to keep text completely externalised and localizable.
3. **CustomersTemplate.astro Architecture:**
   * Handled data splitting into `col1` and `col2` smoothly.
   * Defined `<div class="hidden md:grid ...">` to preserve the precise legacy B2B appearance on Desktop displays.
   * Created the completely new `<div class="md:hidden ...">` block for mobile.
   * In the right column (`col1`), injected the "Your place is here" CTA Box natively with an inner `{loopIndex === 1 && ...}` condition. This absolutely prevents spamming the CTA box inside the infinite loop sequence.
4. **CTA Box Styling:** Implemented your suggested design using `bg-primary`, `text-white`, and an `arrow_downward` icon from Google Material Symbols to drive the user directly to the `#contact` section below.

## Verification
- Load `/customers` on mobile or emulate in Chrome DevTools.
- Ensure the scrolling is seamless and hardware accelerated (perf monitor should show 60 FPS).
- Click the CTA box to verify the native anchor jump to the Contact Form below.
