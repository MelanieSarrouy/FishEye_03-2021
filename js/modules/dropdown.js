import { testFactory } from './factory.js'

let dropDown = document.getElementById('container')
let down = document.querySelector('#button-dropdown')
let popularity = document.getElementById('option1')

// Ouverture de la dropdown
function openDropdown() {
  dropDown.style.display = 'flex'
  down.setAttribute('aria-expanded', 'true')
  popularity.focus()
}

// Fermeture de la dropdown
function closeDropdown() {
  dropDown.style.display = 'none'
  down.setAttribute('aria-expanded', 'false')
  down.focus()
}

// TRI //________// TRI //__________// TRI //__________// TRI //_______________________________

// Tri par popularité

function popularitySort(media) {
  function tri(a,b) {
    return ((a.likes < b.likes) ? 1 : (a.likes == b.likes) ? 0 : -1)
  }
  media.sort(tri)
  testFactory(media)
}
// Tri par date 

function dateSort(media) {
  function tri(a,b) {
    let dateA = new Date(a.date)
    let dateB = new Date(b.date)
    return ((dateA < dateB) ? 1 : (dateA == dateB) ? 0 : -1)
  }
  media.sort(tri)
  testFactory(media)
}
// Tri par titre 
function titleSort(media) {
  function tri(a,b) {
    let titleA = a.alt.split(' ').join('')
    a = titleA.toLowerCase()
    let titleB = b.alt.split(' ').join('')
    b = titleB.toLowerCase()
    return (a < b) ? -1 : 1
  }
  media.sort(tri)
  testFactory(media)
}

//____________________________________________________________________________________________
export { openDropdown, closeDropdown, popularitySort, dateSort, titleSort }
