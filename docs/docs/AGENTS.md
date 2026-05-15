# AI Coding Agent Guide — Synkro

## Context

Synkro is an active production product used by real clients.

Do not treat this repository as a greenfield project.

The production branch is:

```txt
main
```

````

The v2 beta branch is:

```txt
beta/v2-rebuild
```

Never commit directly to `main`.

---


- ne jamais travailler sur main
- toujours partir de beta/v2-rebuild
- Je devrais etre capable de corriger un bug sur la branche prod et commité pendant le developpément de la V2 sans publier la V2
- La v2 reste dans sa branche jusqu'à la date release
- Demande moi de commiter qd il y a de commit à faire
- respecter docs/SYNKRO\_\*.md
- ne pas modifier la DB sans migration documentée
- ne pas casser les flows clients actifs
- ne pas renommer les pages principales sans justification
- utiliser les composants v2
- demande-moi de tester npm run lint && npm run build
- produire des petites PR

# ! Important

design tokens finalisés
screenshots référence
composants v2 codés
checklist mobile
règles de spacing
règles de typography
règles de layout
````
