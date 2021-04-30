import { getData } from '../photographers-page'

// Requête objet JSON __________________________________________________________________________________________________

function myOtherFetch() {
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

export { myOtherFetch }
