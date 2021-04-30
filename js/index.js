// DOM ___________________________________________________________________________________________________
let photographersCards = document.getElementById('photographersCards')

export { photographersCards }

// Requête objet JSON ____________________________________________________________________________________
const source = './data.json'

// Récupération des données // ___________________________________________________________________________

function myFetch() {
  fetch(source).then(async (res) => {
    if (res.ok) {
      const json = await res.json()
      getPhotographersWithMedia(json)
    } else {
      console.log('erreur')
    }
  })
}
myFetch()

// Récupération des données // ___________________________________________________________________________
let photographers = []
let media = []

function getPhotographersWithMedia(json) {
  getPhotographers(json)
  getMedia(json)
  for (const photographer of photographers) {
    let mediaList = []
    Object.defineProperty(photographer, 'media', {
      value: mediaList,
      writable: true 
    })
    for (const medium in media) {
      if (photographer.id == medium.photographerId) {
        mediaList.push(medium)
      }
    }
  }
}

function getPhotographers(json) {
  const PHOTOGRAPHERS = json.photographers
  for ( let i = 0; i < PHOTOGRAPHERS.length; i++ ) {
    photographers.push(PHOTOGRAPHERS[i])
  }
  showPhotographers(photographers)
}
function getMedia(json) {
  const MEDIA = json.media
  for (const medium in MEDIA) {
    media.push(medium)
  }
}
console.log(photographers)

// Affichage des photographes // _________________________________________________________________________
function showPhotographers(photographers) {
  for (let i = 0; i < photographers.length; i++) {
    createAcard(photographers[i])
    displayTags(photographers[i])
  }
  hashChanged(photographers)
}
class Element {
  constructor(name, element, classname) {
    this.name = name
    this.element = element
    this.classname = classname
  }
  get elem() {
    return this.creatEl()
  }
  creatEl() {
    this.name = document.createElement(this.element)
    this.name.classList.add(this.classname)
    return this.name
  }
}


// Création d'une carte photographe ______________________________________________________________________
function createAcard(photographer) {
  let img = new Element('img', 'img', 'photographer__img', 'picture').elem
  let picture = new Element('picture', 'picture', 'photographer__figure').elem
  let h2 = new Element('h2', 'h2', 'photographer__name', 'anchor').elem
  let pLocation = new Element('pLocation', 'p', 'photographer__location').elem
  let pTagline = new Element('pTagline', 'p', 'photographer__tagline').elem
  let pPrice = new Element('pPrice', 'p', 'photographer__price').elem
  let ul = new Element('ul', 'ul', 'list', 'article').elem
  let anchor = new Element('anchor', 'a', 'photographer__link').elem
  let article = new Element('article', 'article', 'photographer').elem
  picture.appendChild(img)
  anchor.appendChild(picture)
  anchor.appendChild(h2)
  article.appendChild(anchor)
  article.appendChild(pLocation)
  article.appendChild(pTagline)
  article.appendChild(pPrice)
  article.appendChild(ul)
  photographersCards.appendChild(article)

  // Contenu des cartes photographes
  img.setAttribute('src', `./images/sample_photos/photographers_ID_photos/small/${photographer.portrait}`)
  img.setAttribute('alt', `portrait du photographe ${photographer.name}`)
  img.setAttribute('width', '200')
  img.setAttribute('height', '200')
  anchor.setAttribute('href', 'photographer-page.html?id=' + `${photographer.id}`)
  anchor.setAttribute('aria-label', `${photographer.name}`)      
  h2.innerHTML = `${photographer.name}`
  pLocation.innerHTML = `${photographer.city}, ${photographer.country}`
  pTagline.innerHTML = `${photographer.tagline}`
  pPrice.innerHTML = `${photographer.price}€/jour`
  pPrice.innerHTML = `${photographer.price}€/jour`
  ul.setAttribute('id', `id${photographer.id}`)
  article.setAttribute('id', `${photographer.id}`)
}

// Affichage des tags de chaque photographe ______________________________________________________________
function displayTags(photographer) {
  for (let tag = 0; tag < photographer.tags.length; tag++) {
    document.getElementById('id' + photographer.id).innerHTML += `
    <li class="list__item">
      <a class="list__link" href="index.html#${photographer.tags[tag]}" aria-label="tag ${photographer.tags[tag]}">#${photographer.tags[tag]}</a>
    </li>`
  } 
}

// Affichage des photographes par tag ____________________________________________________________________
const navTags = Array.from(document.querySelectorAll('.nav__liste__link')) // tous les tags du nav

navTags.forEach((tag) => {
  tag.setAttribute('aria-current', 'false') 
})

const arrayTags = [
  'portrait',
  'art',
  'mode',
  'architecture',
  'voyage',
  'sport',
  'animaux',
  'evenements',
]
window.addEventListener('hashchange', () => hashChanged(photographers))
function hashChanged() {
  for (let tag of arrayTags) {
    if (location.hash === `#${tag}`) {
      navTags.forEach((tag) => {
        tag.setAttribute('aria-current', 'false')
      })
      let targetTag = document.getElementById(`${tag}`)
      targetTag.setAttribute('aria-current', 'page')
      for (let i = 0; i < photographers.length; i++) {
        let article = document.getElementById(`${photographers[i].id}`)
        const arrayTagPhotographer = photographers[i].tags
        const index = arrayTagPhotographer.indexOf(tag)
        if (!(index > -1)) {
          article.style.display = 'none'
        } else {
          article.style.display = 'flex'
        }
      }
    }
  }
}

// Bouton 'passer au contenu' ____________________________________________________________________________

const scrollPage = document.querySelector('.contenu__link') // le bouton
window.addEventListener('scroll', () => content()) // ecoute de l'evenement scrollY

//fonction
function content() {
  if ( window.scrollY > 250 ) {
    scrollPage.style.display = 'flex'
  } else {
    scrollPage.style.display = 'none'
  }
}