// Requête objet JSON __________________________________________________________________________________________________
const source = "./data.json";

function myFetch() {
  fetch(source).then((res) => {
    if (res.ok) {
      return res.json().then((json) => {
        getPhotographersWithMedia(json)
      });
    } else {
      console.log("erreur");
    }
  });
}
myFetch();
// Récupération des données // _________________________________________________________________________________________
// Déclaration des variables //
let photographers = [];
let media = [];

// Fonctions de récupération des données utiles //
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

let photographer;

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
        photographers[i].media);
      console.log(photographer);
      folderName(photographer);
      displayPhotographer(photographer);
    }
  }
}
// DOM // ______________________________________________________________________________________________________________
const aside = document.querySelector('.photographer');
const divInfos = document.querySelector('aside > div');
const h1 = document.querySelector('h1');
const pName = document.querySelector('h1 + p');
const pLocation = document.querySelector('#location');
const listTags = document.querySelector('.tags');
const pTagline = document.querySelector('#tagline');
const button = document.querySelector('aside > button');
const picture = document.querySelector('aside > div > picture');
const img = document.querySelector('aside > picture > img');

const divFilters = document.querySelector('.filters');
const sortTitle = document.querySelector('.filters > p');
const dropdown = document.querySelector('.dropdown');
const filters = document.querySelectorAll('.dropdown > span')

const sectionMedia = document.querySelector('.media');

// _____________________________________________________________________________________________________________________
function folderName() {
  let name = photographer.name.toLowerCase().replace('-', '_');
  let i = name.indexOf(" ");
  firstName = i == -1 ? name : name.substring(0, i);
  return firstName;
}
function displayPhotographer() {
  h1.innerHTML = photographer.name;
  pName.innerHTML = photographer.city + ', ' + photographer.country;
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

  let media = photographer.media;
  for (medium of media) {
    creataAMediaCard(media);
  }
  console.log(photographer.media[0].image);
}

function creataAMediaCard(media) { 
  let article = document.createElement('article');
  sectionMedia.appendChild(article);
  article.classList.add('article');
  let image = document.createElement('img');
  image.setAttribute("src", `./images/sample_photos/${firstName}/${medium.image}`);
  let anchor = document.createElement('a');
  anchor.appendChild(image);
  anchor.classList.add('article__link');
  article.appendChild(anchor);
  let divCaption = document.createElement('div');
  article.appendChild(divCaption);
  let pTitle = document.createElement('p');
  divCaption.appendChild(pTitle);
  pTitle.innerHTML = "Titre de l'image";
  let pPrice = document.createElement('p');
  divCaption.appendChild(pPrice);
  pPrice.innerHTML = `${medium.price} €`;
  let divLikes = document.createElement('div');
  divCaption.appendChild(divLikes);
  let pNumberLikes = document.createElement('p');
  divLikes.appendChild(pNumberLikes);
  pNumberLikes.innerHTML = `${medium.likes}`;
  let heart = document.createElement('i');
  divLikes.appendChild(heart);
  heart.classList.add('fas', 'fa-heart');
  divCaption.classList.add('article__informations');
  divLikes.classList.add('article__informations__likes');

}
