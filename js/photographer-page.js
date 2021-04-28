// DOM // ______________________________________________________________________________________________________________

const h1 = document.querySelector('h1');
const pLocation = document.querySelector('#location');
const listTags = document.querySelector('.tags');
const pTagline = document.querySelector('#tagline');
const button = document.querySelector('aside > button');
const img = document.querySelector('.photographer__picture__img');
const sectionMedia = document.querySelector('.media');
const rate = document.querySelector('.infos__price');
const totalLikesNb = document.querySelector('.infos__likes__number');
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
const contact = document.querySelector('.button__contact');
const contactTitle = document.querySelector('.modal__title');
const closeContact = document.querySelector('#closeModal');
const main = document.getElementById('main2');
const blocPage = document.querySelector('.bloc_page-photographer');
const aside = document.querySelector('.photographer');
const header = document.querySelector('.header2');
let body = document.querySelector('.bodyPhotographer');

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

function title(alt) {
  let str = alt;
  let i = str.indexOf(':');
  titre = i == -1 ? str : str.substring(0, i);
  return titre;
}

// Affichage de la "carte d'identité" du photographe // ________________________________________________________________

function displayPhotographer() {
  h1.innerHTML = photographer.name;
  h1.setAttribute('aria-label', `${photographer.name}`);
  pLocation.innerHTML = photographer.city + ', ' + photographer.country;
  pTagline.innerHTML = photographer.tagline;
  let tags = photographer.tags;
  rate.innerHTML = photographer.price + ' € / jour';
  for (tag of tags) {
    listTags.innerHTML += `
    <li class="tags__tag" role="listitem">
      <a class="tags__tag__link" href="index.html#${tag}" aria-label="tag ${tag}">#${tag}</a>
    </li>`;
  }
  img.setAttribute("src", `./images/sample_photos/photographers_ID_photos/small/${photographer.portrait}`);
  img.setAttribute('alt', `portrait du photographe ${photographer.name}`);
  img.setAttribute('width', `200`);
  img.setAttribute('height', `200`);
  contactTitle.innerHTML = `Contactez-moi </br>${photographer.name}`;
  totalLikes(photographer.media);
}

// Calcul et affichage du total des "Likes" // ________________________________________________________________

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
    anchorMedia.setAttribute('href', `javascript:void(0);`);
    image.setAttribute("src", `./images/sample_photos/${nickName}/light/${medium.image}`); 
    image.setAttribute("alt", `${titre}`);
    image.setAttribute("id", `id${medium.id}`);
    image.setAttribute("aria-label", `ouverture de la lightbox, image en plan rapproché de ${titre}`);
    image.setAttribute('width', `350`);
    image.setAttribute('height', `300`);
    image.setAttribute('tabindex', `-1`);

    anchorMedia.addEventListener('click', (e) => lightbox(e)); 
  }
  createAnImage() {
    let li = document.createElement('li');
    li.classList.add('lightboxItem');
    li.style.display = 'none';
    li.setAttribute('id', `item${medium.id}`);
    li.setAttribute('aria-hidden', 'true');
    ulMedias.appendChild(li);
    let figure = document.createElement('figure');
    figure.classList.add('figureLightbox');
    figure.setAttribute('role', 'figure');
    figure.setAttribute('aria-label', `${titre}`);
    li.appendChild(figure);
    let image = document.createElement('img');
    figure.appendChild(image);
    image.setAttribute('src', `./images/sample_photos/${nickName}/${medium.image}`)
    image.setAttribute('alt', `${medium.alt}`);
    image.classList.add('imageLightbox');
    let figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);
    figcaption.classList.add('titleLightbox');
    figcaption.innerText = `${titre}`;
  }
}
class Video {
  createAVideoCard() {
    let anchorMedia = document.getElementById(`idImage${medium.id}`)
    let icone = document.createElement('img');
    anchorMedia.appendChild(icone);
    anchorMedia.setAttribute('href', `javascript:void(0);`);
    icone.setAttribute("src", "./images/play.png");
    icone.classList.add('logoPlay');
    icone.setAttribute('alt', '');
    icone.setAttribute('tabindex', `-1`);
    let image = document.createElement('img');
    anchorMedia.appendChild(image);
    let captureImage = medium.video.replace('mp4', 'jpg');
    image.setAttribute("src", `./images/sample_photos/${nickName}/light/${captureImage}`); 
    image.setAttribute("alt", `${titre}`);
    image.setAttribute("id", `id${medium.id}`);
    image.setAttribute("aria-label", `ouverture de la lightbox, video de ${titre}`);
    image.setAttribute('width', `350`);
    image.setAttribute('height', `300`);
    image.setAttribute('tabindex', `-1`);
    anchorMedia.addEventListener('click', (e) => lightbox(e)); 
  }
  createAVideo() {
    let li = document.createElement('li');
    li.classList.add('lightboxItem');
    li.style.display = 'none';
    li.setAttribute('id', `item${medium.id}`);
    li.setAttribute('aria-hidden', 'true');
    ulMedias.appendChild(li);
    let video = document.createElement('video');
    li.appendChild(video);
    video.setAttribute('controls', 'true');
    video.setAttribute('width', '1050');
    video.classList.add('videoLightbox');
    let source = document.createElement('source');
    video.appendChild(source);
    source.setAttribute('src', `./images/sample_photos/${nickName}/${medium.video}`);
    source.setAttribute('alt', `${medium.alt}`);
    source.setAttribute("id", `video${medium.id}`);
    source.setAttribute("type", "video/mp4");
    source.classList.add('imageLightbox');
    let pInfos = document.createElement('p');
    let divControls = document.createElement('div');
    li.appendChild(divControls);
    divControls.setAttribute('id', 'video-controls');
    divControls.classList.add('controls');
    divControls.setAttribute('data-state', 'hidden');
    divControls.appendChild(pInfos);
    let playButton = document.createElement('button');
    divControls.appendChild(playButton);
    playButton.setAttribute('id', 'playpause');
    playButton.setAttribute('type', 'button');
    playButton.setAttribute('role', 'button');
    playButton.setAttribute('aria-label', 'lecture ou pause');
    playButton.setAttribute('data-state', 'play');
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    pInfos.classList.add('titleLightbox');
    pInfos.innerText = `${titre}`;
  }
}

const factory = new MediaFactory();

function testFactory(media) {
  sectionMedia.innerHTML = '';

  for (medium of media) {
    let titre = title(medium.alt);
    if (medium.image !== undefined) {
      let card = factory.createMedia('image');
      card.createAnImageCard();
      card.createAnImage();
    } else {
      let card = factory.createMedia('video');
      card.createAVideoCard();
      card.createAVideo();
    }
  }
  let allItems = document.querySelectorAll('.lightboxItem');
  let items = Array.from(allItems);
  items.forEach((item) => {
    item.classList.add(`item-${items.indexOf(item)}`);
  });
}

function createDOMElements() {
  let article = document.createElement('article');
  sectionMedia.appendChild(article);
  article.classList.add('article');
  article.setAttribute('id', `${medium.id}`);
  // DOM élément <figure> - conteneur
  let figure = document.createElement('figure');
  article.appendChild(figure);
  figure.setAttribute('role', 'figure');
  figure.setAttribute('aria-labelledby', `title${medium.id}`);
  // DOM élément <div> - conteneur du media
  let anchorMedia = document.createElement('a');
  figure.appendChild(anchorMedia);
  anchorMedia.classList.add('article__link');
  anchorMedia.setAttribute('id', `idImage${medium.id}`);
  anchorMedia.setAttribute('aria-labelledby', `lightbox`);
  let figcaption = document.createElement('figcaption');
  figure.appendChild(figcaption);
  figcaption.classList.add('article__informations');
  // DOM élément <p> - titre de l'image
  let pTitle = document.createElement('p');
  figcaption.appendChild(pTitle);
  // title(medium.alt);
  pTitle.innerHTML = `${titre}`;
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
  let buttonHeart = document.createElement('button');
  divLikes.append(buttonHeart);
  let heart = document.createElement('i');
  buttonHeart.appendChild(heart);
  buttonHeart.classList.add('buttonHeart');
  buttonHeart.setAttribute('role', `button`);

  heart.classList.add('heart', 'fas', 'fa-heart');
  heart.setAttribute('id', `heart${medium.id}`);
  buttonHeart.setAttribute('aria-label', `coeur, ajouter, enlever 1 like`);

  anchorMedia.setAttribute('tabindex', `0`);

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

let lightBoxBg = document.querySelector('.lightbox-background'); // lightbox background
let ulMedias = document.querySelector('.lightbox__container'); // le conteneur d'image de la lightbox
let anchorMedia = document.querySelectorAll('article__link');
let closeLightbox = document.getElementById('closeLightbox'); // le bouton de fermeture de la lightbox
let prev = document.getElementById('left'); // bouton "précédent"
let next = document.getElementById('right'); // bouton "suivant"
let position;
let lightBox = document.querySelector('.lightbox-content');


function lightbox(e) {
  e.preventDefault();
  body.classList.add('no-scroll');
  lightBoxBg.style.display = 'flex';
  lightBoxBg.setAttribute('aria-hidden', 'false');
  main2.setAttribute('aria-hidden', 'true');
  lightBox.setAttribute('tabindex', '0');
  let picture = window.event.target;
  let id = searchId(picture);
  let firstItem = document.getElementById(`item${id}`);
  researchPosition(firstItem);
  console.log(position);
  firstItem.style.display = 'flex';
  firstItem.setAttribute('aria-hidden', 'false');
  let myVideo = document.querySelector('.videoLightbox');
  let playPause = document.getElementById('playpause');
  myVideo.setAttribute('controls', 'false');
  playPause.addEventListener('click', () => switchState());
}
function switchState() {
  let myVideo = document.querySelector('.videoLightbox');
  let playPause = document.getElementById('playpause');
  if (myVideo.paused == true) {
    myVideo.play();
    playPause.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    myVideo.pause();
    playPause.innerHTML = '<i class="fas fa-play"></i>';
  }
}
document.addEventListener('keydown', (e) => {
  const keyCode = e.code;
  if (keyCode === 'Space') {
    switchState();
  }
})


function searchId(picture) {
  if (picture.tagName !== 'A') {
    let divMedia = picture.parentNode;
    let idDivMedia = divMedia.getAttribute('id');
    let id = idDivMedia.replace('idImage', '');
    return id;
  } else {
    let idDivMedia = picture.getAttribute('id');
    let id = idDivMedia.replace('idImage', '');
    return id;
  }
}
next.addEventListener('click', () => goToNextSlide());
prev.addEventListener('click', () => goToPreviousSlide());

document.addEventListener('keydown', (e) => {
  const keyCode = e.key;
  if (keyCode === 'ArrowRight') {
    goToNextSlide();
  } else if (keyCode === 'ArrowLeft') {
    goToPreviousSlide();
  } 
})

function researchPosition(firstItem) {
  let cName = firstItem.className;
  let i = cName.lastIndexOf("-");
  let positionString = cName.substr(i+1);
  position = parseInt(positionString);
  return position;
}
function goToNextSlide() {
  let items = document.querySelectorAll('.lightboxItem');
  let total = items.length - 1;
  if (position < total ) {
    const lastItem = document.querySelector(`.item-${position}`);
    position++;
    const currentItem = document.querySelector(`.item-${position}`);
    setNodeAttributes(lastItem, currentItem);
  } else if (position === total) {
    const lastItem = document.querySelector(`.item-${position}`);
    position = 0;
    const currentItem = document.querySelector(`.item-${position}`);
    setNodeAttributes(lastItem, currentItem);
  }
}
function goToPreviousSlide() {
  let items = document.querySelectorAll('.lightboxItem');
  let total = items.length - 1;
  if (position - 1 >= 0) {
      position -= 1;
      const currentItem = document.querySelector(`.item-${position}`);
      const lastItem = document.querySelector(`.item-${position + 1}`);
      setNodeAttributes(lastItem, currentItem);
  } else {
      const lastItem = document.querySelector(`.item-${position}`);
      position = total;
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

// Fermeture de la lightbox --------------------------------
closeLightbox.addEventListener('click', () => closeBox());
document.addEventListener('keydown', (e) => onKeyUp(e));

function onKeyUp(e) {
  let keynum = e.key;
  if (keynum == 'Escape') {
    closeBox();
  }
}

function closeBox() {
  lightBoxBg.style.display = 'none';
  lightBoxBg.setAttribute('aria-hidden', 'true');
  main2.setAttribute('aria-hidden', 'false');
  body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onKeyUp);
  lightBox.setAttribute('tabindex', '-1');

  
  let allItems = document.querySelectorAll('.lightboxItem');
  let items = Array.from(allItems);
  items.forEach((item) => {
    item.setAttribute('aria-hidden', 'true');
    item.style.display = 'none';
  });
}

// DROPDOWN // _____// DROPDOWN //__________// DROPDOWN //________// DROPDOWN //________________________________________________________

let dropDown = document.getElementById('container');
let down = document.querySelector('#button-dropdown');
let up = document.querySelector('#button-dropup');
let popularity = document.getElementById('option1');
let date = document.getElementById('option2');
let tiTre = document.getElementById('option3');

down.addEventListener('click', () => openDropdown());

function openDropdown() {
  dropDown.style.display = 'flex';
  popularity.focus();
}
up.addEventListener('click', () => closeDropdown());

function closeDropdown() {
  dropDown.style.display = 'none';
  down.focus();
}

// TRI // _______// TRI //______// TRI //_________// TRI //__________// TRI //____________// TRI //______________________________________________

// popularité ________________________________________________________________________ 
popularity.addEventListener('click', () => popularitySort(photographer.media));
popularity.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    popularitySort(photographer.media);
  }
})
function popularitySort(media) {
  function tri(a,b) {
    return ((a.likes < b.likes) ? 1 : (a.likes == b.likes) ? 0 : -1);
  }
  media.sort(tri);
  testFactory(media);
// date ________________________________________________________________________ 
}
date.addEventListener('click', () => dateSort(photographer.media));
date.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    dateSort(photographer.media);
  }
})
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
tiTre.addEventListener('click', () => titleSort(photographer.media));
tiTre.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    titleSort(photographer.media);
  }
})
function titleSort(media) {
  function tri(a,b) {
    titleA = a.alt.split(" ").join('');
    a = titleA.toLowerCase();
    titleB = b.alt.split(" ").join('');
    b = titleB.toLowerCase();
    return (a < b) ? -1 : 1;
  }
  media.sort(tri);
  testFactory(media);
}

// DOM pour modale ______________________________________________

const pErrorFirstName = document.getElementById("message-firstname"); // creation du p error FirstName
const pErrorLastName = document.getElementById("message-lastname"); // creation du p error LastName
const pErrorEmail = document.getElementById("message-email"); // creation du p error Email
const pErrorMessage = document.getElementById("message-message"); // creation du p error Message
const formData = document.getElementsByClassName("modal__form__formData"); // Toutes les div formData avec input
const firstName = document.getElementById("firstname"); // ajout input firstname dans le DOM
const lastName = document.getElementById("lastname"); // ajout input lastname dans le DOM
const eMail = document.getElementById("email"); // ajout input email dans le DOM
let goButton = document.getElementById("button"); // bouton validation
const form = document.getElementById("form"); // le formulaire
const message = document.getElementById('message');
formData[0].appendChild(pErrorFirstName);
formData[1].appendChild(pErrorLastName);
formData[2].appendChild(pErrorEmail);
formData[3].appendChild(pErrorMessage);

// MODALE // _____// MODALE //_______// MODALE //______// MODALE // _________________________________

contact.addEventListener('click', () => launchModal());

function launchModal() {
  modalBg.style.display = 'block';
  modalBg.setAttribute('aria-hidden', 'false');
  contact.style.display = 'none';
  main2.setAttribute('aria-hidden', 'true');
  body.classList.add('no-scroll');
  modal.focus();
  modal.setAttribute('tabindex', '0');
}

closeContact.addEventListener('click', () => closeModal());
document.addEventListener('keydown', (e) => onKey(e));
// Gestion de la lightbox au clavier -----------------------
function onKey(e) {
  let keynum = e.key;
  if (keynum == 'Escape') {
    // closeBox();
    closeModal();
  }
}

function closeModal() {
  modalBg.style.display = 'none';
  modalBg.setAttribute('aria-hidden', 'true')
  contact.style.display = 'block';
  main2.setAttribute('aria-hidden', 'false');
  body.classList.remove('no-scroll');
  modal.setAttribute('tabindex', '-1');
  contact.focus(); 
  document.removeEventListener('keydown', onKey);
  form.removeEventListener('keydown', runValidate);
}

// function testFirstName ______________________________________________
let regexName = /^[a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ]+([ \-'][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ]+)?$/;

firstName.addEventListener("blur", testFirstName);

function testFirstName() {
  if ((firstName.value.length < 2) || 
     (firstName.value.length >= 30) ||
     (!regexName.test(firstName.value)) || 
     (firstName.value == "")) {
    firstName.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorFirstName.classList.remove('sr-only');
    firstName.addEventListener("input", testFirstName);
    return false;
  } else {
    firstName.classList.remove("inputError");
    pErrorFirstName.classList.add('sr-only');
    return true;
  }
}
// function testLastName _______________________________________________
lastName.addEventListener("blur", testLastName);

function testLastName() {
  if ((lastName.value.length < 2) || 
     (lastName.value.length >= 30) ||
     (!regexName.test(lastName.value)) || 
     (lastName.value == "")) {
    lastName.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorLastName.classList.remove('sr-only');
    lastName.addEventListener("input", testLastName);
    return false;
  } else {
    lastName.classList.remove("inputError");
    pErrorLastName.classList.add('sr-only');
    return true;
  }
}
// function testEmail __________________________________________________
let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eMail.addEventListener("blur", testEmail);

function testEmail() {
  if ((eMail.value.length < 5) || 
     (eMail.value.length >= 30) ||
     (!regexEmail.test(eMail.value)) || 
     (eMail.value == "")) {
    eMail.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorEmail.classList.remove('sr-only');
    eMail.addEventListener("input", testEmail);
    return false;
  } else {
    eMail.classList.remove("inputError");
    pErrorEmail.classList.add('sr-only');
    return true;
  }
}
// function testMessage __________________________________________________
message.addEventListener("blur", testMessage);
let regexMessage = /[a-z]/;
function testMessage() {
  if (((message.value) == "") ||
      (!regexMessage.test(message.value))) {
    message.classList.add("inputError"); // attribution de la classe "inputError" à firstName(input)
    pErrorMessage.classList.remove('sr-only');
    message.addEventListener("input", testMessage);
    return false;
  } else {
    message.classList.remove("inputError");
    pErrorMessage.classList.add('sr-only');
    return true;
  }
}
// function submit __________________________________________________

form.addEventListener('keydown', runValidate);

function runValidate(e) {
  if (e.key == 'Enter') {
    e.preventDefault();
    validate();
  }
}
function validate() {
  if ((testFirstName() === true) && 
      (testLastName() === true) && 
      (testEmail() === true) && 
      (testMessage() === true)) {
    console.log('Prénom : ' + firstName.value);
    console.log('Nom : ' + lastName.value);
    console.log('email : ' + eMail.value);
    console.log('message : ' + message.value);
    closeModal();
    return false;
  } else {
    testFirstName();
    testLastName();
    testEmail();
    testMessage();
  }
}