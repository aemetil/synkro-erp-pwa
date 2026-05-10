# Corrections à faire, synkro.app

> mise à jour : 27.04.26,

1. [] Pour synkro on aimerait ajouter des nouvelles devises : peso et euro et on va profiter de changer position le changement de devise, au lieu de le mettre en haut (plus ou moins nav barre) on va de preference l'ajouter dans le formulaire d'inscription comme la case secteur d'activité, qui nous laisse 3 choix et on peut aussi modifier dans parametre, je me suis dit on peut également faire la meme chose pour les devise.

2. [] Consultation impayée dans le module santé n'est pas modifiable, si la personne vient payer sa consultation et on ne peut pas la mettre à jour, pour passer d'impayer à payer

3. [] Qd on se deconnecte de synkro on s'y trouve sur la de login ou signup si on clique sur creer un compte du coup ya pas moyen d'y retourner sur le landing page, je me suis dit on pourrait rendre le logo + nom de synkro sur ces deux pages, et une fois l'user clique il peut retourner sur la landing et/ou un petit bouton dans e coin gauche ou autre part logique (retourner ou retour à l'accueil, ou juste retour accueil)

4. [] Et on a pas changé le numero de la version sur la landing page

5. [] Et aussi j'aimerais ajouter juste au dessus de la barre horizontale de la version synkro une sorte de texte (signaler ou rapporter un bug ou erreur) qui une fois cliquée s'ouvre un popup formulaire avec les sujets pré-rempli qu'on peut choisi dans une liste, la categorie de probleme à signaler et un champs pour detailler le probleme et la possibilité d'ajouter une capture d'ecran du probleme, et j'aimerais bien que ce formulaire est par defaut en français vu que la langue de l'appli mais avec possibilité de passer en creyole, ça peut etre un drapeau fr et un ht et oui pour une fois je crois t'as le droit d'ulitiser des emojis pour ce cas specifique je pense qu'on ne peut pas trouver mieur pour decrire. Avec en dessous textarea un petit mot comme instructions pour les decrire bref pourquoi et les dire à quel point ça va nous aider bien sur en deux langues. Et pour cette tache afin que je recois ces infos dans ma boite en ordre, je me demande s'il faut que je configure un compte emailJS ou resend ou autre. Ou sinon, pour ce genre de tache est-ce qu'on peut faire mieux, ou que font les dev pro ou grande boite dans ce genre de cas pour capter les erreurs de leurs erreurs, c'est mieux ainsi de faire aider par les vrais users ou avec des applis?

NB:. Etant qu'assistant de product engineer, dis-moi s'il y a une chose ou deux à repenser ou tout va bien avant de te lancer, des suggestions je suis preneur.

### Il faut utiliser un HEREDOC pour les messages avec des caractères spéciaux :

git commit -m "$(cat <<'EOF'
feat: devises multiples + UX login/signup + consultation payée

- Ajout EUR, DOP (RD$), MXN (MX$) aux devises disponibles
- Sélecteur de devise dans signup et paramètres
- Switch devise retiré de la navbar (réservé pour la langue)
- Logo Synkro cliquable → retour landing sur login et signup
- Bouton "Marquer comme payé" sur la page de détail consultation
- Version 1.2.1 mise à jour sur la landing page
  EOF
  )"

git commit -m "$(cat <<'EOF'
feat: formulaire de signalement de bug bilingue FR/HT

- Nouveau modal bug-report avec createPortal (centré, backdrop flou)
- Champs email, catégorie et description + validation custom FR/HT
- API /api/bug-report via Resend
- Trigger déplacé au-dessus de la barre dans la sidebar)"

### Base de données

> npm run db:studio
