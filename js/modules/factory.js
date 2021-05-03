// Display medias - FACTORY METHOD // __________// Display medias - FACTORY METHOD // ______________________________________________________
import { lightbox } from './lightbox.js'
import { nickName, title } from './photographer.js'
import { addLikes } from './likes.js'

let ulMedias = document.querySelector('.lightbox__container') // le conteneur d'image de la lightbox
const sectionMedia = document.querySelector('#media')

let titre

// import { folderName } from './photographer'

class MediaFactory {
  constructor() {
    this.createMedia = (type) => {
      let med
      if (type === 'image') {
        med = new Image()
      } else if (type === 'video') {
        med = new Video()
      }
      return med
    }
  }
}
class Image {
  createAnImageCard(medium) {
    let anchorMedia = document.getElementById(`idImage${medium.id}`)
    let image = document.createElement('img')
    anchorMedia.appendChild(image)
    anchorMedia.setAttribute('href', 'javascript:void(0);')
    image.setAttribute('src', `./images/sample_photos/${nickName}/light/${medium.image}`)
    image.setAttribute('alt', `${medium.alt}`)
    image.setAttribute('id', `id${medium.id}`)
    image.setAttribute('width', '350')
    image.setAttribute('height', '300')
    image.setAttribute('tabindex', '-1')

    anchorMedia.addEventListener('click', (e) => lightbox(e))
  }
  createAnImage(medium) {
    let li = document.createElement('li')
    li.classList.add('lightboxItem')
    li.style.display = 'none'
    li.setAttribute('id', `item${medium.id}`)
    li.setAttribute('aria-hidden', 'true')
    ulMedias.appendChild(li)
    let figure = document.createElement('figure')
    figure.classList.add('figureLightbox')
    figure.setAttribute('role', 'figure')
    figure.setAttribute('aria-label', `${titre}`)
    li.appendChild(figure)
    let image = document.createElement('img')
    figure.appendChild(image)
    image.setAttribute('src', `../../images/sample_photos/${nickName}/${medium.image}`)
    image.setAttribute('alt', `${medium.alt}`)
    image.setAttribute('width', '1050')

    image.classList.add('imageLightbox')
    let figcaption = document.createElement('figcaption')
    figure.appendChild(figcaption)
    figcaption.classList.add('titleLightbox')
    figcaption.innerText = `${titre}`
  }
}
class Video {
  createAVideoCard(medium) {
    let anchorMedia = document.getElementById(`idImage${medium.id}`)
    let icone = document.createElement('img')
    anchorMedia.appendChild(icone)
    anchorMedia.setAttribute('href', 'javascript:void(0);')
    icone.setAttribute('src', './images/play.png')
    icone.classList.add('logoPlay')
    icone.setAttribute('alt', '')
    icone.setAttribute('tabindex', '-1')
    let image = document.createElement('img')
    anchorMedia.appendChild(image)
    let captureImage = medium.video.replace('mp4', 'jpg')
    image.setAttribute('src', `./images/sample_photos/${nickName}/light/${captureImage}`)
    image.setAttribute('alt', `${medium.alt}`)
    image.setAttribute('id', `id${medium.id}`)
    image.setAttribute('width', '350')
    image.setAttribute('height', '300')
    image.setAttribute('tabindex', '-1')
    anchorMedia.addEventListener('click', (e) => lightbox(e))
  }
  createAVideo(medium) {
    let li = document.createElement('li')
    li.classList.add('lightboxItem')
    li.style.display = 'none'
    li.setAttribute('id', `item${medium.id}`)
    li.setAttribute('aria-hidden', 'true')
    ulMedias.appendChild(li)
    let video = document.createElement('video')
    li.appendChild(video)
    video.setAttribute('controls', 'true')
    video.setAttribute('width', '1050')
    video.classList.add('videoLightbox')
    let source = document.createElement('source')
    video.appendChild(source)
    source.setAttribute('src', `./images/sample_photos/${nickName}/${medium.video}`)
    source.setAttribute('alt', `${medium.alt}`)
    source.setAttribute('id', `video${medium.id}`)
    source.setAttribute('type', 'video/mp4')
    source.classList.add('imageLightbox')

    let track = document.createElement('track')
    video.appendChild(track)
    track.setAttribute('src', './images/sample_photos/sous-titres.vtt')
    track.setAttribute('kind', 'subtitles')
    track.setAttribute('srclang', 'fr')
    track.setAttribute('label', 'francais')

    track.setAttribute('default', 'true')


    let divCaption = document.createElement('div')
    li.appendChild(divCaption)
    divCaption.setAttribute('id', 'video-controls')
    divCaption.classList.add('controls')
    divCaption.setAttribute('data-state', 'hidden')

    let pInfos = document.createElement('p')
    divCaption.appendChild(pInfos)
    pInfos.classList.add('titleLightbox')
    pInfos.innerText = `${titre}`

    let playButton = document.createElement('button')
    divCaption.appendChild(playButton)
    playButton.setAttribute('id', 'playpause')
    playButton.setAttribute('type', 'button')
    playButton.setAttribute('role', 'button')
    playButton.setAttribute('aria-label', 'lecture ou pause')
    playButton.setAttribute('data-state', 'play')
    playButton.innerHTML = '<span class="fas fa-play"></span>'
  }
}

const factory = new MediaFactory()

function testFactory(media) {
  sectionMedia.innerHTML = ''
  media.forEach(medium => {
    titre = title(medium.alt)
    createDOMElements(medium)
    if (medium.image !== undefined) {
      let card = factory.createMedia('image')
      card.createAnImageCard(medium)
      card.createAnImage(medium)
    } else {
      let card = factory.createMedia('video')
      card.createAVideoCard(medium)
      card.createAVideo(medium)
    }
  })
  let allItems = document.querySelectorAll('.lightboxItem')
  let items = Array.from(allItems)
  items.forEach((item) => {
    item.classList.add(`item-${items.indexOf(item)}`)
  })
  let allMedias = document.querySelectorAll('.article__link')
  let medias = Array.from(allMedias)
  medias.forEach((media) => {
    media.classList.add(`article__link-${medias.indexOf(media)}`)
  })

}

function createDOMElements(medium) {
  let article = document.createElement('article')
  sectionMedia.appendChild(article)
  article.classList.add('article')
  article.setAttribute('id', `${medium.id}`)
  // DOM élément <figure> - conteneur
  let figure = document.createElement('figure')
  article.appendChild(figure)
  figure.setAttribute('role', 'figure')
  figure.setAttribute('aria-labelledby', `title${medium.id}`)
  // DOM élément <div> - conteneur du media
  let anchorMedia = document.createElement('a')
  figure.appendChild(anchorMedia)
  anchorMedia.classList.add('article__link')
  anchorMedia.setAttribute('id', `idImage${medium.id}`)
  anchorMedia.setAttribute('aria-labelledby', 'lightbox-content')
  let figcaption = document.createElement('figcaption')
  figure.appendChild(figcaption)
  figcaption.classList.add('article__informations')
  // DOM élément <p> - titre de l'image
  let pTitle = document.createElement('p')
  figcaption.appendChild(pTitle)
  // title(medium.alt)
  pTitle.innerHTML = `${titre}`
  pTitle.setAttribute('id', `title${medium.id}`)
  // DOM élément <div> - conteneur prix et likes
  let divLikes = document.createElement('div')
  figcaption.appendChild(divLikes)
  divLikes.classList.add('article__informations__likes')
  // DOM élément <p> - prix
  let pPrice = document.createElement('p')
  divLikes.appendChild(pPrice)
  pPrice.innerHTML = `${medium.price} €`
  // DOM élément <p> - nombre de likes
  let pNumberLikes = document.createElement('p')
  divLikes.appendChild(pNumberLikes)
  pNumberLikes.innerHTML = medium.likes
  pNumberLikes.setAttribute('id', `likes${medium.id}`)
  pNumberLikes.classList.add('likes')
  // DOM élément <button> - coeur
  let heart = document.createElement('button')
  divLikes.append(heart)
  heart.setAttribute('role', 'button')
  heart.classList.add('buttonHeart', 'heart', 'fas', 'fa-heart')
  heart.setAttribute('id', `heart${medium.id}`)
  heart.setAttribute('aria-label', 'coeur, ajouter, enlever 1 like')

  heart.addEventListener('click', () => addLikes())
}

//_____________________________________________________________________________________________________________
export { testFactory }


