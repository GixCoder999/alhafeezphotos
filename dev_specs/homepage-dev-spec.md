# Al-Hafeez Photos — Homepage Build Spec
**For: coding agent implementing this page**
**Reference images:** `al-hafeez-homepage-desktop.png` (1440px) and `al-hafeez-homepage-mobile.png` (390px) — build pixel-faithful to these, not just "inspired by."

---

## 1. Design Tokens

```css
:root {
  --black: #0A0A0A;        /* primary dark bg, logo */
  --soft-black: #1C1C1C;   /* body text */
  --paper: #F7F5F2;        /* main page background — NOT pure white */
  --white: #FFFFFF;        /* card backgrounds only */
  --gold: #C9A03D;         /* brand accent — buttons, highlights, prices on dark bg */
  --gray: #8B8B8B;         /* secondary text, ratings count */
  --gray-light: #E4E1DC;   /* product image placeholder bg */
  --line: #DDDAD3;         /* borders, dividers */
}
```

**Do not substitute pure black (#000) or pure white (#FFF) for the page background** — the whole design relies on the warm off-black/off-white pairing. Pure white next to `--gray-light` cards will look wrong.

### Typography
- **Display font:** `Archivo Expanded` (weights 700/800/900) — used for all H1/H2/H3 headings and the logo wordmark.
- **Body font:** `Inter` (weights 400–700) — used for paragraphs, nav, buttons, labels.
- **Accent/label font:** `Archivo` (weight 600–700) — used for eyebrows, badges, button labels, uppercase micro-text. Always paired with `letter-spacing: 0.1em–0.2em` and `text-transform: uppercase` when used as a label.

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Expanded:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap
```

### Signature element — the "iris/aperture" motif
This is the page's one recurring distinctive visual idea. Use it in exactly two places, don't overuse elsewhere:
1. **Hero background**: three concentric circle outlines (an aperture iris), positioned right-of-center, layered over a soft gold radial-gradient "spotlight" glow. Desktop: ~480px outer ring. Mobile: ~280px outer ring, pushed partially off-screen right.
2. **Section eyebrows**: a small (24–34px) aperture/iris line-icon (circle + small inner circle + 4 radiating tick marks) sits to the left of every section's uppercase gold label ("Shop By Category," "Featured Gear"). This is a structural device — it marks "this is a new section," not decoration. Keep it only here; don't add extra iris icons elsewhere.

---

## 2. Logo Assets

The client's actual logo is provided as `logo.png` (black mark, white background) and `logo_white.png` (white mark, transparent background — already prepped for dark surfaces). **Use these exact files; don't recreate the logo as SVG/icon.**

- On **dark backgrounds** (black header icon-box, black footer wordmark area): use `logo_white.png`.
- On **gold backgrounds** (footer's gold icon-box variant, if used): use `logo.png` with `mix-blend-mode: darken` so the white square disappears and only the black mark shows against the gold.
- Logo always sits inside a rounded-square icon box: black box `#0A0A0A`, 9–10px border-radius, sized 38–46px depending on breakpoint, logo image at ~65% of box size, centered.
- Always pair the icon box with the wordmark "AL-HAFEEZ" (Archivo Expanded, 800–900 weight) stacked above a small uppercase sub-label "PHOTOS & STUDIO" (Archivo, 600 weight, 8–9.5px, letter-spacing 0.18–0.22em, color `--gray` on light bg / `#9C9C9C` on dark bg).

---

## 3. Desktop Layout (≥1280px)

Build in this exact top-to-bottom order:

1. **Utility bar** — full-width black strip, 9px vertical padding. Left: free-pickup note + servicing note (small dot bullet in gold). Right: phone number + store hours, separated by a pipe `|`. Font 13px.

2. **Header** — sticky is optional but recommended. Paper background, bottom border `1px solid var(--line)`, ~22px vertical / 64px horizontal padding. Layout: `logo-block` — `nav` (6 links, single row, no wrap) — `header-actions` (search pill, wishlist icon, cart icon w/ gold badge count, solid black "Book Studio →" pill button). **Nav must not wrap to two lines** — keep link gap ≤30px and font-size ≤14px at this width, or the row breaks.

3. **Hero** — black background, min-height ~640px, flex-centered content. Spotlight radial gradient + iris rings positioned right side (see token section). Left-aligned content block, max-width ~760px: small gold eyebrow with dot, large H1 (~74px, line-height 1.0, one word in gold via `<em>` unstyled-as-color), supporting paragraph (~17px, `#C9C6C0`, max-width 480px), two buttons side by side (solid gold primary, outlined-white-border secondary). Bottom-left: carousel dot indicators (3 dots, active one gold and wider — this hero rotates between "new arrivals," "studio promo," and "brand story" per content variants, see Section 6). Bottom-right: 2–3 small pill tags floating over the image area (e.g. "📸 Mirrorless," "🎬 Gimbals").

4. **Trust strip** — white background, 4 equal columns, each with icon + bold title + gray subtitle, separated by `1px solid var(--line)` vertical rules (no rule after the last item).

5. **Category grid section** — section eyebrow (iris icon + "Shop By Category") + H2 + "View All →" link aligned to the right of the heading row. Below: 3-column grid (first column wider, ratio ~1.3fr : 1fr : 1fr), each a rounded-corner image card with a bottom gradient overlay (transparent → 85% black) and white text (count label in gold, bold title, subtitle) anchored bottom-left.

6. **Featured products section** — same eyebrow+heading+view-all pattern. Below: 4-column product card grid. Each card: white bg, 1px border, rounded 12px. Image area (placeholder gray `--gray-light` until real photos are added) with an optional top-left badge (solid black "New," gold "-15%," gold "Best Seller") and a top-right circular wishlist heart button. Body: gold uppercase category label, bold product name, star rating + review count, then a footer row with **either** a price (bold, Archivo, with optional struck-through old price in gray) **or** an "Inquire for Price" gray uppercase label — paired with either a solid black "+" add-to-cart button or an outlined "ask/inquire" icon button respectively. **This price-vs-inquire branching is intentional and must be supported per-product, not hardcoded** — see Section 6.

7. **Studio promo banner** — full-width black rounded-corner (~18px) panel, ~64px padding, flex row: left side text column (eyebrow, H2, paragraph, 3 checkmark feature bullets, gold CTA button), right side a 2-column photo grid (one tall image spanning 2 rows + two stacked smaller images). Decorative faint gold ring shape bleeds off the top-right corner.

8. **Instagram strip** — centered Instagram icon + "@alhafeezphotos" handle, then a 6-column grid of square image tiles (placeholder gradients until real Instagram photos are connected).

9. **Newsletter/CTA strip** — solid gold rounded panel, flex row: left text (H3 + supporting line), right a black-pill input+button combo ("Notify Me").

10. **Footer** — black background, 4-column grid (about/logo column wider than the other three): (a) logo+wordmark, about paragraph, 3 circular social icons; (b) "Shop" link list; (c) "Company" link list; (d) "Visit Us" — address/phone/email rows each with a small gold icon. Below the grid: a thin top border, then a bottom bar with copyright left, tagline right.

---

## 4. Mobile Layout (≤480px, designed at 390px)

Same content and section order as desktop, restructured:

- **Header**: logo-block + 2 icons only (cart w/ badge, hamburger menu — no inline nav links). Search bar drops to its **own full-width row** directly below the header, not inline with logo.
- **Hero**: single-column, buttons stack vertically full-width (gold on top, outline below), H1 drops to ~38px. Iris ring shrinks to ~280px and shifts further off-canvas right so it doesn't crowd text.
- **Trust strip**: becomes a horizontally-scrollable row of small bordered cards (don't force 4 items into one fixed-width row — let it overflow-x scroll).
- **Category cards**: horizontally-scrollable row (`overflow-x: auto`), each card fixed width ~240px, not a CSS grid.
- **Product grid**: 2 columns (not 4), same card anatomy, slightly reduced padding/font sizes (see image for exact proportions).
- **Studio banner**: stacks vertically — text first, then a 2-column photo grid below (one wide image spanning both columns + two square ones), CTA button last.
- **Instagram grid**: 3 columns instead of 6.
- **CTA strip**: input and button stack vertically instead of side-by-side.
- **Footer**: Shop/Company sections become **collapsible accordions** (label + "+" icon, collapsed by default) instead of always-visible link lists — saves vertical space. Contact rows (address/phone/email) remain always visible below the accordions.
- **Sticky bottom navigation bar** (new on mobile only, not present on desktop): fixed to viewport bottom, white bg, top border, 5 items: Home, Search, **WhatsApp FAB** (raised circular gold button, center position, opens WhatsApp chat to the store's number), Cart, Account. Active item (Home) shows label in black/bold; inactive items show gray icon+label.
  - **Important:** because this nav is `position: fixed`, add `padding-bottom: ~90px` to the page body/footer's last element so footer content doesn't render underneath the fixed bar.

---

## 5. Component Behavior Notes

- **Wishlist heart icons** on product cards: toggle filled/outline on click, no page navigation.
- **"+" add-to-cart button**: increments the header cart badge count, ideally with a small toast confirmation ("Added to cart").
- **Outlined inquire-icon button** (on "Inquire for Price" cards): opens a WhatsApp deep link pre-filled with the product name, OR opens a contact modal — client preference, default to WhatsApp link since it's lower dev effort and matches how this business actually communicates with customers.
- **Hero carousel dots**: auto-rotate every ~5s OR on click; each of the 3 states swaps the eyebrow text, H1, paragraph, and button labels (see content variants below) while keeping the same visual frame.
- **Category cards / product cards**: entire card is clickable → links to category/product detail page (not built yet in this phase).
- **Newsletter input**: client wants to capture **WhatsApp number or email** in the same field — don't hard-validate as email-only.

---

## 6. Content Variants (per your "rotating mix" + "price-or-inquire mix" decisions)

### Hero carousel — 3 slides, same visual template, different copy:
1. **New arrivals**: eyebrow "New Arrivals — Winter Collection" / H1 "Capture every moment worth keeping." / CTA "Shop Cameras"
2. **Studio promo**: eyebrow "Al-Hafeez Studio — Now Booking" / H1 "Step in front of the camera, for once." / CTA "Book a Studio Session"
3. **Brand story**: eyebrow "Since [year] — Lahore's Camera Shop" / H1 "Trusted behind every lens in the city." / CTA "Our Story"

(Get real founding year and a short brand-story line from the client before finalizing slide 3.)

### Product pricing — mix per the client's actual catalog:
- **Show a fixed price** for stock items with stable retail pricing (entry cameras, accessories, tripods, instant cameras) — these are the items currently shown with `Rs X,XXX`.
- **Show "Inquire for Price"** for higher-end or frequently-repriced gear (professional bodies, lenses) — shown with the outlined ask-icon instead of add-to-cart.
- This needs to be a **per-product field** in whatever data structure feeds the product grid (e.g. `price: 24500` vs `price: null, inquireOnly: true`), not two separate hardcoded templates.

---

## 7. Assets Still Needed Before Going Live
Flag these to the client — current build uses placeholder gray/gradient blocks:
- Real product photography for camera/tripod/gimbal cards (currently gray placeholder)
- Real studio interior/session photos for the studio banner (currently dark gradient placeholder)
- Real Instagram post images for the Instagram grid (currently dark gradient placeholders)
- Confirmed WhatsApp Business number for the FAB + inquire links (currently using the number from their existing graphic: +92 312 4766248)
- Real email address (placeholder: hello@alhafeezphotos.com — confirm or replace)
- Founding year / short brand story line for hero slide 3
