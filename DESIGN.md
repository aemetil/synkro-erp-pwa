---
name: Synkro v2
version: 2.0.0
description: A calm, trust-first, functional monochrome design system for Synkro, a business management platform for Haitian SMEs, shops, pharmacies, clinics, and service businesses.

colors:
  background:
    value: "#F5F5F3"
    type: color
    description: Warm off-white background used as the global app and landing page background.
  foreground:
    value: "#111111"
    type: color
    description: Primary text color. Strong graphite, almost black.
  surface:
    value: "#FFFFFF"
    type: color
    description: Primary card and panel surface.
  surface-muted:
    value: "#F0F0EE"
    type: color
    description: Muted surface for quiet UI areas, secondary panels, and inactive states.
  border:
    value: "#E7E5E4"
    type: color
    description: Subtle border for cards, inputs, dividers, and layout separation.
  border-strong:
    value: "#D6D3D1"
    type: color
    description: Stronger border used sparingly for emphasis or active structural separation.
  text-muted:
    value: "#6B6B6B"
    type: color
    description: Secondary text, descriptions, metadata, helper text.
  text-soft:
    value: "#8A8A8A"
    type: color
    description: Tertiary text and very low-emphasis UI details.
  primary:
    value: "#1F3A5F"
    type: color
    description: Synkro primary accent. Used for primary actions, active navigation, focus states, and identity.
  primary-foreground:
    value: "#FFFFFF"
    type: color
    description: Text on primary backgrounds.
  success:
    value: "#1F7A4D"
    type: color
    description: Money received, paid status, positive financial value, successful action.
  success-soft:
    value: "#EAF6EF"
    type: color
    description: Soft success background.
  warning:
    value: "#A16207"
    type: color
    description: Stock warnings, partial payments, attention states.
  warning-soft:
    value: "#FFF7E6"
    type: color
    description: Soft warning background.
  danger:
    value: "#B42318"
    type: color
    description: Debt, unpaid status, destructive actions, errors, danger states.
  danger-soft:
    value: "#FDECEC"
    type: color
    description: Soft danger background.

typography:
  font-family:
    value: "Inter, Geist, IBM Plex Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    type: fontFamily
    description: Neutral, highly readable sans-serif stack.
  page-title:
    fontSize:
      value: "32px"
      type: dimension
    lineHeight:
      value: "40px"
      type: dimension
    fontWeight:
      value: 700
      type: fontWeight
    letterSpacing:
      value: "-0.02em"
      type: dimension
  page-title-mobile:
    fontSize:
      value: "28px"
      type: dimension
    lineHeight:
      value: "34px"
      type: dimension
    fontWeight:
      value: 700
      type: fontWeight
    letterSpacing:
      value: "-0.02em"
      type: dimension
  section-title:
    fontSize:
      value: "20px"
      type: dimension
    lineHeight:
      value: "28px"
      type: dimension
    fontWeight:
      value: 650
      type: fontWeight
  card-title:
    fontSize:
      value: "15px"
      type: dimension
    lineHeight:
      value: "22px"
      type: dimension
    fontWeight:
      value: 600
      type: fontWeight
  body:
    fontSize:
      value: "15px"
      type: dimension
    lineHeight:
      value: "24px"
      type: dimension
    fontWeight:
      value: 400
      type: fontWeight
  body-small:
    fontSize:
      value: "14px"
      type: dimension
    lineHeight:
      value: "22px"
      type: dimension
    fontWeight:
      value: 400
      type: fontWeight
  label:
    fontSize:
      value: "13px"
      type: dimension
    lineHeight:
      value: "18px"
      type: dimension
    fontWeight:
      value: 500
      type: fontWeight
  caption:
    fontSize:
      value: "12px"
      type: dimension
    lineHeight:
      value: "16px"
      type: dimension
    fontWeight:
      value: 400
      type: fontWeight
  amount-large:
    fontSize:
      value: "30px"
      type: dimension
    lineHeight:
      value: "36px"
      type: dimension
    fontWeight:
      value: 650
      type: fontWeight
    letterSpacing:
      value: "-0.025em"
      type: dimension
  amount-medium:
    fontSize:
      value: "20px"
      type: dimension
    lineHeight:
      value: "28px"
      type: dimension
    fontWeight:
      value: 650
      type: fontWeight
    letterSpacing:
      value: "-0.015em"
      type: dimension

spacing:
  0:
    value: "0px"
    type: dimension
  1:
    value: "4px"
    type: dimension
  2:
    value: "8px"
    type: dimension
  3:
    value: "12px"
    type: dimension
  4:
    value: "16px"
    type: dimension
  5:
    value: "20px"
    type: dimension
  6:
    value: "24px"
    type: dimension
  8:
    value: "32px"
    type: dimension
  10:
    value: "40px"
    type: dimension
  12:
    value: "48px"
    type: dimension
  16:
    value: "64px"
    type: dimension
  20:
    value: "80px"
    type: dimension

radii:
  xs:
    value: "6px"
    type: dimension
  sm:
    value: "8px"
    type: dimension
  md:
    value: "12px"
    type: dimension
  lg:
    value: "16px"
    type: dimension
  xl:
    value: "20px"
    type: dimension
  2xl:
    value: "24px"
    type: dimension
  full:
    value: "9999px"
    type: dimension

shadows:
  none:
    value: "none"
    type: shadow
  card:
    value: "0 1px 2px rgba(17, 17, 17, 0.04)"
    type: shadow
  popover:
    value: "0 8px 24px rgba(17, 17, 17, 0.08)"
    type: shadow
  modal:
    value: "0 16px 48px rgba(17, 17, 17, 0.12)"
    type: shadow

elevation:
  flat:
    value: 0
    type: number
  card:
    value: 1
    type: number
  popover:
    value: 2
    type: number
  modal:
    value: 3
    type: number

motion:
  duration-fast:
    value: "120ms"
    type: duration
  duration-base:
    value: "180ms"
    type: duration
  duration-slow:
    value: "260ms"
    type: duration
  easing-standard:
    value: "cubic-bezier(0.2, 0, 0, 1)"
    type: cubicBezier
  easing-emphasized:
    value: "cubic-bezier(0.16, 1, 0.3, 1)"
    type: cubicBezier

layout:
  page-max-width:
    value: "1152px"
    type: dimension
  page-max-width-wide:
    value: "1280px"
    type: dimension
  page-max-width-narrow:
    value: "768px"
    type: dimension
  desktop-page-padding:
    value: "32px"
    type: dimension
  tablet-page-padding:
    value: "24px"
    type: dimension
  mobile-page-padding:
    value: "16px"
    type: dimension
  sidebar-width:
    value: "264px"
    type: dimension
  mobile-bottom-nav-height:
    value: "68px"
    type: dimension
  mobile-action-height:
    value: "56px"
    type: dimension

components:
  button:
    height:
      value: "44px"
      type: dimension
    height-mobile:
      value: "48px"
      type: dimension
    radius:
      value: "12px"
      type: dimension
  input:
    height:
      value: "44px"
      type: dimension
    height-mobile:
      value: "48px"
      type: dimension
    radius:
      value: "12px"
      type: dimension
  card:
    radius:
      value: "16px"
      type: dimension
    padding:
      value: "20px"
      type: dimension
  badge:
    radius:
      value: "9999px"
      type: dimension
    padding-x:
      value: "10px"
      type: dimension
    padding-y:
      value: "4px"
      type: dimension
---

# Synkro v2 Design Direction

Synkro v2 follows a visual philosophy called **functional monochrome**.

The product should feel calm, reliable, professional, and operational. It should not feel like a flashy startup website, a generic admin dashboard, a fintech clone, or a decorative SaaS template.

Synkro is business management software for Haitian SMEs, shops, pharmacies, clinics, and service businesses. Many users may not yet be used to digital business management tools. The interface must therefore reduce fear, reduce confusion, and create trust through clarity.

The core emotional goal is:

> “I understand what is happening in my business, and I know what to do next.”

Synkro should look less like software trying to impress and more like a dependable workspace that helps people run their business.

---

# Visual Personality

Synkro should feel:

- calm;
- structured;
- serious;
- trustworthy;
- practical;
- mobile-first;
- accessible;
- quietly premium;
- easy to understand.

Synkro should not feel:

- playful;
- loud;
- colorful for decoration;
- futuristic;
- crypto-like;
- overly animated;
- overly “startup”;
- like a default admin template.

The design should prioritize usefulness over visual effects.

---

# Color Philosophy

The interface is mostly monochrome: warm off-white backgrounds, white surfaces, graphite text, subtle borders, and muted grey metadata.

The primary accent is `#1F3A5F`. It should be used with restraint. It is not a decorative color. It is used for primary actions, active navigation, focus states, and identity moments.

Functional colors must only be used when they carry meaning:

- green for paid, received money, or positive values;
- red for unpaid, debt, destructive actions, or errors;
- amber for partial payment, warning, or low stock;
- blue `#1F3A5F` for system action and identity.

Avoid random decorative colors, gradients, bright illustrations, and multicolor icon sets.

---

# Typography

Typography should be clean, neutral, and highly readable.

The recommended family is Inter, Geist, or IBM Plex Sans. The type system should feel stable and professional, not playful or overly rounded.

Amounts must be especially readable. A financial amount is not decoration; it is critical information. Amounts should use stronger weight, careful alignment, and minimal visual noise.

---

# Layout Philosophy

The layout should use spacing, hierarchy, and alignment before relying on boxes.

Not every element needs to be a card. Too many visible cards make the interface feel noisy and generic.

Use cards for meaningful grouping. Use whitespace and typography for hierarchy.

Desktop can be more analytical. Mobile must be operational.

---

# Mobile Philosophy

The mobile app must not feel like a compressed desktop dashboard.

The mobile experience should feel like a real lightweight native app:

- large touch targets;
- bottom navigation;
- sticky primary actions when needed;
- no complex tables;
- list-based layouts;
- clear loading states;
- offline or slow-network awareness;
- simple forms divided into sections.

The mobile user often wants to act quickly: create a sale, record a payment, check stock, see who owes money, or send a receipt.

---

# Navigation

Desktop navigation should use a quiet sidebar. The active item should be visible but subtle. Avoid large saturated blue blocks.

Mobile navigation should use a bottom navigation with no more than five items.

Recommended commerce mobile navigation:

- Accueil;
- Ventes;
- Stock;
- Clients;
- Menu.

The primary action should always be visible or easy to reach.

---

# Buttons

Primary buttons use `#1F3A5F` with white text. They should be used for one main action per screen.

Examples:

- Nouvelle vente;
- Enregistrer la vente;
- Ajouter le paiement;
- Générer le reçu;
- Inviter un employé.

Secondary buttons should be quiet: white or muted background, subtle border, graphite text.

Destructive buttons should be clear and rare. Destructive actions must be confirmed.

---

# Cards

Cards should be subtle, with white background, soft border, modest radius, and minimal shadow.

Avoid colored statistic cards. Avoid decorative icons in every card.

A metric card should contain:

- a label;
- a primary value;
- optional short context;
- optional meaningful trend.

No more than three pieces of information should compete inside one metric card.

---

# Status Badges

Badges should be quiet and semantic.

Payment statuses:

- Payé: green;
- Partiel: amber;
- Impayé: red;
- En retard: red;
- Annulé: grey.

Stock statuses:

- Stock OK: neutral;
- Stock bas: amber;
- Rupture: red.

Badges should not use saturated colors or loud backgrounds.

---

# Forms

Forms must be divided into clear sections.

A sale form may be structured as:

- Client;
- Produits ou services;
- Paiement;
- Résumé;
- Notes.

Inputs should always have visible labels. Do not rely only on placeholders.

Submit buttons should show loading state and prevent double submission.

On mobile, the final action should remain easy to reach.

---

# Loading States

Synkro should never show an unexplained blank screen.

Loading messages should be calm:

- Chargement de votre espace…
- Vos données arrivent.
- Connexion lente détectée. Vos données arrivent.

Skeletons should be used for cards, lists, and page sections.

---

# Empty States

Empty states must guide the user.

Bad:

> Aucune donnée.

Good:

> Aucune vente pour le moment.  
> Ajoutez votre première vente pour commencer à suivre votre activité.

Every empty state should explain what is missing and offer a useful next action.

---

# Error States

Never show raw technical errors to users.

Avoid:

- CredentialsSignin;
- Server action failed;
- Prisma error;
- undefined;
- Server Components render error.

Use human messages:

- Email ou mot de passe incorrect.
- Impossible d’enregistrer pour le moment.
- Vérifiez votre connexion puis réessayez.
- Vous n’avez pas l’autorisation d’effectuer cette action.

Errors should be clear, calm, and actionable.

---

# Trust System

Trust is a product behavior, not only a visual impression.

Synkro must always make clear:

- what was recorded;
- what changed;
- what remains to be paid;
- who did the action when permissions exist;
- what happens after an action;
- whether the action succeeded or failed.

Sensitive actions must be confirmed, especially deletion, payment changes, stock adjustments, and permission changes.

Payments should be traceable. A payment is a proof, not just a status change.

---

# Landing Page Direction

The public landing page should introduce Synkro as calm, reliable business software for Haitian SMEs.

It should not use loud marketing language.

Preferred message direction:

> La gestion claire et fiable pour les PME haïtiennes.

The landing should explain that Synkro helps businesses follow sales, expenses, stock, clients, payments, and receipts.

It should speak to users who may currently manage their business through paper, memory, WhatsApp, or scattered notes.

The landing page should be sober, editorial, spacious, and trust-first.

---

# Anti-patterns

Avoid:

- bright gradients;
- decorative color palettes;
- startup-style hero sections with too much visual noise;
- generic admin dashboard layouts;
- icons in many random colors;
- overly playful illustrations;
- tables on mobile;
- hidden primary actions;
- technical error messages;
- dense dashboards where everything competes;
- excessive shadows;
- too much blue.

---

# Final Design Test

A Synkro screen is successful if a non-technical business owner can open it and quickly understand:

1. where they are;
2. what happened;
3. what needs attention;
4. what action to take next.

The interface should make the user feel:

> “My business is clearer now.”
