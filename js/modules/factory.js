// Display medias - FACTORY METHOD // __________// Display medias - FACTORY METHOD // ______________________________________________________
import { lightbox } from './lightbox.js'
import { nickName, title } from './photographer.js'
import { addLikes } from './likes.js'
import { Element } from './element.js'

let ulMedias = document.querySelector('.lightbox__container') // le conteneur d'image de la lightbox
const sectionMedia = document.querySelector('#media')

let titre

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
// images pour les cartes media
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

    anchorMedia.addEventListener('click', (e) => lightbox(e))
  }
  // images HD pour la lightbox
  createAnImage(medium) {
    let li = new Element('li', 'li', 'lightboxItem').elem
    li.style.display = 'none'
    li.setAttribute('id', `item${medium.id}`)
    li.setAttribute('aria-hidden', 'true')
    ulMedias.appendChild(li)
    let figure = new Element('figure', 'figure', 'figureLightbox').elem
    figure.setAttribute('aria-labelledby', `image${medium.id}`)
    figure.setAttribute('tabindex', '0')
    li.appendChild(figure)
    let image = new Element('image', 'img', 'imageLightbox').elem
    figure.appendChild(image)
    image.setAttribute('src', `./images/sample_photos/${nickName}/${medium.image}`)
    image.setAttribute('alt', `${medium.alt}`)
    image.setAttribute('id', `image${medium.id}`)
    image.setAttribute('width', '1050')
    let figcaption = new Element('figcaption', 'figcaption', 'titleLightbox').elem
    figcaption.setAttribute('aria-hidden', 'true')
    figure.appendChild(figcaption)
    figcaption.innerText = `${titre}`
  }
}
// image de la video pour les cartes media
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

    anchorMedia.addEventListener('click', (e) => lightbox(e))
  }
  // video pour la lightbox
  createAVideo(medium) {
    let li = new Element('li', 'li', 'lightboxItem').elem
    li.style.display = 'none'
    li.setAttribute('id', `item${medium.id}`)
    li.setAttribute('aria-hidden', 'true')
    ulMedias.appendChild(li)

    let figure = new Element('figure', 'figure', 'figureLightbox').elem
    figure.setAttribute('aria-label', `${medium.alt}`)
    figure.setAttribute('tabindex', '0')
    li.appendChild(figure)

    let video = new Element('video', 'video', 'videoLightbox').elem
    figure.appendChild(video)
    video.setAttribute('controls', 'true')
    video.setAttribute('width', '1050')
    video.setAttribute('aria-label', `${medium.alt}`)

    let source = new Element('source', 'source', 'imageLightbox').elem
    video.appendChild(source)
    source.setAttribute('src', `./images/sample_photos/${nickName}/${medium.video}`)
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
    pInfos.setAttribute('aria-hidden', 'true')


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
  // DOM élément <div> - conteneur du media
  let anchorMedia = new Element('anchorMedia', 'a', 'article__link').elem
  figure.appendChild(anchorMedia)
  anchorMedia.setAttribute('id', `idImage${medium.id}`)
  // anchorMedia.setAttribute('tabindex', '0')
  anchorMedia.setAttribute('aria-label', `${titre} gros plan`)
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
  let aHeart = new Element('aHeart', 'a', 'heart').elem
  divLikes.appendChild(aHeart)
  // heart.setAttribute('role', 'button')
  aHeart.setAttribute('id', `heart${medium.id}`)
  aHeart.setAttribute('tabindex', '0')
  aHeart.setAttribute('aria-label', 'ajouter ou enlever un like')
  let heart = new Element('heart', 'span', 'heart').elem
  heart.classList.add('fas', 'fa-heart')
  aHeart.appendChild(heart)

  aHeart.addEventListener('click', () => addLikes())
  aHeart.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      addLikes()
    }
  })
}


//_____________________________________________________________________________________________________________
export { testFactory }


