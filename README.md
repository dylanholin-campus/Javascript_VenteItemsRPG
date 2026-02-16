# 🎮 Trash Loot - Boutique d'Items RPG

Une boutique en ligne interactive pour items RPG, développée en **JavaScript vanilla** (sans framework ni plugin).

## 🚀 Fonctionnalités

### ✅ Actuelles
- **Affichage d'items** : Grille responsive avec images, prix, stock et descriptions
- **Filtre par catégorie** : Trier les items (Armes, Armures, Potions, Artefacts)
- **Système d'or** : Achetez des items et dépensez votre or
- **Ajout d'items dynamique** : Formulaire simple pour créer de nouveaux articles
- **Menu déroulant responsive** : Fonctionne au survol (desktop) et au tap (mobile)
- **Intégration API** : Chargement d'animes depuis Jikan (MyAnimeList) convertis en "Grimoires"
- **Design sombre** : Interface dark theme épurée

### 🎯 Prévues (Issues)
- Système de **Favoris** (localStorage)
- Persistance de l'**or du joueur**
- Optimisation avec des **IDs uniques**

## 📂 Structure du projet

```
Javascript_VenteItemsRPG/
├── index.html              # Page principale + formulaire d'ajout
├── app.js                  # Logique JavaScript (items, achat, API)
├── assets/
│   ├── css/
│   │   └── style.css       # Styles (menu, cards, formulaire, responsive)
│   └── img/                # Images des items
└── README.md               # Ce fichier
```

## 🛠️ Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, responsive design, media queries
- **JavaScript ES6+** : Gestion du DOM, fetch API, localStorage
- **API externe** : Jikan v4 (MyAnimeList)

## 🎮 Comment utiliser

### 🌐 Demo en ligne
👉 **[Jouer maintenant](https://dylanholin-campus.github.io/Javascript_VenteItemsRPG/)**

### Utilisation
1. **Parcourir les items** : Scroll la grille des produits
2. **Filtrer** : Utilise le select "Filtrer par catégorie"
3. **Acheter** : Clique "Acheter" sur un item (déduit de ton or)
4. **Ajouter un item** : Remplis le formulaire et valide
5. **Menu** : Clique le bouton Menu (ou survol sur desktop)

## 🎨 Design

| Élément | Couleur |
|---------|---------|
| Fond | `#0b0c10` (noir profond) |
| Accent principal | `#ffd56b` (or) |
| Cards | `#151823` (gris foncé) |
| Text primaire | `#f5f5f5` (blanc) |
| Dégradé accent | `#ff9f43` → `#e84118` (orange-rouge) |

## 📱 Responsive Design

- **Desktop** : Menu déroulant au survol
- **Mobile** : Menu déroulant au tap (`:focus-within`)

## 🔗 API utilisée

**Jikan v4** : Récupère les 12 derniers animes populaires et les convertit en "Grimoires"

```javascript
const ANIME_API_BASE = "https://api.jikan.moe/v4/anime?limit=12"
```

## 🎓 Concepts JavaScript couverts

- **Manipulation du DOM** : `createElement`, `addEventListener`, `appendChild`
- **Array methods** : `filter`, `forEach`, `push`
- **Fetch API** : Requêtes HTTP asynchrones avec `async/await`
- **Stockage** : `localStorage` (préparé pour les futures features)
- **Gestion d'état** : Tableau `itemsRPG`, variable `playerGold`
- **Événements** : Click, change, submit, hover, focus

## 🐛 Problèmes connus / À explorer

- Les items de l'API sont tous en catégorie "Artefact"
- Les IDs générés avec `Date.now()` peuvent théoriquement avoir des collisions
- L'or se réinitialise au rechargement

## 🤝 Contribuer

Des idées ? Ouvre une **Issue**
## 📄 License

Libre d'utilisation (projet étudiant).

---

**Développé par** : Une équipe 

**Statut** : En développement 🚧
