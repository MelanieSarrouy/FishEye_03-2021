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
      displayPhotographer(photographers[i]);
      FactoryMedia(photographers[i].media);
    }
  }
}

// DOM // ______________________________________________________________________________________________________________

const h1 = document.querySelector('h1');
const pLocation = document.querySelector('h1 + p');
const listTags = document.querySelector('.tags');
const pTagline = document.querySelector('#tagline');
const button = document.querySelector('aside > button');
const img = document.querySelector('aside > picture > img');
const sectionMedia = document.querySelector('.media');

// _____________________________________________________________________________________________________________________

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
  folderName();
  console.log(firstName);
}

// ____________________________________________________________________________________________________________________

function folderName() {
  let name = photographer.name.toLowerCase().replace('-', '_');
  let i = name.indexOf(" ");
  firstName = i == -1 ? name : name.substring(0, i);
  return firstName;
}

// ____________________________________________________________________________________________________________________

function FactoryMedia(media) {
  for (medium of media) {
    let string = `${medium.image}`;
    let index = string.indexOf('.jpg');
    if (index !== -1) {
      makeAPictureCard(medium);
    } else {
      makeAVideoCard(medium);
    }
  }
}

function makeAVideoCard(medium) {
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
  image.setAttribute("src", "./images/play.png");
  image.classList.add('logoPlay');
  let video = document.createElement('video');
  divMedia.appendChild(video);
  let source = document.createElement('source');
  video.appendChild(source);
  console.log(medium);

  source.setAttribute("src", `./images/sample_photos/${firstName}/${medium.video}`);
  source.setAttribute("alt", `${medium.title}`);
  source.setAttribute("id", `${medium.id}`);
  source.setAttribute("type", "video/mp4");
}

function makeAPictureCard(medium) {
  // DOM élément <article>
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

