const Photographer = require('./photographer');

const photographer = { Photographer };

module.exports = {
  createPhotographer(type, attributes) {
    const PhotographerType = photographer[type];
    return new PhotographerType(attributes);
  }
};
