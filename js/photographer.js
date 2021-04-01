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
// Récupération des données // ___________________________________________________________________________
let photographers = [];
let media = [];
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
  console.log(photographers);
}

function getPhotographers(json) {
  const PHOTOGRAPHERS = json.photographers;
  for (photographer of PHOTOGRAPHERS) {
    photographers.push(photographer);
  }
  getPhotographer(photographers);
}

function getMedia(json) {
  const MEDIA = json.media;
  for (medium of MEDIA) {
    media.push(medium);
  }
}


let str = window.location.href;
let url = new URL(str);
let = window.location.search;
let login = url.searchParams.get('id');
console.log(login);


function getPhotographer(photographers) {
  for (let i = 0; i < photographers.length; i++ ) {
    if (photographers[i].id == login) {
      console.log(photographers[i]) ;
    }
  }
}
