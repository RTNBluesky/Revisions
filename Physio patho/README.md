# Révisions Kiné K1

Fiches de révision et QCM interactifs pour la **première année de kinésithérapie** (ESSATLA).

> **20 fiches · 20 QCM · 516 questions** · Mode sombre · 100% statique · Hébergement GitHub Pages

## 🚀 Démo

Une fois déployé sur GitHub Pages, le site est accessible à :

```
https://<ton-utilisateur>.github.io/<nom-du-repo>/
```

## 📚 Contenu

### Neurologie · Physiopathologie I (4 modules)

| Fiche | QCM | Sujet |
|-------|-----|-------|
| [Système nerveux](fiches/neuro/systeme-nerveux.html) | [QCM](qcm/neuro/systeme-nerveux.html) | Organisation, paires crâniennes, examen neurologique |
| [Lésions SNC + Encéphale](fiches/neuro/lesions-snc-encephale.html) | [QCM](qcm/neuro/lesions-snc-encephale.html) | Vascularisation, AVC, dégénératives |
| [Lésion médullaire](fiches/neuro/lesion-medullaire.html) | [QCM](qcm/neuro/lesion-medullaire.html) | Anatomie, syndromes, ASIA |
| [Lésions périphériques](fiches/neuro/lesions-peripheriques.html) | [QCM](qcm/neuro/lesions-peripheriques.html) | Seddon/Sunderland, plexus |

### Travaux Pratiques (16 modules)

TP 1 à 15 + TP 6-7 (synthèse), couvrant : physiopathologie générale, lésions cellulaires, infections, inflammation, squelette, ostéoporose, rhumatologie, arthrose, réparation tissulaire, sepsie, voies respiratoires, néoplasies.

→ Voir l'[index complet](index.html).

## ⚙️ Fonctionnalités des QCM

- **Mode entraînement** : correction immédiate après chaque question, avec explication pédagogique.
- **Mode partiel** : toutes les questions, correction à la fin.
- **Mix QCS / QCM** : questions à 1 ou plusieurs bonnes réponses (style concours).
- **Score en direct** + barre de progression sticky.
- **Résultat final** avec message adapté à ton score (≥80 % : maîtrise, etc.).
- **100% statique** : pas de backend, fonctionne hors-ligne après chargement.

## 🗂️ Structure du repo

```
.
├── index.html              # Page d'accueil (Fiches + QCM)
├── README.md
├── .nojekyll               # Désactive Jekyll pour GitHub Pages
├── .gitignore
├── assets/
│   ├── index.css           # Style de la page d'accueil
│   ├── qcm.css             # Style sombre des QCM
│   ├── qcm.js              # Moteur interactif des QCM
│   └── dark-override.css   # Surcharge dark mode pour les fiches
├── fiches/
│   ├── neuro/              # 4 fiches de neurologie
│   └── tp/                 # 16 fiches TP
└── qcm/
    ├── neuro/              # 4 QCM de neurologie
    └── tp/                 # 16 QCM TP
```

## 🌐 Déploiement GitHub Pages

1. **Créer un nouveau repo GitHub** (par exemple : `revisions-kine-k1`).
2. **Pousser ce dossier** :

   ```bash
   cd site
   git init
   git add .
   git commit -m "Initial commit — fiches & QCM kiné K1"
   git branch -M main
   git remote add origin https://github.com/<ton-user>/<ton-repo>.git
   git push -u origin main
   ```

3. **Activer GitHub Pages** :
   - Settings → Pages
   - Source : `Deploy from a branch`
   - Branch : `main` / `/ (root)`
   - Save

4. Quelques secondes plus tard, ton site est en ligne.

## 🎨 Personnalisation

Pour modifier les couleurs du thème sombre :
- **QCM** : édite [`assets/qcm.css`](assets/qcm.css) (variables `--orange`, `--surface`, etc. dans `:root`).
- **Fiches** : édite [`assets/dark-override.css`](assets/dark-override.css).

## ⚠️ Avertissement

Ces fiches et QCM sont à but **pédagogique** uniquement. Ils ne remplacent pas un cours officiel ni un avis médical. Toujours croiser avec tes supports de cours et le programme de ton école.

## 📝 Licence

Usage personnel et académique libre. Si tu publies une version dérivée, garde une mention de l'auteur original (Alexis) et de la source.
