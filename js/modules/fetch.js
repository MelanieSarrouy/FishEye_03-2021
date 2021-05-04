import { getPhotographersWithMedia } from '../index.js'
// Requête objet JSON ____________________________________________________________________________________

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

//_____________________________________________________________________________________________________________
export { myFetch }
