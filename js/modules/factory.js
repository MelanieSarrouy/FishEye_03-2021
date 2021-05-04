// Display medias - FACTORY METHOD // __________// Display medias - FACTORY METHOD // ______________________________________________________
import { lightbox } from './lightbox.js'
import { nickName, title } from './photographer.js'
import { addLikes } from './likes.js'
import { Element } from './element.js'


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
    let li = new Element('li', 'li', 'lightboxItem').elem
    li.style.display = 'none'
    li.setAttribute('id', `item${medium.id}`)
    li.setAttribute('aria-hidden', 'true')
    ulMedias.appendChild(li)
    let figure = new Element('figure', 'figure', 'figureLightbox').elem
    figure.setAttribute('role', 'figure')
    figure.setAttribute('aria-label', `${titre}`)
    li.appendChild(figure)
    let image = new Element('image', 'img', 'imageLightbox').elem
    figure.appendChild(image)
    image.setAttribute('src', `./images/sample_photos/${nickName}/${medium.image}`)
    image.setAttribute('alt', `${medium.alt}`)
    image.setAttribute('width', '1050')
    let figcaption = new Element('figcaption', 'figcaption', 'titleLightbox').elem
    figure.appendChild(figcaption)
    figcaption.innerText = `${titre}`
  }
}
class Video {
  createAVideoCard(medium) {
    let anchorMedia = document.getElementById(`idImage${medium.id}`)
    let icone = new Element('icone', 'img', 'logoPlay').elem
    anchorMedia.appendChild(icone)
    anchorMedia.setAttribute('href', 'javascript:void(0);')
    icone.setAttribute('src', './images/play.png')
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
    let li = new Element('li', 'li', 'lightboxItem').elem
    li.style.display = 'none'
    li.setAttribute('id', `item${medium.id}`)
    li.setAttribute('aria-hidden', 'true')
    ulMedias.appendChild(li)
    let video = document.createElement('video')
    li.appendChild(video)
    video.setAttribute('controls', 'true')
    video.setAttribute('width', '1050')
    video.classList.add('videoLightbox')
    let source = new Element('source', 'source', 'imageLightbox').elem
    video.appendChild(source)
    source.setAttribute('src', `./images/sample_photos/${nickName}/${medium.video}`)
    source.setAttribute('alt', `${medium.alt}`)
    source.setAttribute('id', `video${medium.id}`)
    source.setAttribute('type', 'video/mp4')

    let track = document.createElement('track')
    video.appendChild(track)
    track.setAttribute('src', './images/sample_photos/sous-titres.vtt')
    track.setAttribute('kind', 'subtitles')
    track.setAttribute('srclang', 'fr')
    track.setAttribute('label', 'francais')

    track.setAttribute('default', 'true')

    let divCaption = new Element('divCaption', 'div', 'controls').elem
    li.appendChild(divCaption)
    divCaption.setAttribute('id', 'video-controls')
    divCaption.setAttribute('data-state', 'hidden')

    let pInfos = new Element('pInfos', 'p', 'titleLightbox').elem
    divCaption.appendChild(pInfos)
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
  let article = new Element('article', 'article', 'article').elem
  sectionMedia.appendChild(article)
  article.setAttribute('id', `${medium.id}`)
  // DOM élément <figure> - conteneur
  let figure = document.createElement('figure')
  article.appendChild(figure)
  figure.setAttribute('role', 'figure')
  figure.setAttribute('aria-labelledby', `title${medium.id}`)
  // DOM élément <div> - conteneur du media
  let anchorMedia = new Element('anchorMedia', 'a', 'article__link').elem
  figure.appendChild(anchorMedia)
  anchorMedia.setAttribute('id', `idImage${medium.id}`)
  anchorMedia.setAttribute('aria-labelledby', 'lightbox-content')
  let figcaption = new Element('figcaption', 'figcaption', 'article__informations').elem
  figure.appendChild(figcaption)
  // DOM élément <p> - titre de l'image
  let pTitle = document.createElement('p')
  figcaption.appendChild(pTitle)
  // title(medium.alt)
  pTitle.innerHTML = `${titre}`
  pTitle.setAttribute('id', `title${medium.id}`)
  // DOM élément <div> - conteneur prix et likes
  let divLikes = new Element('divLikes', 'div', 'article__informations__likes').elem
  figcaption.appendChild(divLikes)
  // DOM élément <p> - prix
  let pPrice = document.createElement('p')
  divLikes.appendChild(pPrice)
  pPrice.innerHTML = `${medium.price} €`
  // DOM élément <p> - nombre de likes
  let pNumberLikes = new Element('pNumberLikes', 'p', 'likes').elem
  divLikes.appendChild(pNumberLikes)
  pNumberLikes.innerHTML = medium.likes
  pNumberLikes.setAttribute('id', `likes${medium.id}`)
  // DOM élément <button> - coeur
  let heart = new Element('heart', 'button', 'buttonHeart').elem

  divLikes.append(heart)
  heart.setAttribute('role', 'button')
  heart.classList.add('heart', 'fas', 'fa-heart')
  heart.setAttribute('id', `heart${medium.id}`)
  heart.setAttribute('aria-label', 'coeur, ajouter, enlever 1 like')

  heart.addEventListener('click', () => addLikes())
}

//_____________________________________________________________________________________________________________
export { testFactory }


