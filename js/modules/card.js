// Création d'une carte photographe ______________________________________________________________________
import { Element } from './element.js'

let photographersCards = document.getElementById('photographersCards') // cible la section conteneur des cartes photographes

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

// Affichage des tags de chaque photographe 
function displayTags(photographer) {
  for (let tag = 0; tag < photographer.tags.length; tag++) {
    document.getElementById('id' + photographer.id).innerHTML += `
    <li class="list__item">
      <a class="list__link" href="index.html#${photographer.tags[tag]}" aria-label="tag ${photographer.tags[tag]}">#${photographer.tags[tag]}</a>
    </li>`
  } 
}

export { createAcard }
export { displayTags }