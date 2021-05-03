const totalLikesNb = document.querySelector('.infos__likes__number')

// Ajout ou retrait du nombre de like au click sur le coeur
function addLikes() {
  if (document.addEventListener) {
    let heart = window.event.target
    let idHeart = heart.getAttribute('id')
    let idLikes = idHeart.replace('heart', 'likes')
    let number = document.getElementById(idLikes)
    let numberOfLikes = parseInt(number.textContent, 10)
    let totalLikes = parseInt(totalLikesNb.textContent, 10)
    if ( heart.classList.contains('heart') == true ) {
      heart.classList.toggle('heart')
      numberOfLikes++
      totalLikes++
      number.innerHTML = numberOfLikes
      totalLikesNb.innerHTML = totalLikes
    } else {
      heart.classList.toggle('heart')
      numberOfLikes--
      totalLikes--
      number.innerHTML = numberOfLikes
      totalLikesNb.innerHTML = totalLikes
    }
  }
}

//____________________________________________________________________________________________
export { addLikes }
