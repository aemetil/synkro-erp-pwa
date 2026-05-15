# SPRINT 1

On démarre par **Sprint 1 — Design tokens & visual reset**, en mode produit actif : changement faible risque, pas de DB, pas de routes, pas de logique métier.

J’ai vérifié que le repo utilise déjà les variables shadcn/Tailwind dans `globals.css` et `tailwind.config.ts`, donc on peut changer la personnalité visuelle sans casser toute l’app page par page. Le `primary` actuel est encore le bleu shadcn par défaut, et Tailwind mappe déjà `primary`, `background`, `card`, `border`, etc. vers les variables CSS. ([GitHub][1])

---

# PR 01 — Design tokens & visual reset

Branche recommandée :

```bash
git checkout -b v2/design-tokens
```

---

## 1. Remplacer `app/globals.css`

Remplace le fichier actuel par ceci :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /*
      Synkro v2 — Monochrome fonctionnel
      Primary accent: #1F3A5F
    */

    --background: 60 10% 96%; /* #F5F5F3 */
    --foreground: 0 0% 7%; /* #111111 */

    --card: 0 0% 100%; /* #FFFFFF */
    --card-foreground: 0 0% 7%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 7%;

    --primary: 213 51% 25%; /* #1F3A5F */
    --primary-foreground: 0 0% 100%;

    --secondary: 60 6% 93%; /* #EEEEEC */
    --secondary-foreground: 0 0% 10%;

    --muted: 60 6% 93%;
    --muted-foreground: 0 0% 42%; /* #6B6B6B */

    --accent: 60 6% 93%;
    --accent-foreground: 0 0% 10%;

    --destructive: 4 75% 40%; /* sober red */
    --destructive-foreground: 0 0% 100%;

    --border: 30 7% 90%; /* #E7E5E4 */
    --input: 30 7% 90%;
    --ring: 213 51% 25%;

    --success: 145 59% 30%;
    --success-foreground: 0 0% 100%;

    --warning: 38 92% 38%;
    --warning-foreground: 0 0% 100%;

    --radius: 0.875rem;
  }

  .dark {
    /*
      Dark mode is not a v2 priority yet.
      Keep it stable, sober and close to the light theme structure.
    */

    --background: 0 0% 7%;
    --foreground: 60 10% 96%;

    --card: 0 0% 10%;
    --card-foreground: 60 10% 96%;

    --popover: 0 0% 10%;
    --popover-foreground: 60 10% 96%;

    --primary: 213 51% 35%;
    --primary-foreground: 0 0% 100%;

    --secondary: 0 0% 14%;
    --secondary-foreground: 60 10% 96%;

    --muted: 0 0% 14%;
    --muted-foreground: 0 0% 70%;

    --accent: 0 0% 14%;
    --accent-foreground: 60 10% 96%;

    --destructive: 4 65% 45%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 18%;
    --input: 0 0% 18%;
    --ring: 213 51% 35%;

    --success: 145 50% 38%;
    --success-foreground: 0 0% 100%;

    --warning: 38 80% 45%;
    --warning-foreground: 0 0% 100%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings:
      "rlig" 1,
      "calt" 1;
  }

  ::selection {
    @apply bg-primary/15 text-foreground;
  }
}
```

---

## 2. Mettre à jour `tailwind.config.ts`

Ton fichier mappe déjà les couleurs CSS variables vers Tailwind. Il manque surtout `success` et `warning`, qu’on va utiliser pour les statuts métier.

Dans `extend.colors`, ajoute ces deux blocs :

```ts
success: {
  DEFAULT: "hsl(var(--success))",
  foreground: "hsl(var(--success-foreground))",
},
warning: {
  DEFAULT: "hsl(var(--warning))",
  foreground: "hsl(var(--warning-foreground))",
},
```

La partie `colors` devrait ressembler à ça :

```ts
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  success: {
    DEFAULT: "hsl(var(--success))",
    foreground: "hsl(var(--success-foreground))",
  },
  warning: {
    DEFAULT: "hsl(var(--warning))",
    foreground: "hsl(var(--warning-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
},
```

---

## 3. Ajuster légèrement `components/ui/button.tsx`

Le bouton actuel utilise déjà `bg-primary text-primary-foreground`, donc il va automatiquement prendre `#1F3A5F`. ([GitHub][2])

Mais pour Synkro v2, je recommande de rendre les boutons un peu plus tactiles et moins “petit admin dashboard”.

Dans `buttonVariants`, remplace les tailles par :

```ts
size: {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-6",
  icon: "h-10 w-10",
},
```

Et dans la classe de base, remplace :

```ts
rounded - md;
```

par :

```ts
rounded - lg;
```

Donc la base devient :

```ts
"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
```

C’est un petit changement, mais il améliore déjà le toucher mobile sans casser l’existant.

---

## 4. Vérification locale

Après les changements :

```bash
npm run lint
npm run build
```

Puis tester rapidement :

```bash
npm run dev
```

Pages à vérifier visuellement :

```txt
/login
/signup
/dashboard
/sales
/finance
/commerce
/clients
/reports
/settings
```

---

## 5. Checklist avant merge

Avant de merger cette PR :

```txt
Le bleu principal est bien #1F3A5F.
L’app paraît plus sobre.
Les boutons restent lisibles.
Les inputs restent visibles.
Les cartes ne paraissent pas cassées.
Les badges existants restent acceptables.
Le login fonctionne.
Le dashboard charge.
La création de vente fonctionne encore.
La modification produit fonctionne encore.
Le mobile n’a pas de régression évidente.
```

---

## 6. Commit recommandé

```bash
git add app/globals.css tailwind.config.ts components/ui/button.tsx
git commit -m "style: introduce Synkro v2 design tokens"
```

Ensuite :

```bash
git push origin v2/design-tokens
```

---

Ce premier patch ne doit pas chercher à tout rendre parfait. Son but est de poser la nouvelle atmosphère Synkro sans perturber les clients actifs. Après validation visuelle, on passe à **Sprint 2 — System components foundation**.

[1]: https://raw.githubusercontent.com/aemetil/synkro-erp-pwa/main/app/globals.css "raw.githubusercontent.com"
[2]: https://raw.githubusercontent.com/aemetil/synkro-erp-pwa/main/components/ui/button.tsx "raw.githubusercontent.com"
