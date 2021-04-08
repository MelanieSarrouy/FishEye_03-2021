// DOM ___________________________________________________________________________________________________
let photographersCards = document.getElementById("photographersCards");

// Requête objet JSON ____________________________________________________________________________________
const source = "./data.json";

// Récupération des données // ___________________________________________________________________________

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
// Récupération des données // ___________________________________________________________________________
let photographers = [];
let media = [];

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
  // console.log(photographers);
  // creatAPhotographer(photographers);
}

function getPhotographers(json) {
  const PHOTOGRAPHERS = json.photographers;
  for (photographer of PHOTOGRAPHERS) {
    photographers.push(photographer);
  }
  showPhotographers(photographers);
}

function getMedia(json) {
  const MEDIA = json.media;
  for (medium of MEDIA) {
    media.push(medium);
  }
}

// Affichage des photographes // _________________________________________________________________________
function showPhotographers(photographers) {
  for (i = 0; i < photographers.length; i++) {
    createAcard(photographers[i]);
    displayTags(photographers[i]);
  }
}

// Création d'une carte photographe ______________________________________________________________________
function createAcard(photographer) {
  let img = document.createElement("img");
  img.classList.add("photographer__img");
  let picture = document.createElement("picture");
  picture.classList.add("photographer__figure");
  let h2 = document.createElement("h2");
  h2.classList.add("photographer__name");
  let pLocation = document.createElement("p");
  pLocation.classList.add("photographer__location");
  let pTagline = document.createElement("p");
  pTagline.classList.add("photographer__tagline");
  let pPrice = document.createElement("p");
  pPrice.classList.add("photographer__price");
  let ul = document.createElement("ul");
  ul.classList.add("list");
  ul.setAttribute("role", "list");
  let anchor = document.createElement("a");
  anchor.classList.add("photographer__link");
  let article = document.createElement("article");
  article.classList.add("photographer");
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
  anchor.setAttribute("href", "photographer-page.html?id=" + `${photographer.id}`);
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
    document.querySelector("#id" + photographer.id).innerHTML += `
    <li class="list__item" role="listitem">
      <a class="list__link" href="index.html#${photographer.tags[tag]}">#${photographer.tags[tag]}</a>
    </li>`;
  }
}

// Affichage des photographes par tag _____________________________________________________________________
const arrayTags = [
  "portrait",
  "art",
  "mode",
  "architecture",
  "voyage",
  "sport",
  "animaux",
  "evenements",
];
window.addEventListener('hashchange', () => hashChanged(photographers));
function hashChanged() {
  console.log(photographers);
  for (tag of arrayTags) {
    if (location.hash === `#${tag}`) {
      for (let i = 0; i < photographers.length; i++) {
        let article = document.getElementById(`${photographers[i].id}`);
        const arrayTagPhotographer = photographers[i].tags;
        const index = arrayTagPhotographer.indexOf(tag);
        if (!(index > -1)) {
          article.style.display = "none";
        } else {
          article.style.display = 'flex';
        }
      }
    }
  }
}

// Page photographer ! gerer les imports exports !!!
