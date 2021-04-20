// DOM // ______________________________________________________________________________________________________________

const h1 = document.querySelector('h1');
const pLocation = document.querySelector('h1 + p');
const listTags = document.querySelector('.tags');
const pTagline = document.querySelector('#tagline');
const button = document.querySelector('aside > button');
const img = document.querySelector('aside > picture > img');
const sectionMedia = document.querySelector('.media');
const rate = document.querySelector('.infos__price');
const totalLikesNb = document.querySelector('.infos__likes__number');
const modal = document.querySelector('.modal-background');
const contact = document.querySelector('.button__contact');
const contactTitle = document.querySelector('.modal__title');
const closeContact = document.querySelector('#closeModal');
const main = document.getElementById('main2');
const blocPage = document.querySelector('.bloc_page-photographer');

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
let login = url.searchParams.get('id');

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
  nickName = i == -1 ? name : name.substring(0, i);
  return nickName;
}

// Affichage de la "carte d'identité" du photographe // ________________________________________________________________

function displayPhotographer() {
  h1.innerHTML = photographer.name;
  pLocation.innerHTML = photographer.city + ', ' + photographer.country;
  pTagline.innerHTML = photographer.tagline;
  let tags = photographer.tags;
  rate.innerHTML = photographer.price + ' € / jour';
  for (tag of tags) {
    listTags.innerHTML += `
    <li class="tags__tag" role="listitem">
      <a class="tags__tag__link" href="index.html#${tag}">#${tag}</a>
    </li>`;
  }
  img.setAttribute("src", `./images/sample_photos/photographers_ID_photos/small/${photographer.portrait}`);
  img.setAttribute('alt', `portrait du photographe ${photographer.name}`);
  img.setAttribute('width', `200`);
  img.setAttribute('height', `200`);
  contactTitle.innerHTML = `Contactez-moi </br>${photographer.name}`;
  totalLikes(photographer.media);
}
function totalLikes(media) {
  let number = 0;
  for (let i = 0; i < media.length; i++) {
    number += media[i].likes;
  }
  totalLikesNb.innerHTML = number;
}
// Display medias - FACTORY METHOD // __________// Display medias - FACTORY METHOD // ______________________________________________________

class MediaFactory {
  constructor() {
    this.createMedia = (type) => {
      createDOMElements();
      // likes(medium);
      let med;
      if (type === 'image') {
        med = new Image();
      } else if (type === 'video') {
        med = new Video();
      }
      return med;
    }
  }
}
class Image {
  createAnImageCard() {
    let anchorMedia = document.getElementById(`idImage${medium.id}`);
    let image = document.createElement('img');
    anchorMedia.appendChild(image);
    anchorMedia.setAttribute('href', `./images/sample_photos/${nickName}/${medium.image}`);

    image.setAttribute("src", `./images/sample_photos/${nickName}/light/${medium.image}`); 
    image.setAttribute("alt", `${medium.alt}`);
    image.setAttribute("id", `id${medium.id}`);
    image.setAttribute('width', `350`);
    image.setAttribute('height', `300`);
  
  }
}
class Video {
  createAVideoCard() {
    let anchorMedia = document.getElementById(`idImage${medium.id}`)
    let icone = document.createElement('img');
    anchorMedia.appendChild(icone);
    anchorMedia.setAttribute('href', `./images/sample_photos/${nickName}/${medium.video}`);

    icone.setAttribute("src", "./images/play.png");
    icone.classList.add('logoPlay');
    let image = document.createElement('img');
    anchorMedia.appendChild(image);
    let captureImage = medium.video.replace('mp4', 'jpg');
    image.setAttribute("src", `./images/sample_photos/${nickName}/light/${captureImage}`); 
    image.setAttribute("alt", `Video ${medium.alt}`);
    image.setAttribute("id", `id${medium.id}`);
    image.setAttribute('width', `350`);
    image.setAttribute('height', `300`);
  }
}
const factory = new MediaFactory();
function testFactory(media) {
  sectionMedia.innerHTML = '';
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
function createDOMElements() {
  let article = document.createElement('article');
  sectionMedia.appendChild(article);
  article.classList.add('article');
  article.setAttribute('id', `${medium.id}`);
  // DOM élément <figure> - conteneur
  let figure = document.createElement('figure');
  article.appendChild(figure);
  // DOM élément <div> - conteneur du media
  let anchorMedia = document.createElement('a');
  figure.appendChild(anchorMedia);
  anchorMedia.classList.add('article__link');
  anchorMedia.setAttribute('id', `idImage${medium.id}`)

  anchorMedia.addEventListener('click', (e) => lightbox(e)); 

  let figcaption = document.createElement('figcaption');
  figure.appendChild(figcaption);
  figcaption.classList.add('article__informations');
  // DOM élément <p> - titre de l'image
  let pTitle = document.createElement('p');
  figcaption.appendChild(pTitle);
  pTitle.innerHTML = `${medium.alt}`;
  pTitle.setAttribute('id', `title${medium.id}`);
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
  pNumberLikes.innerHTML = medium.likes;
  pNumberLikes.setAttribute('id', `likes${medium.id}`);
  pNumberLikes.classList.add('likes');
  // DOM élément <i> - coeur
  let heart = document.createElement('i');
  divLikes.appendChild(heart);
  heart.classList.add('heart', 'fas', 'fa-heart');
  heart.setAttribute('id', `heart${medium.id}`);
  // heart.setAttribute('onclick', `addLikes(medium)`);
  heart.addEventListener('click', () => addLikes());
}

// LIKES // ________// LIKES //__________// LIKES //________// LIKES //______________// LIKES //_________________________________________

function addLikes() {
  if (document.addEventListener) {
    let heart = window.event.target;
    let idHeart = heart.getAttribute('id');
    let idLikes = idHeart.replace('heart', 'likes');
    let number = document.getElementById(idLikes);
    let numberOfLikes = parseInt(number.textContent, 10);
    let totalLikes = parseInt(totalLikesNb.textContent, 10);
    if ( heart.classList.contains('heart') == true ) {
      heart.classList.toggle('heart');
      numberOfLikes++;
      totalLikes++;
      number.innerHTML = numberOfLikes;
      totalLikesNb.innerHTML = totalLikes;
    } else {
      heart.classList.toggle('heart');
      numberOfLikes--;
      totalLikes--;
      number.innerHTML = numberOfLikes;
      totalLikesNb.innerHTML = totalLikes;
    }
  }
}

// LIGHTBOX // ___________// LIGHTBOX // _____________// LIGHTBOX // _______________// LIGHTBOX // _____________________________________
let lightBox = document.querySelector('.lightbox'); // la lightbox
let ulMedias = document.querySelector('.lightbox__container'); // le conteneur d'image de la lightbox
let body = document.querySelector('.bodyPhotographer');
let anchorMedia = document.querySelectorAll('article__link');
let closeLightbox = document.getElementById('closeLightbox'); // le bouton de fermeture de la lightbox
let prev = document.getElementById('left'); // bouton "précédent"
let next = document.getElementById('right'); // buoton "suivant"


let carouselInterval;

function lightbox(e) {
  e.preventDefault();
  ulMedias.innerHTML = '';
  lightBox.style.display = 'flex';
  lightBox.setAttribute('aria-hidden', 'false');
  main2.setAttribute('aria-hidden', 'true');
  let picture = window.event.target;
  let divMedia = picture.parentNode;
  let idDivMedia = divMedia.getAttribute('id');
  let id = idDivMedia.replace('idImage', '');
  let media = photographer.media;
  body.classList.add('no-scroll');

  for (med of media) {
    FactoryLightbox(med);
  }
  let items = Array.from(document.querySelectorAll('.lightbox-item'));
  items.forEach((item) => {
    item.classList.add(`item-${items.indexOf(item)}`);
  })
  let currentItem = document.getElementById(`item${id}`);
  let position;
  researchPosition(currentItem);
  currentItem.style.display = 'flex';
  currentItem.setAttribute('aria-hidden', 'false');
  next.addEventListener('click', () => goToNextSlide(items));
  prev.addEventListener('click', () => goToPreviousSlide(items));
}
function researchPosition(currentItem) {
  let cName = currentItem.className;
  let i = cName.lastIndexOf("-");
  position = cName.substr(i+1);
  return position;
}
function goToNextSlide(items) {
  if (position + 1 >=  items.length) {
      const lastItem = document.querySelector(`.item-${position}`);
      position = 0;
      const currentItem = document.querySelector(`.item-${position}`);
      setNodeAttributes(lastItem, currentItem);
  } else {
      position += 1;
      const lastItem = document.querySelector(`.item-${position - 1}`);
      const currentItem = document.querySelector(`.item-${position}`);
      setNodeAttributes(lastItem, currentItem);
  }
}
function goToPreviousSlide(items) {
  console.log(position);

  if (position - 1 >= 0) {
      position -= 1;
      const currentItem = document.querySelector(`.item-${position}`);
      const lastItem = document.querySelector(`.item-${position + 1}`);
      setNodeAttributes(lastItem, currentItem);

  } else {
      const lastItem = document.querySelector(`.item-${position}`);
      position = items.length - 1;
      const currentItem = document.querySelector(`.item-${position}`);
      setNodeAttributes(lastItem, currentItem);
  }
}
const setNodeAttributes = (lastItem, currentItem) => {
  lastItem.style.display = 'none';
  currentItem.style.display = 'flex';
  lastItem.setAttribute('aria-hidden', 'true');
  currentItem.setAttribute('aria-hidden', 'false');
}
class LightboxFactory {
  constructor() {
    this.createPicture = (type) => {
      let med;
      if (type === 'image') {
        med = new ImageLightbox();
      } else if (type === 'video') {
        med = new VideoLightbox();
      }
      return med;
    }
  }
}
class ImageLightbox {
  createAnImage(media) {
    let li = document.createElement('li');
    li.classList.add('lightbox-item');
    li.style.display = 'none';
    li.setAttribute('id', `item${media.id}`);
    li.setAttribute('aria-hidden', 'true');
    ulMedias.appendChild(li);
    let figure = document.createElement('figure');
    figure.classList.add('figureLightbox');
    li.appendChild(figure);
    let image = document.createElement('img');
    figure.appendChild(image);
    image.setAttribute('src', `../images/sample_photos/${nickName}/${media.image}`)
    image.classList.add('imageLightbox');
    let figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);
    figcaption.classList.add('titleLightbox');
    figcaption.innerText = `${media.alt}`;
  }
}
class VideoLightbox {
  createAVideo(media) {
    let li = document.createElement('li');
    li.classList.add('lightbox-item');
    li.style.display = 'none';
    li.setAttribute('id', `item${media.id}`);
    li.setAttribute('aria-hidden', 'true');
    ulMedias.appendChild(li);
    let video = document.createElement('video');
    li.appendChild(video);
    video.setAttribute('controls', 'true');
    video.setAttribute('width', '1050');
    video.classList.add('videoLightbox');
    let source = document.createElement('source');
    video.appendChild(source);
    source.setAttribute('src', `./images/sample_photos/${nickName}/${media.video}`);
    source.setAttribute('alt', `${media.alt}`);
    source.setAttribute("id", `video${media.id}`);
    source.setAttribute("type", "video/mp4");
    source.classList.add('imageLightbox');
    let pInfos = document.createElement('p');
    li.appendChild(pInfos);
    pInfos.classList.add('titleLightbox');
    pInfos.innerText = `${media.alt}`;
  }
}
const factoryLigthbox = new LightboxFactory();
function FactoryLightbox(media) {
  if (media.image !== undefined) {
    let picture = factoryLigthbox.createPicture('image');
    picture.createAnImage(media);
  } else {
    let picture = factoryLigthbox.createPicture('video');
    picture.createAVideo(media);
  }
}

closeLightbox.addEventListener('click', () => closeBox());
document.addEventListener('keyup', (e) => onKeyUp(e));
function onKeyUp(e) {
  let keynum;
  if (window.event) {
    keynum = e.keyCode;
  } else if (e.which) {
    keynum = e.which
  } if (keynum == 27) {
    closeBox();
  } if (keynum == 39) {
    goToNextSlide();
  } if (keynum == 37) {
    goToPreviousSlide();
  }
}
function closeBox() {
  lightBox.style.display = 'none';
  lightBox.setAttribute('aria-hidden', 'true');
  main2.setAttribute('aria-hidden', 'false');
  body.classList.remove('no-scroll');
  document.removeEventListener('keyup', onKeyUp);
}

// DROPDOWN // _____// DROPDOWN //__________// DROPDOWN //________// DROPDOWN //________________________________________________________

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

// TRI // _______// TRI //______// TRI //_________// TRI //__________// TRI //____________// TRI //______________________________________________

// popularité ________________________________________________________________________ 
let popularity = document.getElementById('option1');
popularity.addEventListener('click', () => popularitySort(photographer.media));
function popularitySort(media) {
  function tri(a,b) {
    return ((a.likes < b.likes) ? 1 : (a.likes == b.likes) ? 0 : -1);
  }
  media.sort(tri);
  testFactory(media);
// date ________________________________________________________________________ 
}
let date = document.getElementById('option2');
date.addEventListener('click', () => dateSort(photographer.media));
function dateSort(media) {
  function tri(a,b) {
    dateA = new Date(a.date);
    dateB = new Date(b.date);
    return ((dateA < dateB) ? 1 : (dateA == dateB) ? 0 : -1);
  }
  media.sort(tri);
  testFactory(media);
}
// titre ________________________________________________________________________ 
let title = document.getElementById('option3');
title.addEventListener('click', () => titleSort(photographer.media));
function titleSort(media) {
  function tri(a,b) {
    titleA = a.title.split(" ").join('');
    a = titleA.toLowerCase();
    titleB = b.title.split(" ").join('');
    b = titleB.toLowerCase();
    return (a < b) ? -1 : 1;
  }
  media.sort(tri);
  testFactory(media);
}

// MODALE // _____// MODALE //_______// MODALE //______// MODALE // _________________________________

contact.addEventListener('click', () => launchModal());

function launchModal() {
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  contact.style.display = 'none';
  main2.setAttribute('aria-hidden', 'true');
}

closeContact.addEventListener('click', () => closeModal());
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true')
  contact.style.display = 'block';
  main2.setAttribute('aria-hidden', 'false');
}

// function testFirstName ______________________________________________
const formData = document.getElementsByClassName("modal__form__formData"); // Toutes les div formData avec input
const pErrorFirstName = document.createElement("p"); // creation du p error FirstName
const pErrorLastName = document.createElement("p"); // creation du p error LastName
const pErrorEmail = document.createElement("p"); // creation du p error Email
const pErrorMessage = document.createElement("p"); // creation du p error Message
const firstName = document.getElementById("firstname"); // ajout input firstname dans le DOM
const lastName = document.getElementById("lastname"); // ajout input lastname dans le DOM
const eMail = document.getElementById("email"); // ajout input email dans le DOM
let goButton = document.getElementById("button"); // bouton validation
const form = document.getElementById("form"); // le formulaire
const message = document.getElementById('message');


formData[0].appendChild(pErrorFirstName);
pErrorFirstName.classList.add("pError");
let regexFirstName = /^[a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ]+([ \-'][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ]+)?$/;

firstName.addEventListener("blur", testFirstName);
goButton.addEventListener("mousedown", testFirstName);

function testFirstName() {
  if ((firstName.value.length < 2) || 
     (firstName.value.length >= 30) ||
     (!regexFirstName.test(firstName.value)) || 
     (firstName.value == "")) {
    firstName.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorFirstName.textContent = "Veuillez saisir votre prénom (min 2 caractères)"; // message d'erreur sur paragraphe pError;
    firstName.addEventListener("input", testFirstName);
    return false;
  } else {
    firstName.classList.remove("inputError");
    pErrorFirstName.textContent = "";
    return true;
  }
}
// function testLastName _______________________________________________

formData[1].appendChild(pErrorLastName);
pErrorLastName.classList.add("pError");
let regexLastName = regexFirstName;

lastName.addEventListener("blur", testLastName);
goButton.addEventListener("mousedown", testLastName);

function testLastName() {
  if ((lastName.value.length < 2) || 
     (lastName.value.length >= 30) ||
     (!regexLastName.test(lastName.value)) || 
     (lastName.value == "")) {
    lastName.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorLastName.textContent = "Veuillez saisir votre nom (min 2 caractères)"; // message d'erreur sur paragraphe pError;
    lastName.addEventListener("input", testLastName);
    return false;
  } else {
    lastName.classList.remove("inputError");
    pErrorLastName.textContent = "";
    return true;
  }
}
// function testEmail __________________________________________________
formData[2].appendChild(pErrorEmail);
pErrorEmail.classList.add("pError");
let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eMail.addEventListener("blur", testEmail);
goButton.addEventListener("mousedown", testEmail);

function testEmail() {
  if ((eMail.value.length < 5) || 
     (eMail.value.length >= 30) ||
     (!regexEmail.test(eMail.value)) || 
     (eMail.value == "")) {
    eMail.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorEmail.textContent = "Adresse mail incorrecte"; // message d'erreur sur paragraphe pError;
    eMail.addEventListener("input", testEmail);
    return false;
  } else {
    eMail.classList.remove("inputError");
    pErrorEmail.textContent = "";
    return true;
  }
}
// function testMessage __________________________________________________
formData[3].appendChild(pErrorMessage);
pErrorMessage.classList.add("pError");

message.addEventListener("blur", testMessage);
goButton.addEventListener("mousedown", testMessage);

function testMessage() {
  if (/*(message.value.length < 20) || 
     (message.value.length >= 250) ||
     */(message.value == "")) {
    message.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorMessage.textContent = "Veuillez saisir votre message"; // message d'erreur sur paragraphe pError;
    message.focus();
    return false;
  } else {
    message.classList.remove("inputError");
    pErrorMessage.textContent = "";
    return true;
  }
}

// function submit __________________________________________________
// form.addEventListener("submit", validate);

function validate() {
  if ((testFirstName() === true) && 
      (testLastName() === true) && 
      (testEmail() === true) && 
      (testMessage() === true)) {
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(eMail.value);
    console.log(message.value);
    goButton.addEventListener("click", closeModal);    
    closeModal();
    return false;
  }
}
// UP // ________// UP // _________// UP // _________// UP // _________// UP // _________// UP // ________________________________________

const scroll = document.querySelector('.up');
let y = window.scrollY;
window.addEventListener('scroll', () => content());
function content() {
  if ( window.scrollY > 250 ) {
    scroll.style.display = 'block';
  } else {
    scroll.style.display = 'none';
  }
}