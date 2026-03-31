- [ ] **Module commerce** : stock bas = 2, mais dans gérer les produits stock bas = 3 tandis qu’on a 2 produits
- [ ] **Bénéfice net** = j’avais 170HTG de bénéfice net et j’ai ajouté un produit dont l’unité me coutait 150HTG à l'achat que j’ai vendu à 250HTG du coup j’ai dégagé une bénéfice net de 100HTG sur chaque produit une fois retourné dans bénéfice net après une vente j’ai une somme de 420HTG au lieu de 270HTG (est-ce normal?)
- [ ] Tableau de bord dans dépenses récentes: affiche "G" au lieu de US car le compte était en USD
- [ ] Informations de contact(Page contactez-nous) : num: +509 48 36 17 52, adresse: Croix-des-missions, Haïti
- [ ] Ils veulent les prix arrondi, 5$ non 4,99$ il ne faut pas modifier le prix quand on ajoute un prix : j'ai ajouté 25HTG, l'appli l'a modifié en 24,99HTG etc…

---

### Landing page

1.  Pour le credit en pied de page, ajoute : Built & designed by aemetil dont cette phrase devrait etre un un lien sortant vers mon site : aemetil.github.io avec devant aemetil une icone qui indique un lien (l'icone le petit carré avec une fleche) et aussi diminue l'opacité ou change la couleur en gris à peine visible des textes en pied de page.

2.  J'ai besoin de changé tous les logos car le premier etait mal designé ou exporté en mauvais format, indique-moi tout les formats à apporté et ou les ajoutés.
    J'ai besoin aussi d'ajouté logo + texte sur toutes les pages ou sont les logos.

3.  il faut modifier ces infos en :
    a. Page mention legale en : Nom : aemetil, Site web: aemetil.github.io et aussi pied de page : Made with ❤️ by a.emetil en Built & design by aemetil[avec lien vers : aemetil.github.io + icone lien(carre avec fleche)] + couleur du texte gris à peine visible (page CGU & politique de confidentialité aussi)
    Page a propos en :
    Billy Odnis
    Co-fondateur & Vision

                      aemetil
                      Co-fondateur & Développeur

                       Créateur de solutions innovantes et passionné par l'entrepreneuriat. Également fondateur de tripotay.me

### Commits CLI

```bash
# 1. Commit tout ce qui reste
git add .
git commit -m "fix: bugs prod v1.2.1 + logos + UI cleanup"

# 2. Merger sur main
git checkout main
git merge fix/bugs-prod

# 3. Pousser → Vercel déploie automatiquement
git push origin main

```
