// Requête objet JSON _____________________________________________________________________________________
const source = `../data.json`;
// let photographers, media = [], 
//     mainObj = {};

const myFetch = fetch(source)
.then(resp => {return resp.json()});

const allPhotographers = myFetch
  .then((responseJson) => {
    showPhotographers(responseJson.photographers);
    console.log(responseJson.photographers);
    return responseJson.photographers
  })
let selectPhotographers = myFetch
  .then((responseJson) => {
    photographerSort(responseJson.photographers);
  });

// fetch(source)
//   .then(resp => {return resp.json()})
//   .then(data => {
//     console.log(data); 
//     photographers = data.photographers;
//     media = data.media;
//     mainObj = data;
//     // getData();
//     showPhotographers(photographers);
//     photographerSort();
//   })
//   .catch(error => {
//     console.error ('il y a un probleme');
//     console.error(error);
//   });


console.log(allPhotographers)


// DOM ___________________________________________________________________________________________________
let photographersCards = document.getElementById('photographersCards');

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


let portrait = document.getElementById('portrait');


myFetch.then((responseJson) => {
  photographerSort(responseJson.photographers);
  console.log(responseJson.photographers)
});
portrait.addEventListener('click', photographerSort());

function photographerSort(allPhotographers) {
//let articles = document.getElementsByClassName('photographer');
//articles.style.display = 'block';  
  for (i = 0; i < allPhotographers.length; i++) {
    if (photographers.tags.indexOf('portrait') == -1) {
      photographerId.style.display = none;
    }
  }
}
console.log(articles);
