// Requête objet JSON
let source = '../data.json';
let photographersCards = document.getElementById('photographersCards');

fetch(source)
  .then(response => response.json())
  .then(data => {return data.photographers;})
  .then(photographers => {
    for (i = 0; i < photographers.length; i++) {
      photographersCards.innerHTML += `
        <article class="photographer">
          <a href="photographer.html" class="photographer__link">
            <picture class="photographer__figure">
              <img src="./images/sample_photos/photographers_ID_photos/${photographers[i].portrait}" class="photographer__img" />
            </picture>
            <h2 class="photographer__name">${photographers[i].name}</h2>
          </a>
          <p class="photographer__location">${photographers[i].city}, ${photographers[i].country}</p>
          <p class="photographer__tagline">${photographers[i].tagline}</p>
          <p class="photographer__price">${photographers[i].price}€/jour</p>
          <ul class="list" id="id${photographers[i].id}" role="list"></ul>
        </article>`;
        for (t = 0; t < photographers[i].tags.length; t++) {
          document.querySelector('#id' + photographers[i].id).innerHTML += `
          <li class="list__item" role="listitem">
            <a class="list__link" href="#">#${photographers[i].tags[t]}</a>
          </li>`;
        }
      }
    })
  ;
