import { myFetch2 } from './modules/fetch-page-photographer.js'
import { getPhotographer } from './modules/photographer.js'
import { launchModal } from './modules/modale.js'

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
