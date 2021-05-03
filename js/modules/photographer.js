import { testFactory } from './factory.js'
import { openDropdown, closeDropdown, popularitySort, dateSort, titleSort } from './dropdown.js'

let photographer
let titre
let nickName

// DOM // ______________________________________________________________________________________________________________
const h1 = document.querySelector('h1')
const pLocation = document.querySelector('#location')
const listTags = document.querySelector('.tags')
const pTagline = document.querySelector('#tagline')
const img = document.querySelector('.photographer__picture__img')
const rate = document.querySelector('.infos__price')
const contactTitle = document.querySelector('.modal__title')
const totalLikesNb = document.querySelector('.infos__likes__number')

// Récupération de l'id du photographe dans l'url // ___________________________________________________________________

let str = window.location.href
let url = new URL(str)
let login = url.searchParams.get('id')

// Récupération du photographe de la page // ___________________________________________________________________________

class Photographer {
  constructor(name, id, city, country, tags, tagline, price, portrait, media) {
    this.name = name,
    this.id = id,
    this.city = city,
    this.country = country,
    this.tags = tags,
    this.tagline = tagline,
    this.price = price,
    this.portrait = portrait,
    this.media = media
  }
}
function getPhotographer(photographers) {
  for (let i = 0; i < photographers.length; i++ ) {
    if (photographers[i].id == login) {
      photographer = new Photographer(
        photographers[i].name, 
        photographers[i].id, 
        photographers[i].city, 
        photographers[i].country,
        photographers[i].tags,
        photographers[i].tagline,
        photographers[i].price,
        photographers[i].portrait,
        photographers[i].media,
      )
      folderName(photographers[i])
      displayPhotographer(photographers[i])
      testFactory(photographers[i].media)
      return photographer
    }
  }
}
// Récupération du nom du dossier image du photographe // ______________________________________________________________
function folderName(photographer) {
  let name = photographer.name.toLowerCase().replace('-', '_')
  let i = name.indexOf(' ')
  nickName = i == -1 ? name : name.substring(0, i)
  return nickName
}

// Affichage de la "carte d'identité" du photographe // ________________________________________________________________
function displayPhotographer() {
  h1.innerHTML = photographer.name
  h1.setAttribute('aria-label', `${photographer.name}`)
  pLocation.innerHTML = photographer.city + ', ' + photographer.country
  pTagline.innerHTML = photographer.tagline
  let tags = photographer.tags
  rate.innerHTML = photographer.price + ' € / jour'
  for (let tag of tags) {
    listTags.innerHTML += `
    <li class="tags__tag" role="listitem">
      <a class="tags__tag__link" href="index.html#${tag}" aria-label="tag ${tag}">#${tag}</a>
    </li>`
  }
  img.setAttribute('src', `./images/sample_photos/photographers_ID_photos/small/${photographer.portrait}`)
  img.setAttribute('alt', `portrait du photographe ${photographer.name}`)
  img.setAttribute('width', '200')
  img.setAttribute('height', '200')
  contactTitle.innerHTML = `Contactez-moi </br>${photographer.name}`
  totalLikes(photographer.media)
}

// Calcul et affichage du total des "Likes" // ________________________________________________________________
function totalLikes(media) {
  let number = 0
  for (let i = 0; i < media.length; i++) {
    number += media[i].likes
  }
  totalLikesNb.innerHTML = number
}
// Récupération du titre de chaque image à partir de la propriété "alt" // ____________________________________
function title(alt) {
  let str = alt
  let i = str.indexOf(':')
  titre = i == -1 ? str : str.substring(0, i)
  return titre
}

// DROPDOWN // _____// DROPDOWN //__________// DROPDOWN //________// DROPDOWN //________________________________________________________

let down = document.querySelector('#button-dropdown')
let popularity = document.getElementById('option1')
let date = document.getElementById('option2')
let tiTre = document.getElementById('option3')
let up = document.querySelector('#button-dropup')

down.addEventListener('click', () => openDropdown())
up.addEventListener('click', () => closeDropdown())



// TRI //_____________________________________________________________________________________________________________________________

// popularité
popularity.addEventListener('click', () => popularitySort(photographer.media))
popularity.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    popularitySort(photographer.media)
  }
})

// date 
date.addEventListener('click', () => dateSort(photographer.media))
date.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    dateSort(photographer.media)
  }
})

// titre 
tiTre.addEventListener('click', () => titleSort(photographer.media))
tiTre.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    titleSort(photographer.media)
  }
})

//_____________________________________________________________________________________________________________
export { getPhotographer, nickName, title }

