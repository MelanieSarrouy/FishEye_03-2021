// Affichage des photographes par tag // _________________________________________________________________

const navTags = Array.from(document.querySelectorAll('.nav__liste__link')) // tous les tags du nav
// accessibilité; aria-current = false pour tous les tags
navTags.forEach((tag) => {
  tag.setAttribute('aria-current', 'false') 
})
// liste des différents tags
const arrayTags = [
  'portrait',
  'art',
  'mode',
  'architecture',
  'voyage',
  'sport',
  'animaux',
  'evenements',
]
// Affichage des photographes par tag //
function hashChanged(photographers) {
  for (let tag of arrayTags) {
    if (location.hash === `#${tag}`) {
      // accessibilité; aria-current = page pour la 'page' affichée
      navTags.forEach((tag) => {
        tag.setAttribute('aria-current', 'false')
      })
      let targetTag = document.getElementById(`${tag}`)
      targetTag.setAttribute('aria-current', 'page')
      // affichage des photographes avec le bon tag et dissimulation des autres
      for (let i = 0; i < photographers.length; i++) {
        let article = document.getElementById(`article${photographers[i].id}`)
        const arrayTagPhotographer = photographers[i].tags
        const index = arrayTagPhotographer.indexOf(tag)
        if ((index < 0)) {
          article.style.display = 'none'
        } else {
          article.style.display = 'flex'
        }
      }
    }
  }
}

//_____________________________________________________________________________________________________________
export { hashChanged }