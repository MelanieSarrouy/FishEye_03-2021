// Bouton 'passer au contenu', apparaît au scroll // _______________________________________________

function content() {
  const scrollPage = document.querySelector('.contenu__link') // le bouton
  if ( window.scrollY > 250 ) {
    scrollPage.style.display = 'flex'
  } else {
    scrollPage.style.display = 'none'
  }
}

export { content }