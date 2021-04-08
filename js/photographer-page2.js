// DOM // ______________________________________________________________________________________________________________

const h1 = document.querySelector('h1');
const pLocation = document.querySelector('h1 + p');
const listTags = document.querySelector('.tags');
const pTagline = document.querySelector('#tagline');
const button = document.querySelector('aside > button');
const img = document.querySelector('aside > picture > img');
const sectionMedia = document.querySelector('.media');

// Requête objet JSON __________________________________________________________________________________________________

const source = "./data.json";

fetch(source).then((res) => {
  if (res.ok) {
    return res.json().then((json) => {
      getPhotographersWithMedia(json);
    });
  } else {
    console.log("erreur");
  }
});

// Récupération des données // _________________________________________________________________________________________

let photographers = [];
let media = [];
let photographer;

function getPhotographersWithMedia(json) {
  getPhotographers(json);
  getMedia(json);
  for (photographer of photographers) {
    let mediaList = [];
    Object.defineProperty(photographer, 'media', {
      value: mediaList,
      writable: true 
    });
    for (medium of media) {
      if (photographer.id == medium.photographerId) {
        mediaList.push(medium);
      }
    }
  }
  getPhotographer(photographers);
  console.log(photographer);
}

function getPhotographers(json) {
  const PHOTOGRAPHERS = json.photographers;
  for (photographer of PHOTOGRAPHERS) {
    photographers.push(photographer);
  }
}

function getMedia(json) {
  const MEDIA = json.media;
  for (medium of MEDIA) {
    media.push(medium);
  }
}

// Récupération de l'id du photographe dans l'url // ___________________________________________________________________

let str = window.location.href;
let url = new URL(str);
let = window.location.search;
let login = url.searchParams.get('id');
console.log(login);

// Récupération du photographe de la page // ___________________________________________________________________________

class Photographer {
  constructor(name, id, city, country, tags, tagline, price, portrait, media) {
    this.name = name,
    this.id = id,
    this.city = city,
    this.country = country,
    this.tags = tags,
    this.tagline = tagline,
    this.price = price,
    this.portrait = portrait,
    this.media = media
  }
  
}
function getPhotographer(photographers) {
  for (let i = 0; i < photographers.length; i++ ) {
    if (photographers[i].id == login) {
      photographer = new Photographer(
        photographers[i].name, 
        photographers[i].id, 
        photographers[i].city, 
        photographers[i].country,
        photographers[i].tags,
        photographers[i].tagline,
        photographers[i].price,
        photographers[i].portrait,
        photographers[i].media,
        );
        folderName(photographers[i]);
        displayPhotographer(photographers[i]);
        testFactory(photographers[i].media);
    }
  }
}
// Récupération du nom du dossier image du photographe // ______________________________________________________________

function folderName(photographer) {
  let name = photographer.name.toLowerCase().replace('-', '_');
  let i = name.indexOf(" ");
  firstName = i == -1 ? name : name.substring(0, i);
  console.log(firstName);
  return firstName;
}

// Affichage de la "carte d'identité" du photographe // ________________________________________________________________

function displayPhotographer() {
  h1.innerHTML = photographer.name;
  pLocation.innerHTML = photographer.city + ', ' + photographer.country;
  pTagline.innerHTML = photographer.tagline;
  let tags = photographer.tags;
  for (tag of tags) {
    listTags.innerHTML += `
    <li class="tags__tag" role="listitem">
      <a class="tags__tag__link" href="index.html#${tag}">#${tag}</a>
    </li>`;
  }
  img.setAttribute("src", `./images/sample_photos/photographers_ID_photos/${photographer.portrait}`);
}

// Affichage des cartes media du photographe // ________________________________________________________________

class MediaFactory {
  constructor() {
    this.createMedia = (type) => {
      let med;
      if (type === 'image') {
        med = new Image();
      } else if (type === 'video') {
        med = new Video();
      }
      // med.card = () => {
      //   return `${this._type} fonctionne`;
      // }
      return med;
    }
  }
}
class Image {
  createAnImageCard() {
    let article = document.createElement('article');
    sectionMedia.appendChild(article);
    article.classList.add('article');
    // DOM élément <figure> - conteneur
    let figure = document.createElement('figure');
    article.appendChild(figure);
    // DOM élément <div> - conteneur du media
    let divMedia = document.createElement('div');
    figure.appendChild(divMedia);
    divMedia.classList.add('article__link');
    // DOM élément <figcaption> - conteneur des informations
    let figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);
    figcaption.classList.add('article__informations');
    // DOM élément <p> - titre de l'image
    let pTitle = document.createElement('p');
    figcaption.appendChild(pTitle);
    pTitle.innerHTML = `${medium.title}`;
    // DOM élément <div> - conteneur prix et likes
    let divLikes = document.createElement('div');
    figcaption.appendChild(divLikes);
    divLikes.classList.add('article__informations__likes');
    // DOM élément <p> - prix
    let pPrice = document.createElement('p');
    divLikes.appendChild(pPrice);
    pPrice.innerHTML = `${medium.price} €`;
    // DOM élément <p> - nombre de likes
    let pNumberLikes = document.createElement('p');
    divLikes.appendChild(pNumberLikes);
    pNumberLikes.innerHTML = `${medium.likes}`;
    // DOM élément <i> - coeur
    let heart = document.createElement('i');
    divLikes.appendChild(heart);
    heart.classList.add('fas', 'fa-heart');
  
    let image = document.createElement('img');
    divMedia.appendChild(image);
    image.setAttribute("src", `./images/sample_photos/${firstName}/${medium.image}`); 
    image.setAttribute("alt", `${medium.title}`);
    image.setAttribute("id", `${medium.id}`);
  }
}
class Video {
  createAVideoCard() {
    let article = document.createElement('article');
    sectionMedia.appendChild(article);
    article.classList.add('article');
    // DOM élément <figure> - conteneur
    let figure = document.createElement('figure');
    article.appendChild(figure);
    // DOM élément <div> - conteneur du media
    let divMedia = document.createElement('div');
    figure.appendChild(divMedia);
    divMedia.classList.add('article__link');
    // DOM élément <figcaption> - conteneur des informations
    let figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);
    figcaption.classList.add('article__informations');
    // DOM élément <p> - titre de l'image
    let pTitle = document.createElement('p');
    figcaption.appendChild(pTitle);
    pTitle.innerHTML = `${medium.title}`;
    // DOM élément <div> - conteneur prix et likes
    let divLikes = document.createElement('div');
    figcaption.appendChild(divLikes);
    divLikes.classList.add('article__informations__likes');
    // DOM élément <p> - prix
    let pPrice = document.createElement('p');
    divLikes.appendChild(pPrice);
    pPrice.innerHTML = `${medium.price} €`;
    // DOM élément <p> - nombre de likes
    let pNumberLikes = document.createElement('p');
    divLikes.appendChild(pNumberLikes);
    pNumberLikes.innerHTML = `${medium.likes}`;
    // DOM élément <i> - coeur
    let heart = document.createElement('i');
    divLikes.appendChild(heart);
    heart.classList.add('fas', 'fa-heart');
  
    let icone = document.createElement('img');
    divMedia.appendChild(icone);
    icone.setAttribute("src", "./images/play.png");
    icone.classList.add('logoPlay');
  
    let video = document.createElement('video');
    divMedia.appendChild(video);
    let source = document.createElement('source');
    video.appendChild(source);
  
    source.setAttribute("src", `./images/sample_photos/${firstName}/${medium.video}`);
    source.setAttribute("alt", `${medium.title}`);
    source.setAttribute("id", `${medium.id}`);
    source.setAttribute("type", "video/mp4");
  }
}
const factory = new MediaFactory();
function testFactory(media) {
  for (medium of media) {
    if (medium.image !== undefined) {
      let card = factory.createMedia('image');
      card.createAnImageCard();
    } else {
      let card = factory.createMedia('video');
      card.createAVideoCard();
    }
  }
}

// Dropdown // _______________________________________________________________________________
let dropDown = document.getElementById('dropdown');
let arrowDown = document.querySelector('.fa-chevron-down');
let arrowUp = document.querySelector('.fa-chevron-up');
let options = document.getElementsByClassName('dropdown__option');
let arrows = document.querySelector('.arrows');

arrows.addEventListener('click', () => drop());
function drop() {
  if (arrowDown.style.display !== 'none') {
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
    options[1].style.display = 'flex';
    options[2].style.display = 'flex';
  } else {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none';
    options[1].style.display = 'none';
    options[2].style.display = 'none';
  }
}