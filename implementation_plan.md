# Mobile Dual-Scroll Marquee for Customers Page

This plan outlines the architecture for transforming the static mobile view of the Customers page into a dynamic, dual-column infinite scrolling marquee. It includes a dedicated "Conversion Box" (Your place is here) to organically drive users to the Contact section without interrupting the flow or using aggressive pop-ups. 

## Rationale
B2B customer lists can become very long and tedious to scroll through on mobile devices. A continuous auto-scrolling UI reduces friction, looks highly premium (a pattern used by top tech companies), and when combined with an embedded Call-to-Action block, effectively converts standard browsing into a lead-generation funnel.

> [!IMPORTANT]
> The solution is fully scalable. It uses CSS-only animations (hardware-accelerated `translateZ()`) ensuring perfect 60FPS scrolling on all mobile devices without JS lag. Furthermore, the desktop implementation remains completely untouched, ensuring the classic B2B grid layout is preserved where appropriate.

## Proposed Changes

---

### Localization Strings

Add strictly typed translation keys for the new "Conversion Box" text.

#### [MODIFY] src/locales/he.json
Add inside `CustomersTemplate`:
```json
"ctaBoxText": "המקום שלך כאן! נשמח לדבר.",
"ctaBoxLink": "#contact"
```

#### [MODIFY] src/locales/en.json
Add inside `CustomersTemplate`:
```json
"ctaBoxText": "Your place is here! Let's talk.",
"ctaBoxLink": "#contact"
```

---

### Customers Page Template

Rewrite the component layout to conditionally render the CSS Grid on desktop, and a continuous vertical CSS marquee on mobile.

#### [MODIFY] src/templates/CustomersTemplate.astro
*   **Data Preparation:** Split the existing `clients` array into two even halves (`col1` and `col2`) inside the frontmatter script block.
*   **Desktop View:** Wrap the existing `<div class="grid grid-cols-2 md:grid-cols-3...">` with `hidden md:grid` so it only runs on tablets/desktop.
*   **Mobile View (`block md:hidden`):** 
    *   Create a fixed height container (`h-[60vh] max-h-[500px]`) with `overflow-hidden`.
    *   Add top and bottom absolute gradients to fade out the logos elegantly as they slide out of view.
    *   Create two vertical columns (`w-1/2`).
    *   **Right Column (RTL):** Iterate `col1` multiplied by 2 (for the infinite loop overlap), apply `animate-marquee-down`.
    *   **Left Column (RTL):** Iterate `col2` multiplied by 2, apply `animate-marquee-up`.
*   **CTA Box Injection:** Manually unshift or splice a special card into `col1` or `col2`. This card will have `bg-primary`, `text-white`, and link directly to `<a href="#contact">`.
*   **Keyframes CSS:** Add the `@keyframes marquee-up` and `marquee-down` at the bottom of the component if they are not already globally available, scoped specifically to this component.

## Open Questions

1. **CTA Styling:** Should the "Your place is here" box contain an icon (like `handshake` or `add_circle`) above the text, or just text?
2. **Scroll Direction:** Currently planning for Right Column. Do you have a preference on which direction goes up/down?

## Verification Plan

### Manual Verification
- Load the site on a mobile viewport specifically in DevTools or physical device.
- Verify the standard grid remains intact and functional on Desktop.
- Observe the loop on mobile: Ensure there are no "empty gaps" or jumps where the loop restarts.
- Click the green CTA Box to ensure it correctly and smoothly scrolls down to the Contact form (`#contact`) block.
