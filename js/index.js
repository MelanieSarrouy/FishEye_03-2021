import { myFetch } from './modules/fetch.js' // Requête objet JSON, Récupération des données //
import { hashChanged } from './modules/tags.js' // Affichage des photographes par tag //
import { content } from './modules/scroll.js' // Faire apparaître le bouton 'passer au contenu' //
import { createAcard } from './modules/card.js' // création d'une 'carte' pour chaque photographe //
import { displayTags } from './modules/card.js' // ajout des tags de chaque photographe //

myFetch()

// Ajout dela propriété 'media' pour chaque objet photographe et en valeur les medias correspondants _______
function getPhotographersWithMedia(json) {
  const photographers = json.photographers
  const media = json.media
  showPhotographers(photographers) // Affichage des photographes
  window.addEventListener('hashchange', () => hashChanged(photographers)) // Ecoute du hashChanged de l'url
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

export { getPhotographersWithMedia }

// Affichage des photographes // _________________________________________________________________________
function showPhotographers(photographers) {
  for (let i = 0; i < photographers.length; i++) {
    createAcard(photographers[i]) 
    displayTags(photographers[i]) 
  }
  hashChanged(photographers) // affichage des photographes en fonction du hashChanged
}

// ecoute de l'evenement scrollY pour faire apparaître le bouton 'passer au contenu' // __________________
window.addEventListener('scroll', () => content()) 


