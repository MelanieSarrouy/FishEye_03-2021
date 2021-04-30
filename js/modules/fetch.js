// Requête objet JSON ____________________________________________________________________________________

// Récupération des données // ___________________________________________________________________________

import { getPhotographersWithMedia } from '../index2.js'

// const source = './data.json'

function myFetch() {
  let source = './data.json'
  fetch(source).then(async (res) => {
    if (res.ok) {
      const json = await res.json()
      getPhotographersWithMedia(json)
    } else {
      console.log('erreur')
    }
  })
}

export { myFetch }
