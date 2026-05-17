# Synkro Visual QA Guide

## Direction

Synkro v2 doit respecter :

- monochrome fonctionnel ;
- accent principal `#1F3A5F` ;
- calme visuel ;
- confiance ;
- clarté ;
- mobile-first ;
- pas de style startup flashy ;
- pas d’admin template générique.

## À vérifier sur chaque écran

- L’action principale est-elle visible ?
- Le bleu `#1F3A5F` est-il utilisé avec retenue ?
- Les montants sont-ils lisibles ?
- Les couleurs ont-elles un sens métier ?
- Les textes sont-ils simples ?
- L’écran respire-t-il ?
- Y a-t-il trop de cards ?
- Y a-t-il trop d’icônes ?
- L’écran mobile fonctionne-t-il sans compression desktop ?
- L’utilisateur sait-il quoi faire ensuite ?

Pour les dashboards desktop et mobile, vérifier aussi `docs/SYNKRO_SECTOR_DASHBOARD_SPEC.md`.

## Anti-patterns

Éviter :

- gradients ;
- couleurs décoratives ;
- gros blocs bleus partout ;
- icônes multicolores ;
- ombres fortes ;
- dashboards trop denses ;
- actions enterrées en bas de page ;
- erreurs techniques ;
- boutons sans feedback ;
- tables desktop sur mobile.

## Screenshots à produire avant validation

Pour chaque sprint UI, produire screenshots :

- desktop 1440px ;
- desktop 1024px ;
- mobile 390px ;
- mobile 375px ;
- état loading si applicable ;
- état vide si applicable ;
- erreur si applicable.

## Critère final

Un écran Synkro v2 est bon s’il donne cette impression :

> “Je comprends ce qui se passe et je sais quoi faire.”
