const Photographer = function({name, id, city, country, tags, tagline, price, portrait, media}) {
  this.name = name;
  this.id = id;
  this.city = city;
  this.country = country;
  this.tags = tags;
  this.tagline = tagline;
  this.price = price;
  this.portrait = portrait;
  this.media = media;
};

module.exports = Photographer;