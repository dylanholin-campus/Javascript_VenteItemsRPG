// URL de base de l'API Jikan (MyAnimeList non officiel)
const ANIME_API_BASE = "https://api.jikan.moe/v4/anime?limit=12"  // renvoie data = [ { title, images, synopsis, ... } ]

const itemsRPG = [
  {
    id: 1,
    name: "Épée du Dragon",
    price: 120,
    description: "Lame légendaire forgée dans le feu d'un dragon ancien.",
    image: "assets/img/epeedragon.jpeg",
    category: "Arme",
    stock: 3
  },
  {
    id: 2,
    name: "Armure en Mithril",
    price: 180,
    description: "Armure légère mais incroyablement résistante.",
    image: "assets/img/armuremytril.jpeg",
    category: "Armure",
    stock: 2
  },
  {
    id: 3,
    name: "Potion de soin majeure",
    price: 35,
    description: "Restaure une grande quantité de points de vie.",
    image: "assets/img/healpotion.jpeg",
    category: "Potion",
    stock: 10
  },
  {
    id: 4,
    name: "Anneau de téléportation",
    price: 200,
    description: "Permet de se téléporter vers un sanctuaire connu.",
    image: "assets/img/tpring.jpeg",
    category: "Artefact",
    stock: 1
  },
  {
    id: 5,
    name: "Hache de guerre orque",
    price: 90,
    description: "Une hache lourde, parfaite pour briser les boucliers.",
    image: "assets/img/hacheorque.jpeg",
    category: "Arme",
    stock: 5
  }
]

function addItem(id, name, price, description, image, category, stock) {
  itemsRPG.push({
    id,
    name,
    price,
    description,
    image,
    category,
    stock
  })
}

addItem(
  6,
  "Potion mystère",
  1,
  "J'achèterais pas ça à ta place...",
  "assets/img/glitchitems.jpeg",
  "Potion",
  147
)

addItem(
  7,
  "Potion Javascript",
  -1,
  "Meme avec c'est mort ¯|_(ツ)_/¯",
  "",
  "Potion",
  -1
)

addItem(
  8,
  "Potion Java",
  0,
  "flemme de faire le jeu de l'oie, pas vrai (  ͡° ͜ʖ ͡° )",
  "assets/img/potionJAVA.jpeg",
  "Potion",
  12940
)

let playerGold = 800

const feedContainer = document.getElementById("feed-container")
const goldAmountSpan = document.getElementById("gold-amount")
const categoryFilter = document.getElementById("category-filter")
const apiStatusText = document.getElementById("api-status-text") 
const addItemForm = document.getElementById("add-item-form")
const itemNameInput = document.getElementById("item-name")
const itemPriceInput = document.getElementById("item-price")
const itemCategoryInput = document.getElementById("item-category")
const itemStockInput = document.getElementById("item-stock")
const itemImageInput = document.getElementById("item-image")
const itemDescriptionInput = document.getElementById("item-description")

function updateGoldDisplay() {
  goldAmountSpan.textContent = playerGold
}

// Création d'une carte produit
function createItemCard(item) {
  const card = document.createElement("article")
  card.className = "item-card"

  const img = document.createElement("img")
  img.className = "item-image"
  img.src = item.image || "assets/img/default.jpeg"
  img.alt = item.name

  const title = document.createElement("h2")
  title.className = "item-title"
  title.textContent = item.name

  const category = document.createElement("p")
  category.className = "item-category"
  category.textContent = item.category

  const desc = document.createElement("p")
  desc.className = "item-description"
  desc.textContent = item.description

  const price = document.createElement("p")
  price.className = "item-price"
  if (typeof item.price === "number" && item.price === -1) {
    price.textContent = "Indisponible"
  } else if (typeof item.price === "number" && item.price === 0) {
    price.textContent = "Gratuit"
  } else if (typeof item.price === "number") {
    price.textContent = item.price + " Or"
  } else {
    price.textContent = "erreur"
  }

  const stock = document.createElement("p")
  stock.className = "item-stock"
  if (typeof item.stock === "number" && item.stock <= 0) {
    stock.textContent = ""
  } else if (typeof item.stock === "number") {
    stock.textContent = `Stock : ${item.stock}`
  } else {
    stock.textContent = "erreur"
  }

  const button = document.createElement("button")
  button.className = "item-buy-btn"
  button.disabled = item.stock <= 0

  if (typeof item.stock === "number" && item.stock <= 0) {
    button.textContent = "-"
  } else if (typeof item.stock === "number") {
    button.textContent = "Acheter"
  } else {
    button.textContent = "- erreur -"
  }

  button.addEventListener("click", () =>
    handleBuy(item, stock, button)
  )

  card.appendChild(img)
  card.appendChild(title)
  card.appendChild(category)
  card.appendChild(desc)
  card.appendChild(price)
  card.appendChild(stock)
  card.appendChild(button)

  return card
}

// Gestion de l'achat
function handleBuy(item, stockElement, buttonElement) {
  if (item.stock <= 0) return
  if (playerGold < item.price) {
    alert("Tu n'as pas assez d'or !")
    return
  }

  playerGold -= item.price
  item.stock -= 1

  updateGoldDisplay()
  stockElement.textContent = `Stock : ${item.stock}`

  if (item.stock <= 0) {
    buttonElement.disabled = true
    buttonElement.textContent = "Rupture"
  }
}

// Rendu des items
function renderItems(filterCategory = "all") {
  feedContainer.innerHTML = ""

  const filtered = itemsRPG.filter((item) => {
    return filterCategory === "all" || item.category === filterCategory
  })

  filtered.forEach((item) => {
    const card = createItemCard(item)
    feedContainer.appendChild(card)
  })

  if (filtered.length === 0) {
    const emptyMsg = document.createElement("p")
    emptyMsg.className = "empty-message"
    emptyMsg.textContent = "Aucun item trouvé pour cette catégorie."
    feedContainer.appendChild(emptyMsg)
  }
}

// Écouteur sur le select de catégorie
categoryFilter.addEventListener("change", (e) => {
  renderItems(e.target.value)
})

// Ajout d'un item via le formulaire
if (addItemForm) {
  addItemForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = itemNameInput.value.trim()
    const price = Number(itemPriceInput.value)
    const category = itemCategoryInput.value
    const stock = Number(itemStockInput.value)
    const image = itemImageInput.value.trim()
    const description = itemDescriptionInput.value.trim()

    if (!name || Number.isNaN(price) || Number.isNaN(stock)) {
      alert("Merci de remplir correctement le formulaire.")
      return
    }

    addItem(
      Date.now(),
      name,
      price,
      description || "Nouvel article ajouté.",
      image,
      category,
      stock
    )

    renderItems(categoryFilter.value || "all")
    addItemForm.reset()
  })
}

// ========= INTÉGRATION DE L'API ANIME (Jikan) =========
// Jikan renvoie un objet { data: [ { title, synopsis, images: { jpg: { image_url } }, ... }, ... ] } sur /v4/anime. [web:25]

async function loadAnimeItems() {
  try {
    if (apiStatusText) {
      apiStatusText.textContent = "Appel de l'API Jikan..."
    }

    const response = await fetch(ANIME_API_BASE)

    if (!response.ok) {
      if (apiStatusText) {
        apiStatusText.textContent = "Erreur API : " + response.status
      }
      console.error("Erreur API Jikan:", response.status, response.statusText)
      return
    }

    const json = await response.json()
    const animes = json.data || []  // tableau d'animes Jikan

    if (!Array.isArray(animes) || animes.length === 0) {
      if (apiStatusText) {
        apiStatusText.textContent = "API OK mais aucune donnée reçue"
      }
      console.warn("Réponse Jikan inattendue:", json)
      return
    }

    animes.forEach((anime, index) => {
      const title = anime.title || "Anime inconnu"
      const img = anime.images?.jpg?.image_url || ""
      const synopsis = anime.synopsis || "Grimoire mystérieux inspiré d'un anime."

      addItem(
        itemsRPG.length + 1,
        `${title}`,
        50 + (index * 20),            // prix simple, croissant
        "Grimoire contenant des secrets de la magie jap anime",
        img,                         // jaquette MAL
        "Artefact",
        1                            // stock arbitraire
      )
    })

    if (apiStatusText) {
      apiStatusText.textContent = "API Jikan OK, items chargés"
    }

    // Re-render après ajout des items issus de l'API
    renderItems(categoryFilter.value || "all")
  } catch (err) {
    if (apiStatusText) {
      apiStatusText.textContent = "Erreur lors de l'appel API (voir console)"
    }
    console.error("Erreur lors du chargement des animes Jikan:", err)
  }
}

// Initialisation
updateGoldDisplay()
renderItems()
loadAnimeItems()
