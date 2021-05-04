import { myFetch2 } from './modules/fetch-page-photographer.js' // Requête objet JSON, Récupération des données //
import { getPhotographer } from './modules/photographer.js' // affichage du photographe et de ses medias... //
import { launchModal } from './modules/modale.js' // lancement de la modale //

myFetch2()

// Récupération des données // _________________________________________________________________________________________

function getData(json) {
  const photographers = json.photographers
  const media = json.media
  for (let photographer of photographers) {
    let mediaList = []  
    Object.defineProperty(photographer, 'media', {
      value: mediaList,
      writable: true 
    })
    for (let medium of media) {
      if (photographer.id == medium.photographerId) {
        mediaList.push(medium)
      }
    }
  }
  getPhotographer(json.photographers)
}

export { getData }

// Ouverture de la modale // __________________________________________________________________________________
const contact = document.querySelector('.button__contact')
contact.addEventListener('click', () => launchModal())
