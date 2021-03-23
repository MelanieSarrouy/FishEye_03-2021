// Requête objet JSON
let source = '../data.json';
let photographersCards = document.getElementById('photographersCards');
let listPhotographers = [];
let data = [];
let media = [];

fetch(source)
  .then(response => response.json())
  .then(data => console.log(data.photographers))
  .then(photographers => {
    for (i = 0; i < photographers.length; i++) {
      photographersCards.innerHTML += `
        <article class="photographer">
        <a href="photographer.html" class="__link">
          <picture class="photographer__picture">
            <img src="./images/sample_photos/photographers_ID_photos/${photographers[i].portrait}" class="photographer__img" />
            <h2 class="photographer__name">${photographers[i].name}</h2>
          </picture>
        </a>
        <p class="photographer__location">${photographers[i].city}, ${photographers[i].country}</p>
        <p class="photographer__tagline">{photographers[i].tagline}</p>
        <p class="photographer__price">{photographers[i].price}€/jour</p>
        <ul class="nav__list" role="list">
          <li class="nav__liste__item" role="listitem"><a class="nav__liste__link" href="#">#${photographers[i].tags[0]}</a></li>
          <li class="nav__liste__item" role="listitem"><a class="nav__liste__link" href="#">#${photographers[i].tags[1]}</a></li>
          <li class="nav__liste__item" role="listitem"><a class="nav__liste__link" href="#">#${photographers[i].tags[2]}</a></li>
        </ul>
      </article>`;
    }
  })
  
  /*.then(data1 => {
    photographersCards.textContent = '';
    photographersCards.textContent = data1.photographers;
    let imgPortrait = document.createElement('img');
    imgPortrait.src = data1.photographers[0].portrait;
    photographersCards.appendChild(imgPortrait);
  });*/
  
function createAPhotographer(name, id, city, country, tags, tagline, price, portrait) {
  return {
    name,
    id,
    city,
    country,
    tags,
    tagline,
    price,
    portrait
  }
}
let photographer1 = createAPhotographer(listPhotographers[0]);

/*function createCards(photographers) {
  for (i = 0; i < photographers.length; i++) {
    photographersCards.innerHTML += `
      <article class="photographer">
      <a href="photographer.html" class="__link">
        <picture class="photographer__picture">
          <img src="./images/sample_photos/photographers_ID_photos/${photographers[i].portrait}" class="photographer__img" />
          <h2 class="photographer__name">${photographers[i].name}</h2>
        </picture>
      </a>
      <p class="photographer__location">${photographers[i].city}, ${photographers[i].country}</p>
      <p class="photographer__tagline">{photographers[i].tagline}</p>
      <p class="photographer__price">{photographers[i].price}€/jour</p>
      <ul class="nav__list" role="list">
        <li class="nav__liste__item" role="listitem"><a class="nav__liste__link" href="#">#${photographers[i].tags[0]}</a></li>
        <li class="nav__liste__item" role="listitem"><a class="nav__liste__link" href="#">#${photographers[i].tags[1]}</a></li>
        <li class="nav__liste__item" role="listitem"><a class="nav__liste__link" href="#">#${photographers[i].tags[2]}</a></li>
      </ul>
    </article>`;
  }
}*/



