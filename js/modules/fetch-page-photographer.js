import { getData } from '../photographerpage.js'

// Requête objet JSON __________________________________________________________________________________________________

function myFetch2() {
  let source = './data.json'
  fetch(source).then(async (res) => {
    if (res.ok) {
      const json = await res.json()
      getData(json)
    } else {
      console.log('erreur')
    }
  })
}

//_____________________________________________________________________________________________________________
export { myFetch2 }
