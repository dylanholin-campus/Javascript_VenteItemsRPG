const ANIME_API_BASE = "https://api.jikan.moe/v4/anime?limit=12"

const itemsRPG = [
  {
    id: 1,
    name: "Épée du Dragon",
    price: 120,
    description: "Lame légendaire forgée dans le feu d'un dragon ancien.",
    image: "assets/img/epeedragon.jpeg",
    category: "Arme",
    stock: 1
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
const itemImageFileInput = document.getElementById("item-image-file")
const itemImageFileFeedback = document.getElementById("item-image-file-feedback")
const itemImagePreview = document.getElementById("item-image-preview")
const itemDescriptionInput = document.getElementById("item-description")
const viewMosaicBtn = document.getElementById("view-mosaic-btn")
const viewColumnBtn = document.getElementById("view-column-btn")

let selectedImageDataUrl = ""

function setGalleryView(mode = "mosaic") {
  if (!feedContainer) return

  const isColumn = mode === "column"

  feedContainer.classList.toggle("view-column", isColumn)
  feedContainer.classList.toggle("view-mosaic", !isColumn)

  if (viewMosaicBtn) {
    viewMosaicBtn.setAttribute("aria-pressed", String(!isColumn))
  }
  if (viewColumnBtn) {
    viewColumnBtn.setAttribute("aria-pressed", String(isColumn))
  }
}

function updateGoldDisplay() {
  goldAmountSpan.textContent = playerGold // MODIFIER LE DOM : modification du texte d'un élément avec textContent
}

function createItemCard(item) {
  const card = document.createElement("article")
  card.className = "item-card"

  const img = document.createElement("img")
  img.className = "item-image"
  img.src = item.image || "assets/img/default.jpeg"
  img.alt = item.name

  const title = document.createElement("h2")
  title.className = "item-title"
  title.textContent = item.name // MODIFIER LE DOM : modification du texte d'un élément avec textContent

  const category = document.createElement("p")
  category.className = "item-category"
  category.textContent = item.category

  const desc = document.createElement("p")
  desc.className = "item-description"
  desc.textContent = item.description

  const price = document.createElement("p")
  price.className = "item-price"
  if (typeof item.price === "number" && item.price === -1) {
    price.textContent = "Indisponible" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
  } else if (typeof item.price === "number" && item.price === 0) {
    price.textContent = "Gratuit" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
  } else if (typeof item.price === "number") {
    price.textContent = item.price + " Or" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
  } else {
    price.textContent = "erreur" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
  }

  const stock = document.createElement("p")
  stock.className = "item-stock"
  if (typeof item.stock === "number" && item.stock <= 0) {
    stock.textContent = ""
  } else if (typeof item.stock === "number") {
    stock.textContent = `Stock : ${item.stock}` // MODIFIER LE DOM : modification du texte d'un élément avec textContent
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
    button.textContent = "- erreur -" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
  }

  button.addEventListener("click", () =>
    // event SOURIS : permet de déclencher une action lors d'un clic sur le bouton "Acheter" d'un item,
    // ce qui permet de gérer l'achat de l'item en vérifiant le stock et l'or du joueur, puis en mettant à jour l'affichage en conséquence
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

function renderItems(filterCategory = "all") {
  feedContainer.innerHTML = "" // MODIFIER LE DOM : modification du contenu HTML d'un élément avec innerHTML

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
    emptyMsg.textContent = "Aucun item trouvé pour cette catégorie." // MODIFIER LE DOM : modification du texte d'un élément avec textContent
    feedContainer.appendChild(emptyMsg)
  }
}

categoryFilter.addEventListener("change", (e) => {
  // EVENT CLAVIER : permet de déclencher une action lors du changement de sélection dans un élément <select>
  // ce qui permet de filtrer les items affichés en fonction de la catégorie choisie par l'utilisateur
  renderItems(e.target.value)
})

if (addItemForm) {
  if (itemImageFileInput) {
    itemImageFileInput.addEventListener("change", () => {
      const selectedFile = itemImageFileInput.files?.[0]

      if (!selectedFile) {
        selectedImageDataUrl = ""
        if (itemImageFileFeedback) {
          itemImageFileFeedback.textContent = "Aucune image sélectionnée."
        }
        if (itemImagePreview) {
          itemImagePreview.hidden = true
          itemImagePreview.removeAttribute("src")
        }
        return
      }

      if (!selectedFile.type.startsWith("image/")) {
        alert("Merci de sélectionner un fichier image valide.")
        itemImageFileInput.value = ""
        selectedImageDataUrl = ""
        if (itemImageFileFeedback) {
          itemImageFileFeedback.textContent = "Aucune image sélectionnée."
        }
        if (itemImagePreview) {
          itemImagePreview.hidden = true
          itemImagePreview.removeAttribute("src")
        }
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        selectedImageDataUrl = String(reader.result || "")
        if (itemImageFileFeedback) {
          itemImageFileFeedback.textContent = `Image sélectionnée : ${selectedFile.name}`
        }
        if (itemImagePreview && selectedImageDataUrl) {
          itemImagePreview.src = selectedImageDataUrl
          itemImagePreview.hidden = false
        }
      }
      reader.readAsDataURL(selectedFile)
    })
  }

  addItemForm.addEventListener("submit", (event) => {
    // EVENT CLAVIER: permet de déclencher une action lors de la soumission
    //  d'un formulaire par un appui sur la touche "Entrée" ou un clic sur le bouton de soumission
    // ce qui permet d'ajouter un nouvel item à la boutique en utilisant les données saisies par l'utilisateur dans le formulaire
    event.preventDefault()

    const name = itemNameInput.value.trim()
    const price = Number(itemPriceInput.value)
    const category = itemCategoryInput.value
    const stock = Number(itemStockInput.value)
    const imageUrl = itemImageInput.value.trim()
    const image = selectedImageDataUrl || imageUrl
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
    selectedImageDataUrl = ""
    if (itemImageFileFeedback) {
      itemImageFileFeedback.textContent = "Aucune image sélectionnée."
    }
    if (itemImagePreview) {
      itemImagePreview.hidden = true
      itemImagePreview.removeAttribute("src")
    }
  })
}

if (viewMosaicBtn) {
  viewMosaicBtn.addEventListener("click", () => {
    setGalleryView("mosaic")
  })
}

if (viewColumnBtn) {
  viewColumnBtn.addEventListener("click", () => {
    setGalleryView("column")
  })
}

async function loadAnimeItems() {
  try {
    if (apiStatusText) {
      apiStatusText.textContent = "Appel de l'API Jikan..." // MODIFIER LE DOM : modification du texte d'un élément avec textContent
    }

    const response = await fetch(ANIME_API_BASE)

    if (!response.ok) {
      if (apiStatusText) {
        apiStatusText.textContent = "Erreur API : " + response.status // MODIFIER LE DOM : modification du texte d'un élément avec textContent
      }
      console.error("Erreur API Jikan:", response.status, response.statusText)
      return
    }

    const json = await response.json()
    const animes = json.data || []

    if (!Array.isArray(animes) || animes.length === 0) {
      if (apiStatusText) {
        apiStatusText.textContent = "API OK mais aucune donnée reçue" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
      }
      console.warn("Réponse Jikan inattendue:", json)
      return
    }

    animes.forEach((anime, index) => {
      const title = anime.title || "Anime inconnu"
      const img = anime.images?.jpg?.image_url || ""
      const synopsis = "Grimoire mystérieux inspiré d'un anime."

      addItem(
        itemsRPG.length + 1,
        `${title}`,
        50 + (index * 20),
        "Grimoire contenant des secrets de la magie jap anime",
        img,
        "Artefact",
        1
      )
    })

    if (apiStatusText) {
      apiStatusText.textContent = "API Jikan OK, items chargés" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
    }

    renderItems(categoryFilter.value || "all")
  } catch (err) {
    if (apiStatusText) {
      apiStatusText.textContent = "Erreur lors de l'appel API (voir console)" // MODIFIER LE DOM : modification du texte d'un élément avec textContent
    }
    console.error("Erreur lors du chargement des animes Jikan:", err)
  }
}

updateGoldDisplay()
setGalleryView("mosaic")
renderItems()
loadAnimeItems()
