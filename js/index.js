// Requête objet JSON _____________________________________________________________________________________
const source = '../data.json';
// let photographers, media = [], 
//     mainObj = {};
fetch(source)
  .then(resp => {
  return resp.json().then(json => getData(json))});

function getData(json) {
  const DATA = json;
  console.log(DATA);
  const allPhotographers = DATA.photographers;
  console.log(allPhotographers);
  const allMedias = DATA.media;
  console.log(allMedias);
  showPhotographers(allPhotographers);
  // listenTag(allPhotographers);

}


// DOM ___________________________________________________________________________________________________
let photographersCards = document.getElementById('photographersCards');
let portrait = document.getElementById('portrait');
let art = document.getElementById('art');
// Affichage des photographes //
function showPhotographers(photographers) {
  for (i = 0; i < photographers.length; i++) {
    createAcard(photographers[i]);
    displayTags(photographers[i]);
  }
}

// Création d'une carte photographe ______________________________________________________________________
function createAcard(photographer) {
  let img = document.createElement('img');
  img.classList.add('photographer__img');
  let picture = document.createElement('picture');
  picture.classList.add('photographer__figure');
  let h2 = document.createElement('h2');
  h2.classList.add('photographer__name');
  let pLocation = document.createElement('p');
  pLocation.classList.add('photographer__location');
  let pTagline = document.createElement('p');
  pTagline.classList.add('photographer__tagline');
  let pPrice = document.createElement('p');
  pPrice.classList.add('photographer__price');
  let ul = document.createElement('ul');
  ul.classList.add('list');
  ul.setAttribute("role", "list");
  let anchor = document.createElement('a');
  anchor.classList.add('photographer__link');
  anchor.setAttribute("href", "photographer.html");
  let article = document.createElement('article');
  article.classList.add('photographer');
  picture.appendChild(img);
  anchor.appendChild(picture);
  anchor.appendChild(h2);
  article.appendChild(anchor);
  article.appendChild(pLocation);
  article.appendChild(pTagline);
  article.appendChild(pPrice);
  article.appendChild(ul);
  photographersCards.appendChild(article);

  // Contenu des cartes photographes 
  // article.style.display = 'flex';
  img.setAttribute("src", `./images/sample_photos/photographers_ID_photos/${photographer.portrait}`);
  h2.innerHTML = `${photographer.name}`;
  pLocation.innerHTML = `${photographer.city}, ${photographer.country}`;
  pTagline.innerHTML = `${photographer.tagline}`;
  pPrice.innerHTML = `${photographer.price}€/jour`;
  pPrice.innerHTML = `${photographer.price}€/jour`;
  ul.setAttribute("id", `id${photographer.id}`);
  article.setAttribute("id", `${photographer.id}`);

}

// Affichage des tags de chaque photographe ______________________________________________________________
function displayTags(photographer) {
  for (tag = 0; tag < photographer.tags.length; tag++) {
    document.querySelector('#id' + photographer.id).innerHTML += `
    <li class="list__item" role="listitem">
      <a class="list__link" href="#">#${photographer.tags[tag]}</a>
    </li>`;
  }
}
function listenTag(photographers) {
  portrait.addEventListener('click', photographerSort(photographers));
  art.addEventListener('click', photographerSort(photographers));

} 

function photographerSort(photographers) {
  console.log(photographers.length);
  let arrayPhotographers = photographers;

  for (i = 0; i < arrayPhotographers.length; i++) {
    let article = document.getElementById(`${arrayPhotographers[i].id}`);
    const arrayTag = arrayPhotographers[i].tags;
    const index = arrayTag.indexOf('portrait');
    if (!(index > -1)) {
      article.style.display = 'none';
    }
  }
}

// function photographerSort(photographers) {
//   console.log(photographers.length);
//   let arrayPhotographers = [];

//   for (i = 0; i < photographers.length; i++) {
//     // let article = document.getElementById(`${arrayPhotographers[i].id}`);
//     const arrayTag = photographers[i].tags;
//     const index = arrayTag.indexOf('portrait');
//     if ((index > -1)) {
//       arrayPhotographers.push(`${photographers[i]}`);
//     }
//   }
//   showPhotographers(arrayPhotographers);
//   console.log(arrayPhotographers);
// }

